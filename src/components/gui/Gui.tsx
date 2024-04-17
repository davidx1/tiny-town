import { useContext } from "react";
import { GestureIcon } from "../gestureIcon/GestureIcon";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/stores/rootStore";

export const Gui = observer(() => {
  const store = useContext(StoreContext);

  const {
    inventoryStore: { inventory },
  } = store;

  const paperCount = inventory["gesture-paper"];
  const scissorCount = inventory["gesture-scissors"];
  const rockCount = inventory["gesture-rock"];

  return (
    <div className="w-full fixed z-50 mt-20">
      <div className="container relative flex justify-end mx-auto  z-50 gap-5">
        {!!paperCount && (
          <GestureIcon gestureKey="gesture-paper" count={paperCount} />
        )}
        {!!scissorCount && (
          <GestureIcon gestureKey="gesture-scissors" count={scissorCount} />
        )}
        {!!rockCount && (
          <GestureIcon gestureKey="gesture-rock" count={rockCount} />
        )}
      </div>
    </div>
  );
});
