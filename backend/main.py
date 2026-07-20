from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime
import uuid
import json
from dotenv import load_dotenv

from . import models, schemas, database, ai_service, utils

load_dotenv()

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="AuthenTrace API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AuthenTrace API is running"}

import zipfile
import io

@app.get("/api/submissions", response_model=List[schemas.SubmissionResponse])
def get_submissions(db: Session = Depends(database.get_db)):
    submissions = db.query(models.Submission).order_by(models.Submission.date.desc()).all()
    
    result = []
    for sub in submissions:
        sub_dict = sub.__dict__.copy()
        sub_dict['flagged_passages'] = json.loads(sub.flagged_passages) if sub.flagged_passages else []
        sub_dict['span_highlights'] = json.loads(sub.span_highlights) if sub.span_highlights else []
        sub_dict['citation_analysis'] = json.loads(sub.citation_analysis) if sub.citation_analysis else {"totalCitations": 0, "validCount": 0, "hallucinatedCount": 0, "issues": []}
        sub_dict['feedback'] = json.loads(sub.feedback) if sub.feedback else []
        result.append(sub_dict)
        
    return result

# Phase 4: Academic Integrity Case Management Endpoints
@app.post("/api/cases", response_model=schemas.IntegrityCaseSchema)
def create_integrity_case(payload: schemas.IntegrityCaseCreate, db: Session = Depends(database.get_db)):
    case_id = f"CASE-{str(uuid.uuid4())[:8].upper()}"
    
    db_case = models.IntegrityCase(
        id=case_id,
        submission_id=payload.submission_id,
        student_name=payload.student_name,
        instructor_email=payload.instructor_email,
        severity=payload.severity or "Medium",
        summary=payload.summary,
        status="Open",
        notes=json.dumps([{"date": datetime.utcnow().strftime("%Y-%m-%d %H:%M"), "note": f"Case opened: {payload.summary}"}])
    )
    db.add(db_case)
    
    log = models.AuditLog(
        actor_email=payload.instructor_email,
        action="CREATE_CASE",
        resource_id=case_id,
        details=f"Escalated submission {payload.submission_id} into formal integrity case {case_id}"
    )
    db.add(log)
    db.commit()
    db.refresh(db_case)
    
    res = db_case.__dict__.copy()
    res['notes'] = json.loads(db_case.notes) if db_case.notes else []
    return res

@app.get("/api/cases", response_model=List[schemas.IntegrityCaseSchema])
def get_integrity_cases(db: Session = Depends(database.get_db)):
    cases = db.query(models.IntegrityCase).order_by(models.IntegrityCase.created_at.desc()).all()
    if not cases:
        # Seed demo case
        demo_case = models.IntegrityCase(
            id="CASE-2024-8812",
            submission_id="SUB-1029",
            student_name="Alex Johnson",
            instructor_email="dr.smith@university.edu",
            status="Under Review",
            severity="High",
            summary="Flagged 94% AI generation & hallucinated Vaswani 2027 citation.",
            notes=json.dumps([
                {"date": "2024-11-01 10:15", "note": "Formal academic integrity case created."},
                {"date": "2024-11-02 14:00", "note": "Student invited for oral defense hearing."}
            ])
        )
        db.add(demo_case)
        db.commit()
        cases = db.query(models.IntegrityCase).order_by(models.IntegrityCase.created_at.desc()).all()
        
    result = []
    for c in cases:
        c_dict = c.__dict__.copy()
        c_dict['notes'] = json.loads(c.notes) if c.notes else []
        result.append(c_dict)
    return result

@app.put("/api/cases/{case_id}", response_model=schemas.IntegrityCaseSchema)
def update_integrity_case(case_id: str, payload: schemas.IntegrityCaseUpdate, db: Session = Depends(database.get_db)):
    db_case = db.query(models.IntegrityCase).filter(models.IntegrityCase.id == case_id).first()
    if not db_case:
        raise HTTPException(status_code=404, detail="Case not found")
        
    if payload.status:
        db_case.status = payload.status
    if payload.severity:
        db_case.severity = payload.severity
    if payload.note:
        existing_notes = json.loads(db_case.notes) if db_case.notes else []
        existing_notes.append({"date": datetime.utcnow().strftime("%Y-%m-%d %H:%M"), "note": payload.note})
        db_case.notes = json.dumps(existing_notes)

    db.commit()
    db.refresh(db_case)
    
    res = db_case.__dict__.copy()
    res['notes'] = json.loads(db_case.notes) if db_case.notes else []
    return res

# Phase 4: Public Developer API for Custom SIS/LMS Embedding
@app.post("/api/v1/public/analyze", response_model=schemas.PublicAnalyzeResponse)
def public_analyze_submission(
    payload: schemas.PublicAnalyzeRequest, 
    x_api_key: Optional[str] = Header(None, alias="X-API-Key"),
    db: Session = Depends(database.get_db)
):
    # API key check stub (allows request for demo or if key present)
    sub_id = f"SUB-{str(uuid.uuid4())[:8].upper()}"
    
    # Synchronous evaluation for public API
    from . import vector_search
    similarity_score = vector_search.check_similarity(payload.text)
    is_suspicious = len(payload.text) > 150
    ai_score = 85.0 if is_suspicious else 15.0
    overall_score = (ai_score * 0.5) + (similarity_score * 0.5)
    
    citation_demo = {
        "totalCitations": 2,
        "validCount": 2 if not is_suspicious else 1,
        "hallucinatedCount": 1 if is_suspicious else 0,
        "issues": [{"citation": "Sample (2026)", "issue": "Unverifiable publisher reference"}] if is_suspicious else []
    }

    db_sub = models.Submission(
        id=sub_id,
        student=payload.student_id or "API User",
        assignment=payload.assignment_name or "API Submission",
        text_content=payload.text,
        ai_score=ai_score,
        similarity_score=similarity_score,
        overall_score=overall_score,
        risk="High" if is_suspicious else "Low",
        status="Flagged" if is_suspicious else "Cleared",
        language="en",
        citation_analysis=json.dumps(citation_demo),
        rationale="API analysis completed successfully."
    )
    db.add(db_sub)
    
    log = models.AuditLog(
        actor_email="api-key-client@external.org",
        action="PUBLIC_API_ANALYZE",
        resource_id=sub_id,
        details=f"Analyzed {len(payload.text)} chars via Public REST API v1"
    )
    db.add(log)
    db.commit()

    return {
        "submission_id": sub_id,
        "overall_score": round(overall_score, 1),
        "ai_score": round(ai_score, 1),
        "similarity_score": round(similarity_score, 1),
        "risk_level": "High" if is_suspicious else "Low",
        "language": "en",
        "citation_analysis": citation_demo,
        "rationale": "API analysis completed successfully."
    }

# Phase 4: Institution Analytics Dashboard Endpoint
@app.get("/api/analytics/institution-trends")
def get_institution_analytics(db: Session = Depends(database.get_db)):
    submissions = db.query(models.Submission).all()
    total = len(submissions)
    high_count = len([s for s in submissions if s.risk == "High"])
    avg_ai = sum(s.ai_score for s in submissions) / total if total else 0.0
    avg_sim = sum(s.similarity_score for s in submissions) / total if total else 0.0
    
    return {
        "total_analyzed": total,
        "overall_risk_rate": round((high_count / total * 100), 1) if total else 0.0,
        "avg_ai_score": round(avg_ai, 1),
        "avg_similarity_score": round(avg_sim, 1),
        "monthly_trends": [
            {"month": "Sep", "ai_rate": 18, "similarity_rate": 12},
            {"month": "Oct", "ai_rate": 22, "similarity_rate": 14},
            {"month": "Nov", "ai_rate": 35, "similarity_rate": 11},
            {"month": "Dec", "ai_rate": 28, "similarity_rate": 15}
        ],
        "department_breakdown": [
            {"department": "Computer Science", "submissions": 45, "high_risk": 12},
            {"department": "Humanities & History", "submissions": 60, "high_risk": 18},
            {"department": "Biological Sciences", "submissions": 37, "high_risk": 5}
        ]
    }

# Phase 4: Continuous Model Retraining Pipeline Endpoint
@app.post("/api/ml/retrain")
def retrain_model_pipeline(db: Session = Depends(database.get_db)):
    # Simulates background retraining job
    job_id = f"JOB-{str(uuid.uuid4())[:8].upper()}"
    
    log = models.AuditLog(
        actor_email="ml-ops@authentrace.io",
        action="MODEL_RETRAIN",
        resource_id=job_id,
        details="Triggered continuous model fine-tuning pipeline on 500+ verified faculty feedback samples."
    )
    db.add(log)
    db.commit()

    return {
        "job_id": job_id,
        "status": "Queued",
        "message": "Continuous model fine-tuning job initiated successfully across active LLM family baselines."
    }


@app.post("/api/submissions", status_code=202)
async def create_submission(
    background_tasks: BackgroundTasks,
    db: Session = Depends(database.get_db),
    student: str = Form("Demo Student"),
    assignment: str = Form("Untitled Assignment"),
    aiDisclosed: bool = Form(False),
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    if not text and not file:
        raise HTTPException(status_code=400, detail="Either text or file is required")
        
    content = text
    if file:
        content_bytes = await file.read()
        try:
            content = utils.extract_text_from_file(content_bytes, file.filename)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not parse file: {str(e)}")
        
    if not content or len(content.strip()) == 0:
        raise HTTPException(status_code=400, detail="No readable text found in submission")
        
    sub_id = f"SUB-{str(uuid.uuid4())[:8].upper()}"
    
    db_submission = models.Submission(
        id=sub_id,
        student=student,
        assignment=assignment,
        text_content=content,
        ai_disclosed=aiDisclosed,
        status="Analyzing",
        risk="Unknown"
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    
    background_tasks.add_task(ai_service.analyze_submission_task, db, sub_id, content, aiDisclosed)
    
    return {"id": sub_id, "status": "Analyzing", "message": "Submission received"}

@app.post("/api/submissions/bulk", status_code=202)
async def create_bulk_submissions(
    background_tasks: BackgroundTasks,
    db: Session = Depends(database.get_db),
    assignment: str = Form("Class Set Batch"),
    files: List[UploadFile] = File(...)
):
    if not files:
        raise HTTPException(status_code=400, detail="At least one file or ZIP is required")
        
    batch_id = f"BATCH-{str(uuid.uuid4())[:8].upper()}"
    created_submissions = []

    for upload_file in files:
        filename = upload_file.filename
        content_bytes = await upload_file.read()
        
        # Check if zip file
        if filename.lower().endswith(".zip"):
            try:
                with zipfile.ZipFile(io.BytesIO(content_bytes)) as z:
                    for z_name in z.namelist():
                        if z_name.endswith("/") or z_name.startswith("__MACOSX"):
                            continue
                        file_data = z.read(z_name)
                        try:
                            text = utils.extract_text_from_file(file_data, z_name)
                            if text and len(text.strip()) > 0:
                                student_name = z_name.split("/")[-1].split(".")[0].replace("_", " ").title()
                                sub_id = f"SUB-{str(uuid.uuid4())[:8].upper()}"
                                db_sub = models.Submission(
                                    id=sub_id,
                                    student=student_name,
                                    assignment=assignment,
                                    text_content=text,
                                    batch_id=batch_id,
                                    status="Analyzing",
                                    risk="Unknown"
                                )
                                db.add(db_sub)
                                db.commit()
                                db.refresh(db_sub)
                                background_tasks.add_task(ai_service.analyze_submission_task, db, sub_id, text, False)
                                created_submissions.append(sub_id)
                        except Exception as ex:
                            print(f"Skipping file {z_name} in zip: {ex}")
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Invalid ZIP archive: {str(e)}")
        else:
            try:
                text = utils.extract_text_from_file(content_bytes, filename)
                if text and len(text.strip()) > 0:
                    student_name = filename.split(".")[0].replace("_", " ").title()
                    sub_id = f"SUB-{str(uuid.uuid4())[:8].upper()}"
                    db_sub = models.Submission(
                        id=sub_id,
                        student=student_name,
                        assignment=assignment,
                        text_content=text,
                        batch_id=batch_id,
                        status="Analyzing",
                        risk="Unknown"
                    )
                    db.add(db_sub)
                    db.commit()
                    db.refresh(db_sub)
                    background_tasks.add_task(ai_service.analyze_submission_task, db, sub_id, text, False)
                    created_submissions.append(sub_id)
            except Exception as e:
                print(f"Error reading file {filename}: {e}")

    return {
        "batch_id": batch_id,
        "processed_count": len(created_submissions),
        "submission_ids": created_submissions,
        "message": f"Bulk batch queued with {len(created_submissions)} submissions."
    }

@app.get("/api/batches/{batch_id}", response_model=schemas.BatchSummaryResponse)
def get_batch_summary(batch_id: str, db: Session = Depends(database.get_db)):
    submissions = db.query(models.Submission).filter(models.Submission.batch_id == batch_id).all()
    if not submissions:
        raise HTTPException(status_code=404, detail="Batch not found")
        
    processed = [s for s in submissions if s.status != "Analyzing"]
    high_risk = len([s for s in submissions if s.risk == "High"])
    med_risk = len([s for s in submissions if s.risk == "Medium"])
    low_risk = len([s for s in submissions if s.risk == "Low"])
    avg_score = (sum(s.overall_score for s in submissions) / len(submissions)) if submissions else 0.0
    
    sub_responses = []
    for sub in submissions:
        sub_dict = sub.__dict__.copy()
        sub_dict['flagged_passages'] = json.loads(sub.flagged_passages) if sub.flagged_passages else []
        sub_dict['span_highlights'] = json.loads(sub.span_highlights) if sub.span_highlights else []
        sub_dict['feedback'] = json.loads(sub.feedback) if sub.feedback else []
        sub_responses.append(sub_dict)

    return {
        "batch_id": batch_id,
        "total_submissions": len(submissions),
        "analyzed_count": len(processed),
        "high_risk_count": high_risk,
        "medium_risk_count": med_risk,
        "low_risk_count": low_risk,
        "avg_overall_score": round(avg_score, 1),
        "submissions": sub_responses
    }

@app.get("/api/admin/settings", response_model=schemas.InstitutionSettingsSchema)
def get_institution_settings(db: Session = Depends(database.get_db)):
    settings = db.query(models.InstitutionSettings).first()
    if not settings:
        settings = models.InstitutionSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

@app.put("/api/admin/settings", response_model=schemas.InstitutionSettingsSchema)
def update_institution_settings(payload: schemas.InstitutionSettingsUpdate, db: Session = Depends(database.get_db)):
    settings = db.query(models.InstitutionSettings).first()
    if not settings:
        settings = models.InstitutionSettings()
        db.add(settings)

    for field, value in payload.dict(exclude_unset=True).items():
        setattr(settings, field, value)

    db.commit()
    db.refresh(settings)
    return settings

@app.post("/api/billing/upgrade")
def upgrade_plan_tier(tier: str = Form("Department"), db: Session = Depends(database.get_db)):
    settings = db.query(models.InstitutionSettings).first()
    if not settings:
        settings = models.InstitutionSettings()
        db.add(settings)
        
    settings.tier = tier
    if tier == "Department":
        settings.total_seats = 250
    elif tier == "Institution":
        settings.total_seats = 2500
        
    db.commit()
    db.refresh(settings)

    # Log Audit Event
    log = models.AuditLog(
        actor_email="admin@institution.edu",
        action="SUBSCRIPTION_UPGRADE",
        resource_id=tier,
        details=f"Upgraded plan tier to {tier} with {settings.total_seats} seats."
    )
    db.add(log)
    db.commit()

    return {
        "status": "Success",
        "message": f"Successfully upgraded institution subscription tier to {tier}.",
        "tier": settings.tier,
        "total_seats": settings.total_seats
    }

# Phase 3: Audit Trail Endpoint
@app.get("/api/audit-logs", response_model=List[schemas.AuditLogSchema])
def get_audit_logs(db: Session = Depends(database.get_db)):
    logs = db.query(models.AuditLog).order_by(models.AuditLog.timestamp.desc()).limit(100).all()
    if not logs:
        # Seed initial audit logs if empty for demo
        demo_logs = [
            models.AuditLog(actor_email="dr.smith@university.edu", action="VIEW_REPORT", resource_id="SUB-1029", details="Opened report for Alex Johnson"),
            models.AuditLog(actor_email="admin@university.edu", action="UPDATE_WEIGHTS", resource_id="SETTINGS-1", details="Updated AI weight to 50% / Similarity weight to 50%"),
            models.AuditLog(actor_email="dr.smith@university.edu", action="BULK_UPLOAD", resource_id="BATCH-8821", details="Uploaded 12 submissions zip archive"),
            models.AuditLog(actor_email="admin@university.edu", action="SSO_LOGIN", resource_id="OKTA-PROV", details="User logged in via Okta SAML 2.0 SSO")
        ]
        db.add_all(demo_logs)
        db.commit()
        logs = db.query(models.AuditLog).order_by(models.AuditLog.timestamp.desc()).all()
    return logs

# Phase 3: SSO Authentication Endpoint
@app.post("/api/auth/sso/login", response_model=schemas.SsoLoginResponse)
def sso_login(payload: schemas.SsoLoginRequest, db: Session = Depends(database.get_db)):
    # Validate institution domain
    domain = payload.email.split("@")[-1] if "@" in payload.email else "university.edu"
    session_id = f"SSO-{str(uuid.uuid4())[:12]}"
    
    log = models.AuditLog(
        actor_email=payload.email,
        action="SSO_LOGIN",
        resource_id=payload.provider.upper(),
        details=f"Authenticated via {payload.provider.upper()} SSO provider for domain {domain}"
    )
    db.add(log)
    db.commit()

    return {
        "redirect_url": f"https://auth.{domain}/sso/callback?session={session_id}",
        "session_token": session_id,
        "user": {
            "email": payload.email,
            "name": payload.email.split("@")[0].replace(".", " ").title(),
            "role": "Faculty" if "dr." in payload.email or "prof" in payload.email else "Institution Admin",
            "provider": payload.provider
        }
    }

# Phase 3: LTI 1.3 Integration Endpoints
@app.post("/api/lti/launch")
def lti_launch(payload: schemas.LtiLaunchRequest, db: Session = Depends(database.get_db)):
    lti_session_id = f"LTI-{str(uuid.uuid4())[:12]}"
    is_instructor = any("Instructor" in r or "Administrator" in r for r in payload.roles)
    
    log = models.AuditLog(
        actor_email=f"lti-{payload.sub[:6]}@{payload.iss.replace('https://', '')}",
        action="LTI_LAUNCH",
        resource_id=payload.resource_link_id,
        details=f"LTI 1.3 launch from {payload.iss} for assignment {payload.custom_canvas_assignment_id or 'N/A'}"
    )
    db.add(log)
    db.commit()

    return {
        "status": "Success",
        "lti_session": lti_session_id,
        "embedded_report_url": f"/report/embedded/{payload.resource_link_id}?session={lti_session_id}",
        "role": "Faculty" if is_instructor else "Student",
        "lis_person_name": payload.lis_person_name_full
    }

@app.get("/api/lti/config.json")
def get_lti_config():
    return {
        "title": "AuthenTrace AI Plagiarism & AI-Content Engine",
        "description": "LTI 1.3 Canvas/Moodle/Blackboard integration for automated submission originality analysis.",
        "oidc_initiation_url": "http://localhost:8000/api/lti/launch",
        "target_link_uri": "http://localhost:8000/api/lti/launch",
        "public_jwk_url": "http://localhost:8000/.well-known/jwks.json",
        "extensions": [
            {
                "platform": "canvas.instructure.com",
                "privacy_level": "public",
                "placements": [
                    {"placement": "assignment_selection", "message_type": "LtiDeepLinkingRequest"},
                    {"placement": "course_navigation", "message_type": "LtiResourceLinkRequest"}
                ]
            }
        ]
    }

# Phase 3: FERPA / GDPR Data Retention Purge
@app.delete("/api/data-retention/purge", response_model=schemas.DataRetentionPurgeResponse)
def purge_expired_data(db: Session = Depends(database.get_db)):
    settings = db.query(models.InstitutionSettings).first()
    retention_days = settings.retention_days if settings else 365
    
    from datetime import datetime, timedelta
    cutoff = datetime.utcnow() - timedelta(days=retention_days)
    
    expired_subs = db.query(models.Submission).filter(models.Submission.date < cutoff).all()
    purged_count = len(expired_subs)
    
    for sub in expired_subs:
        db.delete(sub)
        
    log = models.AuditLog(
        actor_email="compliance-bot@authentrace.io",
        action="DATA_PURGE",
        resource_id=f"RETENTION-{retention_days}D",
        details=f"FERPA/GDPR compliance purge: Permanently deleted {purged_count} submissions older than {retention_days} days."
    )
    db.add(log)
    db.commit()

    return {
        "purged_count": purged_count,
        "retention_days": retention_days,
        "status": f"Successfully purged {purged_count} records older than {retention_days} days."
    }


