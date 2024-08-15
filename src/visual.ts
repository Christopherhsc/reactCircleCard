"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  CircleComponent,
  initialState as initialCircleState,
} from "./circleComponent";
import IViewport = powerbi.IViewport;
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";
import { BarChartComponent, initialBarChartState } from "./barChartComponent";
import { TitleComponent, initialTitleState } from "./titleComponent";

import "./../style/visual.less";

export class Visual implements IVisual {
  private circleContainer: HTMLElement;
  private barChartContainer: HTMLElement;
  private circleRoot: React.ComponentElement<any, any>;
  private barChartRoot: React.ComponentElement<any, any>;
  private viewport: IViewport;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private titleContainer: HTMLElement;
  private titleRoot: React.ComponentElement<any, any>;

  constructor(options: VisualConstructorOptions) {
    const container = document.createElement("div");
    container.className = "visual-container";
    options.element.appendChild(container);
    this.titleContainer = document.createElement("div");
    this.titleContainer.className = "titleContainer";

    this.circleContainer = document.createElement("div");
    this.circleContainer.className = "circleCard";

    this.barChartContainer = document.createElement("div");
    this.barChartContainer.className = "barChartContainer";

    container.appendChild(this.circleContainer);
    container.appendChild(this.barChartContainer);
    container.appendChild(this.titleContainer);

    this.circleRoot = React.createElement(CircleComponent, {});
    this.barChartRoot = React.createElement(BarChartComponent, {});
    this.titleRoot = React.createElement(TitleComponent, {});

    ReactDOM.render(this.circleRoot, this.circleContainer);
    ReactDOM.render(this.barChartRoot, this.barChartContainer);
    ReactDOM.render(this.titleRoot, this.titleContainer);

    this.formattingSettingsService = new FormattingSettingsService();
  }

  public update(options: VisualUpdateOptions) {
    this.viewport = options.viewport;
    const { width, height } = this.viewport;
    const size = Math.min(width, height);

    if (options.dataViews && options.dataViews[0]) {
      const dataView: DataView = options.dataViews[0];

      this.formattingSettings =
        this.formattingSettingsService.populateFormattingSettingsModel(
          VisualFormattingSettingsModel,
          options.dataViews[0]
        );
      const circleSettings = this.formattingSettings.circleCard;
      const titleSettings = this.formattingSettings.titleCard;

      const value = dataView.single.value;
      const numericValue =
        typeof value === "number" ? value : parseFloat(value as string);

      CircleComponent.update({
        textLabel: dataView.metadata.columns[0].displayName,
        textValue: numericValue.toString(),
        size,
        borderWidth: circleSettings.circleThickness.value,
        background: circleSettings.circleColor.value.value,
        textColor: circleSettings.labelText.value.value,
      });

      BarChartComponent.update({
        data: [
          {
            name: dataView.metadata.columns[0].displayName,
            value: numericValue,
          },
        ],
        backgroundColor: circleSettings.circleColor.value.value,
        textColor: circleSettings.labelText.value.value,
      });

      TitleComponent.update({
        title: titleSettings.titleText.value,
        fontSize: titleSettings.fontSize.value,
        textColor: titleSettings.textColor.value.value,
      });
    } else {
      this.clear();
    }
  }

  private clear() {
    CircleComponent.update(initialCircleState);
    BarChartComponent.update(initialBarChartState);
    TitleComponent.update(initialTitleState);
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
