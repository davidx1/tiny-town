import { makeAutoObservable } from "mobx";
import { MoveStore } from "./moveStore";
import { ConverseStore } from "./converseStore";
import { createContext } from "react";
import { Cell, CoordinateType, DirectionType } from "@/type.d";

export class RootStore {
  moveStore: MoveStore;
  converseStore: ConverseStore;
  mode: "moveStore" | "converseStore";

  constructor() {
    this.moveStore = new MoveStore(this);
    this.converseStore = new ConverseStore(this);
    this.mode = "moveStore";
    makeAutoObservable(this, {}, { autoBind: true });
  }

  initialize = ({
    mapData,
    initialPosition,
    initialDirection,
  }: {
    mapData: Cell[][];
    initialPosition: CoordinateType;
    initialDirection: DirectionType;
  }) => {
    this.moveStore.mapData = mapData;
    this.moveStore.direction = initialDirection;
    this.moveStore.position = initialPosition;
  };

  onUpPressed = () => {
    this[this.mode].onUpPressed();
  };

  onUpReleased = () => {
    this[this.mode].onUpReleased();
  };

  onDownPressed = () => {
    this[this.mode].onDownPressed();
  };

  onDownReleased = () => {
    this[this.mode].onDownReleased();
  };

  onLeftPressed = () => {
    this[this.mode].onLeftPressed();
  };

  onLeftReleased = () => {
    this[this.mode].onLeftReleased();
  };

  onRightPressed = () => {
    this[this.mode].onRightPressed();
  };

  onRightReleased = () => {
    this[this.mode].onRightReleased();
  };

  onSelectPressed = () => {
    this[this.mode].onSelectPressed();
  };

  onSelectReleased = () => {
    this[this.mode].onSelectReleased();
  };
}

export const store = new RootStore();

export const StoreContext = createContext<RootStore | undefined>(undefined);
