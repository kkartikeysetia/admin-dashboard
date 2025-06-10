/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-closing-tag-location */

import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

import { kanbanData, kanbanGrid } from "../data/dummy";
import { Header } from "../components";

const Kanban = () => (
  <div
    className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl shadow-lg"
    style={{
      background:
        "linear-gradient(135deg, #fef7ff 0%, #f0f4ff 25%, #f7f0ff 50%, #fff0f7 75%, #f0fff7 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    }}
  >
    <Header category="App" title="Kanban" />
    <div
      className="rounded-2xl p-4 shadow-inner"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={kanbanData}
        cardSettings={{ contentField: "Summary", headerField: "Id" }}
        cssClass="pastel-kanban"
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>

    <style jsx>{`
      .pastel-kanban .e-kanban-header {
        background: linear-gradient(
          135deg,
          rgba(248, 246, 255, 0.9),
          rgba(245, 243, 255, 0.8)
        ) !important;
        border-bottom: 1px solid rgba(230, 220, 255, 0.3) !important;
        backdrop-filter: blur(5px) !important;
        border-radius: 12px 12px 0 0 !important;
      }

      .pastel-kanban .e-kanban-header-title {
        color: #6b46c1 !important;
        font-weight: 600 !important;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8) !important;
      }

      .pastel-kanban .e-kanban-header-icon {
        background: rgba(167, 139, 250, 0.2) !important;
        border-radius: 50% !important;
        color: #6b46c1 !important;
      }

      .pastel-kanban .e-kanban-column {
        background: rgba(255, 255, 255, 0.5) !important;
        border: 1px solid rgba(230, 220, 255, 0.2) !important;
        border-radius: 0 0 12px 12px !important;
        backdrop-filter: blur(3px) !important;
      }

      .pastel-kanban .e-kanban-column:first-child {
        border-radius: 0 0 0 12px !important;
      }

      .pastel-kanban .e-kanban-column:last-child {
        border-radius: 0 0 12px 0 !important;
      }

      .pastel-kanban .e-card {
        background: linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.95),
          rgba(248, 250, 252, 0.9)
        ) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        border-radius: 12px !important;
        box-shadow: 0 2px 8px rgba(167, 139, 250, 0.1) !important;
        margin: 8px !important;
        transition: all 0.3s ease !important;
        backdrop-filter: blur(5px) !important;
      }

      .pastel-kanban .e-card:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(167, 139, 250, 0.2) !important;
        border-color: rgba(167, 139, 250, 0.4) !important;
      }

      .pastel-kanban .e-card-header {
        background: linear-gradient(
          135deg,
          rgba(245, 243, 255, 0.8),
          rgba(248, 246, 255, 0.6)
        ) !important;
        border-bottom: 1px solid rgba(230, 220, 255, 0.2) !important;
        border-radius: 12px 12px 0 0 !important;
        padding: 12px 16px !important;
      }

      .pastel-kanban .e-card-header-title {
        color: #6b46c1 !important;
        font-weight: 600 !important;
        font-size: 14px !important;
      }

      .pastel-kanban .e-card-content {
        padding: 16px !important;
        color: #4c1d95 !important;
        line-height: 1.5 !important;
      }

      .pastel-kanban .e-card-tag {
        background: rgba(167, 139, 250, 0.2) !important;
        color: #6b46c1 !important;
        border-radius: 16px !important;
        padding: 4px 12px !important;
        font-size: 12px !important;
        font-weight: 500 !important;
        margin: 2px !important;
        border: 1px solid rgba(167, 139, 250, 0.3) !important;
      }

      .pastel-kanban .e-card-footer {
        background: rgba(248, 250, 252, 0.6) !important;
        border-top: 1px solid rgba(230, 220, 255, 0.2) !important;
        border-radius: 0 0 12px 12px !important;
        padding: 8px 16px !important;
      }

      .pastel-kanban .e-kanban-content {
        background: transparent !important;
      }

      .pastel-kanban .e-swimlane-header {
        background: linear-gradient(
          135deg,
          rgba(240, 244, 255, 0.9),
          rgba(245, 243, 255, 0.8)
        ) !important;
        border: 1px solid rgba(230, 220, 255, 0.3) !important;
        color: #6b46c1 !important;
        font-weight: 600 !important;
        border-radius: 8px !important;
        margin: 4px !important;
      }

      .pastel-kanban .e-card.e-draggable {
        cursor: grab !important;
      }

      .pastel-kanban .e-card.e-draggable:active {
        cursor: grabbing !important;
      }

      .pastel-kanban .e-kanban-column.e-dropping {
        background: rgba(167, 139, 250, 0.1) !important;
        border: 2px dashed rgba(167, 139, 250, 0.4) !important;
      }

      .pastel-kanban .e-card-color {
        border-radius: 4px !important;
      }

      .pastel-kanban .e-kanban-toolbar {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.9),
          rgba(248, 250, 252, 0.8)
        ) !important;
        border-bottom: 1px solid rgba(230, 220, 255, 0.3) !important;
        backdrop-filter: blur(5px) !important;
        border-radius: 12px 12px 0 0 !important;
      }

      .pastel-kanban .e-toolbar-item {
        color: #6b46c1 !important;
      }

      .pastel-kanban .e-toolbar-item:hover {
        background: rgba(167, 139, 250, 0.1) !important;
        border-radius: 8px !important;
      }

      .pastel-kanban .e-kanban-column-header {
        padding: 16px !important;
      }

      .pastel-kanban .e-item-count {
        background: rgba(167, 139, 250, 0.2) !important;
        color: #6b46c1 !important;
        border-radius: 12px !important;
        font-weight: 600 !important;
        padding: 2px 8px !important;
        font-size: 12px !important;
      }

      .pastel-kanban .e-kanban-column:hover {
        background: rgba(245, 243, 255, 0.6) !important;
        transition: background 0.3s ease !important;
      }

      .pastel-kanban .e-card-avatar {
        border: 2px solid rgba(255, 255, 255, 0.8) !important;
        box-shadow: 0 2px 8px rgba(167, 139, 250, 0.2) !important;
      }
    `}</style>
  </div>
);

export default Kanban;
