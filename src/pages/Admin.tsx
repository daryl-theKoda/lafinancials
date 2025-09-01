import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  FileText, 
  LogOut, 
  Eye, 
  Edit,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  ArrowLeft,
  Shield
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Link } from "react-router-dom";
import AdminManagement from "@/components/AdminManagement";
import { useAuth } from "@/contexts/AuthContext";

interface LoanApplication {
  id: string;
  loan_type: string;
  loan_amount: number;
  status: string;
  submitted_at: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  employment_status: string;
  monthly_income: number;
  admin_notes?: string;
}

interface BusinessLoanApplication {
  id: string;
  legal_business_name: string;
  business_email: string;
  business_phone: string;
  business_sector: string;
  annual_turnover: number;
  loan_amount: number;
  loan_purpose: string;
  status: string;
  submitted_at: string;
  user_id: string;
}

const Admin = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [businessApplications, setBusinessApplications] = useState<BusinessLoanApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [selectedBusinessApplication, setSelectedBusinessApplication] = useState<BusinessLoanApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user || !isAdmin) {
        navigate("/auth");
        return;
      }
      
      await fetchApplications();
    };

    checkAccess();
  }, [user, isAdmin, navigate]);

  const fetchApplications = async () => {
    try {
      // Fetch personal loan applications
      let personalQuery = supabase
        .from('loan_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (filterStatus !== "all") {
        personalQuery = personalQuery.eq('status', filterStatus);
      }

      // Fetch business loan applications
      let businessQuery = supabase
        .from('business_loan_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (filterStatus !== "all") {
        businessQuery = businessQuery.eq('status', filterStatus);
      }

      const [personalResult, businessResult] = await Promise.all([
        personalQuery,
        businessQuery
      ]);

      if (personalResult.error) {
        toast.error("Failed to fetch personal loan applications");
        console.error(personalResult.error);
      } else {
        setApplications(personalResult.data || []);
      }

      if (businessResult.error) {
        toast.error("Failed to fetch business loan applications");
        console.error(businessResult.error);
      } else {
        setBusinessApplications(businessResult.data || []);
      }
    } catch (error) {
      toast.error("An error occurred while fetching applications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if ((!selectedApplication && !selectedBusinessApplication) || !statusUpdate) {
      toast.error("Please select a status");
      return;
    }

    try {
      let error;
      
      if (selectedApplication) {
        const { error: personalError } = await supabase
          .from('loan_applications')
          .update({
            status: statusUpdate,
            admin_notes: adminNotes,
            reviewed_at: new Date().toISOString()
          })
          .eq('id', selectedApplication.id);
        error = personalError;
      } else if (selectedBusinessApplication) {
        const { error: businessError } = await supabase
          .from('business_loan_applications')
          .update({
            status: statusUpdate,
            submitted_at: new Date().toISOString()
          })
          .eq('id', selectedBusinessApplication.id);
        error = businessError;
      }

      if (error) {
        toast.error("Failed to update application");
        console.error(error);
      } else {
        toast.success("Application updated successfully");
        setSelectedApplication(null);
        setSelectedBusinessApplication(null);
        setStatusUpdate("");
        setAdminNotes("");
        fetchApplications();
      }
    } catch (error) {
      toast.error("An error occurred while updating the application");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'under_review':
        return <FileText className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'disbursed':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'disbursed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: applications.length + businessApplications.length,
    pending: applications.filter(app => app.status === 'pending').length + businessApplications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length + businessApplications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length + businessApplications.filter(app => app.status === 'rejected').length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-finance-light to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-finance-blue mx-auto"></div>
          <p className="mt-4 text-finance-gray">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-finance-light to-background">
      {/* Header */}
      <header className="bg-white shadow-soft border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-finance-navy">
                LAFinServices
              </Link>
              <Badge variant="outline" className="text-red-600">
                Admin Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center text-finance-blue hover:text-finance-blue-light transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
              <span className="text-finance-gray">
                Welcome, Admin
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">Loan Applications</TabsTrigger>
            <TabsTrigger value="admin-management">Admin Management</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-finance-gray">Total Applications</p>
                      <p className="text-2xl font-bold text-finance-navy">{stats.total}</p>
                    </div>
                    <Users className="w-8 h-8 text-finance-blue" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-finance-gray">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-finance-gray">Approved</p>
                      <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-finance-gray">Rejected</p>
                      <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Type Tabs */}
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-finance-navy">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Loan Applications Management
                  </CardTitle>
                  <Select value={filterStatus} onValueChange={(value) => {
                    setFilterStatus(value);
                    fetchApplications();
                  }}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="disbursed">Disbursed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal Loans ({applications.length})</TabsTrigger>
                    <TabsTrigger value="business">Business Loans ({businessApplications.length})</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="personal">
                    {applications.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-16 h-16 mx-auto text-finance-gray mb-4" />
                        <h3 className="text-lg font-semibold text-finance-navy mb-2">
                          No Personal Loan Applications Found
                        </h3>
                        <p className="text-finance-gray">
                          {filterStatus === "all" ? "No personal loan applications have been submitted yet." : `No personal loan applications with status "${filterStatus}".`}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applications.map((application) => (
                      <div
                        key={application.id}
                        className="border rounded-lg p-4 hover:shadow-soft transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(application.status)}
                            <div>
                              <h3 className="font-semibold text-finance-navy">
                                {application.full_name}
                              </h3>
                              <p className="text-sm text-finance-gray">
                                {application.loan_type.charAt(0).toUpperCase() + application.loan_type.slice(1)} Loan
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(application.status)}>
                              {application.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <Dialog>
                              <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedApplication(application);
                                      setSelectedBusinessApplication(null);
                                      setStatusUpdate(application.status);
                                      setAdminNotes(application.admin_notes || "");
                                    }}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Review
                                  </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Application Review - {application.full_name}</DialogTitle>
                                </DialogHeader>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Application Details */}
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-finance-navy">Application Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><strong>Loan Type:</strong> {application.loan_type}</div>
                                      <div><strong>Amount:</strong> ZWL {Number(application.loan_amount).toLocaleString()}</div>
                                      <div><strong>Email:</strong> {application.email}</div>
                                      <div><strong>Phone:</strong> {application.phone}</div>
                                      <div><strong>Address:</strong> {application.address}</div>
                                      <div><strong>Employment:</strong> {application.employment_status}</div>
                                      <div><strong>Monthly Income:</strong> ZWL {Number(application.monthly_income).toLocaleString()}</div>
                                      <div><strong>Submitted:</strong> {new Date(application.submitted_at).toLocaleString()}</div>
                                    </div>
                                  </div>

                                  {/* Status Update */}
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-finance-navy">Update Application</h4>
                                    
                                    <div>
                                      <Label htmlFor="status">Status</Label>
                                      <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="under_review">Under Review</SelectItem>
                                          <SelectItem value="approved">Approved</SelectItem>
                                          <SelectItem value="rejected">Rejected</SelectItem>
                                          <SelectItem value="disbursed">Disbursed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div>
                                      <Label htmlFor="notes">Admin Notes</Label>
                                      <Textarea
                                        id="notes"
                                        value={adminNotes}
                                        onChange={(e) => setAdminNotes(e.target.value)}
                                        placeholder="Add notes about this application..."
                                        rows={4}
                                      />
                                    </div>

                                    <Button 
                                      onClick={handleStatusUpdate}
                                      className="w-full bg-gradient-primary"
                                    >
                                      <Edit className="w-4 h-4 mr-2" />
                                      Update Application
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-finance-gray">
                          <div>
                            <span className="font-medium">Amount:</span> ZWL {Number(application.loan_amount).toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Income:</span> ZWL {Number(application.monthly_income).toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Type:</span> {application.loan_type}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span>{' '}
                            {new Date(application.submitted_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="business">
                    {businessApplications.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-16 h-16 mx-auto text-finance-gray mb-4" />
                        <h3 className="text-lg font-semibold text-finance-navy mb-2">
                          No Business Loan Applications Found
                        </h3>
                        <p className="text-finance-gray">
                          {filterStatus === "all" ? "No business loan applications have been submitted yet." : `No business loan applications with status "${filterStatus}".`}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {businessApplications.map((application) => (
                          <div
                            key={application.id}
                            className="border rounded-lg p-4 hover:shadow-soft transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                {getStatusIcon(application.status)}
                                <div>
                                  <h3 className="font-semibold text-finance-navy">
                                    {application.legal_business_name}
                                  </h3>
                                  <p className="text-sm text-finance-gray">
                                    Business Loan - {application.business_sector}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(application.status)}>
                                  {application.status.replace('_', ' ').toUpperCase()}
                                </Badge>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        setSelectedBusinessApplication(application);
                                        setSelectedApplication(null);
                                        setStatusUpdate(application.status);
                                        setAdminNotes("");
                                      }}
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      Review
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Business Loan Application Review - {application.legal_business_name}</DialogTitle>
                                    </DialogHeader>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="space-y-4">
                                        <h4 className="font-semibold text-finance-navy">Business Details</h4>
                                        <div className="space-y-2 text-sm">
                                          <div><strong>Business Name:</strong> {application.legal_business_name}</div>
                                          <div><strong>Sector:</strong> {application.business_sector}</div>
                                          <div><strong>Email:</strong> {application.business_email}</div>
                                          <div><strong>Phone:</strong> {application.business_phone}</div>
                                          <div><strong>Annual Turnover:</strong> ZWL {Number(application.annual_turnover || 0).toLocaleString()}</div>
                                          <div><strong>Loan Amount:</strong> ZWL {Number(application.loan_amount || 0).toLocaleString()}</div>
                                          <div><strong>Purpose:</strong> {application.loan_purpose}</div>
                                          <div><strong>Submitted:</strong> {application.submitted_at ? new Date(application.submitted_at).toLocaleString() : 'Not available'}</div>
                                        </div>
                                      </div>

                                      <div className="space-y-4">
                                        <h4 className="font-semibold text-finance-navy">Update Application</h4>
                                        
                                        <div>
                                          <Label htmlFor="status">Status</Label>
                                          <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="pending">Pending</SelectItem>
                                              <SelectItem value="under_review">Under Review</SelectItem>
                                              <SelectItem value="approved">Approved</SelectItem>
                                              <SelectItem value="rejected">Rejected</SelectItem>
                                              <SelectItem value="disbursed">Disbursed</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>

                                        <Button 
                                          onClick={handleStatusUpdate}
                                          className="w-full bg-gradient-primary"
                                        >
                                          <Edit className="w-4 h-4 mr-2" />
                                          Update Application
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-finance-gray">
                              <div>
                                <span className="font-medium">Amount:</span><br />
                                ZWL {Number(application.loan_amount || 0).toLocaleString()}
                              </div>
                              <div>
                                <span className="font-medium">Sector:</span><br />
                                {application.business_sector}
                              </div>
                              <div>
                                <span className="font-medium">Purpose:</span><br />
                                {application.loan_purpose || 'Not specified'}
                              </div>
                              <div>
                                <span className="font-medium">Submitted:</span><br />
                                {application.submitted_at ? new Date(application.submitted_at).toLocaleDateString() : 'N/A'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin-management">
            <AdminManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;