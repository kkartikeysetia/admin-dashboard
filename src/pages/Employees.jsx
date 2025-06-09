// /* eslint-disable react/jsx-closing-tag-location */
// /* eslint-disable react/jsx-props-no-spreading */

/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { employeesData, employeesGrid } from "../data/dummy";

// Helper for creating SVG icons. You can replace these with your preferred icon library.
const StatIcon = ({ icon, colorClass }) => (
  <div className={`p-3 rounded-full ${colorClass}`}>{icon}</div>
);

// Icon components
const EmployeesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-indigo-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);
const ActiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const DepartmentsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-purple-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);
const SalaryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-pink-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Employees = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  // Data for the stats cards, making it easy to manage styles and content
  const stats = [
    {
      title: "Total Employees",
      value: "63",
      icon: <EmployeesIcon />,
      bgColor: "bg-indigo-100/50",
      iconBgColor: "bg-indigo-200/60",
      borderColor: "border-indigo-200",
    },
    {
      title: "Active",
      value: "0",
      icon: <ActiveIcon />,
      bgColor: "bg-green-100/50",
      iconBgColor: "bg-green-200/60",
      borderColor: "border-green-200",
    },
    {
      title: "Departments",
      value: "3",
      icon: <DepartmentsIcon />,
      bgColor: "bg-purple-100/50",
      iconBgColor: "bg-purple-200/60",
      borderColor: "border-purple-200",
    },
    {
      title: "Avg Salary",
      value: "$0",
      icon: <SalaryIcon />,
      bgColor: "bg-pink-100/50",
      iconBgColor: "bg-pink-200/60",
      borderColor: "border-pink-200",
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-slate-50 rounded-3xl">
      {/* Pastel-tinted Page Header */}
      <div className="bg-blue-100/50 p-6 rounded-2xl shadow-sm border border-blue-200/60 mb-6">
        <Header category="Page" title="Admin Dashboard" />
        <p className="text-sm text-slate-500 mt-1">
          Manage your team members and their information
        </p>
      </div>

      {/* Stats Cards with unique pastel colors */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`p-5 rounded-2xl shadow-sm border ${item.borderColor} ${item.bgColor}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-slate-500">{item.title}</p>
                <p className="text-3xl font-bold text-slate-800">
                  {item.value}
                </p>
              </div>
              <StatIcon icon={item.icon} colorClass={item.iconBgColor} />
            </div>
          </div>
        ))}
      </div>

      {/* Employee Directory Grid with pastel header */}
      <div className="bg-blue-100/50 p-4 sm:p-6 rounded-2xl shadow-sm border border-blue-200/60">
        <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">
              Employee Directory
            </h3>
            <p className="text-sm text-slate-500">
              Search, edit, and manage employee records
            </p>
          </div>
          <div className="flex gap-3">
            <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-lg">
              Editable
            </span>
            <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-lg">
              Searchable
            </span>
          </div>
        </div>
        <GridComponent
          dataSource={employeesData}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
          className="custom-pastel-grid"
        >
          <ColumnsDirective>
            {employeesGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page]} />
        </GridComponent>
      </div>

      {/* This <style> block is necessary to deeply style the Syncfusion Grid to match our pastel theme. */}
      <style>{`
        .custom-pastel-grid {
          border: none;
        }
        .custom-pastel-grid .e-gridheader {
          background-color: #f8fafc;
          border: none;
        }
        .custom-pastel-grid .e-headercell {
          background-color: #f8fafc;
          font-weight: 600;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem;
        }
        .custom-pastel-grid .e-toolbar {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 0.5rem 1rem;
        }
        .custom-pastel-grid .e-search .e-input {
          border-radius: 0.5rem;
        }
        .custom-pastel-grid .e-row {
            border-bottom: 1px solid #f1f5f9;
        }
        .custom-pastel-grid .e-row:hover .e-rowcell {
          background-color: #f8fafc;
        }
        .custom-pastel-grid .e-rowcell {
            padding: 1rem;
            border: none;
        }
        .custom-pastel-grid .e-pager {
          background-color: #ffffff;
          border-top: 1px solid #e2e8f0;
        }
        .custom-pastel-grid .e-pager .e-currentitem {
          background-color: #4f46e5;
          color: white;
          border-radius: 0.5rem;
        }
        .custom-pastel-grid .e-pager .e-link,
        .custom-pastel-grid .e-pager .e-pp,
        .custom-pastel-grid .e-pager .e-np {
            border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default Employees;
