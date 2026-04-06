import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const platos = [
  { num: "01", name: "Torreznos de Soria", desc: "Crujientes por fuera, jugosos por dentro. El plato más pedido de la casa.", badge: "Nº1", pedidos: 187, gradient: "from-amber-900/80 via-amber-800/60 to-stone-900/90" },
  { num: "02", name: "Huevos Rotos con Jamón", desc: "Clásico de la taberna, con producto de calidad y punto perfecto.", badge: "TOP", pedidos: 143, gradient: "from-yellow-900/70 via-orange-900/50 to-stone-900/80" },
  { num: "03", name: "Tartar de Atún", desc: "Frescura y sabor en cada bocado, con el toque justo de la casa.", badge: null, pedidos: 89, gradient: "from-rose-900/60 via-stone-800/50 to-stone-900/80" },
  { num: "04", name: "Callos a la Madrileña", desc: "Guiso lento y reconfortante, como los hacía la abuela.", badge: null, pedidos: 76, gradient: "from-orange-900/70 via-red-900/40 to-stone-900/90" },
  { num: "05", name: "Pollo al Curry", desc: "Un viaje de sabores con el toque hindú que sorprende a todos.", badge: null, pedidos: 94, gradient: "from-yellow-800/60 via-amber-900/50 to-stone-900/80" },
  { num: "06", name: "Croquetas de Jamón", desc: "Cremositas por dentro, doradas por fuera. Imprescindibles.", badge: "TOP", pedidos: 162, gradient: "from-amber-800/70 via-yellow-900/50 to-stone-900/85" },
];

const AnimatedCounter = ({ target, inView }: { target: number; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span>{count}</span>;
};

const BentoCard = ({
  plato,
  inView,
  index,
  isHero,
  className,
}: {
  plato: (typeof platos)[0];
  inView: boolean;
  index: number;
  isHero?: boolean;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
      className={`bento-card group relative rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer ${className ?? ""}`}
    >
      {/* Gradient placeholder (future photo) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${plato.gradient} transition-transform duration-700 group-hover:scale-105`} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Decorative number */}
      <span className="absolute top-4 right-4 font-display text-6xl md:text-7xl font-bold text-foreground/[0.06] leading-none select-none pointer-events-none">
        {plato.num}
      </span>

      {/* Badge */}
      {plato.badge && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
          <span className="badge-dot w-2 h-2 rounded-full bg-primary" />
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">
            {plato.badge}
          </span>
        </div>
      )}

      {/* Content — bottom-aligned */}
      <div className={`relative z-10 flex flex-col justify-end h-full ${isHero ? "p-8 md:p-10" : "p-5 md:p-6"}`}>
        <h3 className={`font-display font-semibold text-foreground mb-1 ${isHero ? "text-2xl md:text-4xl" : "text-lg md:text-xl"}`}>
          {plato.name}
        </h3>

        {/* Description — revealed on hover */}
        <div className="overflow-hidden">
          <p className={`text-muted-foreground leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ${isHero ? "text-sm md:text-base max-w-lg" : "text-xs md:text-sm"}`}>
            {plato.desc}
          </p>
        </div>

        <span className={`inline-flex items-center gap-1.5 text-primary/70 font-medium mt-2 ${isHero ? "text-sm" : "text-xs"}`}>
          +<AnimatedCounter target={plato.pedidos} inView={inView} /> pedidos este mes
        </span>
      </div>
    </motion.div>
  );
};

const PlatosEstrella = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-32 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Lo que no puedes perderte
          </h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-12 bg-primary/40" />
            <span className="text-primary text-sm">◆</span>
            <span className="h-px w-12 bg-primary/40" />
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
            Los clásicos que siempre repiten nuestros clientes
          </p>
        </motion.div>

        {/* Hero card — full width */}
        <BentoCard
          plato={platos[0]}
          inView={inView}
          index={0}
          isHero
          className="w-full aspect-[21/9] md:aspect-[3/1] mb-5"
        />

        {/* Bento grid — asymmetric */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[200px] md:auto-rows-[220px]">
          {/* 02 */}
          <BentoCard plato={platos[1]} inView={inView} index={1} />
          {/* 03 */}
          <BentoCard plato={platos[2]} inView={inView} index={2} />
          {/* 04 — tall card spanning 2 rows */}
          <BentoCard
            plato={platos[3]}
            inView={inView}
            index={3}
            className="row-span-2 col-span-2 lg:col-span-1"
          />
          {/* 05 */}
          <BentoCard plato={platos[4]} inView={inView} index={4} />
          {/* 06 */}
          <BentoCard plato={platos[5]} inView={inView} index={5} />
        </div>
      </div>
    </section>
  );
};

export default PlatosEstrella;
