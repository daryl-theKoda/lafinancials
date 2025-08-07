import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FinancialInfoStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Business Financial Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="annualTurnover">Annual Turnover (Last Fiscal Year)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="annualTurnover"
              type="number"
              min="0"
              step="0.01"
              className="pl-7"
              {...form.register("annualTurnover", { valueAsNumber: true })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectedTurnover">Projected Annual Turnover (Current Year)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="projectedTurnover"
              type="number"
              min="0"
              step="0.01"
              className="pl-7"
              {...form.register("projectedTurnover", { valueAsNumber: true })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="grossProfit">Gross Profit (Last Fiscal Year)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="grossProfit"
              type="number"
              min="0"
              step="0.01"
              className="pl-7"
              {...form.register("grossProfit", { valueAsNumber: true })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="netProfit">Net Profit (Last Fiscal Year)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="netProfit"
              type="number"
              min="0"
              step="0.01"
              className="pl-7"
              {...form.register("netProfit", { valueAsNumber: true })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name (Primary Account)</Label>
          <Input id="bankName" {...form.register("bankName")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Business Account Number</Label>
          <Input id="accountNumber" {...form.register("accountNumber")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="averageBalance">Average Monthly Balance (Last 6 months)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="averageBalance"
              type="number"
              min="0"
              step="0.01"
              className="pl-7"
              {...form.register("averageBalance", { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <h4 className="font-medium">Upload Financial Documents</h4>
        
        <div className="space-y-2">
          <Label htmlFor="financialStatements">Latest Financial Statements</Label>
          <Input
            id="financialStatements"
            type="file"
            accept=".pdf,.doc,.docx"
            {...form.register("financialStatements")}
          />
          <p className="text-sm text-muted-foreground">Upload PDF or Word documents (max 5MB)</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bankStatements">Latest 6 Months Bank Statements</Label>
          <Input
            id="bankStatements"
            type="file"
            accept=".pdf,.doc,.docx"
            {...form.register("bankStatements")}
          />
          <p className="text-sm text-muted-foreground">Upload PDF or Word documents (max 10MB)</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="taxReturns">Latest Tax Returns</Label>
          <Input
            id="taxReturns"
            type="file"
            accept=".pdf,.doc,.docx"
            {...form.register("taxReturns")}
          />
          <p className="text-sm text-muted-foreground">Upload PDF or Word documents (max 5MB)</p>
        </div>
      </div>
    </div>
  );
};
