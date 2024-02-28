import { GestureKey } from "@/type.d";

interface GestureIconProp {
  gestureKey: GestureKey;
  count: number;
  className?: string;
}
export const GestureIcon = ({
  gestureKey,
  count,
  className = "",
}: GestureIconProp) => {
  const keyToSpritePositionMap: Record<GestureKey, string> = {
    "gesture-paper": "bg-[length:250px] bg-[position:-172px_0px]",
    "gesture-scissors": "bg-[length:260px] bg-[position:-65px_0px]",
    "gesture-rock": "bg-[length:235px] bg-[position:-4px_-150px]",
  };
  const positionClass = keyToSpritePositionMap[gestureKey];
  return (
    <div
      className={`bg-gestures-sprite h-20 w-20 flex justify-end items-end rounded-lg ${positionClass} ${className}`}
    >
      <p className="bg-gray-800/40 h-8 w-8 flex justify-center items-center p-0 m-0 text-xl rounded-lg text-white">
        {count}
      </p>
    </div>
  );
};
