import { autorun, makeAutoObservable } from "mobx";
import { MoveStore } from "./moveStore";
import { ConverseStore } from "./converseStore";
import { InventoryStore, inventoryStoreName } from "./inventoryStore";

import { createContext } from "react";
import {
  Cell,
  Conversation,
  CoordinateType,
  DirectionType,
  PlotType,
} from "@/type.d";
import { triggerType } from "@/hooks/useTriggers";
import { PlotStore, plotStoreName } from "./plotStore";

export class RootStore {
  moveStore: MoveStore;
  converseStore: ConverseStore;
  inventoryStore: InventoryStore;
  plotStore: PlotStore;
  mode: "moveStore" | "converseStore";
  plot?: PlotType;

  constructor() {
    this.moveStore = new MoveStore(this);
    this.converseStore = new ConverseStore(this);
    this.inventoryStore = new InventoryStore(this);
    this.plotStore = new PlotStore(this);
    this.mode = "moveStore";
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setMode = (mode: "moveStore" | "converseStore") => {
    this.mode = mode;
  };

  initialize = ({
    mapData,
    initialPosition,
    initialDirection,
    triggerRecord,
    conversationRecord,
  }: {
    mapData: Cell[][];
    initialPosition: CoordinateType;
    initialDirection: DirectionType;
    triggerRecord: Record<string, triggerType[]>;
    conversationRecord: Record<string, Conversation>;
  }) => {
    this.moveStore.mapData = mapData;
    this.moveStore.direction = initialDirection;
    this.moveStore.position = initialPosition;
    this.moveStore.triggerRecord = triggerRecord;
    this.converseStore.conversationRecord = conversationRecord;
    const inventoryString = window.sessionStorage.getItem(inventoryStoreName);
    const plotString = window.sessionStorage.getItem(plotStoreName);

    if (inventoryString) {
      this.inventoryStore.inventory = JSON.parse(inventoryString);
    }

    if (plotString) {
      this.plotStore.plot = JSON.parse(plotString);
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
