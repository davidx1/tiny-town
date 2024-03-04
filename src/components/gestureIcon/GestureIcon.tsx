import { GestureKey } from "@/type.d";

interface GestureIconProp {
  gestureKey: GestureKey;
  count?: number;
  hp?: number;
  className?: string;
}
export const GestureIcon = ({
  gestureKey,
  count,
  className = "",
  hp,
}: GestureIconProp) => {
  const keyToSpritePositionMap: Record<GestureKey, string> = {
    "gesture-paper": "bg-[length:250px] bg-[position:-172px_0px]",
    "gesture-scissors": "bg-[length:260px] bg-[position:-65px_0px]",
    "gesture-rock": "bg-[length:235px] bg-[position:-4px_-150px]",
  };
  const positionClass = keyToSpritePositionMap[gestureKey];
  const filterClass = hp === 0 ? "grayscale brightnedd-70" : "";
  return (
    <div>
      <div
        className={`bg-gestures-sprite h-20 w-20 flex justify-end items-end rounded-lg overflow-hidden ${positionClass} ${filterClass} ${className}`}
      >
        {count !== undefined && (
          <p className="bg-gray-800/40 h-8 w-8 flex justify-center items-center p-0 m-0 text-xl rounded-lg text-white">
            {count}
          </p>
        )}
      </div>
      {hp !== undefined && (
        <progress
          value={hp}
          max="4"
          className="w-20 h-3 rounded-lg opacity-80"
        ></progress>
      )}
    </div>
  );
};
