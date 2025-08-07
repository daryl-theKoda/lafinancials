import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";
export function FinancialInfoStep() {
  const form = useFormContext();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="grossSalary" render={({ field }) => (
        <FormItem>
          <FormLabel>Gross Monthly Salary (before deductions) *</FormLabel>
          <FormControl><Input type="number" min={0} step="0.01" placeholder="$0.00" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="netSalary" render={({ field }) => (
        <FormItem>
          <FormLabel>Net Monthly Salary (take-home pay) *</FormLabel>
          <FormControl><Input type="number" min={0} step="0.01" placeholder="$0.00" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="otherIncome" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Other Sources of Monthly Income (if any)</FormLabel>
          <FormControl><Input placeholder="Describe other income sources" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="householdExpenses" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Total Monthly Household Expenses *</FormLabel>
          <FormControl><Input type="number" min={0} step="0.01" placeholder="$0.00" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      {/* Existing Loan/Debt Obligations */}
      <div className="md:col-span-2">
        <FormLabel>Existing Loan/Debt Obligations</FormLabel>
        {/* Render dynamic fields for debts if needed */}
        {/* This can be enhanced to allow adding/removing multiple debts */}
        <FormField control={form.control} name="debts.0.lender" render={({ field }) => (
          <FormItem>
            <FormLabel>Lender</FormLabel>
            <FormControl><Input placeholder="Lender name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="debts.0.monthlyRepayment" render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Repayment</FormLabel>
            <FormControl><Input type="number" min={0} step="0.01" placeholder="$0.00" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="debts.1.lender" render={({ field }) => (
          <FormItem>
            <FormLabel>Lender</FormLabel>
            <FormControl><Input placeholder="Lender name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="debts.1.monthlyRepayment" render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Repayment</FormLabel>
            <FormControl><Input type="number" min={0} step="0.01" placeholder="$0.00" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  );
}
