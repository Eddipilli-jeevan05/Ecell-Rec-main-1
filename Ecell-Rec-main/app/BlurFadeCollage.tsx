import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";

// Array of images stored in the public folder
const images = Array.from({ length: 6 }, (_, i) => {
  return `/group/group${i + 1}.jpg`
});

export default function BlurFadeCollage() {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
            <Image
              className="mb-4 size-full rounded-lg object-contain"
              src={imageUrl}
              alt={`Image ${idx + 1}`}
              width={800} // Adjust based on your image size
              height={600} // Adjust based on your image size
              layout="responsive" // Use responsive layout
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
