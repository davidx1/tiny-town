import { Cell, CoordinateType } from "@/type.d";
import { GridData } from "./GridData";
import { observer, useObserver } from "mobx-react-lite";
import { StoreContext } from "@/stores/rootStore";
import { useContext } from "react";

interface GridProps {
  isDevMode?: boolean;
  data: Cell[][];
  onCellClick?: (c: CoordinateType) => void;
}

const Grid = observer(({ isDevMode, data, onCellClick }: GridProps) => {
  const store = useContext(StoreContext); // See the Timer definition above.
  const position = store?.moveStore.position;

  const bubbleStyle = position && {
    opacity: store.converseStore.isShowConverseIcon ? 1 : 0,
    top: `${position[0] * 3 - 4.5}rem`,
    left: `${position[1] * 3}rem`,
  };

  const style = position && {
    transitionProperty: "left, top",
    transitionDuration: "0.2s",
    transitionTimingFunction: "linear",
    top: `-${position[0] * 3}rem`,
    left: `-${position[1] * 3}rem`,
  };

  return (
    !store.moveStore.isLoading && (
      <div className="absolute ease-linear" style={style}>
        <GridData data={data} onCellClick={onCellClick} isDevMode={isDevMode} />
        <div
          className="absolute z-40 w-12 h-12 flex align-center justify-center"
          style={bubbleStyle}
        >
          <h1 className="text-3xl">💬</h1>
        </div>
      </div>
    )
  );
});

export default Grid;
