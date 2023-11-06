import { Divider, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import TextCycler from "./components/cyclic-text";
import Organisation from "./components/Organisation";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const { cookies } = useContext(UseContext);
  const { handleAlert } = useContext(TestContext);
  const redirect = useNavigate();
  const [organizationData, setOrganizationData] = useState([]);

  const getData = async () => {
    const data = await axios.get(
      "http://localhost:4000/route/organization/get"
    );

    setOrganizationData(data.data.organizations);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const authToken = cookies["aeigs"];
    if (!authToken) {
      // Redirect to the login page
      redirect("/sign-in");
      handleAlert(true, "warning", "Please login first.");
    }
  }, [redirect, cookies, handleAlert]);

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

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
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

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
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
    <div className="p-8 bg-slate-50 h-screen">
      <TextCycler />
      <Divider />
      {/* <Org /> */}

      <div className="w-full  mt-6">
        <Typography variant="h4" className="!font-medium">
          Organization
        </Typography>

        {/* {organizationData.length <= 0 ? (
          <Card elevation={3} className="p-4 !rounded-md !bg-sky-50">
            <CardContent>
              <div className="flex  gap-8">
                <div className="p-4 w-max h-max rounded-full shadow-lg bg-sky-600 text-white">
                  <CorporateFareIcon className="!h-8 !w-8" />
                </div>

                <div className="space-y-2">
                  <Typography className="!text-3xl !font-semibold">
                    Create an Organization
                  </Typography>
                  <Typography>
                    Create an organzation first to preview it
                  </Typography>
                  <Link to={"/add-organisation"}>
                    <Button
                      size="small"
                      className="!mt-6 !font-bold"
                      variant="contained"
                    >
                      Add Organization
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : ( */}
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
        {/* )} */}
      </div>

      {/* <Org /> */}
    </div>
  );
};

export default Home;
