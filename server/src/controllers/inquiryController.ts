import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { sendInquiryEmail } from '../services/emailService';

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Map frontend camelCase to database snake_case
    const dbData = {
      type: body.type,
      full_name: body.full_name || body.fullName,
      first_name: body.first_name || body.firstName,
      last_name: body.last_name || body.lastName,
      email: body.email,
      contact_number: body.contact_number || body.phone || body.contactNumber,
      facility_id: body.facility_id || body.facilityId,
      subject: body.subject,
      message: body.message,
      job_title: body.job_title || body.jobTitle,
      clinical_specialty: body.clinical_specialty || body.specialty || body.clinicalSpecialty,
      company_hospital: body.company_hospital || body.hospital || body.companyHospital,
      product_interest: body.product_interest || body.productInterest,
      marketing_consent: body.marketing_consent !== undefined ? body.marketing_consent : body.agreed,
      status: 'pending'
    };

    // 1. Save to Database (Supabase)
    const { data, error } = await supabase
      .from('inquiries')
      .insert([dbData])
      .select();

    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Failed to save inquiry record.', details: error.message });
    }

    // 2. Send Email Notification
    sendInquiryEmail(dbData).catch(err => console.error('Delayed Email Error:', err));

    return res.status(201).json({
      message: 'Inquiry submitted successfully.',
      data: data[0]
    });
  } catch (error: any) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal server error.', details: error.message });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return res.status(500).json({ error: 'Failed to update inquiry.' });
  }
};
