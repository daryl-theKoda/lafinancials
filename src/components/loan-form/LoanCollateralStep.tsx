import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign } from "lucide-react";

export function LoanCollateralStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="loanAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount Required (USD) *</FormLabel>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-8"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="loanPurpose"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Purpose of Loan *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe what you need the loan for..."
                  className="min-h-[100px]"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Collateral Details</h3>
        <p className="text-sm text-muted-foreground">
          Please list any collateral you can provide (up to 5 items). Include details like make, model, year, and estimated value.
        </p>

        {[1, 2, 3, 4, 5].map((num) => (
          <FormField
            key={num}
            control={form.control}
            name={`collateral${num}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collateral Item {num}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Collateral item #${num} details`}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
