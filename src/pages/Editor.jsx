/* eslint-disable react/jsx-closing-tag-location */
import React from "react";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";

import { Header } from "../components";
import { EditorData } from "../data/dummy";

const Editor = () => (
  <div
    className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl shadow-lg"
    style={{
      background:
        "linear-gradient(135deg, #fef7ff 0%, #f0f4ff 25%, #f7f0ff 50%, #fff0f7 75%, #f0fff7 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    }}
  >
    <Header category="App" title="Editor" />
    <div
      className="rounded-2xl p-4 shadow-inner"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <RichTextEditorComponent cssClass="pastel-editor">
        <EditorData />
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
      </RichTextEditorComponent>
    </div>

    <style jsx>{`
      .pastel-editor .e-rte-toolbar {
        background: linear-gradient(
          135deg,
          rgba(248, 246, 255, 0.9),
          rgba(245, 243, 255, 0.8)
        ) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        border-radius: 12px 12px 0 0 !important;
        backdrop-filter: blur(5px) !important;
        padding: 8px 16px !important;
      }

      .pastel-editor .e-toolbar-item {
        color: #6b46c1 !important;
        border-radius: 8px !important;
        margin: 2px !important;
        transition: all 0.3s ease !important;
      }

      .pastel-editor .e-toolbar-item:hover {
        background: rgba(167, 139, 250, 0.15) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 2px 8px rgba(167, 139, 250, 0.2) !important;
      }

      .pastel-editor .e-toolbar-item.e-active {
        background: rgba(167, 139, 250, 0.25) !important;
        color: #4c1d95 !important;
        box-shadow: 0 2px 8px rgba(167, 139, 250, 0.3) !important;
      }

      .pastel-editor .e-toolbar-item .e-icons {
        color: inherit !important;
      }

      .pastel-editor .e-rte-content {
        background: rgba(255, 255, 255, 0.8) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        border-top: none !important;
        border-radius: 0 0 12px 12px !important;
        backdrop-filter: blur(3px) !important;
        min-height: 400px !important;
      }

      .pastel-editor .e-content {
        padding: 20px !important;
        color: #4c1d95 !important;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
        line-height: 1.6 !important;
      }

      .pastel-editor .e-content:focus {
        outline: none !important;
        box-shadow: inset 0 0 0 2px rgba(167, 139, 250, 0.2) !important;
      }

      .pastel-editor .e-rte-quick-toolbar {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.95),
          rgba(248, 250, 252, 0.9)
        ) !important;
        border: 1px solid rgba(230, 220, 255, 0.4) !important;
        border-radius: 12px !important;
        backdrop-filter: blur(10px) !important;
        box-shadow: 0 8px 32px rgba(167, 139, 250, 0.2) !important;
        padding: 8px !important;
      }

      .pastel-editor .e-rte-quick-toolbar .e-toolbar-item {
        background: rgba(255, 255, 255, 0.7) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        margin: 2px !important;
      }

      .pastel-editor .e-rte-quick-toolbar .e-toolbar-item:hover {
        background: rgba(167, 139, 250, 0.2) !important;
        border-color: rgba(167, 139, 250, 0.4) !important;
      }

      .pastel-editor .e-dropdown-popup {
        background: rgba(255, 255, 255, 0.95) !important;
        border: 1px solid rgba(230, 220, 255, 0.4) !important;
        border-radius: 12px !important;
        backdrop-filter: blur(10px) !important;
        box-shadow: 0 8px 32px rgba(167, 139, 250, 0.2) !important;
      }

      .pastel-editor .e-dropdown-popup .e-item {
        color: #6b46c1 !important;
        border-radius: 8px !important;
        margin: 2px 4px !important;
        transition: all 0.2s ease !important;
      }

      .pastel-editor .e-dropdown-popup .e-item:hover {
        background: rgba(167, 139, 250, 0.15) !important;
        color: #4c1d95 !important;
      }

      .pastel-editor .e-dropdown-popup .e-item.e-focused {
        background: rgba(167, 139, 250, 0.2) !important;
        color: #4c1d95 !important;
      }

      .pastel-editor .e-colorpicker-popup {
        background: rgba(255, 255, 255, 0.95) !important;
        border: 1px solid rgba(230, 220, 255, 0.4) !important;
        border-radius: 12px !important;
        backdrop-filter: blur(10px) !important;
        box-shadow: 0 8px 32px rgba(167, 139, 250, 0.2) !important;
      }

      .pastel-editor .e-rte-elements .e-rte-toolbar-separator {
        background: rgba(230, 220, 255, 0.4) !important;
        margin: 0 8px !important;
        border-radius: 2px !important;
      }

      .pastel-editor .e-content h1,
      .pastel-editor .e-content h2,
      .pastel-editor .e-content h3,
      .pastel-editor .e-content h4,
      .pastel-editor .e-content h5,
      .pastel-editor .e-content h6 {
        color: #6b46c1 !important;
        font-weight: 600 !important;
      }

      .pastel-editor .e-content strong,
      .pastel-editor .e-content b {
        color: #4c1d95 !important;
      }

      .pastel-editor .e-content a {
        color: #7c3aed !important;
        text-decoration: none !important;
        border-bottom: 1px dotted rgba(124, 58, 237, 0.5) !important;
        transition: all 0.2s ease !important;
      }

      .pastel-editor .e-content a:hover {
        color: #6b46c1 !important;
        border-bottom-style: solid !important;
      }

      .pastel-editor .e-content blockquote {
        border-left: 4px solid rgba(167, 139, 250, 0.6) !important;
        background: rgba(245, 243, 255, 0.5) !important;
        padding: 16px 20px !important;
        margin: 16px 0 !important;
        border-radius: 0 8px 8px 0 !important;
        font-style: italic !important;
        color: #4c1d95 !important;
      }

      .pastel-editor .e-content code {
        background: rgba(245, 243, 255, 0.7) !important;
        color: #6b46c1 !important;
        padding: 2px 6px !important;
        border-radius: 4px !important;
        font-family: "Consolas", "Monaco", monospace !important;
        border: 1px solid rgba(230, 220, 255, 0.4) !important;
      }

      .pastel-editor .e-content pre {
        background: rgba(245, 243, 255, 0.7) !important;
        border: 1px solid rgba(230, 220, 255, 0.4) !important;
        border-radius: 8px !important;
        padding: 16px !important;
        overflow-x: auto !important;
      }

      .pastel-editor .e-content table {
        border-collapse: collapse !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        box-shadow: 0 2px 8px rgba(167, 139, 250, 0.1) !important;
      }

      .pastel-editor .e-content table th {
        background: rgba(245, 243, 255, 0.8) !important;
        color: #6b46c1 !important;
        font-weight: 600 !important;
        padding: 12px !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
      }

      .pastel-editor .e-content table td {
        padding: 12px !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        background: rgba(255, 255, 255, 0.5) !important;
      }

      .pastel-editor .e-content table tr:hover td {
        background: rgba(245, 243, 255, 0.3) !important;
      }

      .pastel-editor .e-content ul li::marker,
      .pastel-editor .e-content ol li::marker {
        color: #7c3aed !important;
      }

      .pastel-editor .e-spinner-pane {
        background: rgba(255, 255, 255, 0.8) !important;
        backdrop-filter: blur(5px) !important;
      }

      .pastel-editor .e-rte-placeholder {
        color: rgba(107, 70, 193, 0.5) !important;
        font-style: italic !important;
      }
    `}</style>
  </div>
);

export default Editor;
