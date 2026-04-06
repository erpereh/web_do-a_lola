import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Cocina con alma. Sabor de barrio.",
    subtitle: "Gastrotaberna en el corazón de Vallecas, Madrid.",
  },
  {
    title: "Producto honesto, fuego y tradición.",
    subtitle: "Recetas de siempre con un giro creativo y mucho cariño.",
  },
];

const EDGE_DELAY_MS = 1000;
const TEXT_FADE_MS = 220;
const SLOWDOWN_WINDOW_SECONDS = 0.8;
const MIN_END_RATE = 0.7;

type Direction = "forward" | "reverse";

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 72 : -72,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -72 : 72,
  }),
};

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [textDirection, setTextDirection] = useState<1 | -1>(1);
  const [visibleDirection, setVisibleDirection] = useState<Direction>("forward");

  const forwardVideoRef = useRef<HTMLVideoElement | null>(null);
  const reverseVideoRef = useRef<HTMLVideoElement | null>(null);
  const phaseTimerRef = useRef<number | null>(null);
  const textTimerRef = useRef<number | null>(null);
  const visibilityTimerRef = useRef<number | null>(null);
  const rateRafRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (phaseTimerRef.current !== null) {
      window.clearTimeout(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }

    if (textTimerRef.current !== null) {
      window.clearTimeout(textTimerRef.current);
      textTimerRef.current = null;
    }

    if (visibilityTimerRef.current !== null) {
      window.clearTimeout(visibilityTimerRef.current);
      visibilityTimerRef.current = null;
    }

    if (rateRafRef.current !== null) {
      window.cancelAnimationFrame(rateRafRef.current);
      rateRafRef.current = null;
    }
  };

  useEffect(() => {
    const forwardVideo = forwardVideoRef.current;
    const reverseVideo = reverseVideoRef.current;
    if (!forwardVideo || !reverseVideo) return;

    const pauseBoth = () => {
      forwardVideo.pause();
      reverseVideo.pause();
    };

    const startEndSlowdown = (video: HTMLVideoElement) => {
      if (rateRafRef.current !== null) {
        window.cancelAnimationFrame(rateRafRef.current);
        rateRafRef.current = null;
      }

      const tick = () => {
        if (video.paused || video.ended) {
          video.playbackRate = 1;
          rateRafRef.current = null;
          return;
        }

        const duration = video.duration;
        if (!duration || !Number.isFinite(duration)) {
          rateRafRef.current = window.requestAnimationFrame(tick);
          return;
        }

        const remaining = Math.max(0, duration - video.currentTime);

        if (remaining <= SLOWDOWN_WINDOW_SECONDS) {
          const normalized = Math.min(Math.max(remaining / SLOWDOWN_WINDOW_SECONDS, 0), 1);
          const smooth = normalized * normalized * (3 - 2 * normalized);
          video.playbackRate = MIN_END_RATE + (1 - MIN_END_RATE) * smooth;
        } else {
          video.playbackRate = 1;
        }

        rateRafRef.current = window.requestAnimationFrame(tick);
      };

      rateRafRef.current = window.requestAnimationFrame(tick);
    };

    const prepareAndStart = (next: Direction, target: HTMLVideoElement) => {
      let done = false;

      const finalize = () => {
        if (done) return;
        done = true;

        target.pause();
        target.currentTime = 0.04;
        setVisibleDirection(next);

        target.playbackRate = 1;
        const playPromise = target.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }

        startEndSlowdown(target);
        scheduleMidTextSwap(target);
      };

      const primeFrame = () => {
        target.currentTime = 0.04;
        const primePromise = target.play();
        if (primePromise !== undefined) {
          primePromise.catch(() => {
            finalize();
          });
        }

        if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
          target.requestVideoFrameCallback(() => finalize());
        } else {
          visibilityTimerRef.current = window.setTimeout(finalize, 80);
        }
      };

      if (target.readyState >= 2) {
        primeFrame();
      } else {
        const onLoadedData = () => {
          target.removeEventListener("loadeddata", onLoadedData);
          primeFrame();
        };
        target.addEventListener("loadeddata", onLoadedData);
        visibilityTimerRef.current = window.setTimeout(() => {
          target.removeEventListener("loadeddata", onLoadedData);
          finalize();
        }, 500);
      }
    };

    const scheduleMidTextSwap = (video: HTMLVideoElement) => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      const midpointMs = Math.max(250, (video.duration * 1000) / 2);

      if (textTimerRef.current !== null) {
        window.clearTimeout(textTimerRef.current);
      }

      textTimerRef.current = window.setTimeout(() => {
        setActiveSlide((prev) => {
          const next = prev === 0 ? 1 : 0;
          setTextDirection(next > prev ? 1 : -1);
          return next;
        });
      }, midpointMs);
    };

    const playPhase = (next: Direction) => {
      clearTimers();
      pauseBoth();

      const target = next === "forward" ? forwardVideo : reverseVideo;

      target.currentTime = 0;

      phaseTimerRef.current = window.setTimeout(() => {
        prepareAndStart(next, target);
      }, EDGE_DELAY_MS);
    };

    const onForwardEnded = () => {
      const epsilon = 1 / 60;
      if (forwardVideo.duration) {
        forwardVideo.currentTime = Math.max(forwardVideo.duration - epsilon, 0);
      }
      playPhase("reverse");
    };

    const onReverseEnded = () => {
      const epsilon = 1 / 60;
      if (reverseVideo.duration) {
        reverseVideo.currentTime = Math.max(reverseVideo.duration - epsilon, 0);
      }
      playPhase("forward");
    };

    forwardVideo.addEventListener("ended", onForwardEnded);
    reverseVideo.addEventListener("ended", onReverseEnded);

    playPhase("forward");

    return () => {
      clearTimers();
      pauseBoth();
      forwardVideo.removeEventListener("ended", onForwardEnded);
      reverseVideo.removeEventListener("ended", onReverseEnded);
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <video
        ref={forwardVideoRef}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover ${
          visibleDirection === "forward" ? "opacity-100" : "opacity-0"
        }`}
        src="/hero.mp4"
      />

      <video
        ref={reverseVideoRef}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover ${
          visibleDirection === "reverse" ? "opacity-100" : "opacity-0"
        }`}
        src="/hero-reverse.mp4"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              custom={textDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: TEXT_FADE_MS / 1000, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
                {slides[activeSlide].title}
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl mb-10 font-light">
                {slides[activeSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#reservas"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium text-base hover:shadow-[0_0_25px_hsl(var(--gold)/0.5)] transition-shadow duration-300"
            >
              Reservar mesa
            </a>
            <a
              href="#carta"
              className="border border-foreground/30 text-foreground px-8 py-3 rounded-full font-medium text-base hover:border-primary hover:text-primary transition-colors duration-300"
            >
              Ver la carta
            </a>
          </motion.div>

          <div className="flex justify-center gap-2 mt-10">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-8 bg-primary" : "w-2 bg-foreground/40"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-primary animate-bounce-slow" />
      </motion.div>
    </section>
  );
};

export default Hero;
