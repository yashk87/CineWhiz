import { Checkbox, FormControlLabel, Skeleton } from "@mui/material";
import React from "react";

const SkeletonForLeaveTypes = () => {
  return (
    <>
      <li className="flex gap-4 justify-between py-2 px-6 border-gray-200 border-b-[.5px]">
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={<Skeleton width={100} />}
        />
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={190}
            height={40}
            className=""
          />
          <Skeleton
            variant="circular"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
      </li>
      <li className="flex gap-4 justify-between py-2 px-6 border-gray-200 border-b-[.5px]">
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={<Skeleton width={100} />}
        />
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={190}
            height={40}
            className=""
          />
          <Skeleton
            variant="circular"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
      </li>
      <li className="flex gap-4 justify-between py-2 px-6 border-gray-200 border-b-[.5px]">
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={<Skeleton width={100} />}
        />
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={190}
            height={40}
            className=""
          />
          <Skeleton
            variant="circular"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
      </li>
      <li className="flex gap-4 justify-between py-2 px-6 border-gray-200 border-b-[.5px]">
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={<Skeleton width={100} />}
        />
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={190}
            height={40}
            className=""
          />
          <Skeleton
            variant="circular"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
      </li>
      <li className="flex gap-4 justify-between py-2 px-6 border-gray-200 border-b-[.5px]">
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={<Skeleton width={100} />}
        />
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={190}
            height={40}
            className=""
          />
          <Skeleton
            variant="circular"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
      </li>
      <li className="flex gap-4 justify-between py-2 px-6 border-gray-200 border-b-[.5px]">
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={<Skeleton width={100} />}
        />
        <div className="flex gap-2">
          <Skeleton
            variant="rectangular"
            width={190}
            height={40}
            className=""
          />
          <Skeleton
            variant="circular"
            className="rounded-full"
            width={40}
            height={40}
          />
        </div>
      </li>
    </>
  );
};

export default SkeletonForLeaveTypes;
