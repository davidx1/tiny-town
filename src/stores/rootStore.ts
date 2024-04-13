import { autorun, makeAutoObservable } from "mobx";
import { MoveStore } from "./moveStore";
import { ConverseStore } from "./converseStore";
import { InventoryStore, inventoryStoreName } from "./inventoryStory";

import { createContext } from "react";
import { Cell, CoordinateType, DirectionType, PlotType } from "@/type.d";
import { triggerType } from "@/hooks/useTriggers";

export class RootStore {
  moveStore: MoveStore;
  converseStore: ConverseStore;
  inventoryStore: InventoryStore;
  mode: "moveStore" | "converseStore";
  plot?: PlotType;

  constructor() {
    this.moveStore = new MoveStore(this);
    this.converseStore = new ConverseStore(this);
    this.inventoryStore = new InventoryStore(this);
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
    const inventoryString = window.sessionStorage.getItem(inventoryStoreName);
    if (inventoryString) {
      this.inventoryStore.inventory = JSON.parse(inventoryString);
    }
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
