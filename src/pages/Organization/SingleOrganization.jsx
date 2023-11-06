import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FactoryIcon from "@mui/icons-material/Factory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EastIcon from "@mui/icons-material/East";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";

const SingleOrganization = () => {
  const { id } = useParams("");

  const [organization, setOrganization] = useState([]);

  const getSingleData = async () => {
    const data = await axios.get(
      `http://localhost:4000/route/organization/get/${id}`
    );
    setOrganization(data.data.organizations);
  };

  useEffect(() => {
    getSingleData();
  }, [id]);

  return (
    <>
      <Stack className="px-10 py-10">
        <Stack direction={"row"} className="pl-2 gap-4 items-center mb-4">
          <Box className="p-4 rounded-full bg-sky-50 shadow-lg h-max w-max">
            <CorporateFareIcon className="!h-5" />
          </Box>
          <Typography
            variant="h1"
            className="!text-2xl !mb-2  text-blue-500  font-semibold"
          >
            {organization.name}
          </Typography>

          <Box>
            <Typography
              variant="body2"
              className="text-gray-600 !text-sm !mt-4 pl-4 flex gap-2 items-center"
            >
              <CalendarTodayIcon />
              <span className="text-sm">
                Joined on {organization.foundation_date}
              </span>
            </Typography>
          </Box>
        </Stack>

        <Stack direction={"row"} className="!mt-4 gap-40 px-4">
          <Box>
            <Typography variant="body1" color="#666">
              <InsertLinkIcon /> Website Link
            </Typography>
            <Link
              className="text-[15px]  underline text-blue-400"
              to={organization.web_url}
            >
              {organization.web_url}
            </Link>
          </Box>

          <Box>
            <Typography variant="body1" className="!mb-2" color="#666">
              <LinkedInIcon /> Linkedin link
            </Typography>
            <Typography className="!text-sm  ">No link provided</Typography>
          </Box>
          <Box>
            <Typography variant="body1" className="!mb-2" color="#666">
              <EmailIcon /> Email
            </Typography>
            <Typography className="!text-sm underline font-thin text-blue-400">
              {organization.email}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" className="!mb-2" color="#666">
              <LocalPhoneIcon /> Contact Number
            </Typography>
            <Typography className="!text-sm text-gray-600">
              {organization.contact_number}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={"row"} className="!mt-4 gap-40 px-4">
          <Box>
            <Typography variant="body1" className="!mb-2" color="#666">
              <FactoryIcon /> Industry type
            </Typography>
            <Typography className="!text-sm text-gray-600">
              {organization.industry_type}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" className="!mb-1" color="#666">
              <LocationOnIcon /> Organization location
            </Typography>
            <Typography className="!text-sm text-gray-600">
              {organization.location}
            </Typography>
          </Box>
        </Stack>

        <Box className="w-full my-4 px-4">
          <Divider />
        </Box>
        <Box className="px-4">
          <Typography variant="body1" color="#666">
            <DescriptionIcon /> Description
          </Typography>
          <Typography className="!text-sm !mt-2 text-gray-600 ">
            {organization.description}
          </Typography>
        </Box>

        <Box className="w-full my-4 px-4">
          <Button
            size="small"
            className="!font-bold flex gap-4"
            variant="contained"
          >
            Go to setup page <EastIcon />
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default SingleOrganization;
