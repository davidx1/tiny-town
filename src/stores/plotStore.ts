import { PlotKey, PlotType } from "@/type.d";
import { makeAutoObservable } from "mobx";

export const plotStoreName = `tiny-town-plot-store`;

export class PlotStore {
  plot?: PlotType | null;
  rootStore: any;

  constructor(rootStore: any) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  get isLoading() {
    return !this.plot;
  }

  reachedPlotPoint = (newPlotPointReached: PlotKey) => {
    const newPlot = {
      ...this.plot,
      [newPlotPointReached]: true,
    };
    this.plot = newPlot;
    const newPlotString = JSON.stringify(newPlot);
    window.sessionStorage.setItem(plotStoreName, newPlotString);
  };
}
