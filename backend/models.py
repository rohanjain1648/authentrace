from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime
from sqlalchemy.sql import func
from .database import Base

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(String, primary_key=True, index=True)
    student = Column(String, index=True)
    assignment = Column(String)
    date = Column(DateTime(timezone=True), server_default=func.now())
    text_content = Column(Text, nullable=True)
    ai_disclosed = Column(Boolean, default=False)
    share_with_student = Column(Boolean, default=False)
    
    # Analysis results
    status = Column(String, default="Analyzing") # Analyzing, Flagged, Cleared, Review Error
    risk = Column(String, default="Unknown") # Low, Medium, High
    ai_score = Column(Float, default=0.0)
    similarity_score = Column(Float, default=0.0)
    overall_score = Column(Float, default=0.0)
    rationale = Column(Text, nullable=True)
    
    # Can store JSON as string for MVP, or use JSON type in Postgres
    flagged_passages = Column(Text, nullable=True) 
    span_highlights = Column(Text, nullable=True) # Granular highlights JSON: [{text, category, reason, source, score}]
    language = Column(String, default="en") # en, es, fr, zh
    citation_analysis = Column(Text, nullable=True) # JSON: {total_citations, valid_count, hallucinated_count, issues}
    batch_id = Column(String, index=True, nullable=True)
    feedback = Column(Text, nullable=True)

class InstitutionSettings(Base):
    __tablename__ = "institution_settings"

    id = Column(Integer, primary_key=True, index=True)
    institution_name = Column(String, default="Default University")
    ai_weight = Column(Float, default=0.5)
    similarity_weight = Column(Float, default=0.5)
    ai_high_threshold = Column(Float, default=50.0)
    ai_borderline_threshold = Column(Float, default=20.0)
    total_seats = Column(Integer, default=100)
    used_seats = Column(Integer, default=15)
    tier = Column(String, default="Trial") # Trial, Department, Institution
    retention_days = Column(Integer, default=365) # FERPA data retention policy in days

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    actor_email = Column(String, index=True)
    action = Column(String, index=True) # e.g. VIEW_REPORT, INTERVENE_STATUS, UPDATE_SETTINGS, SSO_LOGIN, DATA_PURGE
    resource_id = Column(String, nullable=True)
    ip_address = Column(String, nullable=True, default="127.0.0.1")
    details = Column(Text, nullable=True)

class LtiRegistration(Base):
    __tablename__ = "lti_registrations"

    id = Column(Integer, primary_key=True, index=True)
    issuer = Column(String, unique=True, index=True) # e.g. https://canvas.instructure.com
    client_id = Column(String, index=True)
    platform_name = Column(String) # Canvas, Blackboard, Moodle
    auth_login_url = Column(String)
    auth_token_url = Column(String)
    key_set_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class IntegrityCase(Base):
    __tablename__ = "integrity_cases"

    id = Column(String, primary_key=True, index=True) # e.g. CASE-2024-001
    submission_id = Column(String, index=True)
    student_name = Column(String, index=True)
    instructor_email = Column(String)
    status = Column(String, default="Open") # Open, Under Review, Hearing Scheduled, Resolved
    severity = Column(String, default="Medium") # Low, Medium, High
    summary = Column(Text, nullable=True)
    notes = Column(Text, nullable=True) # JSON array of notes
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ApiKey(Base):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)
    name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())



