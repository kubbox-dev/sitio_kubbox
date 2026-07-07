import React from "react";
import { FlipWords } from "../../ui/flip-words";

export default function TecnologyWorkingSection() {
  const words = ["Tecnología", "Estrategia", "Creatividad"];

  return (
    <section className="py-20" style={{ marginTop: "70px" }}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-white text-2xl md:text-4xl font-bold text-center leading-[0.8]">
          <span className="flex items-center justify-center gap-2 flex-wrap">
            <FlipWords
              words={words}
              duration={2500}
              className="text-[#a3e635]"
            />
            <span className="text-white">trabajando</span>
          </span>
          <br />
          <span className="text-white">para el crecimiento de tu empresa.</span>
        </h2>
      </div>
    </section>
  );
}
