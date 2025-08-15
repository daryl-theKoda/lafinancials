import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TermsConditionsStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Client Declaration</h3>
        <ScrollArea className="h-48 p-4 border rounded-md text-sm">
          <p className="mb-4">
            I hereby declare that the information provided in this application is true and correct to the best of my knowledge. I understand that any false or misleading information may result in the rejection of my application or legal action.
          </p>
          <p className="mb-4">
            I authorize LA Finance to verify the information provided and to obtain credit reports or other information as necessary to process this application. I understand that a credit check may be performed, which may affect my credit score.
          </p>
          <p>
            I agree to the terms and conditions of the loan, including the interest rate, repayment schedule, and any applicable fees. I understand that late payments may result in additional charges and affect my credit rating.
          </p>
        </ScrollArea>

        <FormField
          control={form.control}
          name="declarationAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I certify that all information provided is true and accurate to the best of my knowledge.
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Voluntary Surrender Form</h3>
        <ScrollArea className="h-48 p-4 border rounded-md text-sm">
          <p className="mb-4">
            In the event of default, I/we hereby authorize LA Finance to take possession of the collateral listed in this application without further notice or legal proceedings. I/we understand that LA Finance may sell the collateral to recover the outstanding loan balance and any associated costs.
          </p>
          <p>
            I/we agree to cooperate fully with LA Finance in the recovery of the collateral and will not interfere with the repossession process. I/we understand that any deficiency balance after the sale of the collateral remains my/our responsibility.
          </p>
        </ScrollArea>

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms of the Voluntary Surrender Form.
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Special Power of Attorney</h3>
        <ScrollArea className="h-48 p-4 border rounded-md text-sm">
          <p className="mb-4">
            I/We hereby appoint LA Finance as my/our true and lawful attorney-in-fact to act in my/our name, place, and stead for the purpose of transferring, assigning, and conveying any collateral described in this application in the event of default.
          </p>
          <p>
            This power of attorney shall be irrevocable and coupled with an interest, and shall remain in full force and effect until all obligations under the loan agreement have been fully satisfied.
          </p>
        </ScrollArea>

        <FormField
          control={form.control}
          name="applicationFeeAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to grant Special Power of Attorney as described above.
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Affidavit</h3>
        <ScrollArea className="h-48 p-4 border rounded-md text-sm">
          <p className="mb-4">
            I, the undersigned, being duly sworn, depose and say that all statements made in this application are true and correct. I understand that any false statements made herein may subject me to criminal penalties under the laws of Zimbabwe.
          </p>
          <p>
            I further declare that I have read and understood all the terms and conditions of this application and the accompanying documents, and I agree to be bound by them.
          </p>
        </ScrollArea>

        <FormField
          control={form.control}
          name="acceptAffidavit"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I certify under penalty of perjury that the information provided is true and correct.
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
