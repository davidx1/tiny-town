import { createContext, useEffect, useState } from "react";
import { InventoryType, ItemKey } from "../type.d";

export interface InventoryValueType {
  inventory: InventoryType;
  isLoading: boolean;
  addToInventory: (item: ItemKey, count?: number) => void;
  removeFromInventory: (item: ItemKey, count?: number) => void;
}

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
    const storedMapString = window.sessionStorage.getItem(
      `tiny-town-inventory-array`,
    );
    setInventory(
      storedMapString
        ? (JSON.parse(storedMapString) as InventoryType)
        : ({} as InventoryType),
    );
    setIsLoading(false);
  }, []);

  const saveInventory = () => {
    const newInventoryString = JSON.stringify(inventory);
    window.sessionStorage.setItem(
      `tiny-town-inventory-array`,
      newInventoryString,
    );
  };

  const addToInventory = (newItemStr: ItemKey, count: number = 1) => {
    setInventory((inventory) => ({
      ...inventory,
      [newItemStr]: (inventory[newItemStr] || 0) + count,
    }));
    saveInventory();
  };

  const removeFromInventory = (itemToRemoveStr: ItemKey, count: number = 1) => {
    if (inventory?.[itemToRemoveStr] >= count) {
      setInventory((inventory) => ({
        ...inventory,
        [itemToRemoveStr]: inventory[itemToRemoveStr] - count,
      }));
    } else {
      setInventory((inventory) => ({
        ...inventory,
        [itemToRemoveStr]: 0,
      }));
    }
    saveInventory();
  };

  return { inventory, isLoading, addToInventory, removeFromInventory };
};
