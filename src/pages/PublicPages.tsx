import React from 'react';
import { MarkdownPage } from '../components/MarkdownPage';

export function EvidenceEnginePage() {
  return (
    <MarkdownPage 
      title="Evidence Engine" 
      subtitle="How Veritas AI goes beyond detection to provide explainable evidence."
    >
      <h3>The Flaw in AI Detectors</h3>
      <p>Traditional AI detectors rely on binary classifications ("Human" vs "AI") which have been proven to disproportionately flag non-native English speakers and neurodivergent students. They lack explainability and turn academic integrity into a black box.</p>
      
      <h3 style={{ marginTop: '24px' }}>Writing DNA Analysis</h3>
      <p>Our Evidence Engine doesn't just look for "AI-like" text. It builds a long-term <strong>Stylometric Baseline</strong> (Writing DNA) for every student. When an assignment is submitted, we compare it to their historical corpus to detect structural deviations, sudden vocabulary spikes, and syntax anomalies.</p>

      <h3 style={{ marginTop: '24px' }}>Citation Hallucination Checker</h3>
      <p>One of the most reliable indicators of unauthorized LLM usage is the presence of hallucinated citations. Our engine automatically cross-references every citation against CrossRef and Semantic Scholar. If a citation does not exist, it is flagged with 100% confidence.</p>
    </MarkdownPage>
  );
}

export function SecurityPage() {
  return (
    <MarkdownPage 
      title="Security & Compliance" 
      subtitle="Enterprise-grade protection for student data."
    >
      <h3>FERPA & GDPR Compliant</h3>
      <p>Veritas AI is built with a privacy-first architecture. We do not use student submissions to train our own foundational models. All data is encrypted at rest (AES-256) and in transit (TLS 1.3).</p>
      
      <h3 style={{ marginTop: '24px' }}>Data Sovereignty</h3>
      <p>Institutions can choose their data residency regions (e.g., US, Canada, EU) to comply with local regulations. Student data is siloed per institution and deleted upon graduation or upon request.</p>
    </MarkdownPage>
  );
}

export function PedagogicalGuidesPage() {
  return (
    <MarkdownPage 
      title="Pedagogical Guides" 
      subtitle="Integrating AI into the modern classroom."
    >
      <h3>Moving from Punitive to Pedagogical</h3>
      <p>When an AI flag occurs, the first step shouldn't be a zero grade. It should be a conversation. Our guides help faculty structure "Oral Defenses" and "Revision Requests" that turn potential academic misconduct into a learning opportunity.</p>
      
      <h3 style={{ marginTop: '24px' }}>The Transparent Co-Creation Model</h3>
      <p>We encourage professors to allow specific AI uses (e.g., grammar checking, brainstorming) as long as they are <strong>transparently disclosed</strong> by the student in our portal. This builds a provenance graph of the student's work process.</p>
    </MarkdownPage>
  );
}

// Generic placeholder pages for the rest to ensure the site is fully linked and professional
const GenericPage = ({ title, content }: { title: string, content: string }) => (
  <MarkdownPage title={title}>
    <p>{content}</p>
    <p style={{ marginTop: '16px' }}>This page is currently being updated by the Veritas AI content team to reflect our latest policies and offerings.</p>
  </MarkdownPage>
);

export const IntegrationsPage = () => <GenericPage title="LMS Integrations" content="Seamlessly connect Veritas AI with Canvas, Blackboard, D2L Brightspace, and Moodle via LTI 1.3." />;
export const DocumentationPage = () => <GenericPage title="Documentation" content="Comprehensive guides on setting up your institution, configuring SSO, and managing faculty roles." />;
export const APIReferencePage = () => <GenericPage title="API Reference" content="RESTful endpoints for triggering stylometric analysis and pulling triage queues into your own university portals." />;
export const CaseStudiesPage = () => <GenericPage title="Case Studies" content="Read how the University of Calgary reduced false-positive academic integrity cases by 40% using Veritas AI." />;
export const BlogPage = () => <GenericPage title="Veritas Blog" content="The latest news on AI policy, higher education trends, and product updates." />;
export const AboutUsPage = () => <GenericPage title="About Us" content="Founded by researchers in Natural Language Processing and Higher Education Pedagogy, our mission is to restore trust in academia." />;
export const CareersPage = () => <GenericPage title="Careers" content="Join us in building the future of academic integrity. We are hiring engineers, researchers, and sales professionals." />;
export const ContactPage = () => <GenericPage title="Contact Sales" content="Interested in a pilot program for your university? Get in touch with our enterprise team." />;
export const PartnersPage = () => <GenericPage title="Partnerships" content="We partner with leading EdTech providers and LLM foundational models to deliver unparalleled analysis." />;
export const PrivacyPage = () => <GenericPage title="Privacy Policy" content="Your data belongs to you. We strictly outline how student submissions are handled, stored, and protected." />;
export const TermsPage = () => <GenericPage title="Terms of Service" content="Legal agreements and terms of use for the Veritas AI platform." />;
export const CookiesPage = () => <GenericPage title="Cookie Policy" content="Information on how we use cookies to improve your experience on our platform." />;
