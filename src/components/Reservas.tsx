import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Instagram, Clock } from "lucide-react";

const Reservas = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ nombre: "", telefono: "", fecha: "", personas: "", mensaje: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reservas" className="py-20 md:py-32 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-5xl font-bold text-center mb-14"
        >
          Ven a vernos
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">
                C. Alameda del Valle, 35, Villa de Vallecas, 28051 Madrid
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <a href="tel:681140528" className="text-foreground text-sm hover:text-primary transition-colors">
                681 14 05 28
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-primary flex-shrink-0" />
              <a
                href="https://instagram.com/donalolagastrotaberna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground text-sm hover:text-primary transition-colors"
              >
                @donalolagastrotaberna
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">Lunes — <span className="text-foreground">Cerrado</span></p>
                <p className="text-muted-foreground">Martes a Domingo — <span className="text-foreground">Abierto desde las 19:00</span></p>
                <p className="text-xs text-muted-foreground italic">(horario puede variar, consultar)</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 flex-wrap">
              {["Comer aquí", "Para llevar", "A domicilio"].map((s) => (
                <span key={s} className="text-xs bg-secondary text-foreground px-3 py-1.5 rounded-full border border-border">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-card border border-border rounded-2xl p-8 text-center">
                <p className="text-primary font-display text-2xl mb-2">¡Gracias!</p>
                <p className="text-muted-foreground text-sm">Te confirmaremos la reserva por teléfono.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4">
                <input
                  required
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  required
                  placeholder="Teléfono"
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Fecha"
                    type="date"
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    required
                    placeholder="Nº de personas"
                    type="number"
                    min={1}
                    value={form.personas}
                    onChange={(e) => setForm({ ...form, personas: e.target.value })}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <textarea
                  placeholder="Mensaje (opcional)"
                  rows={3}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)] transition-shadow duration-300"
                >
                  Solicitar reserva
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Te confirmaremos la reserva por teléfono.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl overflow-hidden border border-border"
        >
          <iframe
            title="Ubicación Doña Lola"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5!2d-3.6219!3d40.3761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f3c0a4b8b5b%3A0x0!2sC.%20Alameda%20del%20Valle%2C%2035%2C%2028051%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Reservas;
