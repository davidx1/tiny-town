import { observable, action, makeAutoObservable } from "mobx";

export class ConverseStore {
  count = 1;
  isShowConverseIcon = false;
  rootStore: any;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setConverseIcon = (state: boolean) => {
    this.isShowConverseIcon = state;
  };

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
