import { useEffect, useState } from "react";

export const useInventoryData = () => {
  const [inventory, setInventory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedMapString = window.sessionStorage.getItem(
      `tiny-town-inventory-array`,
    );
    setInventory(
      storedMapString ? (JSON.parse(storedMapString) as string[]) : [],
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

  const addToInventory = (newItemStr: string) => {
    setInventory([...inventory, newItemStr]);
    saveInventory();
  };

  const removeFromInventory = (itemToRemoveStr: string) => {
    setInventory(inventory.filter((item) => item !== itemToRemoveStr));
    saveInventory();
  };

  return { inventory, isLoading, addToInventory, removeFromInventory };
};
