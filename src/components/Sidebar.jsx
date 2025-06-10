/* eslint-disable react/button-has-type */

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel, MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

// CSS styles for the smooth accordion animation. No changes here.
const styles = `
  .submenu {
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0);
    max-height: 0;
  }

  .submenu-open {
    max-height: 500px; /* A value larger than any possible submenu height */
  }

  .arrow-icon {
    transition: transform 0.3s ease-in-out;
  }

  .arrow-open {
    transform: rotate(180deg);
  }
`;

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  // --- MODIFIED: Default open section is now "PAGES" to match the new logic ---
  const [openSection, setOpenSection] = useState("PAGES");

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // --- MODIFIED: Increased font size and weight for better readability ---
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-base font-medium m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-base font-medium text-gray-600 dark:text-gray-200 dark:hover:text-black hover:bg-teal-100 m-2";

  return (
    // --- MODIFIED: Added soft pastel background and a border for a professional UI ---
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-teal-50 dark:bg-secondary-dark-bg border-r border-gray-200 dark:border-gray-600">
      <style>{styles}</style>

      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>ShopHub</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {/* --- MODIFIED: Logic now separates static sections from collapsible ones --- */}
            {links.map((item, index) => {
              // The first section (index 0) will be static and always open.
              if (index === 0) {
                return (
                  <div key={item.title}>
                    <p className="text-gray-500 dark:text-gray-400 m-3 mt-4 uppercase font-bold">
                      {item.title}
                    </p>
                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.name}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize">{link.name}</span>
                      </NavLink>
                    ))}
                  </div>
                );
              }

              // All other sections will be collapsible accordions.
              const isOpen = openSection === item.title;
              return (
                <div key={item.title}>
                  {/* --- MODIFIED: Arrow is now in front of the heading --- */}
                  <button
                    onClick={() => setOpenSection(isOpen ? null : item.title)}
                    className="w-full flex items-center gap-3 text-gray-500 dark:text-gray-400 p-3 mt-4 cursor-pointer hover:bg-teal-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <div className={`arrow-icon ${isOpen ? "arrow-open" : ""}`}>
                      <MdKeyboardArrowDown />
                    </div>
                    <span className="uppercase font-bold">{item.title}</span>
                  </button>

                  <div className={`submenu ${isOpen ? "submenu-open" : ""}`}>
                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.name}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLink : normalLink
                        }
                      >
                        {link.icon}
                        <span className="capitalize ">{link.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
