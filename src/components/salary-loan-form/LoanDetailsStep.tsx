import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LoanDetailsStep({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="loanAmount" render={({ field }) => (
        <FormItem>
          <FormLabel>Loan Amount Required *</FormLabel>
          <FormControl><Input type="number" min={1} step="0.01" placeholder="$0.00" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="loanPurpose" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Loan Purpose *</FormLabel>
          <FormControl><Input placeholder="Describe the purpose of the loan" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="repaymentPeriod" render={({ field }) => (
        <FormItem>
          <FormLabel>Preferred Repayment Period *</FormLabel>
          <FormControl><Input placeholder="e.g. 3 months, 6 months" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="repaymentFrequency" render={({ field }) => (
        <FormItem>
          <FormLabel>Preferred Repayment Frequency *</FormLabel>
          <FormControl><Input placeholder="e.g. Monthly, Bi-weekly" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}
