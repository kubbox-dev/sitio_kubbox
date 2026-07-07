import React from "react";
import { InteractiveFolderGallery } from "../../ui/interactive-folder-gallery";

const serviciosPhotos = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
];

export default function GalleryServicesSection() {
  return (
    <section
      id="gallery-servicios"
      style={{
        position: "relative",
        paddingBlock: "clamp(2rem, 5vw, 4rem)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <InteractiveFolderGallery
          photos={serviciosPhotos}
          folderName={
            <span style={{ color: "var(--c-lime)" }}>GALERÍA DE SERVICIOS</span>
          }
          dragHintText="Arrastra cualquier foto hacia abajo para cerrar"
          className="scale-150 [&>div]:min-h-[600px]"
          visibleStack={5}
        />
      </div>
    </section>
  );
}
