import {
  applySnapshot,
  flow,
  Instance,
  onSnapshot,
  types,
} from "mobx-state-tree";
import { v4 as uuidv4 } from "uuid";

const LineModel = types.model("LineModel", {
  id: types.identifier,
  x1_position: types.number,
  y1_position: types.number,
  x2_position: types.number,
  y2_position: types.number,
});

const CircleModel = types.model("CircleModel", {
  id: types.identifier,
  cx: types.number,
  cy: types.number,
  r: types.number,
});

const RectModel = types.model("RectModel", {
  id: types.identifier,
  x_position: types.number,
  y_position: types.number,
  width: types.number,
  height: types.number,
});

const SideBarModel = types
  .model("SideBarModel", {
    selected_shape: types.string,
  })
  .actions((self) => {
    function selectShape(selected_shape: string) {
      applySnapshot(self, { selected_shape: selected_shape });
    }
    return { selectShape };
  });

const NewShapeModel = types
  .model("NewShapeModel", {
    lineShapes: types.array(LineModel),
    circleShapes: types.array(CircleModel),
    rectShapes: types.array(RectModel),
  })
  .actions((self) => {
    function addLines(
      x1_position: number,
      y1_position: number,
      x2_position: number,
      y2_position: number
    ) {
      const id = uuidv4();
      applySnapshot(self, {
        ...self,
        lineShapes: [
          { id, x1_position, y1_position, x2_position, y2_position },
          ...self.lineShapes,
        ],
      });
    }
    function addCircle(cx: number, cy: number, r: number) {
      const id = uuidv4();
      applySnapshot(self, {
        ...self,
        circleShapes: [{ id, cx, cy, r }, ...self.circleShapes],
      });
    }
    function addRectangle(
      x_position: number,
      y_position: number,
      width: number,
      height: number
    ) {
      const id = uuidv4();
      applySnapshot(self, {
        ...self,
        rectShapes: [
          { id, x_position, y_position, width, height },
          ...self.rectShapes,
        ],
      });
    }
    return { addLines, addCircle, addRectangle };
  });

const SavedShapeModel = types.model("SavedShape", {
  selected_shape: SideBarModel,
  svg_elements: NewShapeModel,
});

const RootModel = types.model("Root", {
  positions: SavedShapeModel,
});

export { RootModel };

export type Root = Instance<typeof RootModel>;
export type SavedPosition = Instance<typeof SavedShapeModel>;
export type CurrentPosition = Instance<typeof NewShapeModel>;
export type SideBarModel = Instance<typeof SideBarModel>;
export type LineModel = Instance<typeof LineModel>;
export type CircleModel = Instance<typeof CircleModel>;
export type RectModel = Instance<typeof RectModel>;
