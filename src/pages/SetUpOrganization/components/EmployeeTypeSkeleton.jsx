import React from "react";
import Skeleton from "@mui/material/Skeleton";

const EmployeeTypeSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((id) => (
        <tr className="!font-medium border-b" key={id}>
          <td className="!text-left pl-8 py-3 ">
            <Skeleton width={20} animation="wave" />
          </td>
          <td className="py-3">
            <Skeleton width={100} animation="wave" />
          </td>
          <td className="whitespace-nowrap px-6 py-2">
            <Skeleton variant="rounded" width={46} animation="wave" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default EmployeeTypeSkeleton;
