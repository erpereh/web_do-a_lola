import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
        <div>
          <p
            className="font-display text-2xl font-bold text-foreground"
            style={{ textShadow: "0 0 20px rgba(201,168,76,0.25)" }}
          >
            Doña Lola
          </p>
          <p className="text-muted-foreground text-xs tracking-widest uppercase mt-1">
            Gastrotaberna · Vallecas · Madrid
          </p>
        </div>

        <div className="flex gap-6 text-sm text-muted-foreground">
          {[
            { label: "Inicio", href: "#hero" },
            { label: "Carta", href: "#carta" },
            { label: "Reservas", href: "#reservas" },
            { label: "Contacto", href: "#reservas" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="https://instagram.com/donalolagastrotaberna"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
        >
          <Instagram size={16} />
          <span>@donalolagastrotaberna</span>
        </a>

        {/* Ornamental divider */}
        <div className="flex items-center gap-3 opacity-40">
          <div className="h-px w-16 bg-primary" />
          <span className="text-primary text-xs">◆</span>
          <div className="h-px w-16 bg-primary" />
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>© 2025 Doña Lola Restaurante Gastrotaberna. Todos los derechos reservados.</p>
          <div className="flex gap-4 justify-center">
            <a href="#" className="hover:text-foreground transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
