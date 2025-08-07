import { LoanApplicationForm } from "@/components/ApplicationForm";

import { useNavigate } from "react-router-dom";

const PersonalLoanForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: 16, padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        ← Back to Dashboard
      </button>
      <LoanApplicationForm loanType="personal" />
    </div>
  );
};

export default PersonalLoanForm;
