import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ReferencesStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Business References</h3>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-6 space-y-4">
          <h4 className="font-medium">Accountant/Bookkeeper</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountantName">Name</Label>
              <Input id="accountantName" {...form.register("references.accountant.name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountantCompany">Company</Label>
              <Input id="accountantCompany" {...form.register("references.accountant.company")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountantPhone">Phone Number</Label>
              <Input id="accountantPhone" type="tel" {...form.register("references.accountant.phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountantEmail">Email Address</Label>
              <Input id="accountantEmail" type="email" {...form.register("references.accountant.email")} />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <h4 className="font-medium">Trade Reference 1 (Supplier/Customer)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref1Company">Company Name</Label>
              <Input id="ref1Company" {...form.register("references.trade1.company")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref1Contact">Contact Person</Label>
              <Input id="ref1Contact" {...form.register("references.trade1.contact")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref1Phone">Phone Number</Label>
              <Input id="ref1Phone" type="tel" {...form.register("references.trade1.phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref1Email">Email Address</Label>
              <Input id="ref1Email" type="email" {...form.register("references.trade1.email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref1Relationship">Business Relationship</Label>
              <Input id="ref1Relationship" {...form.register("references.trade1.relationship")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref1Duration">Duration of Relationship</Label>
              <Input id="ref1Duration" placeholder="e.g., 2 years" {...form.register("references.trade1.duration")} />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <h4 className="font-medium">Trade Reference 2 (Supplier/Customer)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref2Company">Company Name</Label>
              <Input id="ref2Company" {...form.register("references.trade2.company")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref2Contact">Contact Person</Label>
              <Input id="ref2Contact" {...form.register("references.trade2.contact")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref2Phone">Phone Number</Label>
              <Input id="ref2Phone" type="tel" {...form.register("references.trade2.phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref2Email">Email Address</Label>
              <Input id="ref2Email" type="email" {...form.register("references.trade2.email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref2Relationship">Business Relationship</Label>
              <Input id="ref2Relationship" {...form.register("references.trade2.relationship")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref2Duration">Duration of Relationship</Label>
              <Input id="ref2Duration" placeholder="e.g., 2 years" {...form.register("references.trade2.duration")} />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <h4 className="font-medium">Bank Reference</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input id="bankName" {...form.register("references.bank.name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankBranch">Branch</Label>
              <Input id="bankBranch" {...form.register("references.bank.branch")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankContact">Contact Person</Label>
              <Input id="bankContact" {...form.register("references.bank.contact")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankPhone">Phone Number</Label>
              <Input id="bankPhone" type="tel" {...form.register("references.bank.phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankEmail">Email Address</Label>
              <Input id="bankEmail" type="email" {...form.register("references.bank.email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccountType">Account Type</Label>
              <Input id="bankAccountType" {...form.register("references.bank.accountType")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccountNumber">Account Number</Label>
              <Input id="bankAccountNumber" {...form.register("references.bank.accountNumber")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankYears">Years with Bank</Label>
              <Input id="bankYears" type="number" min="0" {...form.register("references.bank.yearsWithBank")} />
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <h4 className="font-medium">Other References</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="otherRef1Name">Reference 1 Name</Label>
                <Input id="otherRef1Name" {...form.register("references.other1.name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherRef1Phone">Phone Number</Label>
                <Input id="otherRef1Phone" type="tel" {...form.register("references.other1.phone")} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="otherRef1Relationship">Relationship</Label>
                <Input id="otherRef1Relationship" {...form.register("references.other1.relationship")} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="otherRef2Name">Reference 2 Name</Label>
                <Input id="otherRef2Name" {...form.register("references.other2.name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otherRef2Phone">Phone Number</Label>
                <Input id="otherRef2Phone" type="tel" {...form.register("references.other2.phone")} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="otherRef2Relationship">Relationship</Label>
                <Input id="otherRef2Relationship" {...form.register("references.other2.relationship")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
