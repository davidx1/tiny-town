import {
  ConversationOption,
  ConversationRecord,
  PlotType,
  isDirectionInputs,
  isSegmentPassive,
  isSegmentWSelection,
  isSelectionInputs,
} from "@/type.d";
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
  hoveringOptionIndex: number | null = null;
  conversationRecord?: ConversationRecord = null;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get currentSegment() {
    if (!this.conversationKey || !this.segmentKey) return null;
    const segment =
      this.conversationRecord[this.conversationKey][this.segmentKey];
    if (isSegmentPassive(segment)) {
      return segment;
    }
    if (isSegmentWSelection(segment)) {
      return {
        ...segment,
        options: segment.options.filter((option) =>
          validOptionsFilter(option, this.rootStore.plotStore.plot),
        ),
      };
    }
    return null;
  }

  setConverseIcon = (state: boolean) => {
    this.isShowConverseIcon = state;
  };

  startConversation = (conversationKey: string) => {
    this.rootStore.setMode("converseStore");
    this.conversationKey = conversationKey;
    this.segmentKey = "init";
    this.hoveringOptionIndex = 0;
  };

  /**
   * Handles key press events for changing hovering option
   * and going on to the next segment in the conversation.
   * @param key - The key that was pressed.
   */
  onKeyPressed = (key: string) => {
    const { hoveringOptionIndex, currentSegment } = this;

    // Handle navigation of options, if options exist
    if (isSegmentWSelection(currentSegment) && isDirectionInputs(key)) {
      const optionsCount = currentSegment.options?.length || 0;
      switch (key) {
        case "KeyW":
          this.hoveringOptionIndex =
            hoveringOptionIndex === 0
              ? optionsCount - 1
              : hoveringOptionIndex - 1;
          break;
        case "KeyS":
          this.hoveringOptionIndex =
            hoveringOptionIndex === optionsCount - 1
              ? 0
              : hoveringOptionIndex + 1;
          break;
      }
    }
    // Handle selection and going onto the next segment
    else if (isSelectionInputs(key)) {
      this.segmentKey = isSegmentPassive(currentSegment)
        ? currentSegment.next
        : currentSegment.options[hoveringOptionIndex].next;
      this.hoveringOptionIndex = 0;

      if (this.segmentKey === null) {
        this.rootStore.setMode("moveStore");
        this.conversationKey = null;
        return;
      }

      if (this.currentSegment.reachedPlotPoint) {
        this.rootStore.plotStore.reachedPlotPoint(
          this.currentSegment.reachedPlotPoint,
        );
      }

      if (this.currentSegment.itemAction) {
        const { type, key, count } = this.currentSegment.itemAction;
        if (type === "add") {
          this.rootStore.inventoryStore.add(key, count);
        } else if (type === "remove") {
          this.rootStore.inventoryStore.remove(key, count);
        }
      }
    }
  };

  onKeyReleased = () => {};
}
