import React from "react";
import {
  AddLocationAltOutlined,
  BeachAccessOutlined,
  EventAvailableOutlined,
  ManageAccountsOutlined,
  PersonAddAlt1Outlined,
  PriceChangeOutlined,
  SettingsOutlined,
  West,
} from "@mui/icons-material";
import { Link, useLocation, useParams } from "react-router-dom";

const Setup = ({ children }) => {
  const location = useLocation();
  const { id } = useParams("");

  const data = [
    {
      label: "Add Roles",
      icon: PersonAddAlt1Outlined,
      href: `/setup/add-roles/${id}`,
      active: location.pathname === `/setup/add-roles/${id}`,
    },
    {
      label: "Leave Types",
      icon: BeachAccessOutlined,
      href: `/setup/leave-types/${id}`,
      active: location.pathname === `/setup/leave-types/${id}`,
    },

    {
      label: "Shift Types",
      icon: EventAvailableOutlined,
      href: `/setup/set-shifts/${id}`,
      active: location.pathname === `/setup/set-shifts/${id}`,
    },
    {
      label: "Public Holidays",
      icon: BeachAccessOutlined,
      href: "/",
      active: location.pathname === "",
    },

    {
      label: "Add Location",
      icon: AddLocationAltOutlined,
      href: "/",
      active: location.pathname === "",
    },
    {
      label: "Employement type",
      icon: ManageAccountsOutlined,
      href: `/setup/employement-types/${id}`,
      active: location.pathname === `/setup/employement-types/${id}`,
    },
    {
      label: "Salary Input Field selection",
      icon: PriceChangeOutlined,
      href: `/setup/salary-input-selection/${id}`,
      active: location.pathname === `/setup/salary-input-selection/${id}`,
    },
  ];

  return (
    <>
      <section ction className=" bg-gray-50 min-h-screen w-full">
        <header className="text-xl w-full pt-6 bg-white shadow-md   p-4">
          <Link to={"/"}>
            <West className="mx-4 !text-xl" />
          </Link>
          Organization Setup page
        </header>
        <article className="p-4 w-full h-full flex gap-4">
          <aside className="md:w-[30%] lg:!w-[20%]  h-max flex flex-col items-center shadow-lg justify-center bg-white">
            <div className="px-4 py-3 gap-4 border-b-[.5px] flex w-full items-center border-gray-300">
              <div className="rounded-full h-[30px] w-[30px] flex items-center justify-center">
                <SettingsOutlined className="!text-md text-sky-400 hover:!rotate-180  cursor-pointer" />
              </div>
              <h1 className="!text-lg tracking-wide">Setup Settings</h1>
            </div>

            {data.map((item, id) => (
              <Link
                to={item.href}
                key={id}
                className={`group ${
                  item.active && "bg-sky-100 !text-blue-500"
                }  hover:bg-sky-100 transition-all   flex w-full items-center text-gray-700   gap-4 px-4 py-3 cursor-pointer `}
              >
                <item.icon className="!text-2xl  group-hover:!text-blue-500 !font-thin " />
                <h1 className="group-hover:!text-blue-500 ">{item.label}</h1>
              </Link>
            ))}
          </aside>
          {children}
        </article>
      </section>
    </>
  );
};

export default Setup;
