import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";

const UserProfile = () => {
  const { currentColor } = useStateContext();

  return (
    /* card container */
    <div className="nav-item absolute right-4 top-20 w-96 rounded-2xl bg-surface-1 dark:bg-[#42464D] p-8 shadow-card">
      {/* header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-main dark:text-gray-200">
          User&nbsp;Profile
        </h2>
        <Button
          icon={<MdOutlineCancel />}
          color="#99ABB4"
          bgHoverColor="surface-2"
          size="2xl"
          borderRadius="50%"
        />
      </div>

      {/* avatar & details */}
      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <img
          src={avatar}
          alt="user-profile"
          className="h-28 w-28 rounded-full object-cover shadow-card"
        />
        <p className="text-xl font-semibold text-text-main dark:text-gray-200">
          Michael&nbsp;Roberts
        </p>
        <p className="text-sm text-text-muted dark:text-gray-400">
          Administrator
        </p>
        <p className="text-sm font-medium text-text-muted dark:text-gray-400">
          info@shop.com
        </p>
      </div>

      {/* quick action grid */}
      <div className="mt-10 grid grid-cols-2 gap-4">
        {userProfileData.map(({ icon, iconColor, iconBg, title }, i) => (
          <button
            key={i}
            type="button"
            style={{ color: iconColor, backgroundColor: iconBg }}
            className="flex flex-col items-center justify-center gap-2 rounded-xl py-4 hover:shadow-hover transition-shadow"
          >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-medium text-text-main dark:text-gray-200">
              {title}
            </span>
          </button>
        ))}
      </div>

      {/* divider */}
      <hr className="my-8 border-t border-color" />

      {/* logout button */}
      <Button
        text="Logout"
        color="#FFFFFF"
        bgColor={currentColor}
        borderRadius="10px"
        width="full"
      />
    </div>
  );
};

export default UserProfile;
