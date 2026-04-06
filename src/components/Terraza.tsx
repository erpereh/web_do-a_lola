import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Terraza = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["calc(95% - 20px)", "calc(95% + 20px)"]);

  return (
    <section
      ref={ref}
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/terraza.png')",
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: bgY,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/[0.45]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-4 max-w-2xl"
      >
        <h2
          className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
          style={{ textShadow: "0 0 40px rgba(201,168,76,0.3)" }}
        >
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
