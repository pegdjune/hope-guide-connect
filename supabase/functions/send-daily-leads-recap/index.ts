import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Lead {
  id: string;
  user_email: string;
  user_name: string | null;
  user_phone: string | null;
  treatment_type: string | null;
  message: string | null;
  created_at: string;
}

interface Clinic {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
}

interface LeadsByClinic {
  clinic: Clinic;
  leads: Lead[];
}

const generateEmailHtml = (clinicName: string, leads: Lead[]): string => {
  const leadRows = leads.map((lead) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; font-weight: 500;">${lead.user_name || "Patient"}</td>
      <td style="padding: 12px;">${lead.user_email}</td>
      <td style="padding: 12px;">${lead.user_phone || "-"}</td>
      <td style="padding: 12px;">${lead.treatment_type || "Non spécifié"}</td>
      <td style="padding: 12px; color: #6b7280; font-size: 12px;">
        ${new Date(lead.created_at).toLocaleDateString("fr-FR", { 
          day: "2-digit", 
          month: "short", 
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}
      </td>
    </tr>
  `).join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
      <div style="max-width: 700px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8b5cf6, #6366f1); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🩺 Nouveaux leads reçus</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Récapitulatif pour ${clinicName}</p>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <p style="color: #374151; margin-bottom: 20px;">
            Bonjour,<br><br>
            Vous avez reçu <strong style="color: #8b5cf6;">${leads.length} nouveau${leads.length > 1 ? "x" : ""} lead${leads.length > 1 ? "s" : ""}</strong> sur FertilitéInfo.
          </p>
          
          <!-- Leads Table -->
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Nom</th>
                  <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Email</th>
                  <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Téléphone</th>
                  <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Traitement</th>
                  <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Date</th>
                </tr>
              </thead>
              <tbody>
                ${leadRows}
              </tbody>
            </table>
          </div>
          
          <!-- CTA -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://fertiliteinfo.lovable.app/clinic-dashboard" 
               style="display: inline-block; background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              Accéder à mon espace clinique
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; text-align: center;">
            Connectez-vous à votre espace clinique pour créer des devis personnalisés et contacter ces patients.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p>Ce message a été envoyé automatiquement par FertilitéInfo.</p>
          <p>© ${new Date().getFullYear()} FertilitéInfo - Tous droits réservés</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("Starting daily leads recap email job...");

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all leads that haven't been sent to clinics yet (status = 'new')
    const { data: newLeads, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .eq("status", "new")
      .is("sent_to_clinic_at", null);

    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
      throw leadsError;
    }

    if (!newLeads || newLeads.length === 0) {
      console.log("No new leads to send.");
      return new Response(
        JSON.stringify({ success: true, message: "No new leads to send", emailsSent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Found ${newLeads.length} new leads to process.`);

    // Get unique clinic IDs
    const clinicIds = [...new Set(newLeads.map((lead) => lead.clinic_id))];

    // Fetch clinics with their emails
    const { data: clinics, error: clinicsError } = await supabase
      .from("clinics")
      .select("id, name, email, city, country")
      .in("id", clinicIds)
      .not("email", "is", null);

    if (clinicsError) {
      console.error("Error fetching clinics:", clinicsError);
      throw clinicsError;
    }

    if (!clinics || clinics.length === 0) {
      console.log("No clinics with email addresses found.");
      return new Response(
        JSON.stringify({ success: true, message: "No clinics with email addresses", emailsSent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Group leads by clinic
    const leadsByClinic: LeadsByClinic[] = clinics
      .filter((clinic): clinic is Clinic => clinic.email !== null)
      .map((clinic) => ({
        clinic,
        leads: newLeads.filter((lead) => lead.clinic_id === clinic.id),
      }))
      .filter((group) => group.leads.length > 0);

    console.log(`Sending emails to ${leadsByClinic.length} clinics...`);

    let emailsSent = 0;
    const errors: string[] = [];
    const sentLeadIds: string[] = [];

    // Send emails to each clinic
    for (const { clinic, leads } of leadsByClinic) {
      try {
        console.log(`Sending email to ${clinic.name} (${clinic.email}) with ${leads.length} leads...`);

        const emailHtml = generateEmailHtml(clinic.name, leads);

        const { error: emailError } = await resend.emails.send({
          from: "FertilitéInfo <leads@resend.dev>",
          to: [clinic.email],
          subject: `🩺 ${leads.length} nouveau${leads.length > 1 ? "x" : ""} lead${leads.length > 1 ? "s" : ""} - FertilitéInfo`,
          html: emailHtml,
        });

        if (emailError) {
          console.error(`Error sending email to ${clinic.email}:`, emailError);
          errors.push(`${clinic.name}: ${emailError.message}`);
        } else {
          emailsSent++;
          sentLeadIds.push(...leads.map((l) => l.id));
          console.log(`Email sent successfully to ${clinic.email}`);
        }
      } catch (err) {
        console.error(`Exception sending email to ${clinic.email}:`, err);
        errors.push(`${clinic.name}: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }

    // Update leads status to 'sent' and set sent_to_clinic_at
    if (sentLeadIds.length > 0) {
      const { error: updateError } = await supabase
        .from("leads")
        .update({
          status: "sent",
          sent_to_clinic_at: new Date().toISOString(),
        })
        .in("id", sentLeadIds);

      if (updateError) {
        console.error("Error updating leads status:", updateError);
      } else {
        console.log(`Updated ${sentLeadIds.length} leads to 'sent' status.`);
      }
    }

    const result = {
      success: true,
      emailsSent,
      leadsProcessed: sentLeadIds.length,
      errors: errors.length > 0 ? errors : undefined,
    };

    console.log("Daily leads recap job completed:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in send-daily-leads-recap:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
