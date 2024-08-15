// circleComponent.tsx

import * as React from "react";

export interface State {
  textLabel: string;
  textValue: string;
  size: number;
  background?: string;
  borderWidth?: number;
  textColor?: string;
}

export const initialState: State = {
  textLabel: "",
  textValue: "",
  size: 200,
  textColor: "#FFF",
};

export class CircleComponent extends React.Component<object, State> {
  private static updateCallback: (data: object) => void = null;
  public state: State = initialState;

  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  public static update(newState: State) {
    if (typeof CircleComponent.updateCallback === "function") {
      CircleComponent.updateCallback(newState);
    }
  }

  public componentWillMount() {
    CircleComponent.updateCallback = (newState: State): void => {
      this.setState(newState);
    };
  }

  public componentWillUnmount() {
    CircleComponent.updateCallback = null;
  }

  render() {
    const { textLabel, textValue, size, background, borderWidth, textColor } =
      this.state;

    const style: React.CSSProperties = {
      width: size,
      height: size,
      background,
      borderWidth,
      borderColor: textColor,
    };

    const textStyle: React.CSSProperties = {
      color: textColor,
      borderColor: textColor,
    };

    return (
      <div className="circleCard" style={style}>
        <p style={textStyle}> 
          {textLabel}:<em>{textValue}</em>
        </p>
      </div>
    );
  }
}
