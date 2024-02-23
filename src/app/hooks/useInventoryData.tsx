import { createContext, useEffect, useState } from "react";
import { InventoryType, ItemKey } from "../type.d";

export interface InventoryValueType {
  inventory: InventoryType;
  isLoading: boolean;
  addToInventory: (item: ItemKey, count?: number) => void;
  removeFromInventory: (item: ItemKey, count?: number) => void;
}

const inventoryStoreName = "tiny-town-inventory-store";

const inventoryDefaultValue: InventoryValueType = {
  inventory: {} as InventoryType,
  isLoading: true,
  addToInventory: (item) => console.log(`Default Add ${item} to inventory`),
  removeFromInventory: (item) =>
    console.log(`Default Remove ${item} from inventory`),
};

export const InventoryContext = createContext<InventoryValueType>(
  inventoryDefaultValue,
);

export const useInventoryData = (): InventoryValueType => {
  const [inventory, setInventory] = useState<InventoryType>(
    {} as InventoryType,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedMapString = window.sessionStorage.getItem(inventoryStoreName);
    setInventory(
      storedMapString
        ? (JSON.parse(storedMapString) as InventoryType)
        : ({} as InventoryType),
    );
    setIsLoading(false);
  }, []);

  const saveInventory = (newInventory: InventoryType) => {
    const newInventoryString = JSON.stringify(newInventory);
    window.sessionStorage.setItem(inventoryStoreName, newInventoryString);
    setInventory(newInventory);
  };

  const addToInventory = (newItemStr: ItemKey, count: number = 1) => {
    const newInventory = {
      ...inventory,
      [newItemStr]: (inventory[newItemStr] || 0) + count,
    };
    saveInventory(newInventory);
  };

  const removeFromInventory = (itemToRemoveStr: ItemKey, count: number = 1) => {
    const newInventory =
      inventory?.[itemToRemoveStr] >= count
        ? {
            ...inventory,
            [itemToRemoveStr]: inventory[itemToRemoveStr] - count,
          }
        : {
            ...inventory,
            [itemToRemoveStr]: 0,
          };
    saveInventory(newInventory);
  };

  return { inventory, isLoading, addToInventory, removeFromInventory };
};
