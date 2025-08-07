import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PersonalInfoStep({ form }: { form: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="fullName" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Full Name *</FormLabel>
          <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="nationalId" render={({ field }) => (
        <FormItem>
          <FormLabel>National Identity Number *</FormLabel>
          <FormControl><Input placeholder="Enter your ID number" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
        <FormItem>
          <FormLabel>Date of Birth *</FormLabel>
          <FormControl><Input type="date" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="gender" render={({ field }) => (
        <FormItem>
          <FormLabel>Gender *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="residentialAddress" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Residential Address *</FormLabel>
          <FormControl><Input placeholder="Enter your address" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="email" render={({ field }) => (
        <FormItem>
          <FormLabel>Email Address *</FormLabel>
          <FormControl><Input type="email" placeholder="Enter your email" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="cellNumber" render={({ field }) => (
        <FormItem>
          <FormLabel>Cell Number *</FormLabel>
          <FormControl><Input placeholder="Enter your cell number" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="maritalStatus" render={({ field }) => (
        <FormItem>
          <FormLabel>Marital Status *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="dependents" render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Dependents *</FormLabel>
          <FormControl><Input type="number" min={0} placeholder="0" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="educationLevel" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Highest Educational Level *</FormLabel>
          <FormControl><Input placeholder="e.g. Degree, Diploma, O Level" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}
