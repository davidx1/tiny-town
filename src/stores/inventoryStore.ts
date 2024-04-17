import { InventoryType, ItemKey } from "@/type.d";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

export const inventoryStoreName = "tiny-town-inventory-store";

export class InventoryStore {
  inventory: InventoryType;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.inventory = {
      "gesture-paper": 0,
      "gesture-rock": 0,
      "gesture-scissors": 0,
    };
  }

  saveInventory = () => {
    const newInventoryString = JSON.stringify(this.inventory);
    window.sessionStorage.setItem(inventoryStoreName, newInventoryString);
  };

  add(itemName: ItemKey, count: number = 1) {
    this.inventory[itemName] = this.inventory[itemName] + count;
    this.saveInventory();
  }

  remove(itemName: ItemKey, count: number = 1) {
    this.inventory[itemName] = Math.max(this.inventory[itemName] - count, 0);
    this.saveInventory();
  }
}
