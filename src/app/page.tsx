import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import PartnersBar from "@/components/landing/PartnersBar";
import ServicesSection from "@/components/landing/ServicesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import InfrastructureSection from "@/components/landing/InfrastructureSection";
import TrackingTeaser from "@/components/landing/TrackingTeaser";
import StatsCounters from "@/components/landing/StatsCounters";
import CertificationsSection from "@/components/landing/CertificationsSection";
import TeamSection from "@/components/landing/TeamSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BlogSection from "@/components/landing/BlogSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaSection from "@/components/landing/CtaSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PartnersBar />
      <ServicesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <TrackingTeaser />
      <StatsCounters />
      <CertificationsSection />
      <TeamSection />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}
