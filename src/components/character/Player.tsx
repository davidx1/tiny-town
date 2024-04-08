import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Character from "./Character";
import { StoreContext } from "@/stores/rootStore";

export const Player = observer(() => {
  // Grab the timer from the context.
  const store = useContext(StoreContext); // See the Timer definition above.
  return (
    <Character
      characterBgClass="bg-player-sprite"
      direction={store?.moveStore.direction}
      isMoving={store?.moveStore.isMoving}
    ></Character>
  );
});
