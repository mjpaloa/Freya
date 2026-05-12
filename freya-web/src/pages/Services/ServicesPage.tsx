import ServicesHero from '../../components/sections/ServicesHero/ServicesHero';
import OperationalPillars from '../../components/sections/OperationalPillars/OperationalPillars';
import FacilitySolutions from '../../components/sections/FacilitySolutions/FacilitySolutions';
import ServicesCta from '../../components/sections/ServicesCta/ServicesCta';

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <OperationalPillars />
      <FacilitySolutions />
      <ServicesCta />
    </div>
  );
}

