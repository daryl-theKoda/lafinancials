import { LoanApplicationForm } from "@/components/ApplicationForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PersonalLoanForm = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-finance-gray hover:text-finance-blue"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
      <LoanApplicationForm loanType="personal" />
    </div>
  );
};

export default PersonalLoanForm;
