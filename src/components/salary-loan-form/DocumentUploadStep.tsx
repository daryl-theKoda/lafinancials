import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";
export function DocumentUploadStep() {
  const form = useFormContext();
  return (
    <div className="space-y-6">
      <FormField control={form.control} name="idCopy" render={({ field }) => (
        <FormItem>
          <FormLabel>Certified Copy of National ID *</FormLabel>
          <FormControl>
            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => field.onChange(e.target.files)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="proofOfResidence" render={({ field }) => (
        <FormItem>
          <FormLabel>Proof of Residence *</FormLabel>
          <FormControl>
            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => field.onChange(e.target.files)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="payslip" render={({ field }) => (
        <FormItem>
          <FormLabel>Most Recent Payslip (not more than 3 months old) *</FormLabel>
          <FormControl>
            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => field.onChange(e.target.files)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="bankStatements" render={({ field }) => (
        <FormItem>
          <FormLabel>Stamped Bank Statements (last 3 months) *</FormLabel>
          <FormControl>
            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={e => field.onChange(e.target.files)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="employerLetter" render={({ field }) => (
        <FormItem>
          <FormLabel>Letter from Employer (if required)</FormLabel>
          <FormControl>
            <Input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => field.onChange(e.target.files)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="photos" render={({ field }) => (
        <FormItem>
          <FormLabel>Two Passport-sized Photos *</FormLabel>
          <FormControl>
            <Input type="file" accept=".jpg,.jpeg,.png" multiple onChange={e => field.onChange(e.target.files)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}
