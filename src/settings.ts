// settings.ts

"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

class CircleCardSettings extends FormattingSettingsCard {
  circleColor = new formattingSettings.ColorPicker({
    name: "circleColor",
    displayName: "Color",
    description: "The fill color of the circle.",
    visible: true,
    value: { value: "white" },
  });

  circleThickness = new formattingSettings.NumUpDown({
    name: "circleThickness",
    displayName: "Thickness",
    description: "The circle thickness.",
    visible: true,
    value: 2,
  });

  public labelText = new formattingSettings.ColorPicker({
    name: "labelText",
    displayName: "Text Color",
    value: { value: "smokewhite" },
    visible: true,
  });


  name: string = "components";
  displayName: string = "Components";
  visible: boolean = true;
  slices: Array<FormattingSettingsSlice> = [
    this.circleColor,
    this.circleThickness,
    this.labelText,
  ];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
  circleCard = new CircleCardSettings();

  cards = [this.circleCard];
}
