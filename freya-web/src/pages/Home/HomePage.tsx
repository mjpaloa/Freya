import HeroSection from '../../components/sections/HeroSection/HeroSection';
import QuickFeatures from '../../components/sections/QuickFeatures/QuickFeatures';
import SectorsGrid from '../../components/sections/SectorsGrid/SectorsGrid';
import ProductHighlight from '../../components/sections/ProductHighlight/ProductHighlight';
import FutureCta from '../../components/sections/FutureCta/FutureCta';
import PartnersSection from '../../components/sections/PartnersSection/PartnersSection';
import FeaturedNews from '../../components/sections/FeaturedNews/FeaturedNews';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickFeatures />
      <SectorsGrid />
      <ProductHighlight />
      <FutureCta />
      <PartnersSection />
      <FeaturedNews />
    </>
  );
}

