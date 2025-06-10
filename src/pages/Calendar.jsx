/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { scheduleData } from "../data/dummy";
import { Header } from "../components";

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  return (
    <div
      className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #fef7ff 0%, #f0f4ff 25%, #f7f0ff 50%, #fff0f7 75%, #f0fff7 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Header category="App" title="Calendar" />
      <div
        className="rounded-2xl p-4 shadow-inner"
        style={{
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <ScheduleComponent
          height="650px"
          ref={(schedule) => setScheduleObj(schedule)}
          selectedDate={new Date(2025, 0, 10)}
          eventSettings={{ dataSource: scheduleData }}
          dragStart={onDragStart}
          cssClass="pastel-scheduler"
        >
          <ViewsDirective>
            {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
              <ViewDirective key={item} option={item} />
            ))}
          </ViewsDirective>
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
      </div>

      <PropertyPane>
        <div
          className="rounded-xl p-4 mt-4 shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 245, 255, 0.9))",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <table style={{ width: "100%", background: "transparent" }}>
            <tbody>
              <tr style={{ height: "50px" }}>
                <td style={{ width: "100%" }}>
                  <DatePickerComponent
                    value={new Date(2025, 0, 10)}
                    showClearButton={false}
                    placeholder="Current Date"
                    floatLabelType="Always"
                    change={change}
                    cssClass="pastel-datepicker"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PropertyPane>

      <style jsx>{`
        .pastel-scheduler .e-schedule-toolbar {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9),
            rgba(248, 250, 252, 0.8)
          ) !important;
          border-bottom: 1px solid rgba(230, 220, 255, 0.3) !important;
          backdrop-filter: blur(5px) !important;
        }

        .pastel-scheduler .e-schedule-toolbar .e-toolbar-item {
          color: #6b46c1 !important;
        }

        .pastel-scheduler .e-schedule-toolbar .e-toolbar-item:hover {
          background: rgba(167, 139, 250, 0.1) !important;
          border-radius: 8px !important;
        }

        .pastel-scheduler .e-work-cells {
          background: rgba(255, 255, 255, 0.6) !important;
          border: 1px solid rgba(230, 220, 255, 0.2) !important;
        }

        .pastel-scheduler .e-work-cells:hover {
          background: rgba(245, 243, 255, 0.8) !important;
        }

        .pastel-scheduler .e-header-cells {
          background: linear-gradient(
            135deg,
            rgba(248, 246, 255, 0.9),
            rgba(245, 243, 255, 0.8)
          ) !important;
          color: #6b46c1 !important;
          font-weight: 500 !important;
          border: 1px solid rgba(230, 220, 255, 0.3) !important;
        }

        .pastel-scheduler .e-appointment {
          background: linear-gradient(
            135deg,
            rgba(167, 139, 250, 0.8),
            rgba(196, 181, 253, 0.7)
          ) !important;
          border: 1px solid rgba(139, 92, 246, 0.3) !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 8px rgba(167, 139, 250, 0.2) !important;
        }

        .pastel-scheduler .e-appointment:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3) !important;
        }

        .pastel-datepicker .e-input-group {
          background: rgba(255, 255, 255, 0.8) !important;
          border: 1px solid rgba(230, 220, 255, 0.4) !important;
          border-radius: 12px !important;
          backdrop-filter: blur(5px) !important;
        }

        .pastel-datepicker .e-input-group:focus-within {
          border-color: rgba(167, 139, 250, 0.6) !important;
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1) !important;
        }

        .pastel-datepicker .e-input {
          color: #6b46c1 !important;
          background: transparent !important;
        }

        .pastel-datepicker .e-float-text {
          color: rgba(107, 70, 193, 0.7) !important;
        }

        .pastel-scheduler .e-schedule .e-content-wrap {
          background: rgba(255, 255, 255, 0.4) !important;
        }

        .pastel-scheduler .e-month-view .e-work-cells.e-other-month {
          background: rgba(248, 250, 252, 0.3) !important;
          color: rgba(107, 70, 193, 0.4) !important;
        }

        .pastel-scheduler .e-agenda-view .e-appointment-border {
          border-left: 4px solid rgba(167, 139, 250, 0.8) !important;
        }

        .pastel-scheduler .e-agenda-view .e-appointment-details {
          background: rgba(248, 246, 255, 0.6) !important;
          border-radius: 8px !important;
          margin: 2px 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Scheduler;
