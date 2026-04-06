import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const tabs = ["Tapas", "Carnes & Pescados", "Postres"] as const;

const menu: Record<string, { name: string; price: string }[]> = {
  Tapas: [
    { name: "Huevos Rotos con Jamón", price: "8–10€" },
    { name: "Torreznos de Soria", price: "7–9€" },
    { name: "Croquetas de jamón", price: "7€" },
    { name: "Gambas al ajillo", price: "9€" },
    { name: "Tartar de Atún", price: "10–12€" },
    { name: "Ensaladilla rusa", price: "6–8€" },
    { name: "Provoletta", price: "8€" },
  ],
  "Carnes & Pescados": [
    { name: "Cachopo", price: "14–16€" },
    { name: "Carrillera estofada", price: "12€" },
    { name: "Pollo al curry con arroz", price: "11€" },
    { name: "Callos a la madrileña", price: "9€" },
    { name: "Solomillo en salsa", price: "14€" },
  ],
  Postres: [
    { name: "Tarta de zanahoria", price: "4€" },
    { name: "Brownie con chocolate", price: "4€" },
    { name: "Helado artesano", price: "3€" },
  ],
};

const LaCarta = () => {
  const [active, setActive] = useState<string>("Tapas");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="carta" className="py-20 md:py-32 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-5xl font-bold text-center mb-10"
        >
          La Carta
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              style={
                active === tab
                  ? { boxShadow: "0 0 12px rgba(201,168,76,0.3)" }
                  : {}
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-0"
          >
            {menu[active]?.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group flex items-center justify-between py-4 border-b border-border/40 cursor-default"
              >
                <span className="text-foreground text-base transition-colors duration-200 group-hover:translate-x-1 transform transition-transform duration-200">
                  {item.name}
                </span>
                <span className="text-primary font-semibold text-sm ml-4 whitespace-nowrap transition-colors duration-200 group-hover:text-[#e8c97a]">
                  {item.price}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="text-muted-foreground text-xs text-center mt-8 italic">
          Consulta disponibilidad de platos del día. Carta sujeta a cambios de temporada.
        </p>
      </div>
    </section>
  );
};

export default LaCarta;
