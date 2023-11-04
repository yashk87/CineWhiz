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

const Organisation = () => {
  return (
    <Link
      to={"/add-organisation"}
      className=" cursor-pointerhover:scale-95 scroll-smooth transition-all"
    >
      <Card sx={{ overflow: "visible" }}>
        <CardActionArea disabled className="!w-[320px]">
          <CardMedia
            component="img"
            className="h-[140px] rounded-t-md"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography
              color={"#1D6EB7"}
              gutterBottom
              variant="h5"
              component="div"
              className="hover:underline"
            >
              Organisation-1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <div className="flex items-center px-2 py-4 justify-end gap-4">
            <Button size="small" variant="contained">
              Go to setuppage
            </Button>
            <Button size="small" variant="contained">
              Create Profile
            </Button>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default Organisation;
