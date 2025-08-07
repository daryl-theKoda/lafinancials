import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export const LoanDetailsStep = ({ form }: { form: any }) => {
  const collateralItems = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Loan Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Amount Required</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5">$</span>
            <Input
              id="loanAmount"
              type="number"
              min="0"
              step="0.01"
              className="pl-7"
              {...form.register("loanAmount", { valueAsNumber: true })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loanTerm">Loan Term (months)</Label>
          <Input
            id="loanTerm"
            type="number"
            min="1"
            {...form.register("loanTerm", { valueAsNumber: true })}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Repayment Frequency</Label>
          <div className="space-y-2">
            {["Daily", "Weekly", "Monthly", "Other"].map((freq) => (
              <div key={freq} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`freq-${freq.toLowerCase()}`}
                  value={freq.toLowerCase()}
                  {...form.register("repaymentFrequency")}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <Label htmlFor={`freq-${freq.toLowerCase()}`}>{freq}</Label>
              </div>
            ))}
            {form.watch("repaymentFrequency") === "other" && (
              <Input
                placeholder="Specify frequency"
                className="mt-2"
                {...form.register("customRepaymentFrequency")}
              />
            )}
          </div>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="loanPurpose">Purpose of Loan</Label>
          <Textarea
            id="loanPurpose"
            placeholder="Please describe in detail how you plan to use the loan"
            className="min-h-[100px]"
            {...form.register("loanPurpose")}
          />
        </div>
      </div>
      
      <div className="pt-4">
        <h4 className="font-medium mb-4">Collateral Offered</h4>
        <div className="space-y-4">
          {collateralItems.map((item) => (
            <div key={item} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor={`collateralType${item}`}>
                  {item}. Collateral Type
                </Label>
                <Input
                  id={`collateralType${item}`}
                  placeholder="e.g., Property, Vehicle, Equipment"
                  {...form.register(`collateralItems.${item - 1}.type`)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor={`collateralValue${item}`}>
                  Estimated Value
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id={`collateralValue${item}`}
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-7"
                    placeholder="0.00"
                    {...form.register(`collateralItems.${item - 1}.value`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <div className="md:col-span-5 space-y-2">
                <Label htmlFor={`collateralDescription${item}`}>
                  Description
                </Label>
                <Input
                  id={`collateralDescription${item}`}
                  placeholder="Provide details about the collateral"
                  {...form.register(`collateralItems.${item - 1}.description`)}
                />
              </div>
              {item < collateralItems.length && (
                <div className="md:col-span-5 border-t border-gray-200 my-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4">
        <h4 className="font-medium mb-4">Upload Supporting Documents</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessPlan">Business Plan (if available)</Label>
            <Input
              id="businessPlan"
              type="file"
              accept=".pdf,.doc,.docx"
              {...form.register("businessPlan")}
            />
            <p className="text-sm text-muted-foreground">
              Include financial projections and business strategy (max 10MB)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="collateralDocuments">Collateral Documents</Label>
            <Input
              id="collateralDocuments"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              {...form.register("collateralDocuments")}
            />
            <p className="text-sm text-muted-foreground">
              Upload photos or scanned copies of collateral documents (max 20MB total)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otherDocuments">Other Supporting Documents</Label>
            <Input
              id="otherDocuments"
              type="file"
              multiple
              {...form.register("otherDocuments")}
            />
            <p className="text-sm text-muted-foreground">
              Any other relevant documents (licenses, contracts, etc.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
