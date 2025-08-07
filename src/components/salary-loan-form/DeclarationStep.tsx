import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

export function DeclarationStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <FormField control={form.control} name="declarationAccepted" render={({ field }) => (
        <FormItem>
          <FormLabel>Client Declaration *</FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="guaranteeAccepted" render={({ field }) => (
        <FormItem>
          <FormLabel>Guarantor Form *</FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="voluntarySurrenderAccepted" render={({ field }) => (
        <FormItem>
          <FormLabel>Voluntary Surrender Form *</FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="powerOfAttorneyAccepted" render={({ field }) => (
        <FormItem>
          <FormLabel>Special Power of Attorney *</FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="affidavitAccepted" render={({ field }) => (
        <FormItem>
          <FormLabel>Affidavit *</FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="agreementAccepted" render={({ field }) => (
        <FormItem>
          <FormLabel>Agreement of Sale *</FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}
