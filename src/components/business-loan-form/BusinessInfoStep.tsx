import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BusinessInfoStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Business Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="legalBusinessName">Legal Business Name</Label>
          <Input id="legalBusinessName" {...form.register("legalBusinessName")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tradingName">Trading Name (if different)</Label>
          <Input id="tradingName" {...form.register("tradingName")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="registrationNumber">Business Registration Number</Label>
          <Input id="registrationNumber" {...form.register("registrationNumber")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="registrationDate">Date of Registration</Label>
          <Input id="registrationDate" type="date" {...form.register("registrationDate")} />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="businessAddress">Business Physical Address</Label>
          <Input id="businessAddress" {...form.register("businessAddress")} />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="mailingAddress">Mailing Address (if different)</Label>
          <Input id="mailingAddress" {...form.register("mailingAddress")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Business Phone Number</Label>
          <Input id="phoneNumber" type="tel" {...form.register("phoneNumber")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Business Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Business Website (if any)</Label>
          <Input id="website" type="url" {...form.register("website")} />
        </div>
        
        <div className="space-y-2">
          <Label>Business Structure</Label>
          <Select onValueChange={(value) => form.setValue("businessStructure", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business structure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sole">Sole Proprietorship</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="pvt">Private Limited Company</SelectItem>
              <SelectItem value="public">Public Limited Company</SelectItem>
              <SelectItem value="trust">Trust</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {form.watch("businessStructure") === "other" && (
          <div className="space-y-2">
            <Label htmlFor="otherStructure">Please specify</Label>
            <Input id="otherStructure" {...form.register("otherStructure")} />
          </div>
        )}
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="industry">Nature of Business/Industry</Label>
          <Input id="industry" {...form.register("industry")} placeholder="e.g., Retail, Manufacturing, Services" />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="businessDescription">Business Activities Description</Label>
          <textarea
            id="businessDescription"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...form.register("businessDescription")}
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employeeCount">Number of Employees</Label>
          <Input id="employeeCount" type="number" min="0" {...form.register("employeeCount")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tradingStartDate">Trading Start Date</Label>
          <Input id="tradingStartDate" type="date" {...form.register("tradingStartDate")} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tin">Tax Identification Number (TIN)</Label>
          <Input id="tin" {...form.register("tin")} />
        </div>
        
        <div className="space-y-2">
          <Label>VAT Registered?</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="vatYes"
                value="yes"
                {...form.register("vatRegistered")}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <Label htmlFor="vatYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="vatNo"
                value="no"
                {...form.register("vatRegistered")}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <Label htmlFor="vatNo">No</Label>
            </div>
          </div>
        </div>
        
        {form.watch("vatRegistered") === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="vatNumber">VAT Registration Number</Label>
            <Input id="vatNumber" {...form.register("vatNumber")} />
          </div>
        )}
      </div>
    </div>
  );
};
