import { TextareaContext } from "@/components/textarea/useTextareaContext";
import { useContext } from "react";

export const TextArea = () => {
  const { isVisible, text } = useContext(TextareaContext);

  return (
    isVisible && (
      <div className="absolute w-full h-[30vh] left-0 bottom-0 z-50  flex items-center justify-center p-10">
        <div className="w-[70vw] h-full bg-opacity-80 bg-gray-800 rounded-lg p-6">
          <p className="text-white text-xl p-5 border-white border-4 rounded-lg h-full">
            {text}
          </p>
        </div>
      </div>
    )
  );
};
