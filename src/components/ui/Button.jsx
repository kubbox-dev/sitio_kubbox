import { motion } from "framer-motion";

/**
 * variant: 'primary' | 'outline' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  style = {},
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    letterSpacing: "0.02em",
    borderRadius: "0.375rem",
    cursor: "pointer",
    border: "2px solid transparent",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition:
      "background var(--transition-base), color var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base)",
  };

  const sizes = {
    sm: { padding: "0.5rem 1.125rem", fontSize: "0.875rem" },
    md: { padding: "0.75rem 1.75rem", fontSize: "1rem" },
    lg: { padding: "0.9rem 2.25rem", fontSize: "1.1rem" },
  };

  const variants = {
    primary: {
      background: "var(--c-cta-bg)",
      color: "var(--c-cta-ink)",
      borderColor: "var(--c-cta-bg)",
    },
    outline: {
      background: "transparent",
      color: "var(--c-lime)",
      borderColor: "var(--c-lime)",
    },
    ghost: {
      background: "transparent",
      color: "var(--c-ink)",
      borderColor: "transparent",
    },
  };

  return (
    <motion.button
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      whileHover={{
        scale: 1.03,
        boxShadow:
          variant === "primary"
            ? "0 0 24px var(--glow-lime)"
            : "0 0 16px var(--glow-lime)",
      }}
      whileTap={{ scale: 0.97 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
