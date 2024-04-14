import { ConversationOption, ConversationRecord, PlotType } from "@/type.d";
import { makeAutoObservable } from "mobx";

const validOptionsFilter = (option: ConversationOption, plot: PlotType) => {
  return (
    !option?.plotCondition ||
    option.plotCondition.every(
      (condition) => !!plot[condition.key] === condition.status,
    )
  );
};

export class ConverseStore {
  count = 1;
  isShowConverseIcon = false;
  rootStore: any;
  conversationKey: string | null = null;
  segmentKey: string | null = null;
  label: string | null = null;
  options: ConversationOption[] | null = null;
  hoveringOptionIndex: number | null = null;
  conversationRecord?: ConversationRecord = null;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setConverseIcon = (state: boolean) => {
    this.isShowConverseIcon = state;
  };

  startConversation = (conversationKey: string) => {
    this.rootStore.setMode("converseStore");
    this.conversationKey = conversationKey;
    this.segmentKey = "init";
    const segment = this.conversationRecord[conversationKey]["init"];
    this.label = segment.label;
    if ("options" in segment) {
      console.log(this.rootStore.plotStore);
      this.hoveringOptionIndex = 0;
      this.options = segment.options.filter((option) =>
        validOptionsFilter(option, this.rootStore.plotStore.plot),
      );
    } else {
      this.hoveringOptionIndex = null;
      this.options = null;
    }
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
