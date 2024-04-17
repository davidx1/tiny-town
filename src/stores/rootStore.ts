import { makeAutoObservable } from "mobx";
import { MoveStore } from "./moveStore";
import { ConverseStore } from "./converseStore";
import { InventoryStore, inventoryStoreName } from "./inventoryStore";

import { KeyboardEventHandler, createContext } from "react";
import {
  Cell,
  Conversation,
  CoordinateType,
  DirectionType,
  PlotType,
  triggerType,
} from "@/type.d";
import { PlotStore, plotStoreName } from "./plotStore";
import { BattleStore } from "./battleStore";

export class RootStore {
  moveStore: MoveStore;
  converseStore: ConverseStore;
  inventoryStore: InventoryStore;
  plotStore: PlotStore;
  battleStore: BattleStore;
  mode: "moveStore" | "converseStore" | "battleStore";
  plot?: PlotType;

  constructor() {
    this.moveStore = new MoveStore(this);
    this.converseStore = new ConverseStore(this);
    this.inventoryStore = new InventoryStore(this);
    this.plotStore = new PlotStore(this);
    this.battleStore = new BattleStore(this);
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
    mapData?: Cell[][];
    initialPosition?: CoordinateType;
    initialDirection?: DirectionType;
    triggerRecord?: Record<string, triggerType[]>;
    conversationRecord?: Record<string, Conversation>;
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
    } else {
      this.plotStore.plot = {} as PlotType;
    }
  };

  onKeyPressed: KeyboardEventHandler = (evt) => {
    this[this.mode].onKeyPressed(evt.code);
  };

  onKeyReleased: KeyboardEventHandler = (evt) => {
    this[this.mode].onKeyReleased(evt.code);
  };
}

export const store = new RootStore();

export const StoreContext = createContext<RootStore | undefined>(undefined);
