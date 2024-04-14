import { PlotKey, PlotType } from "@/type.d";
import { makeAutoObservable } from "mobx";

export const plotStoreName = `tiny-town-plot-store`;

export class PlotStore {
  plot: PlotType = {} as PlotType;
  rootStore: any;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  reachedPlotPoint = (newPlotPointReached: PlotKey) => {
    const newPlot = {
      ...this.plot,
      [newPlotPointReached]: true,
    };
    const newPlotString = JSON.stringify(newPlot);
    window.sessionStorage.setItem(plotStoreName, newPlotString);
  };
}
