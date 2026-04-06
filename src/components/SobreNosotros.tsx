import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  "+285 reseñas en Google",
  "4.1 ⭐ de media",
  "20–30€ por persona",
];

const SobreNosotros = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="py-20 md:py-32 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Una taberna con carácter
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
            Doña Lola nació con la vocación de fusionar la tradición gastronómica
            española con toques creativos y sabores del mundo. En manos de José Ramón,
            esta pequeña joya de Vallecas se ha convertido en un lugar donde el producto
            manda y el ambiente invita a quedarse. Cocina honesta, trato cercano y ese
            sabor que solo tiene lo hecho con cariño.
          </p>

          <div className="flex flex-wrap gap-3">
            {stats.map((stat, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                className="bg-secondary text-foreground text-sm px-4 py-2 rounded-full border border-border"
              >
                {stat}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="aspect-[4/3] rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(30 40% 12%), hsl(35 50% 18%), hsl(25 30% 10%))",
          }}
        />
      </div>
    </section>
  );
};

export default SobreNosotros;
