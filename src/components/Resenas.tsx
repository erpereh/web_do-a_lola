import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  { stars: 5, text: "Muy buena relacion calidad-precio. Los torreznos estaban espectaculares y los callos muy ricos.", author: "David V.", sub: "Local Guide" },
  { stars: 5, text: "Siempre salgo satisfecho. La comida y el trato son de 10, ideal para comer o cenar.", author: "alb3r", sub: "" },
  { stars: 5, text: "Todo lo que hacen está buenísimo, da igual lo que pidas. El cachopo que probé por primera vez aquí fue una revelación.", author: "Laura S.R.", sub: "" },
  { stars: 4, text: "Lo mejor: cerveza fresquita, buenas tapas, buena carta. ¡Genial!", author: "Cliente habitual", sub: "" },
  { stars: 5, text: "Torreznos, croquetas, pollo tika, gambas al ajillo... todo con un sabor estupendo.", author: "Reseña de Google", sub: "" },
];

const Resenas = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), []);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section id="resenas" className="py-20 md:py-32 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-5xl font-bold text-center mb-14"
        >
          Lo que dicen nuestros clientes
        </motion.h2>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${current * 100}%` }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              {reviews.map((r, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center max-w-2xl mx-auto">
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={18}
                          className={s < r.stars ? "fill-primary text-primary" : "text-muted"}
                        />
                      ))}
                    </div>
                    <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                      "{r.text}"
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-display font-bold text-sm">
                        {r.author[0]}
                      </div>
                      <div className="text-left">
                        <p className="text-foreground text-sm font-medium">{r.author}</p>
                        {r.sub && <p className="text-muted-foreground text-xs">{r.sub}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={28} />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronRight size={28} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resenas;
