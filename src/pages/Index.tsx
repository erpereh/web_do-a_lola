import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreNosotros from "@/components/SobreNosotros";
import LaCarta from "@/components/LaCarta";
import Resenas from "@/components/Resenas";
import Terraza from "@/components/Terraza";
import Reservas from "@/components/Reservas";
import Footer from "@/components/Footer";

const SectionDivider = () => (
  <div className="flex items-center justify-center gap-3 py-2 opacity-30">
    <div className="h-px w-16 bg-primary" />
    <span className="text-primary text-xs">◆</span>
    <div className="h-px w-16 bg-primary" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SobreNosotros />
      <SectionDivider />
      <LaCarta />
      <SectionDivider />
      <Resenas />
      <SectionDivider />
      <Terraza />
      <Reservas />
      <Footer />
    </div>
  );
};

export default Index;
