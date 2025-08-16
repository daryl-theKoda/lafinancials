import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicFormAccess from "./components/PublicFormAccess";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import LoanTypeSelection from "./components/LoanTypeSelection";
import { BusinessLoanForm } from "./components/business-loan-form/BusinessLoanForm";
import PersonalLoanForm from "./components/loan-form/PersonalLoanForm";
import { SalaryLoanForm } from "./components/salary-loan-form";
import Admin from "./pages/Admin";
import Education from "./pages/Education";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/education" element={<Education />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/apply" element={<PublicFormAccess><LoanTypeSelection /></PublicFormAccess>} />
<Route path="/apply/business" element={<PublicFormAccess><BusinessLoanForm /></PublicFormAccess>} />
<Route path="/apply/personal" element={<PublicFormAccess><PersonalLoanForm /></PublicFormAccess>} />
<Route path="/apply/salary" element={<PublicFormAccess><SalaryLoanForm /></PublicFormAccess>} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
