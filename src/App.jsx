import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesMatrix } from './components/ServicesMatrix';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ColorGradingLab } from './components/ColorGradingLab';
import { CustomConfigurator } from './components/CustomConfigurator';
import { ClientPortalPreview } from './components/ClientPortalPreview';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [configuredPlanForBooking, setConfiguredPlanForBooking] = useState(null);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleBookConfiguredPlan = (planData) => {
    setConfiguredPlanForBooking(planData);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#fcfbf9] relative">
      {/* Subtle film grain texture overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. Custom Services Matrix */}
        <ServicesMatrix />

        {/* 3. Cinema Portfolio Gallery */}
        <PortfolioGallery onOpenBooking={handleOpenBooking} />

        {/* 4. Interactive Color Grading & Retouching Lab */}
        <ColorGradingLab />

        {/* 5. Customization Configurator & Pricing Calculator */}
        <CustomConfigurator onBookConfiguredPlan={handleBookConfiguredPlan} />

        {/* 6. Client Digital Cloud Portal Demo Experience */}
        <ClientPortalPreview />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Booking & Date Inquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialPlanData={configuredPlanForBooking}
      />
    </div>
  );
}

export default App;
