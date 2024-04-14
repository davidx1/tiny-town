import { StoreContext } from "@/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export const TextArea = observer(() => {
  const {
    converseStore: { label, options, hoveringOptionIndex },
  } = useContext(StoreContext); // See the Timer definition above.

  return (
    label && (
      <div className="absolute w-full min-h-[30vh] left-0 bottom-0 z-50 flex items-center justify-center p-10">
        <div className="w-[70vw] h-full bg-opacity-80 bg-gray-800 rounded-lg p-6">
          <div className="p-5 border-white border-4 rounded-lg h-full">
            <p className="text-white text-xl">{label}</p>
            {options && (
              <ul className="mt-3 text-lg">
                {options.map((option, index) => (
                  <li
                    key={option.optionLabel}
                    className={
                      index !== hoveringOptionIndex
                        ? "ml-5 text-gray-400"
                        : "text-white"
                    }
                  >
                    <span>{index === hoveringOptionIndex ? "➢ " : ""}</span>
                    {option.optionLabel}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  );
});
