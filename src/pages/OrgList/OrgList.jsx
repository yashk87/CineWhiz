import { East, West } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import { useQuery } from "react-query";
import { UseContext } from "../../State/UseState/UseContext";
import Organisation from "../Home/components/Organisation";
import TextCycler from "../Home/components/cyclic-text";

const OrgList = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { data, isLoading } = useQuery(["orgData"], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/organization/get`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data;
  });

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
        <East />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button
        className="p-2 rounded-full text-[2px] border-sky-600 font-bold bg-slate-300 text-sky-600 border absolute left-0"
        onClick={() => onClick()}
      >
        <West className="h-2 w-4 text-[5px]" />
      </button>
    );
  };

  return (
    <div className="p-8 bg-white h-screen">
      <TextCycler />
      <Divider />
      <Typography variant="body1" className=" !font-medium !text-2xl">
        List of Organization
      </Typography>

      {!isLoading && (
        <Carousel
          swipeable={false}
          draggable={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
          responsive={dotsresponsive}
        >
          {data?.organizations?.map((item, index) => (
            <div className="h-max py-4" key={index}>
              <Organisation item={item} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default OrgList;
