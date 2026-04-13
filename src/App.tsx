import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicFormAccess from "./components/PublicFormAccess";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const Education = lazy(() => import("./pages/Education"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load components
const LoanTypeSelection = lazy(() => import("./components/LoanTypeSelection"));
const BusinessLoanForm = lazy(() => import("./components/business-loan-form/BusinessLoanForm").then(module => ({ default: module.BusinessLoanForm })));
const PersonalLoanForm = lazy(() => import("./components/loan-form/PersonalLoanForm"));
const SalaryLoanForm = lazy(() => import("./components/salary-loan-form").then(module => ({ default: module.SalaryLoanForm })));

// Lazy load heavy components
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Values = lazy(() => import("./components/Values"));
const Partners = lazy(() => import("./components/Partners"));
const Documentation = lazy(() => import("./components/Documentation"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Index />
              </Suspense>
            } />
            <Route path="/auth" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Auth />
              </Suspense>
            } />
            <Route path="/education" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Education />
              </Suspense>
            } />
            <Route path="/faq" element={
              <Suspense fallback={<LoadingSpinner />}>
                <FAQ />
              </Suspense>
            } />
            <Route path="/apply" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PublicFormAccess>
                  <LoanTypeSelection />
                </PublicFormAccess>
              </Suspense>
            } />
            <Route path="/apply/business" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PublicFormAccess>
                  <BusinessLoanForm />
                </PublicFormAccess>
              </Suspense>
            } />
            <Route path="/apply/personal" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PublicFormAccess>
                  <PersonalLoanForm />
                </PublicFormAccess>
              </Suspense>
            } />
            <Route path="/apply/salary" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PublicFormAccess>
                  <SalaryLoanForm />
                </PublicFormAccess>
              </Suspense>
            } />
            <Route path="/dashboard" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/admin" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              </Suspense>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={
              <Suspense fallback={<LoadingSpinner />}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
