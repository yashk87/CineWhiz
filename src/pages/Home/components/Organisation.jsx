import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Organisation = ({ item }) => {
  return (
    <Card
      className=" hover:shadow-lg !transition-all  h-max    !w-[320px]"
      sx={{ overflow: "visible" }}
    >
      {/* <CardMedia
        component="img"
        className="h-[140px] rounded-t-md"
        image={"https://mui.com/static/images/cards/contemplative-reptile.jpg"}
        alt="green iguana"
      /> */}
      <Link
        to={`/organisation/${item._id}`}
        className=" cursor-pointerhover:scale-95 scroll-smooth transition-all"
      >
        <CardContent>
          <Typography
            color={"#1D6EB7"}
            gutterBottom
            variant="h5"
            component="div"
            className="hover:underline"
          >
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description : {item.description}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
          Email : {item.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact Number : {item.contact_number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Website : {item.web_url}
        </Typography> */}
          {/* <Typography variant="body2" color="text.secondary">
              Foundation date : {item.foundation_date}
            </Typography> */}
        </CardContent>
      </Link>

      <div className="space-x-4 p-2 pb-6">
        <Button size="small" className=" cursor-pointer" variant="contained">
          Go to setuppage
        </Button>
        <Button size="small" className=" cursor-pointer" variant="contained">
          Create Profile
        </Button>
      </div>
    </Card>
  );
};

export default Organisation;
