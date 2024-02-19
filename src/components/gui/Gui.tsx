import { InventoryContext } from "@/app/hooks/useInventoryData";
import { useContext } from "react";

export const Gui = () => {
  const iconClassBase =
    "bg-gestures-sprite h-20 w-20 flex justify-end items-end rounded-lg";
  const numberClass =
    "bg-gray-800/40 h-8 w-8 flex justify-center items-center p-0 m-0 text-xl rounded-lg text-white";

  const { inventory } = useContext(InventoryContext);

  const paperCount = inventory["gesture-paper"];
  const scissorCount = inventory["gesture-scissors"];
  const rockCount = inventory["gesture-rock"];

  return (
    <div className="w-full fixed z-50 mt-20">
      <div className="container relative flex justify-end mx-auto  z-50 gap-5">
        {!!paperCount && (
          <div
            className={`${iconClassBase} bg-[length:250px] bg-[position:-172px_0px]`}
          >
            <p className={numberClass}>{paperCount}</p>
          </div>
        )}
        {!!scissorCount && (
          <div
            className={`${iconClassBase} bg-[length:260px] bg-[position:-65px_0px]`}
          >
            <p className={numberClass}>{scissorCount}</p>
          </div>
        )}
        {!!rockCount && (
          <div
            className={`${iconClassBase} bg-[length:235px] bg-[position:-4px_-150px]`}
          >
            <p className={numberClass}>{rockCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};
