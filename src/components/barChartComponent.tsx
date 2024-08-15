import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface BarChartState {
  data: Array<{ name: string; value: number }>;
  backgroundColor?: string;
  textColor?: string;
}

export const initialBarChartState: BarChartState = {
  data: [],
  backgroundColor: "#ffffff",
  textColor: "#FFFFFF",
};

export class BarChartComponent extends React.Component<object, BarChartState> {
  private static updateCallback: (data: object) => void = null;
  public state: BarChartState = initialBarChartState;

  constructor(props: any) {
    super(props);
    this.state = initialBarChartState;
  }

  public static update(newState: BarChartState) {
    if (typeof BarChartComponent.updateCallback === "function") {
      BarChartComponent.updateCallback(newState);
    }
  }

  public componentWillMount() {
    BarChartComponent.updateCallback = (newState: BarChartState): void => {
      this.setState(newState);
    };
  }

  public componentWillUnmount() {
    BarChartComponent.updateCallback = null;
  }

  render() {
    const { data, backgroundColor, textColor } = this.state;

    const style: React.CSSProperties = {
      backgroundColor,
      padding: "10px",
    };

    return (
      <div className="barChart" style={style}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={textColor} />
            <YAxis width={80} stroke={textColor} />
            <Tooltip labelStyle={{ color: textColor }} />
            <Bar dataKey="value" fill={textColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
