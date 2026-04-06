import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type SignatureDish = {
  number: string;
  name: string;
  description: string;
  badge?: string;
};

const signatureDishes: SignatureDish[] = [
  {
    number: "01",
    name: "Huevos Revueltos",
    description:
      "Melosos, sabrosos y con ese punto de cocina honesta que convierte la primera cucharada en tradición.",
    badge: "Nº1 más pedido",
  },
  {
    number: "02",
    name: "Croquetas de Jamón",
    description: "Cremosas por dentro, doradas por fuera y siempre en su punto.",
    badge: "TOP",
  },
  {
    number: "03",
    name: "Tortilla de Patata",
    description: "Jugosa, equilibrada y con el sabor castizo que pide pan y sobremesa.",
  },
];

const tastingLine = [
  {
    name: "Tartar de Atún",
    description: "Fresco y elegante con acento cítrico.",
    price: "18€ aprox.",
  },
  {
    name: "Callos a la Madrileña",
    description: "Guiso intenso, meloso y profundamente madrileño.",
    price: "14€ aprox.",
  },
  {
    name: "Pollo al Curry",
    description: "Aromático, cremoso y con un final especiado redondo.",
    price: "16€ aprox.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const AccentPattern = () => (
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-28 -left-16 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
    <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(201,168,76,0.08)_45%,transparent_100%)]" />
    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_21px,rgba(245,240,232,0.03)_22px)]" />
  </div>
);

const SignatureCard = ({ dish, index, featured = false }: { dish: SignatureDish; index: number; featured?: boolean }) => {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      className={`group relative overflow-hidden rounded-2xl border border-white/12 bg-[#0f0f0f] ${
        featured ? "h-[600px]" : "h-[295px]"
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <AccentPattern />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/75" />

      <motion.span
        className={`absolute font-display leading-none text-[#c9a84c] select-none ${
          featured ? "bottom-28 left-7 md:left-10 text-[90px]" : "bottom-20 left-6 text-[78px]"
        }`}
        style={{ opacity: 0.15 }}
        whileHover={{ opacity: 0.4 }}
        transition={{ duration: 0.25 }}
      >
        {dish.number}
      </motion.span>

      <div className={`absolute inset-x-0 bottom-0 z-10 ${featured ? "p-8 md:p-10" : "p-6"}`}>
        {dish.badge && (
          <span className="mb-4 inline-flex items-center rounded-full bg-[#c9a84c] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-black">
            {dish.badge}
          </span>
        )}

        <motion.h3
          className={`font-display text-[#f5f0e8] leading-tight ${featured ? "text-[34px] md:text-[40px]" : "text-[28px]"}`}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.22 }}
        >
          {dish.name}
        </motion.h3>

        <p className="mt-2 max-w-xl text-[14px] text-zinc-300">{dish.description}</p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 inline-flex items-center rounded-full border border-[#c9a84c]/90 bg-[#c9a84c] px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-black"
        >
          Ver en carta
        </motion.button>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/55 to-transparent opacity-70" />
    </motion.article>
  );
};

const PlatosEstrella = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-32 px-4" ref={ref}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.08),transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Lo que no puedes perderte</h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-12 bg-primary/40" />
            <span className="text-primary text-sm">◆</span>
            <span className="h-px w-12 bg-primary/40" />
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
            Los clásicos que siempre repiten nuestros clientes
          </p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 md:gap-6">
          <SignatureCard dish={signatureDishes[0]} index={0} featured />

          <div className="grid grid-rows-2 gap-5 md:gap-6">
            <SignatureCard dish={signatureDishes[1]} index={1} />
            <SignatureCard dish={signatureDishes[2]} index={2} />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {tastingLine.map((dish, index) => (
            <motion.article
              key={dish.name}
              custom={index + 3}
              variants={cardVariants}
              className="group relative rounded-xl border border-white/10 bg-[#111] p-5 transition-colors duration-300 hover:border-[#c9a84c]/65"
            >
              <h4 className="font-display text-[24px] text-[#f5f0e8] leading-tight">{dish.name}</h4>
              <p className="mt-2 text-sm text-zinc-300">{dish.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[#c9a84c] text-sm font-medium">{dish.price}</span>
                <span className="h-px w-12 bg-[#c9a84c]/35 transition-all duration-300 group-hover:w-20" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatosEstrella;
