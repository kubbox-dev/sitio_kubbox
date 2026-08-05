"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

export default function VaporizeTextCycle({
  texts = ["Una marca coherente", "genera mejores", "resultados."],
  font = {
    fontFamily: "var(--font-display)",
    fontSize: 80,
    fontWeight: 700,
  },
  color = "#ffffff",
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2.5,
    fadeInDuration: 1.2,
    waitDuration: 1.5,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = "h2",
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState("vaporizing");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Configurar dimensiones
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width || 600,
          height: rect.height || 400,
        });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  // Crear partículas desde el texto
  const createParticles = useCallback(
    (ctx, canvas, text, textX, textY, fontStr, color, alignment) => {
      const particles = [];

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = fontStr;
      ctx.textAlign = alignment;
      ctx.textBaseline = "middle";

      ctx.fillText(text, textX, textY);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const sampleRate = 2;

      for (let y = 0; y < canvas.height; y += sampleRate) {
        for (let x = 0; x < canvas.width; x += sampleRate) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 0) {
            particles.push({
              x,
              y,
              originalX: x,
              originalY: y,
              color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${alpha / 255})`,
              opacity: alpha / 255,
              originalAlpha: alpha / 255,
              velocityX: 0,
              velocityY: 0,
              angle: 0,
              speed: 0,
              shouldFadeQuickly: false,
            });
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return particles;
    },
    [],
  );

  // Renderizar partículas
  const renderParticles = useCallback((ctx, particles, width, height) => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      if (particle.opacity > 0.01) {
        ctx.fillStyle = particle.color.replace(
          /[\d.]+\)$/,
          `${particle.opacity})`,
        );
        ctx.fillRect(particle.x, particle.y, 2, 2);
      }
    });
  }, []);

  // Actualizar partículas (efecto vaporización)
  const updateParticles = useCallback(
    (particles, vaporizeX, deltaTime, spread, duration, direction) => {
      let allVaporized = true;

      particles.forEach((particle) => {
        const shouldVaporize =
          direction === "left-to-right"
            ? particle.originalX <= vaporizeX
            : particle.originalX >= vaporizeX;

        if (shouldVaporize) {
          if (particle.speed === 0) {
            particle.angle = Math.random() * Math.PI * 2;
            particle.speed = (Math.random() * 1 + 0.5) * spread * 3;
            particle.velocityX = Math.cos(particle.angle) * particle.speed;
            particle.velocityY = Math.sin(particle.angle) * particle.speed;
            particle.shouldFadeQuickly = Math.random() > 0.3;
          }

          if (particle.shouldFadeQuickly) {
            particle.opacity = Math.max(0, particle.opacity - deltaTime * 3);
          } else {
            const dx = particle.originalX - particle.x;
            const dy = particle.originalY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const damping = Math.max(0.9, 1 - distance / (200 * spread));

            particle.velocityX =
              (particle.velocityX +
                (Math.random() - 0.5) * spread * 3 +
                dx * 0.003) *
              damping;
            particle.velocityY =
              (particle.velocityY +
                (Math.random() - 0.5) * spread * 3 +
                dy * 0.003) *
              damping;

            const maxV = spread * 5;
            const currentV = Math.sqrt(
              particle.velocityX * particle.velocityX +
                particle.velocityY * particle.velocityY,
            );
            if (currentV > maxV) {
              const scale = maxV / currentV;
              particle.velocityX *= scale;
              particle.velocityY *= scale;
            }

            particle.x += particle.velocityX * deltaTime * 25;
            particle.y += particle.velocityY * deltaTime * 12;
            particle.opacity = Math.max(0, particle.opacity - deltaTime * 0.5);
          }

          if (particle.opacity > 0.01) {
            allVaporized = false;
          }
        } else {
          allVaporized = false;
        }
      });

      return allVaporized;
    },
    [],
  );

  // Reiniciar partículas
  const resetParticles = useCallback((particles) => {
    particles.forEach((p) => {
      p.x = p.originalX;
      p.y = p.originalY;
      p.opacity = p.originalAlpha;
      p.speed = 0;
      p.velocityX = 0;
      p.velocityY = 0;
    });
  }, []);

  // Iniciar animación
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Configurar tamaño del canvas
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const currentText = texts[currentTextIndex] || "";
    // MULTIPLICAR fontSize POR 1.5 PARA QUE SE VEA GRANDE
    const fontSize =
      (typeof font.fontSize === "number" ? font.fontSize : 80) * 1.5;
    const fontStr = `${font.fontWeight || 700} ${fontSize}px ${font.fontFamily || "Arial, sans-serif"}`;

    const textX = dimensions.width / 2;
    const textY = dimensions.height / 2;

    const particles = createParticles(
      ctx,
      canvas,
      currentText,
      textX,
      textY,
      fontStr,
      color,
      alignment,
    );

    particlesRef.current = particles;
    renderParticles(ctx, particles, dimensions.width, dimensions.height);

    setAnimationState("vaporizing");
    vaporizeProgressRef.current = 0;
    fadeOpacityRef.current = 0;

    let lastTime = performance.now();
    let frameId;

    const animate = (currentTime) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      switch (animationState) {
        case "vaporizing": {
          vaporizeProgressRef.current +=
            (deltaTime * 100) / (animation.vaporizeDuration || 2);

          const progress = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX = dimensions.width * (progress / 100);

          const allVaporized = updateParticles(
            particlesRef.current,
            vaporizeX,
            deltaTime,
            spread,
            animation.vaporizeDuration || 2,
            direction,
          );

          renderParticles(
            ctx,
            particlesRef.current,
            dimensions.width,
            dimensions.height,
          );

          if (vaporizeProgressRef.current >= 100 && allVaporized) {
            const nextIndex = (currentTextIndex + 1) % texts.length;
            setCurrentTextIndex(nextIndex);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
          }
          break;
        }
        case "fadingIn": {
          fadeOpacityRef.current += deltaTime / (animation.fadeInDuration || 1);

          particlesRef.current.forEach((p) => {
            p.x = p.originalX;
            p.y = p.originalY;
            p.opacity = Math.min(fadeOpacityRef.current, 1) * p.originalAlpha;
          });

          renderParticles(
            ctx,
            particlesRef.current,
            dimensions.width,
            dimensions.height,
          );

          if (fadeOpacityRef.current >= 1) {
            setAnimationState("waiting");
            setTimeout(
              () => {
                setAnimationState("vaporizing");
                vaporizeProgressRef.current = 0;
                resetParticles(particlesRef.current);

                const newText = texts[currentTextIndex] || "";
                const newFontSize =
                  (typeof font.fontSize === "number" ? font.fontSize : 80) *
                  1.5;
                const newFontStr = `${font.fontWeight || 700} ${newFontSize}px ${font.fontFamily || "Arial, sans-serif"}`;
                const newTextX = dimensions.width / 2;
                const newTextY = dimensions.height / 2;

                const newParticles = createParticles(
                  ctx,
                  canvas,
                  newText,
                  newTextX,
                  newTextY,
                  newFontStr,
                  color,
                  alignment,
                );
                particlesRef.current = newParticles;
              },
              (animation.waitDuration || 0.5) * 1000,
            );
          }
          break;
        }
        case "waiting": {
          renderParticles(
            ctx,
            particlesRef.current,
            dimensions.width,
            dimensions.height,
          );
          break;
        }
        default: {
          renderParticles(
            ctx,
            particlesRef.current,
            dimensions.width,
            dimensions.height,
          );
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [
    dimensions,
    currentTextIndex,
    texts,
    font,
    color,
    alignment,
    spread,
    direction,
    animation,
    createParticles,
    renderParticles,
    updateParticles,
    resetParticles,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
