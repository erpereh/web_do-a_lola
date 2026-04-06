import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Terraza = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax bg placeholder */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, hsl(25 20% 8%), hsl(30 30% 14%), hsl(20 15% 6%))",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-4 max-w-2xl"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Cuando el tiempo acompaña...
        </h2>
        <p className="font-display text-xl md:text-2xl text-primary italic mb-4">
          La terraza te espera
        </p>
        <p className="text-muted-foreground text-base">
          El plan perfecto para una cerveza fresquita con buena compañía
        </p>
      </motion.div>
    </section>
  );
};

export default Terraza;
