import React from 'react';
import { MarkdownPage } from '../components/MarkdownPage';

export function IntegrationsPage() {
  return (
    <MarkdownPage 
      title="LMS & Campus Systems Integration" 
      subtitle="Integrating Authentraceio AI securely into your existing digital learning ecosystem using open standards."
    >
      <h3>IMS Global LTI 1.3 Advantage Certification</h3>
      <p>
        Authentraceio AI is fully certified under the IMS Global LTI (Learning Tools Interoperability) 1.3 and LTI Advantage standards. This guarantees the highest level of security, deep linking capabilities, and seamless data exchange between our analysis platform and your Learning Management System (LMS).
      </p>
      <p>
        By utilizing LTI Advantage, Authentraceio AI eliminates the need for separate accounts, enabling Single Sign-On (SSO) and automatic Gradebook synchronization using OAuth 2.0 and JSON Web Tokens (JWT) for secure message signing.
      </p>

      <h3 style={{ marginTop: '32px' }}>LMS Integration Specs</h3>
      
      <h4>1. Canvas by Instructure Integration</h4>
      <p>
        Authentraceio AI integrates directly into Canvas's assignment creation and SpeedGrader interfaces.
      </p>
      <ul>
        <li><strong>Automated Submission Scanning:</strong> As soon as a student uploads a document to a Canvas assignment, the Authentraceio AI LTI launch service triggers an asynchronous analysis.</li>
        <li><strong>SpeedGrader Extensions:</strong> Authentraceio AI injects an interactive styling panel directly into SpeedGrader. Professors can view stylometric shift graphs, confidence scores, and citation verification cards without leaving the grading window.</li>
        <li><strong>Canvas Roster Sync:</strong> Dynamic roster syncing automatically maps Canvas Student and Teacher roles to Authentraceio AI permissions.</li>
      </ul>

      <h4>2. Blackboard Learn (Ultra & Original) Integration</h4>
      <p>
        Our Blackboard integration supports the Blackboard REST API alongside LTI Advantage.
      </p>
      <ul>
        <li><strong>Ultra Extension:</strong> Full support for the Blackboard Ultra Course View, displaying Authentraceio AI highlights directly inside the grading side-panels.</li>
        <li><strong>Delegated Grading Support:</strong> Integrity logs and flag queues are distributed correctly to designated TAs and secondary graders.</li>
      </ul>

      <h4>3. D2L Brightspace Integration</h4>
      <p>
        Integrating with Brightspace's Dropbox and Grade Book systems.
      </p>
      <ul>
        <li><strong>Brightspace IPSIS Sync:</strong> Automatically links student baselines across multi-section courses and historical course iterations.</li>
      </ul>

      <h3 style={{ marginTop: '32px' }}>Student Information System (SIS) Integrations</h3>
      <p>
        For enterprise deployments, Authentraceio AI syncs with Student Information Systems (such as Banner, Colleague, PeopleSoft, and Workday Student) via secure REST APIs or nightly SFTP data transfers. This enables:
      </p>
      <ul>
        <li>Automatic student enrollment updates and class roster alignment.</li>
        <li>Aggregated integrity case reporting mapped to student demographic data for equity audits.</li>
        <li>Transfer student history syncing, allowing stylometric baselines to persist across institutional transitions.</li>
      </ul>

      <h3 style={{ marginTop: '32px' }}>Security & Deployment Timeline</h3>
      <p>
        A standard Canvas or Blackboard integration takes less than 48 hours to configure in a staging environment. Authentraceio AI engineers provide comprehensive IT playbooks and live support to walk your LMS administrators through the registration, developer key generation, and deployment process.
      </p>
    </MarkdownPage>
  );
}
