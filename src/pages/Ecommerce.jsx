/* eslint-disable comma-dangle */
import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";

/* ---------- helper ---------- */
/*  bg-green-50 ➜ "border-2 border-green-200"  */
const softBorder = (bg50) => {
  const match = /bg-([^-]+)-50/.exec(bg50);
  return match ? `border-2 border-${match[1]}-300` : "border-2";
};

const DropDown = ({ currentMode }) => (
  <div className="w-32 border-2 border-slate-200 dark:border-gray-600 px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-slate-50 dark:bg-gray-800">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="240px"
      popupWidth="140px"
    />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-20 px-4 pb-8">
      {/* ------------ HERO ------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Earnings */}
        <div className="bg-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-200 dark:bg-secondary-dark-bg dark:text-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                Earnings
              </p>
              <p className="text-4xl font-bold mb-6">$63,448.78</p>
              <Button
                color="white"
                bgColor={currentColor}
                text="Download"
                borderRadius="12px"
              />
            </div>
            <div
              style={{ backgroundColor: currentColor }}
              className="rounded-full p-4 text-white shadow-lg"
            >
              <BsCurrencyDollar className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {earningData.map((item, i) => {
            const bgs = [
              "bg-green-50 border-2 border-green-300",
              "bg-purple-50 border-2 border-purple-300", // <- Products card
              "bg-orange-50",
              "bg-pink-50 border-2 border-pink-300", // <- Refunds card
            ];
            return (
              <div
                key={item.title}
                className={`${bgs[i]} ${softBorder(
                  bgs[i]
                )} dark:bg-secondary-dark-bg dark:text-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-full p-3 shadow-sm"
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      item.pcColor === "green"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.percentage}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{item.amount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- MONTHLY + SALES DISTRIBUTION ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Summary */}
        <div
          className="rounded-3xl p-8 shadow-lg text-white border-2"
          style={{ backgroundColor: currentColor, borderColor: currentColor }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Monthly Summary</h2>
              <p className="text-5xl font-bold mb-4">$63,448.78</p>
              <p className="text-lg opacity-90 mb-6">Revenue this month</p>
              <div className="flex space-x-4">
                <Button
                  color={currentColor}
                  bgColor="white"
                  text="Generate Report"
                  borderRadius="12px"
                />
                <Button
                  color="white"
                  bgColor="rgba(255,255,255,0.2)"
                  text="View Details"
                  borderRadius="12px"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <SparkLine
                currentColor="white"
                id="summary-sparkline"
                height="150px"
                type="Column"
                data={SparklineAreaData}
                width="100%"
                color="rgba(255,255,255,0.8)"
              />
            </div>
          </div>
        </div>

        {/* Sales Distribution */}
        <div className="bg-indigo-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-indigo-200 dark:bg-secondary-dark-bg dark:text-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold mb-2">Sales Distribution</h3>
            <p className="text-3xl font-bold text-blue-600 mb-4">$43,246</p>
            <p className="text-gray-500 mb-6">Yearly Performance</p>
            <div className="w-full max-w-[200px]">
              <Pie
                id="pie-chart-top"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="180px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------- MIDDLE ------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Analytics */}
        <div className="bg-emerald-50 rounded-3xl p-8 shadow-lg border-2 border-emerald-200 dark:bg-secondary-dark-bg dark:text-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Revenue Analytics</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <GoPrimitiveDot className="text-gray-400" />
                <span className="text-gray-600">Expense</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <GoPrimitiveDot className="text-green-500" />
                <span className="text-green-500">Revenue</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold">$93,438</span>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    +23%
                  </span>
                </div>
                <p className="text-gray-500">Monthly Budget</p>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-red-500">$48,487</span>
                <p className="text-gray-500">Total Expenses</p>
              </div>

              <div className="mb-6">
                <SparkLine
                  currentColor={currentColor}
                  id="revenue-sparkline"
                  type="Line"
                  height="60px"
                  width="100%"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Stacked currentMode={currentMode} width="280px" height="300px" />
            </div>
          </div>
        </div>

        {/* Weekly Performance */}
        <div className="bg-amber-50 rounded-3xl p-8 shadow-lg border-2 border-amber-200 dark:bg-secondary-dark-bg dark:text-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Weekly Performance</h2>
            <IoIosMore className="text-xl text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>

          <div className="space-y-4 mb-6">
            {weeklyStats.slice(0, 3).map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between p-3 rounded-xl border-2 hover:bg-amber-100 dark:hover:bg-gray-800 transition-colors"
                style={{ borderColor: item.iconBg }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    style={{ background: item.iconBg }}
                    className="text-white rounded-full p-2 text-lg"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <span className={`font-bold text-${item.pcColor}`}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <SparkLine
              currentColor={currentColor}
              id="weekly-sparkline"
              height="120px"
              type="Area"
              data={SparklineAreaData}
              width="100%"
              color="rgb(59, 130, 246)"
            />
          </div>
        </div>
      </div>

      {/* ------------- BOTTOM ------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-rose-50 rounded-3xl p-6 shadow-lg border-2 border-rose-200 dark:bg-secondary-dark-bg dark:text-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <DropDown currentMode={currentMode} />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentTransactions.slice(0, 4).map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between p-3 rounded-xl border-2 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                style={{ borderColor: item.iconBg }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-xl rounded-lg p-2"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold text-${item.pcColor}`}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-rose-200 dark:border-gray-700">
            <Button
              color="white"
              bgColor={currentColor}
              text="View All"
              borderRadius="10px"
            />
            <span className="text-xs text-gray-500">24 more transactions</span>
          </div>
        </div>

        {/* Sales Trends */}
        <div className="bg-cyan-50 rounded-3xl p-6 shadow-lg border-2 border-cyan-200 dark:bg-secondary-dark-bg dark:text-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Sales Trends</h3>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="h-64">
            <LineChart />
          </div>
        </div>

        {/* Project Spotlight */}
        <div
          className="bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-3xl p-6 shadow-lg border-2"
          style={{ borderColor: "rgba(255,255,255,0.25)" }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">Project Spotlight</h3>
            <IoIosMore className="text-xl cursor-pointer opacity-75 hover:opacity-100" />
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-xs font-semibold inline-block mb-4">
            16 APR, 2021
          </div>

          <div className="mb-4">
            <img
              className="w-full h-32 object-cover rounded-xl mb-4"
              src={product9}
              alt="Project"
            />
            <h4 className="font-bold text-lg mb-2">React 18 Launch</h4>
            <p className="text-sm opacity-90">By Development Team</p>
          </div>

          <div className="mb-4">
            <p className="text-sm opacity-80 leading-relaxed">
              Exciting new features and performance improvements coming to
              React18. Stay tuned for major updates!
            </p>
          </div>

          <div className="flex justify-between items-center">
            <Button
              color="white"
              bgColor="rgba(255,255,255,0.2)"
              text="Learn More"
              borderRadius="10px"
            />
            <div className="flex -space-x-2">
              {medicalproBranding.leaders.slice(0, 3).map((leader, idx) => (
                <img
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={leader.image}
                  alt="Team member"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
