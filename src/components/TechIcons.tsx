import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";

interface Props {
  techStack: string[];
}

export const TechIcons = async ({ techStack }: Props) => {
  const techLogos = await getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {techLogos.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "group bg-dark-300 flex-center relative flex rounded-full p-2",
            index >= 1 && "-ml-3",
          )}
        >
          <span className="tech-tooltip">{tech}</span>

          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};
