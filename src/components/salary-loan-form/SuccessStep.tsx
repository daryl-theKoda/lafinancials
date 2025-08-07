import { Button } from "@/components/ui/button";

export function SuccessStep({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="text-center py-10">
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-green-100 p-3">
          <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-green-600 mb-2">Application Submitted Successfully!</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Thank you for your salary-based loan application. We've received your information and our team will review it shortly.
      </p>
      <Button onClick={onComplete} className="w-full max-w-xs mx-auto">Start New Application</Button>
      <p className="text-xs text-muted-foreground mt-6">
        Need help? Contact our support team at support@lafinance.co.zw or call +263 242 700 000
      </p>
    </div>
  );
}
