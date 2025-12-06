-- Add policy for clinic users to only see their own clinic's leads
CREATE POLICY "Clinic users can view their own leads"
ON public.leads FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.clinic_accounts ca
    WHERE ca.clinic_id = leads.clinic_id
    AND ca.user_id = auth.uid()
    AND ca.invitation_accepted_at IS NOT NULL
  )
);

-- Add policy for clinic users to update lead status for their clinic
CREATE POLICY "Clinic users can update their own leads"
ON public.leads FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.clinic_accounts ca
    WHERE ca.clinic_id = leads.clinic_id
    AND ca.user_id = auth.uid()
    AND ca.invitation_accepted_at IS NOT NULL
  )
);