import React, { useContext, useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

import { RiTaskLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { MdOutlinePermContactCalendar } from "react-icons/md";

const Sidebar = () => {
  
  const { darkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "" };

  useEffect(() => {
    setLoading(false);
  }, []);
  

  

  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Tasks", link: "/tasks", icon: RiTaskLine },
    { name: "Projects", link: "/projects", icon: GrProjects },
    { name: "contacts", link: "/contacts", icon: MdOutlinePermContactCalendar },
    { name: "Mails", link: "/", icon: FiMail, margin: true },
    { name: "messages", link: "/", icon: FiMessageSquare },
    {
      name: "Setting",
      link: `/settings/${user.fullname}`,
      icon: RiSettings4Line,
      data: {user},
    },

  ];

  if (loading) {
    return <div>Loading...</div>;
  }
   

  return (
    <section
      className={`flex gap-6 border-r border-border bg-background text-foreground `}
    >
      <div
        className={`   
        duration-500 px-4 min-h-screen  
        ${open ? "md:w-72 w-30" : "w-16"} `}
      >
        <div className="py-3 flex justify-end  ">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer mt-2"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-10 flex flex-col gap-4 relative ">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              state={menu?.data}
              className={` 
              group flex items-center text-sm  gap-3.5 p-2 rounded-md 
              ${menu?.margin && "mt-5"} 
              ${
                open
                  ? darkMode
                    ? "hover:bg-slate-500 focus:bg-slate-500"
                    : "hover:bg-slate-300 focus:bg-slate-300"
                  : ""
              }

              `}
            >
              <div>{React.createElement(menu?.icon, { size: "25" })}</div>
              <h2
                style={{
                  transitionDelay: `md:${i + 3}00ms ${i + 1}00ms`,
                }}
                className={`whitespace-pre duration-500 
                ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
