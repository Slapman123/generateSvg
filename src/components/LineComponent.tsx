import { observer } from "mobx-react";
import * as React from "react";
import { LineModel } from "../mst";

interface Props {
  lineModel: LineModel;
}
interface State {
  x1_position: number;
  y1_position: number;
  x2_position: number;
  y2_position: number;
}

@observer
class LineComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      x1_position: this.props.lineModel.x1_position,
      y1_position: this.props.lineModel.y1_position,
      x2_position: this.props.lineModel.x2_position,
      y2_position: this.props.lineModel.y2_position,
    };
  }

  render() {
    const { x1_position, y1_position, x2_position, y2_position } =
      this.props.lineModel;
    return (
      <line
        x1={x1_position}
        x2={x2_position}
        y1={y1_position}
        y2={y2_position}
        stroke="orange"
        strokeWidth="2"
      />
    );
  }
}

export { LineComponent };
