import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SobreNosotros from "@/components/SobreNosotros";
import PlatosEstrella from "@/components/PlatosEstrella";
import LaCarta from "@/components/LaCarta";
import Resenas from "@/components/Resenas";
import Terraza from "@/components/Terraza";
import Reservas from "@/components/Reservas";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SobreNosotros />
      <PlatosEstrella />
      <LaCarta />
      <Resenas />
      <Terraza />
      <Reservas />
      <Footer />
    </div>
  );
};

export default Index;
