import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, UserPlus, Users } from "lucide-react";

interface AdminUser {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('user_id, role, created_at')
        .eq('role', 'admin');

      if (error) throw error;

      // Get emails for admin users
      const adminEmails = await Promise.all(
        data.map(async (admin) => {
          const { data: emailData } = await supabase.rpc('get_user_email', {
            _user_id: admin.user_id
          });
          return {
            ...admin,
            email: emailData || 'Unknown'
          };
        })
      );

      setAdmins(adminEmails);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin users",
        variant: "destructive",
      });
    }
  };

  const addAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Get user ID by email
      const { data: userId } = await supabase.rpc('get_user_id_by_email', {
        _email: newAdminEmail.trim()
      });

      if (!userId) {
        toast({
          title: "Error",
          description: "User not found. The user must sign up first.",
          variant: "destructive",
        });
        return;
      }

      // Add admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user added successfully",
      });

      setNewAdminEmail("");
      fetchAdmins();
    } catch (error: any) {
      console.error('Error adding admin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add admin user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeAdmin = async (userId: string, email: string) => {
    if (admins.length <= 1) {
      toast({
        title: "Error",
        description: "Cannot remove the last admin user",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;

      toast({
        title: "Success",
        description: `Removed admin access for ${email}`,
      });

      fetchAdmins();
    } catch (error: any) {
      console.error('Error removing admin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove admin user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add New Admin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter email address"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addAdmin()}
            />
            <Button onClick={addAdmin} disabled={loading}>
              Add Admin
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current Admins ({admins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {admins.map((admin) => (
              <div
                key={admin.user_id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{admin.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Added: {new Date(admin.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary">Admin</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeAdmin(admin.user_id, admin.email)}
                  disabled={loading || admins.length <= 1}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {admins.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No admin users found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;