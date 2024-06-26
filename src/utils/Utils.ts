import config from "../config/AppConfig";
import { SelectorPosition } from "../types/SelectorPosition";
import { ShapeBounds } from "../types/ShapeBounds";

const utils = {
  randomPerformerLocations: (numPerformers: number) => {
    return [...Array(numPerformers)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * config.canvasWidth + config.fieldWidthAdjustment,
      y: Math.random() * config.canvasHeight + config.fieldHeightAdjustment,
      isDragging: false,
    }));
  },

  performersToLine: (numPerformers: number, yOffset = 0) => {
    const distanceBetween =
      (config.canvasWidth - config.fieldWidthAdjustment * 2) / numPerformers;
    const centerY = config.canvasHeight / 2;
    let y = centerY + yOffset;
    y = Math.max(y, 0);
    y = Math.min(y, config.canvasHeight);

    return [...Array(numPerformers)].map((_, index) => ({
      id: index.toString(),
      x: distanceBetween * index + config.fieldWidthAdjustment,
      y: y,
      isDragging: false,
      selected: false,
    }));
  },

  pause: async (milliseconds: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  },

  // checks whether two rectangles intersect
  hasIntersection: (r1: ShapeBounds, r2: ShapeBounds): boolean => {
    const hasIntersection =
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y;
    return hasIntersection;
  },

  wrapPositionInsideCanvas: (coord: number, isX: boolean): number => {
    if (isX) {
      return Math.max(
        0,
        Math.min(config.canvasWidth - config.performerSize, coord),
      );
    } else {
      return Math.max(
        0,
        Math.min(config.canvasHeight - config.performerSize, coord),
      );
    }
  },

  // returns true if SelectorPosition has none -1 values and isn't undefined
  selectionCompleted: (selectorPosition?: SelectorPosition): boolean => {
    return (
      selectorPosition !== undefined &&
      selectorPosition.positionNow.x !== -1 &&
      selectorPosition.positionNow.y !== -1 &&
      selectorPosition.positionStart.x !== -1 &&
      selectorPosition.positionStart.y !== -1
    );
  },
};

export default utils;
