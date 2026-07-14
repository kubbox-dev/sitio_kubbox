import { motion } from "framer-motion";

const LOGOS = [
  { src: "/images/DESARROLLO DIGITAL/WEB/logos/laravel.svg", alt: "Laravel" },
  { src: "/images/DESARROLLO DIGITAL/WEB/logos/php.svg", alt: "PHP" },
  {
    src: "/images/DESARROLLO DIGITAL/WEB/logos/wordpress.svg",
    alt: "WordPress",
  },
  { src: "/images/DESARROLLO DIGITAL/WEB/logos/react.svg", alt: "React" },
];

const SOLID_STYLE = {
  color: "var(--c-lime)",
  WebkitTextStroke: "1.5px var(--c-lime)",
};

const OUTLINE_STYLE = {
  color: "transparent",
  WebkitTextStroke: "1.5px oklch(0.98 0 0 / 0.85)",
};

export default function DigitalPlatformsSection() {
  return (
    <section className="relative py-[clamp(3rem,7vw,6.5rem)]">
      <div className="mx-auto flex max-w-[var(--container)] flex-col items-start gap-[clamp(2rem,5vw,3rem)] px-[var(--container-pad)] min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="m-0 shrink-0 [font-family:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-black italic leading-[0.95] tracking-[-0.02em] min-[900px]:basis-[34%]"
        >
          <span style={SOLID_STYLE}>NUESTRAS</span>
          <br />
          <span style={OUTLINE_STYLE}>PLATAFORMAS</span>
        </motion.h2>

        <span
          aria-hidden="true"
          className="h-px w-full [background:linear-gradient(to_right,var(--c-lime),transparent)] min-[900px]:h-[88px] min-[900px]:w-px min-[900px]:[background:linear-gradient(to_bottom,var(--c-lime),transparent)]"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.15 },
            },
          }}
          className="grid w-full grid-cols-2 items-center justify-items-center gap-x-[clamp(2rem,6vw,3.5rem)] gap-y-[clamp(1.75rem,4vw,2.5rem)] min-[900px]:flex min-[900px]:w-auto min-[900px]:flex-nowrap min-[900px]:justify-end min-[900px]:gap-[clamp(1.75rem,3vw,2.75rem)]"
        >
          {LOGOS.map((logo) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -4, scale: 1.08 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-[clamp(28px,4vw,40px)] w-auto opacity-80 [filter:drop-shadow(0_0_0_transparent)] transition-[opacity,filter] duration-300 ease-out hover:opacity-100 hover:[filter:drop-shadow(0_0_14px_oklch(0.88_0.26_130_/_0.65))]"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
