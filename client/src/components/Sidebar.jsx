import React, { useContext, useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import DMS from "../assets/DMS.svg";
import { RiTaskLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdOutlineDashboard, MdOutlinePermContactCalendar } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { RiSettings4Line } from "react-icons/ri";
import { AuthContext } from "../pages/Auth/contexts/AuthContext";

const Sidebar = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard, requiredRoles: ["admin"] },
    { name: "Tasks", link: "/tasks", icon: RiTaskLine, requiredRoles: ["admin", "Project Manager", "employee"] },
    { name: "Projects", link: "/projects", icon: GrProjects, requiredRoles: ["admin", "Project Manager"] },
    { name: "Contacts", link: "/contacts", icon: MdOutlinePermContactCalendar, requiredRoles: ["admin"] },
    { name: "Gmail", link: "/gmail", icon: FiMail, requiredRoles: ["admin", "Project Manager", "employee"] },
    { name: "Chat", link: "/chat/private", icon: FiMessageSquare, requiredRoles: ["admin", "Project Manager", "employee"] },
    { name: "Settings", link: `/settings/${user.fullname}`, icon: RiSettings4Line, requiredRoles: ["admin", "Project Manager", "employee"], data: {user} },
  ];
  

  const filteredMenus = menus.filter(menu => user && menu.requiredRoles.includes(user.role));

  return (
    <div className={`flex gap-6 border-r border-border bg-background text-foreground z-20`}>
      <div className={`duration-500 px-4 min-h-screen  ${open ? "md:w-72 w-30" : "w-16"} `}>
        <div className="flex justify-between  duration-500 transition-all ">
          {open && (
            <div className="">
              <img src={DMS} alt="DMSlogo" className="w-[65%] pt-4 ml-4" />
            </div>
          )}
          <div className="py-3  ">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer mt-2"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 relative  ">
          {filteredMenus.map((menu, i) => (
            <Link
              to={menu.link}
              state={menu?.data}
              key={i}
              className={` 
                group flex items-center text-sm  gap-3.5 p-2 rounded-md 
                ${menu?.margin && "mt-5"} 
                ${open ? (darkMode ? "hover:bg-slate-500 focus:bg-slate-500" : "hover:bg-slate-300 focus:bg-slate-300") : ""}
                `}
            >
              <div>{React.createElement(menu.icon, { size: "25" })}</div>
              <h2
                style={{
                  transitionDelay: `md:${i + 3}00ms ${i + 1}00ms`,
                }}
                className={`whitespace-pre duration-500 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
