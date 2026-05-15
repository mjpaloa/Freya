import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://freya-server-mu.vercel.app/api';

export interface TechnicalInquiryData {
  type: 'technical';
  full_name: string;
  facility_id: string;
  subject: string;
  message: string;
  email: string; // Adding email as it's required by the backend
}

export interface SalesInquiryData {
  type: 'sales';
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  job_title: string;
  clinical_specialty: string;
  company_hospital: string;
  product_interest: string;
  marketing_consent: boolean;
}

export const submitInquiry = async (data: TechnicalInquiryData | SalesInquiryData) => {
  try {
    const response = await axios.post(`${API_URL}/inquiries`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    throw error;
  }
};
