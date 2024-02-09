import { ConversationOption, TextRecord } from "@/app/type.d";
import { createContext, useEffect, useState } from "react";

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
  const [label, setLabel] = useState<string | null>(null);
  const [options, setOptions] = useState<ConversationOption[] | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const goToNextSegment = () => {
    if (conversationKey && segmentKey) {
      const segment = textRecord[conversationKey][segmentKey];
      const nextSegmentKey =
        "options" in segment
          ? segment.options[selectedOptionIndex].next
          : segment.next;

      console.log(nextSegmentKey);
      setSegmentKey(nextSegmentKey);
      if (nextSegmentKey === null) {
        setConversationKey(null);
      }
    }
  };
  const prevOption = () => {
    if (options) {
      setSelectedOptionIndex((selectedOptionIndex) =>
        selectedOptionIndex === 0
          ? options.length - 1
          : selectedOptionIndex - 1,
      );
    }
  };
  const nextOption = () => {
    if (options) {
      setSelectedOptionIndex((selectedOptionIndex) =>
        selectedOptionIndex === options.length ? 0 : selectedOptionIndex + 1,
      );
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
        setOptions(segment.options);
      } else {
        setOptions(null);
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
