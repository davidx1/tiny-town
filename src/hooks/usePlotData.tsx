import { createContext, useEffect, useState } from "react";
import { PlotType, PlotKey } from "../type.d";

export interface PlotValueType {
  plot: PlotType;
  isLoading: boolean;
  reachedPlotPoint: (key: PlotKey) => void;
}

const plotDefaultValue: PlotValueType = {
  plot: {} as PlotType,
  isLoading: true,
  reachedPlotPoint: (key) => console.log(`Default Reached ${key}`),
};

const plotStoreName = `tiny-town-plot-store`;

export const PlotContext = createContext<PlotValueType>(plotDefaultValue);

export const usePlotData = (): PlotValueType => {
  const [plot, setPlot] = useState<PlotType>({} as PlotType);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedMapString = window.sessionStorage.getItem(plotStoreName);

    setPlot(
      storedMapString
        ? (JSON.parse(storedMapString) as PlotType)
        : ({} as PlotType),
    );
    setIsLoading(false);
  }, []);

  const savePlot = (newPlot: PlotType) => {
    const newPlotString = JSON.stringify(newPlot);
    window.sessionStorage.setItem(plotStoreName, newPlotString);
    setPlot(newPlot);
  };

  const reachedPlotPoint = (newPlotPointReached: PlotKey) => {
    console.log(newPlotPointReached);
    const newPlot = {
      ...plot,
      [newPlotPointReached]: true,
    };
    savePlot(newPlot);
  };

  return { plot, isLoading, reachedPlotPoint };
};
