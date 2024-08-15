// import { useGetCurrentTab } from "src/utils/ReactUtils";
import "../utils/style-utils/globals.css";
import "./index.css";

import { useEffect, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { TabModel } from "app/utils/api/tabs";
import { useGetCurrentTab } from "app/utils/ReactUtils";
import { debounce } from "app/utils/vanillajs-utils/domUtils";
import { Button } from "@/components/ui/button";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 5;

function App() {
  const { tab } = useGetCurrentTab();
  const [zoom, setZoom] = useState(1);
  const currentTabModel = useMemo(() => {
    if (tab) return new TabModel(tab);
    return null;
  }, [tab]);

  useEffect(() => {
    // 1. fetch the current zoom level
    async function init() {
      if (!currentTabModel) return;
      const currentZoom = await currentTabModel.zoom.getZoom();
      console.log(currentZoom);
      setZoom(currentZoom);
    }

    init();
    if (!currentTabModel) return;
    currentTabModel.zoom.onZoomChanged(({ newZoomFactor, oldZoomFactor }) => {
      if (oldZoomFactor === newZoomFactor) return;
      setZoom(newZoomFactor);
    });
    return () => {
      currentTabModel.zoom.removeListener();
    };
  }, [currentTabModel]);

  const debouncedZoomChange = debounce((value: number[]) => {
    setZoom(value[0]);
    currentTabModel?.zoom.setZoom(value[0]);
  }, 5);

  if (!tab || !currentTabModel) return null;

  return (
    <>
      <div className="w-[20rem] h-[10rem] p-2">
        <h1 className="text-xl text-black font-semibold text-center mb-4">
          Change Zoom Settings
        </h1>
        <Slider
          defaultValue={[1]}
          max={MAX_ZOOM}
          step={0.05}
          min={MIN_ZOOM}
          value={[zoom]}
          onValueChange={debouncedZoomChange}
        />
        <p className="text-center text-lg font-bold text-gray-600 my-2">
          {Math.floor(zoom * 100)}%
        </p>
        <Button
          size={"sm"}
          className="block mx-auto"
          onClick={() => {
            currentTabModel.zoom.resetZoom();
          }}
        >
          Reset Zoom
        </Button>
      </div>
    </>
  );
}

export default App;
