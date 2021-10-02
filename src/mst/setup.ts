import { applySnapshot, getSnapshot, onSnapshot } from "mobx-state-tree";
import { RootModel } from ".";

export const setupRootStore = () => {
  const rootTree = RootModel.create({
    positions: {
      selected_shape: {
        selected_shape: "circle",
      },
      svg_elements: {
        lineShapes: [],
        circleShapes: [],
        rectShapes: [],
      },
    },
  });
  onSnapshot(rootTree, (snapshot) => console.log("snapshot", snapshot));
  const currentRootTree = getSnapshot(rootTree);
  applySnapshot(rootTree, {
    ...currentRootTree,
    positions: {
      ...currentRootTree.positions,
      selected_shape: { selected_shape: "line" },
    },
  });
  return { rootTree };
};
