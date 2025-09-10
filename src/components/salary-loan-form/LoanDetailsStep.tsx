import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
export function LoanDetailsStep() {
  const form = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField control={form.control} name="currency" render={({ field }) => (
        <FormItem>
          <FormLabel>Currency *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="ZiG">ZiG (ZiG)</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="loanAmount" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Loan Amount Required *</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={1}
              step="0.01"
              placeholder="0.00"
              {...field}
              value={field.value === undefined || Number.isNaN(field.value) ? '' : field.value}
              onChange={(e) => field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="loanPurpose" render={({ field }) => (
        <FormItem className="md:col-span-3">
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
