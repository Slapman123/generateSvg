import { observer } from "mobx-react";
import * as React from "react";
import { CircleModel } from "../mst";

interface Props {
  circleModel: CircleModel;
  prevX: number;
  prevY: number;
}
interface State {
  cx: number;
  cy: number;
  r: number;
}

@observer
class CircleComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cx: this.props.circleModel.cx,
      cy: this.props.circleModel.cy,
      r: this.props.circleModel.r,
    };
  }

  render() {
    const { cx, cy, r } = this.props.circleModel;
    console.log(cx, cy, r);
    return (
      <circle
        cx={cx}
        cy={cy}
        r="100"
        stroke="blue"
        fill="transparent"
        strokeWidth="5"
      />
    );
  }
}

export { CircleComponent };
