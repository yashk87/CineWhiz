import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Organisation = ({ item }) => {
  const navigate = useNavigate();
  const handleCreateProfile = () => {
    navigate(`/organisation/${item._id}/add-profile`, {
      state: { orgName: item.name },
    });
  };
  return (
    <Card
      className=" hover:shadow-lg !transition-all  h-max    !w-[320px]"
      sx={{ overflow: "visible" }}
    >
      <Link
        to={`/organisation/${item._id}`}
        className=" cursor-pointerhover:scale-95 scroll-smooth transition-all"
      >
        <CardContent>
          <Typography
            color={"#1D6EB7"}
            gutterBottom
            variant="h6"
            component="div"
            className="hover:underline"
          >
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description : {item.description}
          </Typography>
        </CardContent>
      </Link>

      <div className="space-x-4 p-2 pb-6">
        <Link to={`/setup/add-roles/${item._id}`}>
          <Button size="small" className=" cursor-pointer" variant="contained">
            Go to setuppage
          </Button>
        </Link>
        <Button
          size="small"
          className=" cursor-pointer"
          variant="contained"
          onClick={handleCreateProfile}
        >
          Create Profile
        </Button>
      </div>
    </Card>
  );
};

export default Organisation;
