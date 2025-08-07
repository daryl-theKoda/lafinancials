import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";

export const DeclarationsStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Declarations & Consents</h3>
      
      <div className="space-y-6">
        <div className="space-y-4 border rounded-lg p-6">
          <h4 className="font-medium">Legal Declarations</h4>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="declaration1" 
                {...form.register("declarations.legal.agreement1")}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="declaration1">
                  I/We declare that the information provided in this application is true and correct to the best of my/our
                  knowledge and belief. I/We understand that any false or misleading information may result in the rejection
                  of this application or subsequent legal action.
                </Label>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="declaration2" 
                {...form.register("declarations.legal.agreement2")}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="declaration2">
                  I/We authorize the lender to conduct any necessary credit checks, reference checks, and verification of
                  the information provided in this application.
                </Label>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="declaration3" 
                {...form.register("declarations.legal.agreement3")}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="declaration3">
                  I/We understand that the approval of this loan application is subject to the lender's credit policies
                  and procedures, and that submission of this application does not guarantee loan approval.
                </Label>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="declaration4" 
                {...form.register("declarations.legal.agreement4")}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="declaration4">
                  I/We consent to the lender sharing my/our information with credit bureaus and other financial
                  institutions for the purpose of assessing this application and for credit reporting purposes.
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 border rounded-lg p-6">
          <h4 className="font-medium">Data Protection & Privacy</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                We are committed to protecting your personal information. By submitting this application, you agree to our
                collection, use, and disclosure of your personal information in accordance with our Privacy Policy and
                applicable data protection laws.
              </p>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="privacyAgreement" 
                  {...form.register("declarations.privacy.agreement")}
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor="privacyAgreement">
                    I have read and agree to the Privacy Policy and consent to the processing of my personal data as
                    described therein.
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="marketingConsent" className="font-normal">
                Marketing Communications (optional):
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="emailMarketing" 
                    {...form.register("declarations.marketing.email")}
                  />
                  <Label htmlFor="emailMarketing" className="font-normal">
                    I agree to receive marketing communications via email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="smsMarketing" 
                    {...form.register("declarations.marketing.sms")}
                  />
                  <Label htmlFor="smsMarketing" className="font-normal">
                    I agree to receive marketing communications via SMS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="phoneMarketing" 
                    {...form.register("declarations.marketing.phone")}
                  />
                  <Label htmlFor="phoneMarketing" className="font-normal">
                    I agree to receive marketing communications via phone
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 border rounded-lg p-6">
          <h4 className="font-medium">Additional Information</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="howDidYouHear">
                How did you hear about us? <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <select
                id="howDidYouHear"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register("declarations.referralSource")}
              >
                <option value="">Select an option</option>
                <option value="search_engine">Search Engine (Google, Bing, etc.)</option>
                <option value="social_media">Social Media</option>
                <option value="friend_family">Friend or Family</option>
                <option value="email">Email</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
              {form.watch("declarations.referralSource") === "other" && (
                <Input
                  placeholder="Please specify"
                  className="mt-2"
                  {...form.register("declarations.referralSourceOther")}
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">
                Is there anything else you'd like to share with us? <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Textarea
                id="additionalInfo"
                placeholder="Please provide any additional information that might assist with your application..."
                className="min-h-[100px]"
                {...form.register("declarations.additionalInfo")}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 border rounded-lg p-6 bg-muted/30">
          <h4 className="font-medium">Electronic Signature</h4>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              By typing your full name below, you are signing this application electronically. You agree your electronic
              signature is the legal equivalent of your manual signature on this application.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="signature">
                Full Name (as it appears on your ID) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="signature"
                placeholder="Type your full name to sign"
                {...form.register("declarations.signature")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signatureDate">
                Today's Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="signatureDate"
                type="date"
                {...form.register("declarations.signatureDate")}
              />
            </div>
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="signatureAgreement" 
                {...form.register("declarations.signatureAgreement")}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="signatureAgreement">
                  I certify under penalty of perjury that all information provided in this application is true, complete,
                  and accurate to the best of my knowledge.
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
