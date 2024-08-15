import * as React from "react";

export interface TitleState {
  title: string;
  fontSize?: number;
  textColor?: string;
}

export const initialTitleState: TitleState = {
  title: "Sales",
  fontSize: 20,
  textColor: "#000000",
};

export class TitleComponent extends React.Component<object, TitleState> {
  private static updateCallback: (data: object) => void = null;
  public state: TitleState = initialTitleState;

  constructor(props: any) {
    super(props);
    this.state = initialTitleState;
  }

  public static update(newState: TitleState) {
    if (typeof TitleComponent.updateCallback === "function") {
      TitleComponent.updateCallback(newState);
    }
  }

  public componentWillMount() {
    TitleComponent.updateCallback = (newState: TitleState): void => {
      this.setState(newState);
    };
  }

  public componentWillUnmount() {
    TitleComponent.updateCallback = null;
  }

  render() {
    const { title, fontSize, textColor } = this.state;

    const style: React.CSSProperties = {
      color: textColor,
      fontSize: `${fontSize}px`,
      position: "absolute",
      top: "10px",
      left: "10px",
    };

    return (
      <div className="titleComponent" style={style}>
        {title}
      </div>
    );
  }
}
