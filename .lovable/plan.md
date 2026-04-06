

## Vídeo Hero con Transición Scroll-Driven hacia "Sobre Nosotros"

### Resumen

Copiar `hero.mp4` al proyecto, usarlo como fondo del Hero con autoplay+loop, y crear una transición controlada por scroll donde el vídeo se "encoge" hasta aterrizar en la columna derecha de "Sobre Nosotros".

### Arquitectura

Se crea un nuevo componente wrapper `HeroVideoSection` que envuelve Hero + SobreNosotros en un contenedor sticky de ~200vh. Un único `<video>` se posiciona sticky y, mediante scroll progress, transiciona de fullscreen a la posición/tamaño exacto del placeholder derecho de SobreNosotros.

```text
┌─────────────────────────────────┐
│  <div> height: 250vh            │  ← scroll container
│  ┌─────────────────────────────┐│
│  │ sticky top:0, h:100vh       ││
│  │  ┌─────────────────────┐   ││
│  │  │ <video> transitions  │   ││  ← fullscreen → small rect
│  │  │ from full to corner  │   ││
│  │  └─────────────────────┘   ││
│  │  Hero content (text/CTAs)   ││  ← fades out as scroll progresses
│  │  SobreNosotros content      ││  ← fades in as scroll progresses
│  └─────────────────────────────┘│
└─────────────────────────────────┘
```

### Archivos a modificar

1. **Copiar vídeo**: `hero.mp4` → `public/videos/hero.mp4`

2. **Nuevo componente `src/components/HeroVideoSection.tsx`**:
   - Contenedor `div` de 250vh con `position: relative`
   - Dentro, un `div` sticky (top:0, h:100vh) que contiene:
     - `<video src="/videos/hero.mp4" autoPlay muted loop playsInline>` con estilos inline animados por scroll progress
     - Overlay oscuro (50% opacidad) que se ajusta con el vídeo
     - Contenido del Hero (texto, CTAs, flecha) — se desvanece al ~40% del scroll
     - Contenido de SobreNosotros — aparece desde el ~50% del scroll
   - Usar `useEffect` + scroll listener con `requestAnimationFrame` para calcular el progreso (0–1) basado en `getBoundingClientRect` del contenedor
   - Interpolar posición/tamaño del vídeo: de `inset: 0` (fullscreen) a las coordenadas exactas del placeholder derecho (aprox. `top: Y, right: X, width: 50%, aspect-ratio: 4/3, border-radius: 1rem`)
   - El vídeo sigue en autoPlay+loop todo el tiempo (no controlamos currentTime, el usuario pidió loop continuo en el hero)

3. **`src/components/Hero.tsx`** — Extraer solo el contenido (texto, botones, flecha) como export para ser usado dentro de HeroVideoSection. O simplemente mover ese JSX inline al nuevo componente.

4. **`src/components/SobreNosotros.tsx`** — Extraer solo el contenido (texto + stats, sin el placeholder derecho) para uso dentro de HeroVideoSection. El placeholder se reemplaza por el vídeo que "aterriza" ahí.

5. **`src/pages/Index.tsx`** — Reemplazar `<Hero />` y `<SobreNosotros />` por `<HeroVideoSection />`.

### Detalles de la transición scroll

- **0%–30%**: Vídeo fullscreen, overlay 50%, Hero text visible, scroll arrow visible
- **30%–50%**: Hero text fade out, vídeo empieza a encogerse, overlay se reduce
- **50%–80%**: Vídeo se mueve a la derecha y se reduce a aspect-ratio 4/3, SobreNosotros text fade in a la izquierda
- **80%–100%**: Vídeo llega a su posición final (columna derecha, rounded-2xl), overlay desaparece, SobreNosotros completo visible
- Al terminar el sticky, el layout queda exacto al SobreNosotros original con el vídeo en loop en la derecha

### Sin cambios en otras secciones
PlatosEstrella, LaCarta, Reseñas, Terraza, Reservas, Footer quedan intactos.

