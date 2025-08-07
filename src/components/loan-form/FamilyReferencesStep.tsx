import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function FamilyReferencesStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Spouse Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="spouseFullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Spouse's full name" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spouseNationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National ID Number</FormLabel>
                <FormControl>
                  <Input placeholder="Spouse's national ID" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spouseAddress"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Residential Address</FormLabel>
                <FormControl>
                  <Input placeholder="Spouse's residential address" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="spouseCellNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cell Number</FormLabel>
                <FormControl>
                  <Input placeholder="Spouse's cell number" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div>
        <h3 className="text-lg font-medium mb-4">Next of Kin (Other Than Spouse)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nextOfKinName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Next of kin's full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextOfKinRelationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Brother, Sister, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextOfKinAddress"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Residential Address *</FormLabel>
                <FormControl>
                  <Input placeholder="Next of kin's full address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextOfKinCell"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cell Number *</FormLabel>
                <FormControl>
                  <Input placeholder="Next of kin's cell number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nextOfKinId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National ID Number *</FormLabel>
                <FormControl>
                  <Input placeholder="Next of kin's national ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
