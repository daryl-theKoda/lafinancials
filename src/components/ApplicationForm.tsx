import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { FileText, User, DollarSign } from "lucide-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    loanType: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    employmentStatus: '',
    employerName: '',
    income: '',
    loanAmount: '',
    businessName: '',
    businessDescription: '',
    studentName: '',
    schoolName: '',
    farmSize: '',
    cropType: '',
    emergencyType: '',
    emergencyDescription: ''
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.loanType || !formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // TODO: This will be integrated with Supabase backend
    console.log('Form submitted:', formData);
    toast.success("Application submitted successfully! We'll review your application and contact you soon.");
    
    // Reset form
    setFormData({
      loanType: '',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      employmentStatus: '',
      employerName: '',
      income: '',
      loanAmount: '',
      businessName: '',
      businessDescription: '',
      studentName: '',
      schoolName: '',
      farmSize: '',
      cropType: '',
      emergencyType: '',
      emergencyDescription: ''
    });
  };

  const renderLoanSpecificFields = () => {
    switch (formData.loanType) {
      case 'business':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business name"
                required
              />
            </div>
            <div>
              <Label htmlFor="businessDescription">Business Description *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder="Describe your business and how you plan to use the loan"
                rows={4}
                required
              />
            </div>
          </div>
        );
      
      case 'educational':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="studentName">Student's Full Name *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                placeholder="Student's full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="schoolName">School/Institution Name *</Label>
              <Input
                id="schoolName"
                value={formData.schoolName}
                onChange={(e) => handleInputChange('schoolName', e.target.value)}
                placeholder="Name of educational institution"
                required
              />
            </div>
          </div>
        );
      
      case 'agricultural':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="farmSize">Farm Size (Hectares) *</Label>
              <Input
                id="farmSize"
                value={formData.farmSize}
                onChange={(e) => handleInputChange('farmSize', e.target.value)}
                placeholder="Size of your farm in hectares"
                required
              />
            </div>
            <div>
              <Label htmlFor="cropType">Primary Crop/Livestock *</Label>
              <Input
                id="cropType"
                value={formData.cropType}
                onChange={(e) => handleInputChange('cropType', e.target.value)}
                placeholder="Main crops or livestock"
                required
              />
            </div>
          </div>
        );
      
      case 'emergency':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="emergencyType">Emergency Type *</Label>
              <Select value={formData.emergencyType} onValueChange={(value) => handleInputChange('emergencyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select emergency type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="funeral">Funeral Expenses</SelectItem>
                  <SelectItem value="vehicle">Vehicle Repair</SelectItem>
                  <SelectItem value="home">Home Emergency Repair</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="emergencyDescription">Emergency Description *</Label>
              <Textarea
                id="emergencyDescription"
                value={formData.emergencyDescription}
                onChange={(e) => handleInputChange('emergencyDescription', e.target.value)}
                placeholder="Please describe the emergency situation"
                rows={4}
                required
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="apply" className="py-20 bg-gradient-to-br from-finance-light to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-navy mb-4">
            Apply for a Loan
          </h2>
          <p className="text-lg text-finance-gray max-w-3xl mx-auto">
            Take the first step towards achieving your financial goals. Complete our application form 
            and our team will review your application promptly.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-large">
          <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center">
              <FileText className="mr-3" />
              Loan Application Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Loan Type Selection */}
              <div>
                <Label htmlFor="loanType" className="text-lg font-semibold text-finance-navy mb-3 block">
                  Select Loan Type *
                </Label>
                <Select value={formData.loanType} onValueChange={(value) => handleInputChange('loanType', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose your loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consumption">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Consumption Loan (Salary-Based)
                      </div>
                    </SelectItem>
                    <SelectItem value="business">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Business Loan
                      </div>
                    </SelectItem>
                    <SelectItem value="educational">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Educational Loan
                      </div>
                    </SelectItem>
                    <SelectItem value="agricultural">Agricultural Loan</SelectItem>
                    <SelectItem value="emergency">Emergency Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Loan-specific fields */}
              {formData.loanType && (
                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-finance-navy mb-6">
                    {formData.loanType.charAt(0).toUpperCase() + formData.loanType.slice(1)} Loan Details
                  </h3>
                  {renderLoanSpecificFields()}
                </div>
              )}

              {/* Personal Information */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-finance-navy mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+263 XXX XXX XXX"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Residential Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Your full address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold text-finance-navy mb-6">Employment & Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="employmentStatus">Employment Status *</Label>
                    <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="business-owner">Business Owner</SelectItem>
                        <SelectItem value="farmer">Farmer</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'self-employed') && (
                    <div>
                      <Label htmlFor="employerName">Employer/Business Name</Label>
                      <Input
                        id="employerName"
                        value={formData.employerName}
                        onChange={(e) => handleInputChange('employerName', e.target.value)}
                        placeholder="Name of employer or business"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="income">Monthly Income (ZWL) *</Label>
                    <Input
                      id="income"
                      type="number"
                      value={formData.income}
                      onChange={(e) => handleInputChange('income', e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanAmount">Desired Loan Amount (ZWL) *</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={formData.loanAmount}
                      onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-8 text-center">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="xl"
                  className="w-full md:w-auto"
                >
                  Submit Application
                </Button>
                <p className="mt-4 text-sm text-finance-gray">
                  By submitting this application, you agree to our terms and conditions. 
                  Our team will review your application and contact you within 2-3 business days.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ApplicationForm;