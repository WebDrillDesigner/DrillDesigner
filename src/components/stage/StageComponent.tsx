import React from "react";
import { Stage, Layer } from "react-konva";
import PerformerComponent from "./PerformerComponent";
import BackgroundComponent from "./BackgroundComponent";
import config from "../../config/AppConfig";
import { Show } from "../../types/Show";

export interface StageComponentProps {
  width: number;
  height: number;
  show?: Show;
  count: number;
  updatePosition: (id: string, x: number, y: number) => void;
}

const StageComponent: React.FC<StageComponentProps> = ({
  width,
  height,
  show: Show,
  count,
  updatePosition,
}) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
        <BackgroundComponent
          imageSrc={config.backgroundImageSrc}
          width={width}
          height={height}
        />
        {Show?.performers[count]!.map((performer) => (
          <PerformerComponent
            key={performer.id}
            performer={performer}
            imageSrc={config.performerImageSrc}
            onUpdatePosition={updatePosition}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default StageComponent;