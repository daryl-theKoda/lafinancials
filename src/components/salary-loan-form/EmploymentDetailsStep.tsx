import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function EmploymentDetailsStep({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="employerName" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Employer's Name *</FormLabel>
          <FormControl><Input placeholder="Enter employer's name" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="employerAddress" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Employer's Address *</FormLabel>
          <FormControl><Input placeholder="Enter employer's address" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="department" render={({ field }) => (
        <FormItem>
          <FormLabel>Department/Unit *</FormLabel>
          <FormControl><Input placeholder="Department or Unit" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="employeeNumber" render={({ field }) => (
        <FormItem>
          <FormLabel>Employee Number *</FormLabel>
          <FormControl><Input placeholder="Employee Number" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="jobTitle" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Job Title/Position *</FormLabel>
          <FormControl><Input placeholder="Job Title or Position" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="employmentStartDate" render={({ field }) => (
        <FormItem>
          <FormLabel>Date of Employment (Start Date) *</FormLabel>
          <FormControl><Input type="date" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="employmentStatus" render={({ field }) => (
        <FormItem>
          <FormLabel>Employment Status *</FormLabel>
          <FormControl><Input placeholder="e.g. Permanent, Contract" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="hrName" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>HR/Payroll Contact Name *</FormLabel>
          <FormControl><Input placeholder="HR or Payroll Contact Name" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="hrNumber" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>HR/Payroll Contact Number *</FormLabel>
          <FormControl><Input placeholder="HR or Payroll Contact Number" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}
