import { observer } from "mobx-react";
import * as React from "react";
import { RectModel } from "../mst";

interface Props {
  rectMedel: RectModel;
  prevX: number;
  prevY: number;
}
interface State {
  x_position: number;
  y_position: number;
  width: number;
  height: number;
}

@observer
class RectangleComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      x_position: this.props.rectMedel.x_position,
      y_position: this.props.rectMedel.y_position,
      width: this.props.rectMedel.width,
      height: this.props.rectMedel.height,
    };
  }

  render() {
    const { x_position, y_position, width, height } = this.props.rectMedel;
    return (
      <rect
        x={x_position}
        y={y_position}
        width={width}
        height={height}
        stroke="red"
        fill="transparent"
        strokeWidth="5"
      />
    );
  }
}

export { RectangleComponent };
