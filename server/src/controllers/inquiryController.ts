import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { sendInquiryEmail } from '../services/emailService';

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const inquiryData = req.body;

    // 1. Save to Database (Supabase)
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiryData])
      .select();

    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Failed to save inquiry record.' });
    }

    // 2. Send Email Notification
    // We don't want to block the response if email fails, but we should log it
    sendInquiryEmail(inquiryData).catch(err => console.error('Delayed Email Error:', err));

    return res.status(201).json({
      message: 'Inquiry submitted successfully.',
      data: data[0]
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
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
