import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import PublicSchedulePage from "./pages/PublicSchedulePage";
import PublicHomePage from "./pages/PublicHomePage";
import PublicFacilityPage from "./pages/PublicFacilityPage";
import PublicClassesPage from "./pages/PublicClassesPage";
import PublicMembershipsPage from "./pages/PublicMembershipsPage";
import PublicTrainingPage from "./pages/PublicTrainingPage";
import PublicPrivacyTermsPage from "./pages/PublicPrivacyTermsPage";
import NotFound from "./pages/NotFound";
import PublicLayout from "./components/layout/PublicLayout";

function AppRoutes() {
  const PublicShell = () => (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
  
  return (
    <Routes>
      <Route element={<PublicShell />}>
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/locations" element={<PublicFacilityPage />} />
        <Route path="/facility" element={<Navigate to="/locations" replace />} />
        <Route path="/our-story" element={<Navigate to="/locations" replace />} />
        <Route path="/classes" element={<PublicClassesPage />} />
        <Route path="/training" element={<PublicTrainingPage />} />
        <Route path="/memberships" element={<PublicMembershipsPage />} />
        <Route path="/schedule" element={<PublicSchedulePage />} />
        <Route path="/privacy-terms" element={<PublicPrivacyTermsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <BrowserRouter>
    <AppRoutes />
    <Analytics />
  </BrowserRouter>
);

export default App;
