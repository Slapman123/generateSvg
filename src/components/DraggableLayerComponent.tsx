import { inject, observer } from "mobx-react";
import * as React from "react";
import { Root } from "../mst";
import { LineComponent } from "./LineComponent";

interface Props {
  rootTree?: Root;
}
interface State {
  x1_position: number;
  y1_position: number;
  x2_position: number;
  y2_position: number;
  prevX: number;
  prevY: number;
  firstDot: boolean;
}

@inject("rootTree")
@observer
class DraggableLayerComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      x1_position: 0,
      y1_position: 0,
      x2_position: 0,
      y2_position: 0,
      prevX: 0,
      prevY: 0,
      firstDot: true,
    };
  }
  onClickPoint1 = () => {
    const { prevX, prevY } = this.state;
    const x1_position = prevX;
    const y1_position = prevY;
    this.setState({
      x1_position,
      y1_position,
      firstDot: false,
    });
  };
  onClickPoint2 = () => {
    const { prevX, prevY } = this.state;
    const x2_position = prevX;
    const y2_position = prevY;
    this.setState({
      firstDot: true,
    });
    const { rootTree } = this.props;
    if (!rootTree) return console.log("aca");
    rootTree.positions.svg_elements.addLines(
      this.state.x1_position,
      this.state.y1_position,
      x2_position,
      y2_position,
      "red",
      "2"
    );
  };

  onMouseMove = (e: any) => {
    if (e.target === e.currentTarget) {
      const dim = e.target.getBoundingClientRect();
      const prevX = e.clientX - dim.left;
      const prevY = e.clientY - dim.top;
      this.setState({ prevX, prevY });
    }
  };
  render() {
    const { x1_position, y1_position, prevX, prevY, firstDot } = this.state;
    const { rootTree } = this.props;
    if (!rootTree) return null;
    return (
      <div className="layer">
        <div className="svg-holder">
          <svg
            width="100%"
            height="100%"
            version="1.1"
            id="svg"
            xmlns="http://www.w3.org/2000/svg"
            onClick={firstDot ? this.onClickPoint1 : this.onClickPoint2}
            onMouseMove={this.onMouseMove}
          >
            {!firstDot ? (
              <line
                x1={x1_position}
                x2={prevX}
                y1={y1_position}
                y2={prevY}
                stroke="orange"
                strokeWidth="2"
              />
            ) : null}
            {rootTree.positions.svg_elements.lineShapes.map((item) => {
              return <LineComponent lineModel={item} key={item.id} />;
            })}
          </svg>
        </div>
      </div>
    );
  }
}

export { DraggableLayerComponent };
