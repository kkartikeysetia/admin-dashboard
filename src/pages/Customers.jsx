import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-blue-100/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-blue-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-2">Page</p>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 text-base font-medium">
                Manage your team members and their information
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-200/80 rounded-2xl p-6 border-2 border-slate-300 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium text-sm mb-2">
                  Total Employees
                </p>
                <p className="text-4xl font-bold text-slate-900">63</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-green-100/80 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium text-sm mb-2">
                  Active
                </p>
                <p className="text-4xl font-bold text-slate-900">0</p>
              </div>
              <div className="w-14 h-14 bg-green-200/80 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-purple-100/80 rounded-2xl p-6 border-2 border-purple-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium text-sm mb-2">
                  Departments
                </p>
                <p className="text-4xl font-bold text-slate-900">3</p>
              </div>
              <div className="w-14 h-14 bg-purple-200/80 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-pink-100/80 rounded-2xl p-6 border-2 border-pink-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 font-medium text-sm mb-2">
                  Avg Salary
                </p>
                <p className="text-4xl font-bold text-slate-900">$0</p>
              </div>
              <div className="w-14 h-14 bg-pink-200/80 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100/50 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Customer Database
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  View, edit, and manage customer information
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-1.5 border border-indigo-200/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-700">
                    Live Data
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Container with Custom Styling */}
          <div className="p-6 bg-gradient-to-br from-slate-50/50 to-blue-50/30">
            <div
              className="rounded-xl overflow-hidden shadow-lg border border-slate-200/50"
              style={{
                background:
                  "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
              }}
            >
              <GridComponent
                dataSource={customersData}
                enableHover={true}
                allowPaging
                pageSettings={{
                  pageCount: 5,
                  pageSizes: [5, 10, 15, 20],
                  enableQueryString: true,
                }}
                selectionSettings={selectionsettings}
                toolbar={toolbarOptions}
                editSettings={editing}
                allowSorting
                allowFiltering
                filterSettings={{ type: "FilterBar" }}
                gridLines="Both"
                rowHeight={50}
                cssClass="custom-grid-style"
              >
                <ColumnsDirective>
                  {customersGrid.map((item, index) => (
                    <ColumnDirective
                      key={index}
                      {...item}
                      headerTextAlign="Center"
                      textAlign="Center"
                    />
                  ))}
                </ColumnsDirective>
                <Inject
                  services={[Page, Selection, Toolbar, Edit, Sort, Filter]}
                />
              </GridComponent>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Last updated: {new Date().toLocaleDateString()} •
            <span className="text-indigo-600 font-medium ml-1">
              Data Management System v2.0
            </span>
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-grid-style .e-grid .e-gridheader {
          background: linear-gradient(
            135deg,
            #e0e7ff 0%,
            #c7d2fe 100%
          ) !important;
          border-bottom: 2px solid #a5b4fc !important;
        }

        .custom-grid-style .e-grid .e-headercell {
          color: #374151 !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          padding: 16px !important;
        }

        .custom-grid-style .e-grid .e-row {
          background: rgba(255, 255, 255, 0.8) !important;
          transition: all 0.2s ease !important;
        }

        .custom-grid-style .e-grid .e-row:nth-child(even) {
          background: rgba(248, 250, 252, 0.9) !important;
        }

        .custom-grid-style .e-grid .e-row:hover {
          background: linear-gradient(
            135deg,
            #ddd6fe 0%,
            #e0e7ff 100%
          ) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15) !important;
        }

        .custom-grid-style .e-grid .e-rowcell {
          padding: 12px 16px !important;
          border-right: 1px solid #e2e8f0 !important;
          color: #475569 !important;
          font-size: 13px !important;
        }

        .custom-grid-style .e-grid .e-toolbar {
          background: linear-gradient(
            135deg,
            #fef3c7 0%,
            #fed7aa 100%
          ) !important;
          border-bottom: 1px solid #f59e0b !important;
          padding: 12px !important;
        }

        .custom-grid-style .e-grid .e-toolbar .e-btn {
          background: linear-gradient(
            135deg,
            #ef4444 0%,
            #dc2626 100%
          ) !important;
          border: none !important;
          color: white !important;
          border-radius: 8px !important;
          padding: 8px 16px !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
        }

        .custom-grid-style .e-grid .e-toolbar .e-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3) !important;
        }

        .custom-grid-style .e-grid .e-pager {
          background: linear-gradient(
            135deg,
            #f1f5f9 0%,
            #e2e8f0 100%
          ) !important;
          border-top: 2px solid #cbd5e1 !important;
          padding: 16px !important;
        }

        .custom-grid-style .e-grid .e-pager .e-numericitem,
        .custom-grid-style .e-grid .e-pager .e-nextprev {
          background: rgba(255, 255, 255, 0.8) !important;
          border: 1px solid #cbd5e1 !important;
          color: #475569 !important;
          border-radius: 6px !important;
          margin: 0 2px !important;
          transition: all 0.2s ease !important;
        }

        .custom-grid-style .e-grid .e-pager .e-numericitem:hover,
        .custom-grid-style .e-grid .e-pager .e-nextprev:hover {
          background: linear-gradient(
            135deg,
            #a78bfa 0%,
            #8b5cf6 100%
          ) !important;
          color: white !important;
          transform: translateY(-1px) !important;
        }

        .custom-grid-style .e-grid .e-pager .e-currentitem {
          background: linear-gradient(
            135deg,
            #6366f1 0%,
            #4f46e5 100%
          ) !important;
          color: white !important;
          border: 1px solid #4f46e5 !important;
        }
      `}</style>
    </div>
  );
};

export default Customers;
