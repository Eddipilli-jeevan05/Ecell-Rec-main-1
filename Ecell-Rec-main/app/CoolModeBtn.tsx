import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/ui/cool-mode";

export function CoolModeBtn({ name }: { name: string }) {
  return (
    <div className="relative justify-center">
      <CoolMode>
        <Button className="mt-[1.6rem] rounded-xl dark:bg-white dark:text-black dark:hover:bg-purple-700 dark:hover:text-white bg-[#000000] hover:bg-purple-700 text-white hover:text-white border-spacing-1 transition-all ease-in-out">{name}</Button>
      </CoolMode>
    </div>
  );
}
