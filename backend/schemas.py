from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class FlaggedPassage(BaseModel):
    text: str
    reason: str

class SpanHighlight(BaseModel):
    text: str
    category: str # "ai_high", "ai_borderline", "plagiarism_match"
    reason: str
    source: Optional[str] = None
    score: float = 0.0

class CitationIssue(BaseModel):
    citation: str
    issue: str

class CitationAnalysis(BaseModel):
    total_citations: int = 0
    valid_count: int = 0
    hallucinated_count: int = 0
    issues: List[CitationIssue] = []

class FeedbackItem(BaseModel):
    date: str
    note: str

class SubmissionBase(BaseModel):
    student: str
    assignment: str
    ai_disclosed: bool = False

class SubmissionCreate(SubmissionBase):
    text_content: Optional[str] = None

class SubmissionResponse(SubmissionBase):
    id: str
    date: datetime
    status: str
    risk: str
    ai_score: float
    similarity_score: float
    overall_score: float
    rationale: Optional[str] = None
    batch_id: Optional[str] = None
    language: Optional[str] = "en"
    share_with_student: Optional[bool] = False
    rubric_level: Optional[str] = None
    
    # We'll parse the JSON string back to dict/list in the router
    flagged_passages: Optional[List[FlaggedPassage]] = []
    span_highlights: Optional[List[SpanHighlight]] = []
    citation_analysis: Optional[CitationAnalysis] = None
    feedback: Optional[List[FeedbackItem]] = []

    class Config:
        orm_mode = True
        from_attributes = True

class IntegrityCaseCreate(BaseModel):
    submission_id: str
    student_name: str
    instructor_email: str
    severity: Optional[str] = "Medium"
    summary: str

class IntegrityCaseUpdate(BaseModel):
    status: Optional[str] = None
    severity: Optional[str] = None
    note: Optional[str] = None

class IntegrityCaseSchema(BaseModel):
    id: str
    submission_id: str
    student_name: str
    instructor_email: str
    status: str
    severity: str
    summary: Optional[str] = None
    notes: Optional[List[FeedbackItem]] = []
    created_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True

class PublicAnalyzeRequest(BaseModel):
    text: str
    student_id: Optional[str] = "External-User"
    assignment_name: Optional[str] = "External API Request"

class PublicAnalyzeResponse(BaseModel):
    submission_id: str
    overall_score: float
    ai_score: float
    similarity_score: float
    risk_level: str
    language: str
    citation_analysis: CitationAnalysis
    rationale: str


class InstitutionSettingsSchema(BaseModel):
    id: int
    institution_name: str
    ai_weight: float
    similarity_weight: float
    ai_high_threshold: float
    ai_borderline_threshold: float
    total_seats: int
    used_seats: int
    tier: str
    retention_days: int

    class Config:
        orm_mode = True
        from_attributes = True

class InstitutionSettingsUpdate(BaseModel):
    institution_name: Optional[str] = None
    ai_weight: Optional[float] = None
    similarity_weight: Optional[float] = None
    ai_high_threshold: Optional[float] = None
    ai_borderline_threshold: Optional[float] = None
    retention_days: Optional[int] = None

class BatchSummaryResponse(BaseModel):
    batch_id: str
    total_submissions: int
    analyzed_count: int
    high_risk_count: int
    medium_risk_count: int
    low_risk_count: int
    avg_overall_score: float
    submissions: List[SubmissionResponse]

class AuditLogResponse(BaseModel):
    id: int
    actor_email: str
    action: str
    target_id: Optional[str] = None
    timestamp: datetime
    ip_address: Optional[str] = None
    details: Optional[str] = None

class OrderCreate(BaseModel):
    tier: str

class PaymentVerification(BaseModel):
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str
    tier: str

    class Config:
        orm_mode = True
        from_attributes = True

class AuditLogSchema(BaseModel):
    id: int
    timestamp: datetime
    actor_email: str
    action: str
    resource_id: Optional[str] = None
    ip_address: Optional[str] = None
    details: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True

class SsoLoginRequest(BaseModel):
    email: str
    provider: str # "auth0", "okta", "google_workspace", "saml2"

class SsoLoginResponse(BaseModel):
    redirect_url: str
    session_token: str
    user: Dict[str, Any]

class LtiLaunchRequest(BaseModel):
    iss: str # Issuer e.g. https://canvas.instructure.com
    target_link_uri: str
    sub: str # Student/User ID in LMS
    roles: List[str]
    resource_link_id: str
    custom_canvas_assignment_id: Optional[str] = None
    lis_person_name_full: Optional[str] = "LMS Student"

class DataRetentionPurgeResponse(BaseModel):
    purged_count: int
    retention_days: int
    status: str


