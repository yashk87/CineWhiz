import { useQuery } from "react-query";
import axios from "axios";
import { useContext } from "react";
import { UseContext } from "../../State/UseState/UseContext";

const fetchSingleShift = async (shiftId, authToken) => {
  console.log(shiftId, "shiftid");

  try {
    const response = await axios.get(
      s`${process.env.REACT_APP_API}/route/getSingleshifts/${shiftId}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching single shift");
  }
};

const GetSingleShift = (shiftId, authToken) => {
  return useQuery(["singleShift", shiftId], () =>
    fetchSingleShift(shiftId, authToken)
  );
};

export default GetSingleShift;
