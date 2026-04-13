import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

const LoanTypeSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-finance-gray hover:text-finance-blue"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Button>
      
      <h2 className="text-2xl font-bold text-center mb-8">Apply for a Loan</h2>
      <div className="flex flex-col gap-6">
        <Button
          className="w-full py-6 text-lg"
          variant="finance"
          onClick={() => navigate('/apply/personal')}
        >
          Personal Loan Application
        </Button>
        <Button
          className="w-full py-6 text-lg"
          variant="secondary"
          onClick={() => navigate('/apply/business')}
        >
          Business Loan Application
        </Button>
        <Button
          className="w-full py-6 text-lg"
          variant="outline"
          onClick={() => navigate('/apply/salary')}
        >
          Salary-Based Loan Application
        </Button>
      </div>
    </div>
  );
};

export default LoanTypeSelection;
