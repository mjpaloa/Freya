import ContactHero from './components/ContactHero';
import InfoSidebar from './components/InfoSidebar';
import InquiryForm from './components/InquiryForm';
import EssentialInfo from './components/EssentialInfo';
import './ContactPage.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <ContactHero />

      <div className="contact-grid-section">
        <div className="container">
          <div className="contact-layout">
            <InfoSidebar />
            <InquiryForm />
          </div>
        </div>
      </div>

      <EssentialInfo />
    </div>
  );
}
