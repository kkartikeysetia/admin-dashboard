/* eslint-disable react/jsx-closing-tag-location */
import React from "react";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";

import { Header } from "../components";

const change = (args) => {
  document.getElementById("preview").style.backgroundColor =
    args.currentValue.hex;
};

const CustomColorPicker = ({ id, mode }) => (
  <ColorPickerComponent
    id={id}
    mode={mode}
    modeSwitcher={false}
    inline
    showButtons={false}
    change={change}
    cssClass="pastel-colorpicker"
  />
);

const ColorPicker = () => (
  <div
    className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl shadow-lg"
    style={{
      background:
        "linear-gradient(135deg, #fef7ff 0%, #f0f4ff 25%, #f7f0ff 50%, #fff0f7 75%, #f0fff7 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    }}
  >
    <Header category="App" title="Color Picker" />
    <div
      className="rounded-2xl p-6 shadow-inner"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <div className="text-center">
        <div
          id="preview"
          className="mx-auto mb-8 rounded-2xl shadow-lg border-4"
          style={{
            width: "200px",
            height: "100px",
            background:
              "linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(196, 181, 253, 0.2))",
            borderColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(5px)",
            transition: "all 0.3s ease",
          }}
        />
        <div className="flex justify-center items-center gap-20 flex-wrap">
          <div
            className="p-6 rounded-2xl shadow-md"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.7))",
              border: "1px solid rgba(230, 220, 255, 0.3)",
              backdropFilter: "blur(5px)",
            }}
          >
            <p
              className="text-lg font-bold mt-2 mb-4"
              style={{
                color: "#000000",
                textShadow: "0 1px 2px rgba(255,255,255,0.9)",
                fontWeight: "700",
              }}
            >
              PICK UR COLOUR
            </p>
            <CustomColorPicker id="inline-palette" mode="Palette" />
          </div>
          <div
            className="p-6 rounded-2xl shadow-md"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.7))",
              border: "1px solid rgba(230, 220, 255, 0.3)",
              backdropFilter: "blur(5px)",
            }}
          >
            <p
              className="text-2xl font-semibold mt-2 mb-4"
              style={{ color: "#6b46c1" }}
            >
              Inline Picker
            </p>
            <CustomColorPicker id="inline-picker" mode="Picker" />
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .pastel-colorpicker .e-colorpicker-wrapper {
        background: rgba(255, 255, 255, 0.6) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        border-radius: 16px !important;
        backdrop-filter: blur(5px) !important;
        box-shadow: 0 4px 16px rgba(167, 139, 250, 0.1) !important;
        padding: 16px !important;
      }

      .pastel-colorpicker .e-palette {
        background: transparent !important;
        border: none !important;
        gap: 8px !important;
      }

      .pastel-colorpicker .e-palette .e-tile {
        border: 2px solid rgba(255, 255, 255, 0.8) !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
        margin: 2px !important;
      }

      .pastel-colorpicker .e-palette .e-tile:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
        border-color: rgba(167, 139, 250, 0.6) !important;
      }

      .pastel-colorpicker .e-palette .e-tile.e-selected {
        border-color: #6b46c1 !important;
        border-width: 3px !important;
        transform: scale(1.05) !important;
        box-shadow: 0 4px 16px rgba(107, 70, 193, 0.3) !important;
      }

      .pastel-colorpicker .e-hsv-container {
        background: rgba(255, 255, 255, 0.8) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        border-radius: 16px !important;
        backdrop-filter: blur(5px) !important;
        padding: 20px !important;
      }

      .pastel-colorpicker .e-hsv-color {
        border: 3px solid rgba(255, 255, 255, 0.9) !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 16px rgba(167, 139, 250, 0.2) !important;
      }

      .pastel-colorpicker .e-handler {
        border: 3px solid rgba(255, 255, 255, 0.9) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
        width: 18px !important;
        height: 18px !important;
        border-radius: 50% !important;
      }

      .pastel-colorpicker .e-hue-slider,
      .pastel-colorpicker .e-opacity-slider {
        border-radius: 12px !important;
        box-shadow: 0 2px 8px rgba(167, 139, 250, 0.2) !important;
        border: 2px solid rgba(255, 255, 255, 0.8) !important;
      }

      .pastel-colorpicker .e-hue-slider .e-handler,
      .pastel-colorpicker .e-opacity-slider .e-handler {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.9),
          rgba(248, 250, 252, 0.8)
        ) !important;
        border: 2px solid #6b46c1 !important;
        border-radius: 50% !important;
        box-shadow: 0 2px 8px rgba(107, 70, 193, 0.3) !important;
        width: 20px !important;
        height: 20px !important;
      }

      .pastel-colorpicker .e-input-container {
        background: rgba(255, 255, 255, 0.8) !important;
        border: 1px solid rgba(230, 220, 255, 0.4) !important;
        border-radius: 12px !important;
        backdrop-filter: blur(5px) !important;
        padding: 12px !important;
        margin-top: 16px !important;
      }

      .pastel-colorpicker .e-input-container .e-input-group {
        background: rgba(255, 255, 255, 0.9) !important;
        border: 1px solid rgba(230, 220, 255, 0.4) !important;
        border-radius: 8px !important;
        margin: 4px 0 !important;
      }

      .pastel-colorpicker .e-input-container .e-input-group:focus-within {
        border-color: rgba(167, 139, 250, 0.6) !important;
        box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1) !important;
      }

      .pastel-colorpicker .e-input-container .e-input {
        color: #6b46c1 !important;
        font-weight: 500 !important;
        background: transparent !important;
      }

      .pastel-colorpicker .e-input-container .e-float-text {
        color: rgba(107, 70, 193, 0.7) !important;
        font-weight: 500 !important;
      }

      .pastel-colorpicker .e-switch-ctrl-btn {
        background: linear-gradient(
          135deg,
          rgba(167, 139, 250, 0.8),
          rgba(196, 181, 253, 0.7)
        ) !important;
        border: 1px solid rgba(167, 139, 250, 0.4) !important;
        color: white !important;
        border-radius: 8px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        padding: 8px 16px !important;
        margin: 8px 4px !important;
      }

      .pastel-colorpicker .e-switch-ctrl-btn:hover {
        background: linear-gradient(
          135deg,
          rgba(139, 92, 246, 0.9),
          rgba(167, 139, 250, 0.8)
        ) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3) !important;
      }

      .pastel-colorpicker .e-switch-ctrl-btn.e-selected {
        background: linear-gradient(135deg, #6b46c1, #7c3aed) !important;
        box-shadow: 0 4px 16px rgba(107, 70, 193, 0.4) !important;
      }

      .pastel-colorpicker .e-container {
        border-radius: 16px !important;
        overflow: hidden !important;
      }

      .pastel-colorpicker .e-color-palette {
        padding: 8px !important;
        background: transparent !important;
      }

      .pastel-colorpicker .e-recent-color {
        background: rgba(248, 246, 255, 0.8) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        border-radius: 12px !important;
        padding: 12px !important;
        margin-top: 8px !important;
      }

      .pastel-colorpicker .e-recent-color .e-tile {
        border: 2px solid rgba(255, 255, 255, 0.8) !important;
        border-radius: 6px !important;
        margin: 2px !important;
        transition: all 0.2s ease !important;
      }

      .pastel-colorpicker .e-recent-color .e-tile:hover {
        transform: scale(1.1) !important;
        border-color: rgba(167, 139, 250, 0.6) !important;
      }

      #preview {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }

      #preview:hover {
        transform: scale(1.02) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
      }
    `}</style>
  </div>
);

export default ColorPicker;
