import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import { ThemeProvider } from './components/ThemeProvider';
import { ProfessorDashboard } from './pages/ProfessorDashboard';
import { ProfessorSubmissions } from './pages/ProfessorSubmissions';
import { ProfessorStudents } from './pages/ProfessorStudents';
import { ProfessorFlags } from './pages/ProfessorFlags';
import { StudentPortal } from './pages/StudentPortal';
import { StudentDisclosures } from './pages/StudentDisclosures';
import { AdminPortal } from './pages/AdminPortal';
import { AdminCases } from './pages/AdminCases';
import { AdminFaculty } from './pages/AdminFaculty';
import {
  EvidenceEnginePage, SecurityPage, PedagogicalGuidesPage, IntegrationsPage,
  DocumentationPage, APIReferencePage, CaseStudiesPage, BlogPage, AboutUsPage,
  CareersPage, ContactPage, PartnersPage, PrivacyPage, TermsPage, CookiesPage
} from './pages/PublicPages';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Public Pages */}
          <Route path="/evidence-engine" element={<EvidenceEnginePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/pedagogical-guides" element={<PedagogicalGuidesPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/api" element={<APIReferencePage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          
          {/* Dashboards */}
          <Route path="/dashboard/professor" element={<ProfessorDashboard />} />
          <Route path="/dashboard/professor/submissions" element={<ProfessorSubmissions />} />
          <Route path="/dashboard/professor/students" element={<ProfessorStudents />} />
          <Route path="/dashboard/professor/flags" element={<ProfessorFlags />} />
          
          <Route path="/dashboard/student" element={<StudentPortal />} />
          <Route path="/dashboard/student/disclosures" element={<StudentDisclosures />} />
          
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/cases" element={<AdminCases />} />
          <Route path="/admin/faculty" element={<AdminFaculty />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
