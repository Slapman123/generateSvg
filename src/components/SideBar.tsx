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

  render() {
    return (
      <div className="side-bar">
        <button>Line</button>
        <div className="options">
          <label htmlFor="color">Pick a Line color</label>
          <input id="color" name="color" type="color" />
        </div>
        <button>Circle</button>
        <div className="options">
          <input type="color" />
        </div>
        <button>Rectangle</button>
        <div className="options">
          <input type="color" />
        </div>
      </div>
    );
  }
}

export { SideBar };
