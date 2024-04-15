import { AllInputs } from "@/type.d";
import { KeyboardEventHandler, useEffect } from "react";

interface UseInputProps {
  onKeyPressed: KeyboardEventHandler;
  onKeyReleased: KeyboardEventHandler;
}

export const useInput = ({ onKeyPressed, onKeyReleased }: UseInputProps) => {
  useEffect(() => {
    window.addEventListener("keydown", onKeyPressed as any);
    window.addEventListener("keyup", onKeyReleased as any);

    return () => {
      window.removeEventListener("keydown", onKeyPressed as any);
      window.removeEventListener("keyup", onKeyReleased as any);
    };
  }, []);
};
