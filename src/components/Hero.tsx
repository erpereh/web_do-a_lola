import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const headline = "Cocina con alma. Sabor de barrio.";
const words = headline.split(" ");

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src=""
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-background" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: "easeOut" }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl mb-10 font-light"
        >
          Gastrotaberna en el corazón de Vallecas, Madrid
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reservas"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium text-base hover:shadow-[0_0_25px_hsl(var(--gold)/0.5)] transition-shadow duration-300"
          >
            Reservar mesa
          </a>
          <a
            href="#carta"
            className="border border-foreground/30 text-foreground px-8 py-3 rounded-full font-medium text-base hover:border-primary hover:text-primary transition-colors duration-300"
          >
            Ver la carta
          </a>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-primary animate-bounce-slow" />
      </motion.div>
    </section>
  );
};

export default Hero;
