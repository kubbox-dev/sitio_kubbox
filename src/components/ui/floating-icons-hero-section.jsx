import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";
import Button from "./Button";

const Icon = ({ mouseX, mouseY, iconData, index }) => {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2),
        );
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2),
          );
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      key={iconData.id}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className={cn("absolute", iconData.className)}
    >
      <motion.div
        className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20 p-1 md:p-3 rounded-3xl shadow-xl border-none bg-[#101010] backdrop-blur-md"
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <iconData.icon className="w-5 h-5 md:w-10 md:h-10 text-foreground" />
      </motion.div>
    </motion.div>
  );
};

const FloatingIconsHero = React.forwardRef(
  (
    {
      className,
      title,
      subtitle,
      ctaText,
      ctaHref,
      icons = [],
      disableFade = false,
      disableBg = false,
      withShadow = false,
      ...props
    },
    ref,
  ) => {
    const mouseX = React.useRef(0);
    const mouseY = React.useRef(0);
    const handleMouseMove = (event) => {
      mouseX.current = event.clientX;
      mouseY.current = event.clientY;
    };

    return (
      <section
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn(
          "relative w-full flex items-center justify-center py-24 md:py-32",
          !disableBg && "bg-[#050708]",
          withShadow &&
            "shadow-[0_80px_120px_rgba(0,0,0,0.95),0_-80px_120px_rgba(0,0,0,0.95)]",
          className,
        )}
        {...props}
      >
        {!disableBg && <div className="absolute inset-0 bg-[#050708]" />}
        {!disableFade && (
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        )}
        {!disableFade && (
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        )}
        <div className="absolute inset-0 w-full h-full">
          {icons.map((iconData, index) => (
            <Icon
              key={iconData.id}
              mouseX={mouseX}
              mouseY={mouseY}
              iconData={iconData}
              index={index}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <h1
            className="text-3xl md:text-5xl font-black tracking-tight leading-tight"
            style={{ fontWeight: 900 }}
          >
            {title}
          </h1>
          {subtitle ? (
            typeof subtitle === "string" ? (
              <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground font-semibold md:font-bold">
                {subtitle}
              </p>
            ) : (
              <div className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground font-semibold md:font-bold">
                {subtitle}
              </div>
            )
          ) : null}
          {ctaText ? (
            <div className="mt-10">
              <Button className="px-8 py-6 text-base font-semibold">
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    );
  },
);

FloatingIconsHero.displayName = "FloatingIconsHero";

export default FloatingIconsHero;
