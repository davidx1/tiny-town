import { createContext, useEffect, useState } from "react";
import { PlotType, ItemKey, PlotKey } from "../type.d";

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

export const PlotContext = createContext<PlotValueType>(plotDefaultValue);

export const usePlotData = (): PlotValueType => {
  const [plot, setPlot] = useState<PlotType>({} as PlotType);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedMapString =
      window.sessionStorage.getItem(`tiny-town-plot-store`);

    setPlot(
      storedMapString
        ? (JSON.parse(storedMapString) as PlotType)
        : ({} as PlotType),
    );
    setIsLoading(false);
  }, []);

  const savePlot = () => {
    const newPlotString = JSON.stringify(plot);
    window.sessionStorage.setItem(`tiny-town-plot-array`, newPlotString);
  };

  const reachedPlotPoint = (newPlotPointReached: PlotKey) => {
    setPlot((plot) => ({
      ...plot,
      [newPlotPointReached]: true,
    }));
    savePlot();
  };

  return { plot, isLoading, reachedPlotPoint };
};
