import { aiBattleGesturesRecord } from "@/app/battle/constants/aiBattleGestureRecord";
import { aiBattleStrategies } from "@/app/battle/constants/aiBattleStrategies";
import { powerRanking } from "@/app/battle/constants/battlePowerRanking";
import { allowedGestureCount, maxHp } from "@/app/battle/constants/fixedValues";
import {
  BattleGesture,
  BattleIds,
  BattleStates,
  BattleStrategiesKey,
  GestureKey,
  isValidInput,
} from "@/type.d";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

interface BattleMetaData {
  battleId?: BattleIds;
  battleStrategyKey?: BattleStrategiesKey;
  returnUrl?: string;
}

export class BattleStore {
  // Add your observable properties here
  rootStore: RootStore;
  meta: BattleMetaData | null = null;
  state?: BattleStates;
  playerReserveGestures: [GestureKey, number][] = [];
  playerBattleGestures: BattleGesture[] = [];
  playerPlayedGestureIndex: number = 0;
  aiBattleGestures: BattleGesture[] = [];
  aiPlayedGestureIndex: number = 0;
  aiBattleStrategy: (
    gestures: BattleGesture[],
    playerGesture: GestureKey,
  ) => number;
  cursorIndex: number = 0;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get isLoading() {
    return this.meta === null;
  }

  startBattle = (meta: BattleMetaData) => {
    this.meta = meta;
    this.state = BattleStates.PREP_ADD;
    this.aiBattleGestures = aiBattleGesturesRecord[meta.battleId].map(
      (gestureKey) => ({
        name: gestureKey,
        hp: maxHp,
      }),
    );
    this.aiBattleStrategy = aiBattleStrategies[meta.battleStrategyKey];
    this.playerReserveGestures = Object.entries(
      this.rootStore.inventoryStore.inventory,
    ) as [GestureKey, number][];
    this.rootStore.mode = "battleStore";
  };

  onKeyReleased = (key: string) => {};
  onKeyPressed = (key: string) => {
    const {
      playerBattleGestures,
      playerReserveGestures,
      cursorIndex,
      aiBattleGestures,
      aiBattleStrategy,
      playerPlayedGestureIndex,
      aiPlayedGestureIndex,
    } = this;

    if (isValidInput(key)) {
      switch (this.state) {
        case BattleStates.PREP_ADD:
          if (
            key === "Space" &&
            playerReserveGestures[cursorIndex][1] > 0 &&
            playerBattleGestures.length < allowedGestureCount
          ) {
            this.playerReserveGestures = playerReserveGestures.map(
              (item, index) =>
                index === cursorIndex ? [item[0], item[1] - 1] : item,
            );
            this.playerBattleGestures = [
              ...playerBattleGestures,
              { name: playerReserveGestures[cursorIndex][0], hp: maxHp },
            ];
            console.log(this.playerReserveGestures);
          } else if (key === "KeyW" && playerBattleGestures.length > 0) {
            this.state = BattleStates.PREP_REMOVE;
            this.cursorIndex = 0;
          } else if (key === "KeyS" && playerBattleGestures.length > 0) {
            this.state = BattleStates.PREP_READY;
            this.cursorIndex = 0;
          } else if (key === "KeyD") {
            this.cursorIndex = (cursorIndex + 1) % 3;
            console.log(this.cursorIndex);
          } else if (key === "KeyA") {
            this.cursorIndex = (cursorIndex + 2) % 3;
          }
          break;
        case BattleStates.PREP_REMOVE:
          if (key === "Space") {
            const gestureNameToRemove = playerBattleGestures[cursorIndex].name;
            this.playerReserveGestures = playerReserveGestures.map((item) =>
              item[0] === gestureNameToRemove ? [item[0], item[1] + 1] : item,
            );
            this.playerBattleGestures = [
              ...playerBattleGestures.slice(0, cursorIndex),
              ...playerBattleGestures.slice(cursorIndex + 1),
            ];
            this.state =
              playerBattleGestures.length === 1
                ? BattleStates.PREP_ADD
                : BattleStates.PREP_REMOVE;
          } else if (key === "KeyS" && playerBattleGestures.length > 0) {
            this.state = BattleStates.PREP_ADD;
            this.cursorIndex = 0;
          } else if (key === "KeyD") {
            this.cursorIndex = (cursorIndex + 1) % playerBattleGestures.length;
          } else if (key === "KeyA") {
            this.cursorIndex =
              (cursorIndex + playerBattleGestures.length - 1) %
              playerBattleGestures.length;
          }
          break;
        case BattleStates.PREP_READY:
          if (key === "Space") {
            this.state = BattleStates.SELECT_GESTURE;
            this.cursorIndex = 0;
          } else if (key === "KeyW") {
            this.state = BattleStates.PREP_ADD;
          }
          break;
        case BattleStates.SELECT_GESTURE:
          if (key === "Space" && playerBattleGestures[cursorIndex].hp > 0) {
            this.playerPlayedGestureIndex = cursorIndex;
            this.aiPlayedGestureIndex = aiBattleStrategy(
              aiBattleGestures,
              playerBattleGestures[cursorIndex].name,
            );
            this.state = BattleStates.GESTURE_REVEAL;
          } else if (key === "KeyD") {
            this.cursorIndex = (cursorIndex + 1) % allowedGestureCount;
          } else if (key === "KeyA") {
            this.cursorIndex =
              (cursorIndex + allowedGestureCount - 1) % allowedGestureCount;
          }
          break;

        case BattleStates.GESTURE_REVEAL:
          if (key === "Space") {
            const pIndex = playerPlayedGestureIndex;
            const playedGestureName = playerBattleGestures[pIndex].name;
            const pPower = powerRanking.indexOf(playedGestureName);

            const aIndex = aiPlayedGestureIndex;
            const aGestureName = aiBattleGestures[aIndex].name;
            const aPower = powerRanking.indexOf(aGestureName);

            if (pPower - aPower === 0) {
              //tie
              this.state = BattleStates.HEALTH_CHANGE;
              this.aiBattleGestures = aiBattleGestures.map((g, i) =>
                i === aIndex ? { ...g, hp: Math.max(g.hp - 2, 0) } : g,
              );
              this.playerBattleGestures = playerBattleGestures.map((g, i) =>
                i === pIndex ? { ...g, hp: Math.max(g.hp - 2, 0) } : g,
              );
            } else if (pPower - aPower === 1 || pPower - aPower === -2) {
              //victory
              this.state = BattleStates.HEALTH_CHANGE;
              this.aiBattleGestures = aiBattleGestures.map((g, i) =>
                i === aIndex ? { ...g, hp: Math.max(g.hp - 4, 0) } : g,
              );
              this.playerBattleGestures = playerBattleGestures.map((g, i) =>
                i === pIndex ? { ...g, hp: Math.min(g.hp + 1, maxHp) } : g,
              );
            } else if (pPower - aPower === -1 || pPower - aPower === 2) {
              //failure
              this.state = BattleStates.HEALTH_CHANGE;
              this.aiBattleGestures = aiBattleGestures.map((g, i) =>
                i === aIndex ? { ...g, hp: Math.min(g.hp + 1, maxHp) } : g,
              );
              this.playerBattleGestures = playerBattleGestures.map((g, i) =>
                i === pIndex ? { ...g, hp: Math.max(g.hp - 4, 0) } : g,
              );
            }
          }
          break;
        case BattleStates.HEALTH_CHANGE:
          if (key === "Space") {
            this.state =
              playerBattleGestures.filter((gesture) => gesture.hp).length ===
                0 ||
              aiBattleGestures.filter((gesture) => gesture.hp).length === 0
                ? BattleStates.RESULT
                : BattleStates.SELECT_GESTURE;
          }
          break;
        case BattleStates.RESULT:
          const isVictory = !!playerBattleGestures.filter(
            (gesture) => !!gesture.hp,
          ).length
            ? "_v"
            : "_d";
          if (key === "Space") {
            window.location.replace(
              `${process.env.myBasePath}/${this.meta.returnUrl}?prev=${this.meta.battleId}${isVictory}`,
            );
          }
          break;
        default:
      }
    }
  };
}
