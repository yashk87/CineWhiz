import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import Organisation from "./components/Organisation";

const Home = () => {
  const { cookies } = useContext(UseContext);
  const { handleAlert } = useContext(TestContext);
  const redirect = useNavigate();
  const [organizationData, setOrganizationData] = useState([]);
  const [userRole, setUserRole] = useState();

  const authToken = cookies["aeigs"];
  const token = cookies["aeigs"];

  useEffect(() => {
    try {
      if (token) {
        const decodedToken = jwtDecode(authToken);
        if (decodedToken && decodedToken.user) {
          setUserRole(decodedToken.user);
        } else {
          setUserRole("guest");
        }
      }
    } catch (error) {
      console.error("Failed to decode the token:", error);
    }
  }, [token]);

  useEffect(() => {
    if (!authToken) {
      // Redirect to the login page
      redirect("/sign-in");
      handleAlert(true, "warning", "Please login first.");
    }
  }, [redirect, cookies, handleAlert, authToken]);

  const getData = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API}/route/organization/get`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    setOrganizationData(data.data.organizations);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const dotsresponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1050 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 1050, min: 500 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const CustomRightArrow = ({ onClick }) => {
    // onMove means if dragging or swiping in progress.
    return (
      <button
        className="p-2 rounded-full border-sky-600 font-bold bg-slate-300 text-sky-600 border absolute right-0"
        onClick={() => onClick()}
      >
        <EastIcon />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        className="p-2 rounded-full text-[2px] border-sky-600 font-bold bg-slate-300 text-sky-600 border absolute left-0"
        onClick={() => onClick()}
      >
        <WestIcon className="h-2 w-4 text-[5px]" />
      </button>
    );
  };

  return (
    <div className="p-8 bg-white h-screen">
      <div className="absolute top-0 right-[50%] pattern"></div>
      {/* <TextCycler />
      <Divider /> */}
      {/* <Org /> */}
      <div className="w-full  ">
        {organizationData.length >= 0 ? (
          <>
            <div className="flex items-center h-[60vh] justify-center w-full">
              <div className="w-[50%] px-8   flex justify-start items-end  flex-col">
                <div>
                  <h1 className="text-5xl font-semibold text-blue-500 ">
                    Welcome to AGIES {userRole?.first_name}{" "}
                    {userRole?.last_name}
                  </h1>
                  <h2 className="text-xl mb-4 font-semibold">
                    Unleashing Organizational Excellence
                  </h2>

                  <button className=" flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-500 focus-visible:outline-blue-500">
                    Create your organization
                  </button>
                </div>
              </div>

              <div className="w-[50%]">
                <img
                  src="community.svg"
                  className=" px-8 h-[40vh]"
                  alt="none"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Typography variant="body1" className=" !font-medium !text-2xl">
              List of Organization
            </Typography>

            <Carousel
              swipeable={false}
              draggable={false}
              customRightArrow={<CustomRightArrow />}
              customLeftArrow={<CustomLeftArrow />}
              responsive={dotsresponsive}
            >
              {organizationData.map((item, index) => (
                <div className="h-max py-4" key={index}>
                  <Organisation item={item} />
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>

      {/* <Org /> */}
    </div>
  );
};

export default Home;
