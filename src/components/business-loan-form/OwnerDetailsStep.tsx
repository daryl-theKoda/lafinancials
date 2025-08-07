import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Owner = {
  id: number;
  fullName: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  residentialAddress: string;
  email: string;
  phoneNumber: string;
  maritalStatus: string;
  position: string;
  ownershipPercentage: number;
  bankName: string;
  accountNumber: string;
  averageMonthlyBalance: number;
  spouseName: string;
  spouseIdNumber: string;
  spousePhoneNumber: string;
  nextOfKinName: string;
  nextOfKinRelationship: string;
  nextOfKinAddress: string;
  nextOfKinPhone: string;
  nextOfKinIdNumber: string;
};

type OwnerDetailsStepProps = {
  form: any;
  ownerIndex: number;
  onAddOwner?: () => void;
  onRemoveOwner?: (index: number) => void;
  isLastOwner: boolean;
};

export const OwnerDetailsStep = ({
  form,
  ownerIndex,
  onAddOwner,
  onRemoveOwner,
  isLastOwner,
}: OwnerDetailsStepProps) => {
  const owner = form.watch(`owners.${ownerIndex}`) as Owner;
  
  return (
    <div className="space-y-6 border rounded-lg p-6 bg-card">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {ownerIndex === 0 ? 'Primary Owner/Director' : `Additional Owner/Director ${ownerIndex + 1}`}
        </h3>
        {ownerIndex > 0 && (
          <button
            type="button"
            onClick={() => onRemoveOwner?.(ownerIndex)}
            className="text-sm text-destructive hover:underline"
          >
            Remove Owner
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`owner-fullName-${ownerIndex}`}>
            Full Name {ownerIndex === 0 && <span className="text-destructive">*</span>}
          </Label>
          <Input
            id={`owner-fullName-${ownerIndex}`}
            {...form.register(`owners.${ownerIndex}.fullName`)}
            required={ownerIndex === 0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`owner-idNumber-${ownerIndex}`}>
            National ID/Passport {ownerIndex === 0 && <span className="text-destructive">*</span>}
          </Label>
          <Input
            id={`owner-idNumber-${ownerIndex}`}
            {...form.register(`owners.${ownerIndex}.idNumber`)}
            required={ownerIndex === 0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`owner-dateOfBirth-${ownerIndex}`}>
            Date of Birth {ownerIndex === 0 && <span className="text-destructive">*</span>}
          </Label>
          <Input
            id={`owner-dateOfBirth-${ownerIndex}`}
            type="date"
            {...form.register(`owners.${ownerIndex}.dateOfBirth`)}
            required={ownerIndex === 0}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Gender {ownerIndex === 0 && <span className="text-destructive">*</span>}</Label>
          <Select
            onValueChange={(value) =>
              form.setValue(`owners.${ownerIndex}.gender`, value)
            }
            value={owner?.gender || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`owner-address-${ownerIndex}`}>
            Residential Address {ownerIndex === 0 && <span className="text-destructive">*</span>}
          </Label>
          <Textarea
            id={`owner-address-${ownerIndex}`}
            {...form.register(`owners.${ownerIndex}.residentialAddress`)}
            required={ownerIndex === 0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`owner-email-${ownerIndex}`}>
            Email Address {ownerIndex === 0 && <span className="text-destructive">*</span>}
          </Label>
          <Input
            id={`owner-email-${ownerIndex}`}
            type="email"
            {...form.register(`owners.${ownerIndex}.email`)}
            required={ownerIndex === 0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`owner-phone-${ownerIndex}`}>
            Phone Number {ownerIndex === 0 && <span className="text-destructive">*</span>}
          </Label>
          <Input
            id={`owner-phone-${ownerIndex}`}
            type="tel"
            {...form.register(`owners.${ownerIndex}.phoneNumber`)}
            required={ownerIndex === 0}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Marital Status</Label>
          <Select
            onValueChange={(value) =>
              form.setValue(`owners.${ownerIndex}.maritalStatus`, value)
            }
            value={owner?.maritalStatus || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="separated">Separated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`owner-position-${ownerIndex}`}>Position/Title</Label>
          <Input
            id={`owner-position-${ownerIndex}`}
            {...form.register(`owners.${ownerIndex}.position`)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`owner-ownership-${ownerIndex}`}>
            Ownership % {ownerIndex === 0 && <span className="text-destructive">*</span>}
          </Label>
          <div className="relative">
            <Input
              id={`owner-ownership-${ownerIndex}`}
              type="number"
              min="0"
              max="100"
              step="0.01"
              {...form.register(`owners.${ownerIndex}.ownershipPercentage`, {
                valueAsNumber: true,
              })}
              required={ownerIndex === 0}
            />
            <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-4">Banking Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`owner-bankName-${ownerIndex}`}>
              Bank Name {ownerIndex === 0 && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={`owner-bankName-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.bankName`)}
              required={ownerIndex === 0}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`owner-accountNumber-${ownerIndex}`}>
              Account Number {ownerIndex === 0 && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={`owner-accountNumber-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.accountNumber`)}
              required={ownerIndex === 0}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`owner-avgBalance-${ownerIndex}`}>
              Avg. Monthly Balance (Last 6 months)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id={`owner-avgBalance-${ownerIndex}`}
                type="number"
                min="0"
                step="0.01"
                className="pl-7"
                {...form.register(`owners.${ownerIndex}.averageMonthlyBalance`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-4">Spouse Information (if applicable)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`owner-spouseName-${ownerIndex}`}>Spouse Full Name</Label>
            <Input
              id={`owner-spouseName-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.spouseName`)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`owner-spouseId-${ownerIndex}`}>Spouse ID Number</Label>
            <Input
              id={`owner-spouseId-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.spouseIdNumber`)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`owner-spousePhone-${ownerIndex}`}>Spouse Phone Number</Label>
            <Input
              id={`owner-spousePhone-${ownerIndex}`}
              type="tel"
              {...form.register(`owners.${ownerIndex}.spousePhoneNumber`)}
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-4">Next of Kin (Other Than Spouse)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`owner-nokName-${ownerIndex}`}>
              Full Name {ownerIndex === 0 && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={`owner-nokName-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.nextOfKinName`)}
              required={ownerIndex === 0}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`owner-nokRelationship-${ownerIndex}`}>
              Relationship {ownerIndex === 0 && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={`owner-nokRelationship-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.nextOfKinRelationship`)}
              required={ownerIndex === 0}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`owner-nokPhone-${ownerIndex}`}>
              Phone Number {ownerIndex === 0 && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={`owner-nokPhone-${ownerIndex}`}
              type="tel"
              {...form.register(`owners.${ownerIndex}.nextOfKinPhone`)}
              required={ownerIndex === 0}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`owner-nokId-${ownerIndex}`}>
              ID Number {ownerIndex === 0 && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={`owner-nokId-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.nextOfKinIdNumber`)}
              required={ownerIndex === 0}
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor={`owner-nokAddress-${ownerIndex}`}>
              Residential Address {ownerIndex === 0 && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id={`owner-nokAddress-${ownerIndex}`}
              {...form.register(`owners.${ownerIndex}.nextOfKinAddress`)}
              required={ownerIndex === 0}
            />
          </div>
        </div>
      </div>
      
      {isLastOwner && onAddOwner && (
        <div className="pt-4">
          <button
            type="button"
            onClick={onAddOwner}
            className="text-sm text-primary hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Another Owner/Director
          </button>
        </div>
      )}
    </div>
  );
};
