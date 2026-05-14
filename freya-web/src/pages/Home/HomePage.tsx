import HeroSection from '../../components/sections/HeroSection/HeroSection';
import QuickFeatures from '../../components/sections/QuickFeatures/QuickFeatures';
import SectorsGrid from '../../components/sections/SectorsGrid/SectorsGrid';
import ProductHighlight from '../../components/sections/ProductHighlight/ProductHighlight';
import FutureCta from '../../components/sections/FutureCta/FutureCta';
import VendorSection from '../../components/sections/VendorSection/VendorSection';
import PartnersSection from '../../components/sections/PartnersSection/PartnersSection';


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <QuickFeatures />
      <SectorsGrid />
      <ProductHighlight />
      <FutureCta />
      <PartnersSection />
      <VendorSection />

    </main>
  );
}

