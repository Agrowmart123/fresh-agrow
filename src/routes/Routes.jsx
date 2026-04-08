import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
const Home = lazy(() => import("../pages/Home"));
const ContactSupport = lazy(() => import("../pages/ContactSupport"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const FAQ = lazy(() => import("../pages/FAQ"));
const Terms = lazy(() => import("../pages/Terms"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AbouT = lazy(() => import("../pages/About"));
const JoinOurTeam = lazy(() => import("../pages/JoinOurTeam"));
const Contact = lazy(() => import("../pages/Contact"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
            Loading...
          </div>
        }
      >
        {" "}
        <Routes>
          {/* PUBLIC ROUTES */}

          <Route path="/" element={<Home />} />

          <Route path="/faq" element={<FAQ />} />

          <Route path="/support" element={<ContactSupport />} />

          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route path="/terms" element={<Terms />} />

          <Route path="/about" element={<AbouT />} />

          <Route path="/careers" element={<JoinOurTeam />} />
          <Route path="/contact" element={<Contact />} />
          

          {/* NOT FOUND */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}
