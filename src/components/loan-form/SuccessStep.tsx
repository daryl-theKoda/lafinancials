import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessStep({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="text-center py-10">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-green-600 mb-2">Application Submitted Successfully!</h2>
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Thank you for your loan application. We've received your information and our team will review it shortly. 
        You'll receive a confirmation email with further instructions.
      </p>
      
      <div className="space-y-4 max-w-sm mx-auto">
        <p className="text-sm text-muted-foreground">
          Your application ID: <span className="font-mono font-medium">LA-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
        </p>
        
        <Button onClick={onComplete} className="w-full">
          Start New Application
        </Button>
        
        <p className="text-xs text-muted-foreground mt-6">
          Need help? Contact our support team at support@lafinance.co.zw or call +263 242 700 000
        </p>
      </div>
    </div>
  );
}
