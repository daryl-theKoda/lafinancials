import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  applicantName: string;
  loanType: string;
  loanAmount: number;
  applicationId: string;
  status?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, applicantName, loanType, loanAmount, applicationId, status }: EmailRequest = await req.json();

    let subject: string;
    let htmlContent: string;

    if (status) {
      // Status update email
      subject = `Loan Application Update - ${status.toUpperCase()}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a;">LAFinServices - Application Update</h1>
          <p>Dear ${applicantName},</p>
          <p>We have an update regarding your ${loanType} loan application for ZWL ${loanAmount.toLocaleString()}.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Status: ${status.replace('_', ' ').toUpperCase()}</h2>
            <p><strong>Application ID:</strong> ${applicationId}</p>
          </div>
          ${status === 'approved' ? 
            '<p style="color: #059669;">Congratulations! Your loan application has been approved. Our team will contact you shortly with next steps.</p>' : 
            status === 'rejected' ? 
            '<p style="color: #dc2626;">We regret to inform you that your loan application was not approved at this time. Please contact us for more information.</p>' :
            '<p>We will keep you updated as your application progresses through our review process.</p>'
          }
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The LAFinServices Team</p>
        </div>
      `;
    } else {
      // New application confirmation email
      subject = "Loan Application Received - LAFinServices";
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a;">LAFinServices - Application Received</h1>
          <p>Dear ${applicantName},</p>
          <p>Thank you for submitting your loan application with LAFinServices. We have successfully received your application and it is now under review.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Application Details</h2>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Loan Type:</strong> ${loanType}</p>
            <p><strong>Loan Amount:</strong> ZWL ${loanAmount.toLocaleString()}</p>
            <p><strong>Status:</strong> Pending Review</p>
          </div>
          
          <h3 style="color: #1e3a8a;">What's Next?</h3>
          <ul>
            <li>Our team will review your application within 2-3 business days</li>
            <li>You will receive email updates as your application progresses</li>
            <li>You can check your application status anytime in your dashboard</li>
          </ul>
          
          <p>If you have any questions or need to provide additional documentation, please contact us.</p>
          <p>Best regards,<br>The LAFinServices Team</p>
          
          <hr style="margin: 30px 0; border: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "LAFinServices <noreply@lafinservices.com>",
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-application-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);