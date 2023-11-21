import { jwtDecode } from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UseContext } from "../../State/UseState/UseContext";
import { useContext } from "react";
import { LocationOn, Person } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";

const UserProfile = () => {
  const { cookies, removeCookie } = useContext(UseContext);
  const token = cookies["aeigs"];
  const [user, setUser] = useState();
  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.user) {
        setUser(decodedToken.user);
      } else {
        setUser();
      }
    } catch (error) {
      console.error("Failed to decode the token:", error);
    }
  }, []);
  return (
    <section className="min-h-screen bg-gray-50 px">
      <article className="flex pt-20">
        <div className="w-[35%] flex  justify-end">
          <div className=" rounded-lg h-max">
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="none"
              className="h-[40vh]"
            />
          </div>
        </div>

        <div className="w-[50%] flex flex-col pl-20 ">
          <div className="flex gap-8 items-center">
            <h1 className="text-2xl font-medium leading-relaxed">
              {user?.first_name} {user?.middle_name} {user?.last_name}
            </h1>
            <p className="text-gray-400 !text-sm !font-medium">
              <LocationOn className="!text-sm" /> {user?.address}
            </p>
          </div>
          <p className="text-blue-500 !font-semibold">
            {user?.profile.map((profile) => profile)}
          </p>

          <div className="pr-6 pt-4">
            <div className="text-gray-400 flex items-center  border-b-[2px] pr-4 w-max border-blue-500 gap-2">
              <Person />
              <h1 className=" tracking-wider">About</h1>
            </div>
            <Divider />

            <div className="mt-6   p-4 rounded-md bg-white shadow-md  ">
              <h1 className="text-gray-400 !text-xs tracking-wider">
                CONTACT INFORMATION
              </h1>

              <div className="flex gap-10 pt-2  items-center">
                <div className="flex flex-col gap-4 pt-4 ">
                  <h1 className="text-gray-800  !text-[15px]  leading-relaxed">
                    Phone:
                  </h1>
                  <h1 className="text-gray-800  !text-[15px]  leading-relaxed">
                    Phone2:
                  </h1>

                  <h1 className="text-gray-800  !text-[15px]  leading-relaxed">
                    Email:
                  </h1>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <h1 className=" !text-[15px]  leading-relaxed">
                    {user?.emergency_contact}
                  </h1>
                  <h1 className=" !text-[15px]  leading-relaxed">
                    {user?.phone_number}
                  </h1>
                  <h1 className=" !text-[15px]  leading-relaxed">
                    {user?.email}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default UserProfile;
