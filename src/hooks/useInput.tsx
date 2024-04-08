import { KeyboardEventHandler, useEffect } from "react";

interface UseInputProps {
  onUpPressed: () => void;
  onUpReleased: () => void;
  onDownPressed: () => void;
  onDownReleased: () => void;
  onLeftPressed: () => void;
  onLeftReleased: () => void;
  onRightPressed: () => void;
  onRightReleased: () => void;
  onSelectPressed: () => void;
  onSelectReleased: () => void;
}

export const useInput = ({
  onUpPressed,
  onUpReleased,
  onDownPressed,
  onDownReleased,
  onLeftPressed,
  onLeftReleased,
  onRightPressed,
  onRightReleased,
  onSelectPressed,
  onSelectReleased,
}: UseInputProps) => {
  const onKeyDown: KeyboardEventHandler = (e) => {
    const keyActionMapping: Record<string, () => void> = {
      KeyA: onLeftPressed,
      KeyW: onUpPressed,
      KeyS: onDownPressed,
      KeyD: onRightPressed,
      Space: onSelectPressed,
    };
    if (!e.repeat) {
      const newCommand = keyActionMapping[e.code];
      if (newCommand) newCommand();
    }
  };

  const onKeyUp: KeyboardEventHandler = (e) => {
    const keyActionMapping: Record<string, () => void> = {
      KeyA: onLeftReleased,
      KeyW: onUpReleased,
      KeyS: onDownReleased,
      KeyD: onRightReleased,
      Space: onSelectReleased,
    };
    if (!e.repeat) {
      const newCommand = keyActionMapping[e.code];
      if (newCommand) newCommand();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown as any);
    window.addEventListener("keyup", onKeyUp as any);

    return () => {
      window.removeEventListener("keydown", onKeyDown as any);
      window.removeEventListener("keyup", onKeyUp as any);
    };
  }, []);
};
