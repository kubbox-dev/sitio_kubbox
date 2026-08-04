"use client";

import * as React from "react";
import { motion } from "motion/react";
import Button from "../../ui/Button";

const SPRING_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const filterVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

const areaClasses = [
  "col-start-1 col-end-2 row-start-1 row-end-3", // Imagen 1: izquierda arriba
  "col-start-2 col-end-3 row-start-2 row-end-4", // Imagen 2: derecha medio
  "col-start-2 col-end-3 row-start-4 row-end-6", // Imagen 3: derecha abajo
  "col-start-1 col-end-2 row-start-3 row-end-5", // Imagen 4: izquierda medio
];

export const ContainerStagger = React.forwardRef(
  ({ transition, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          staggerChildren: transition?.staggerChildren ?? 0.2,
          delayChildren: transition?.delayChildren ?? 0.2,
          duration: 0.3,
          ...transition,
        }}
        {...props}
      />
    );
  },
);
ContainerStagger.displayName = "ContainerStagger";

export const ContainerAnimated = React.forwardRef(
  ({ transition, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={filterVariants}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          ...SPRING_TRANSITION_CONFIG,
          duration: 0.3,
          ...transition,
        }}
        {...props}
      />
    );
  },
);
ContainerAnimated.displayName = "ContainerAnimated";

export const GalleryGrid = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4 ${className || ""}`}
      {...props}
    />
  );
});
GalleryGrid.displayName = "ContainerSticky";

export const GalleryGridCell = React.forwardRef(
  ({ className, transition, index, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          duration: 0.5,
          delay: index * 0.15,
          ease: [0.16, 1, 0.3, 1],
          ...transition,
        }}
        className={`relative overflow-hidden rounded-xl shadow-xl ${areaClasses[index]} ${className || ""}`}
        {...props}
      />
    );
  },
);
GalleryGridCell.displayName = "GalleryGridCell";
