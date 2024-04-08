import { makeAutoObservable } from "mobx";

export class ConverseStore {
  count = 1;
  rootStore: any;

  constructor(rootStore: any) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onUpPressed = () => {};

  onUpReleased = () => {};

  onDownPressed = () => {};

  onDownReleased = () => {};

  onLeftPressed = () => {};

  onLeftReleased = () => {};

  onRightPressed = () => {};

  onRightReleased = () => {};

  onSelectPressed = () => {};

  onSelectReleased = () => {};
}
