import { createContext } from "react";

export const textareaInitialValue = {
  isVisible: true,
  text: "hello",
};

export const TextareaContext = createContext<{
  isVisible: boolean;
  text: string;
}>(textareaInitialValue);

export 