import { inject, observer } from "mobx-react";
import * as React from "react";
import { Root } from "../mst";

interface Props {
  rootTree?: Root;
}
interface State {
  selected_shape: string;
}

@inject("rootTree")
@observer
class SideBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected_shape: "",
    };
  }
  onSelect(e: any) {
    const selected_shape = e.target.value;
    const { rootTree } = this.props;
    if (!rootTree) return null;
    rootTree.positions.selected_shape.selectShape(selected_shape);
    this.setState({ selected_shape });
  }

  render() {
    return (
      <div className="side-bar">
        <select onChange={this.onSelect} value={this.state.selected_shape}>
          <option value="rect">Rectangle</option>
          <option value="line">Line</option>
          <option value="circle">Circle</option>
        </select>
      </div>
    );
  }
}

export { SideBar };
