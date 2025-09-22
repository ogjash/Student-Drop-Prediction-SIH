import { cn } from "@/lib/utils";

export function DotBackground({ children, className }) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className={cn("absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]", 
        "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]")} />
      <div className="pointer-events-none absolute inset-0 bg-zinc-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
