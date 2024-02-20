import { InventoryContext } from "@/app/hooks/useInventoryData";
import { PlotContext } from "@/app/hooks/usePlotData";
import { ConversationOption, TextRecord } from "@/app/type.d";
import { createContext, useContext, useEffect, useState } from "react";

export interface textareaContextValues {
  label: string | null;
  options: ConversationOption[] | null;
  selectedOptionIndex: number;
  initConversation: (key: string) => void;
  goToNextSegment: () => void;
  prevOption: () => void;
  nextOption: () => void;
}

export const initialTextareaContext: textareaContextValues = {
  label: "",
  options: [],
  selectedOptionIndex: 0,
  initConversation: (key: string) => console.log(key),
  goToNextSegment: () => console.log("go to next segment"),
  prevOption: () => console.log("prev option"),
  nextOption: () => console.log("next option"),
};

export const TextareaContext = createContext<textareaContextValues>(
  initialTextareaContext,
);

export const useTextarea = (textRecord: TextRecord): textareaContextValues => {
  const [conversationKey, setConversationKey] = useState<string | null>(null);
  const [segmentKey, setSegmentKey] = useState<string | null>(null);
  const [nextSegmentKey, setNextSegmentKey] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [options, setOptions] = useState<ConversationOption[] | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const { addToInventory, removeFromInventory } = useContext(InventoryContext);
  const { plot, reachedPlotPoint } = useContext(PlotContext);

  const validOptionsFilter = (option: ConversationOption) => {
    return (
      !option?.plotCondition ||
      option.plotCondition.every(
        (condition) => !!plot[condition.key] === condition.status,
      )
    );
  };

  useEffect(() => {
    if (conversationKey && segmentKey) {
      const newSegmentAction =
        textRecord[conversationKey][segmentKey].itemAction;
      if (newSegmentAction?.type === "add") {
        addToInventory(newSegmentAction.key, newSegmentAction.count);
      }

      if (newSegmentAction?.type === "remove") {
        removeFromInventory(newSegmentAction.key, newSegmentAction.count);
      }
    }
  }, [segmentKey, conversationKey]);

  const goToNextSegment = () => {
    setSegmentKey(nextSegmentKey);
    if (nextSegmentKey === null) {
      setConversationKey(null);
    }
  };

  const prevOption = () => {
    if (options) {
      const newIndex =
        selectedOptionIndex === 0
          ? options.length - 1
          : selectedOptionIndex - 1;
      setSelectedOptionIndex(newIndex);
      setNextSegmentKey(options[newIndex].next);
    }
  };
  const nextOption = () => {
    if (options) {
      const newIndex =
        selectedOptionIndex === options.length ? 0 : selectedOptionIndex + 1;
      setSelectedOptionIndex(newIndex);
      setNextSegmentKey(options[newIndex].next);
    }
  };

  const initConversation = (conversationKey: string) => {
    setConversationKey(conversationKey);
    setSegmentKey("init");
  };

  useEffect(() => {
    if (conversationKey && segmentKey) {
      const segment = textRecord[conversationKey][segmentKey];
      setLabel(segment.label);
      if ("options" in segment) {
        setSelectedOptionIndex(0);
        setOptions(segment.options.filter(validOptionsFilter));
        setNextSegmentKey(segment.options.filter(validOptionsFilter)[0].next);
      } else {
        setOptions(null);
        setNextSegmentKey(segment.next);
      }

      if (segment.reachedPlotPoint) {
        reachedPlotPoint(segment.reachedPlotPoint);
      }
    } else {
      setLabel(null);
      setOptions(null);
    }
  }, [conversationKey, segmentKey]);

  return {
    label,
    options,
    selectedOptionIndex,
    initConversation,
    goToNextSegment,
    prevOption,
    nextOption,
  };
};
