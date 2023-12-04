import { Button, Typography } from "@mui/material";
import axios from "axios";
import bodymovin from "lottie-web";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";

const AnimationComponent = () => {
  const { handleAlert } = useContext(TestContext);
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      console.log("Helo");
      try {
        const url = `${process.env.REACT_APP_API}/route/employee/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log("error", error);
        handleAlert(
          true,
          "error",
          error?.response?.data?.message ||
            "Failed to sign in. Please try again."
        );
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param.token, handleAlert]);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const svgContainer = svgContainerRef.current;
    const animItem = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: "svg",
      loop: true,
      path: "https://dev.anthonyfessy.com/check.json",
    });

    return () => {
      animItem.destroy(); // Cleanup animation on component unmount
    };
  }, []); // Empty dependency array ensures the effect runs once after initial render

  return (
    <div className=" flex flex-col items-center gap-6">
      {validUrl ? (
        <>
          <div className="flex items-center justify-center overflow-hidden bg-[white] p-10">
            <div
              ref={svgContainerRef}
              className="max-w-full max-h-full text-center bg-[white] h-[400px]"
            ></div>
          </div>
          <Typography variant="body1" color="initial">
            Authorized successfully You can{" "}
          </Typography>
          <Link to={"/sign-in"}>
            <Button variant="contained">Login Now</Button>
          </Link>
        </>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default AnimationComponent;
