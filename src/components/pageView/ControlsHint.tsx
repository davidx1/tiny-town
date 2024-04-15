import { StoreContext } from "@/stores/rootStore";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";

export const ControlsHint: React.FC = observer(() => {
  const [showControlHint, setShowControlHint] = useState<boolean>(false);

  const {
    plotStore: { plot, isLoading, reachedPlotPoint },
  } = useContext(StoreContext);

  useEffect(() => {
    if (!isLoading && !plot["viewed-controls"]) {
      setShowControlHint(true);
      setTimeout(() => {
        setShowControlHint(false);
        reachedPlotPoint("viewed-controls");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    showControlHint && (
      <div className="bg-gray-800/80 absolute w-1/2 aspect-3/2 z-40 top-1/4 left-1/4 p-8">
        <div className="h-full bg-control-instruction bg-cover"></div>
      </div>
    )
  );
});
