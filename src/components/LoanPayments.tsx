import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  CreditCard, 
  Calendar, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LoanPayment {
  id: string;
  application_id: string;
  amount_due: number;
  amount_paid: number;
  due_date: string;
  paid_date: string | null;
  status: string;
  payment_method: string | null;
  transaction_id: string | null;
  notes: string | null;
}

interface LoanPaymentsProps {
  userId: string;
}

const LoanPayments = ({ userId }: LoanPaymentsProps) => {
  const [payments, setPayments] = useState<LoanPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [userId]);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_payments')
        .select('*')
        .eq('user_id', userId)
        .order('due_date', { ascending: true });

      if (error) {
        toast.error("Failed to fetch payments");
        console.error(error);
      } else {
        setPayments(data || []);
      }
    } catch (error) {
      toast.error("An error occurred while fetching payments");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending':
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    return status !== 'paid' && new Date(dueDate) < new Date();
  };

  if (isLoading) {
    return (
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center text-finance-navy">
            <CreditCard className="w-5 h-5 mr-2" />
            Loan Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-pulse">Loading payments...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center text-finance-navy">
          <CreditCard className="w-5 h-5 mr-2" />
          Loan Payments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-8">
            <CreditCard className="w-16 h-16 mx-auto text-finance-gray mb-4" />
            <h3 className="text-lg font-semibold text-finance-navy mb-2">
              No Payments Scheduled
            </h3>
            <p className="text-finance-gray">
              Payment schedules will appear here once your loan is approved
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`border rounded-lg p-4 hover:shadow-soft transition-shadow ${
                  isOverdue(payment.due_date, payment.status) ? 'border-red-200 bg-red-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(payment.status)}
                    <span className="font-semibold text-finance-navy">
                      Payment Due
                    </span>
                    {isOverdue(payment.due_date, payment.status) && (
                      <Badge className="bg-red-100 text-red-800">
                        OVERDUE
                      </Badge>
                    )}
                  </div>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="flex items-center text-finance-gray mb-1">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Amount Due
                    </div>
                    <div className="font-semibold">
                      ZWL {Number(payment.amount_due).toLocaleString()}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-finance-gray mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Due Date
                    </div>
                    <div className="font-semibold">
                      {new Date(payment.due_date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {payment.amount_paid > 0 && (
                    <div>
                      <div className="text-finance-gray mb-1">Amount Paid</div>
                      <div className="font-semibold text-green-600">
                        ZWL {Number(payment.amount_paid).toLocaleString()}
                      </div>
                    </div>
                  )}
                  
                  {payment.paid_date && (
                    <div>
                      <div className="text-finance-gray mb-1">Paid Date</div>
                      <div className="font-semibold">
                        {new Date(payment.paid_date).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
                
                {payment.status === 'pending' && (
                  <div className="mt-3 pt-3 border-t">
                    <Button size="sm" className="bg-gradient-primary">
                      Make Payment
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanPayments;