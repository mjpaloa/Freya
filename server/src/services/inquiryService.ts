import { supabase } from '../config/supabase';

export const inquiryService = {
  async getAllUniqueEmails(): Promise<string[]> {
    const { data, error } = await supabase
      .from('inquiries')
      .select('email');

    if (error) {
      console.error('Error fetching inquiry emails:', error);
      return [];
    }

    // Filter out empty emails and get unique ones
    const emails = data.map(item => item.email).filter(Boolean);
    return Array.from(new Set(emails));
  },

  async getEmailsWithConsent(): Promise<string[]> {
    const { data, error } = await supabase
      .from('inquiries')
      .select('email')
      .eq('marketing_consent', true);

    if (error) {
      console.error('Error fetching inquiry emails with consent:', error);
      return [];
    }

    const emails = data.map(item => item.email).filter(Boolean);
    return Array.from(new Set(emails));
  }
};
