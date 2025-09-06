import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  FileText, 
  LogOut, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Upload,
  Settings,
  Download,
  MessageCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Link } from "react-router-dom";
import LoanPayments from "@/components/LoanPayments";
import ChatBot from "@/components/ChatBot";
import { useAuth } from "@/contexts/AuthContext";

interface LoanApplication {
  id: string;
  loan_type: string;
  loan_amount: number;
  status: string;
  submitted_at: string;
  full_name: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  client_number: string | null;
  phone: string | null;
  address: string | null;
}

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatBotMinimized, setChatBotMinimized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/auth");
        return;
      }
      fetchUserData(user.id);
    }
  }, [user, authLoading, navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Profile error:", profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch applications from both tables (prefer explicit queries over OR to avoid PostgREST 400s)
      const { data: authUserData } = await supabase.auth.getUser();
      const userEmail = authUserData?.user?.email || null;

      // Salary applications: query by user_id and (optionally) by email, then merge unique IDs
      const salaryByUserReq = supabase
        .from('salary_loan_applications')
        .select('*')
        .eq('user_id', userId);
      const salaryByEmailReq = userEmail
        ? supabase
            .from('salary_loan_applications')
            .select('*')
            .eq('email', userEmail)
        : null;

      // Business applications: query by user_id and (optionally) by business_email, then merge unique IDs
      const businessByUserReq = supabase
        .from('business_loan_applications')
        .select('*')
        .eq('user_id', userId);
      const businessByEmailReq = userEmail
        ? supabase
            .from('business_loan_applications')
            .select('*')
            .eq('business_email', userEmail)
        : null;

      const [salaryUserRes, salaryEmailRes, businessUserRes, businessEmailRes] = await Promise.all([
        salaryByUserReq,
        salaryByEmailReq ?? Promise.resolve({ data: [], error: null } as any),
        businessByUserReq,
        businessByEmailReq ?? Promise.resolve({ data: [], error: null } as any),
      ]);

      // Log specific errors if any (helps pinpoint 400s)
      if (salaryUserRes?.error) console.warn('Salary by user_id error:', salaryUserRes.error);
      if (salaryEmailRes?.error) console.warn('Salary by email error:', salaryEmailRes.error);
      if (businessUserRes?.error) console.warn('Business by user_id error:', businessUserRes.error);
      if (businessEmailRes?.error) console.warn('Business by email error:', businessEmailRes.error);

      // Merge and de-duplicate by id
      const salaryRows = ([...(salaryUserRes?.data || []), ...(salaryEmailRes?.data || [])] as any[]);
      const businessRows = ([...(businessUserRes?.data || []), ...(businessEmailRes?.data || [])] as any[]);
      const uniqById = (rows: any[]) => Array.from(new Map(rows.map(r => [r.id, r])).values());

      const salaryRes = { data: uniqById(salaryRows), error: null as any };
      const businessRes = { data: uniqById(businessRows), error: null as any };

      if (salaryRes.error) {
        console.warn('Salary applications fetch error:', salaryRes.error);
      }
      if (businessRes.error) {
        console.warn('Business applications fetch error:', businessRes.error);
      }

      // Client-side sort by submitted_at if available; fallback to created_at
      const getTime = (r: any) => new Date(r.submitted_at || r.created_at || 0).getTime();
      const salaryItems = (salaryRes.data || []).sort((a: any, b: any) => getTime(b) - getTime(a)).map((r: any) => ({
        id: r.id,
        loan_type: 'salary',
        loan_amount: r.loan_amount ?? 0,
        status: r.status || 'submitted',
        submitted_at: r.submitted_at || r.created_at || new Date().toISOString(),
        full_name: r.full_name || r.applicant_name || '',
      })) as LoanApplication[];

      const businessItems = (businessRes.data || []).sort((a: any, b: any) => getTime(b) - getTime(a)).map((r: any) => ({
        id: r.id,
        loan_type: 'business',
        loan_amount: r.loan_amount ?? 0,
        status: r.status || 'submitted',
        submitted_at: r.submitted_at || r.created_at || new Date().toISOString(),
        full_name: '',
      })) as LoanApplication[];

      const combined = [...salaryItems, ...businessItems].sort(
        (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
      );
      setApplications(combined);
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
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

  const downloadApplicationForm = () => {
    // Create a sample application form PDF content
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(
      'LAFinServices Loan Application Form\n\n' +
      'Please fill out this form completely and submit with required documents.\n\n' +
      '1. Personal Information\n' +
      '2. Employment/Business Details\n' +
      '3. Financial Information\n' +
      '4. Loan Requirements\n' +
      '5. References\n\n' +
      'For assistance, contact us at info@lafinservices.com'
    ));
    element.setAttribute('download', 'LAFinServices_Application_Form.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Application form downloaded successfully");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-finance-light to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-finance-blue mx-auto"></div>
          <p className="mt-4 text-finance-gray">Loading your dashboard...</p>
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
              <Badge variant="outline" className="text-finance-blue">
                Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-finance-gray text-sm">
                  Welcome, {profile?.full_name || user?.user_metadata?.full_name || user?.email}
                </div>
                {profile?.client_number && (
                  <div className="text-finance-blue text-xs font-mono">
                    Client: {profile.client_number}
                  </div>
                )}
              </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center text-finance-navy">
                  <Settings className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/apply">
                  <Button className="w-full bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    New Loan Application
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={downloadApplicationForm}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Form
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setShowChatBot(true);
                    setChatBotMinimized(false);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Loan Payments */}
            {user && <LoanPayments userId={user.id} />}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center text-finance-navy">
                  <FileText className="w-5 h-5 mr-2" />
                  Your Loan Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 mx-auto text-finance-gray mb-4" />
                    <h3 className="text-lg font-semibold text-finance-navy mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-finance-gray mb-4">
                      Start your loan application journey today
                    </p>
                    <Link to="/apply">
                      <Button className="bg-gradient-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Apply for a Loan
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div
                        key={application.id}
                        className="border rounded-lg p-4 hover:shadow-soft transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(application.status)}
                            <span className="font-semibold text-finance-navy">
                              {application.loan_type.charAt(0).toUpperCase() + application.loan_type.slice(1)} Loan
                            </span>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-finance-gray">
                          <div>
                            <span className="font-medium">Amount:</span> ZWL {Number(application.loan_amount).toLocaleString()}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ChatBot */}
      {showChatBot && (
        <ChatBot
          isMinimized={chatBotMinimized}
          onToggleMinimize={() => setChatBotMinimized(!chatBotMinimized)}
          onClose={() => setShowChatBot(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;