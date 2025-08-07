import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Mail, Phone, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SuccessStep = ({ applicationNumber }: { applicationNumber: string }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>
        
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Application Submitted Successfully!
        </h2>
        
        <p className="mt-4 text-lg text-muted-foreground">
          Thank you for choosing LA Finance for your business loan needs. We've received your application and it's now being processed.
        </p>
        
        <div className="mt-8 bg-card border rounded-lg p-6 text-left max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Application Details</h3>
            <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <FileText className="h-4 w-4 mr-2" />
              <span>Business Loan</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Application Number</p>
                <p className="font-medium">{applicationNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date Submitted</p>
                <p className="font-medium">{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">What's Next?</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Our team will review your application within 2-3 business days.</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>You'll receive an email confirmation with your application details.</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>We may contact you for additional information if needed.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="px-6 py-3 text-base"
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.print()}
            className="px-6 py-3 text-base"
          >
            Print Confirmation
          </Button>
        </div>
        
        <div className="mt-10 border-t pt-8">
          <h3 className="text-sm font-medium text-muted-foreground">Need Help?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Contact our support team at{' '}
            <a href="mailto:support@lafinance.co.zw" className="text-primary hover:underline">
              support@lafinance.co.zw
            </a>{' '}
            or call us at{' '}
            <a href="tel:+263242700000" className="text-primary hover:underline">
              +263 24 270 0000
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
