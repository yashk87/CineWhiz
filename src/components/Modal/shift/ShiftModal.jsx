import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

import { Input, Timepicker, initTE } from "tw-elements";

const ShiftModal = ({ handleClose, open }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  useEffect(() => {
    initTE({ Input, Timepicker });
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="border-none !z-10 !pt-0 !px-0 md:w-[40%] w-[40%] shadow-md outline-none rounded-md"
        >
          <div className="flex justify-between py-4 items-center  px-4">
            <h1 id="modal-modal-title" className="text-lg pl-2 font-semibold">
              Create a shift
            </h1>
            <IconButton onClick={handleClose}>
              <CloseIcon className="!text-[16px]" />
            </IconButton>
          </div>

          <div className="w-full">
            <Divider variant="fullWidth" orientation="horizontal" />
          </div>

          <div className="px-5 space-y-4 mt-4">
            <div className="space-y-2 ">
              <label className="text-sm" htmlFor="demo-simple-select-label">
                Select shift type
              </label>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Leave Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={leavesTypes}
                  label="Select Leave Type"
                  //   onChange={handleChange}
                >
                  <MenuItem value={"remote"}>Remote</MenuItem>
                  <MenuItem value={"office"}>Office</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="space-y-2 ">
              <label className="text-sm" htmlFor="demo-simple-select-label">
                Enter shift name
              </label>
              <FormControl
                size="small"
                sx={{ m: 1, width: "100%" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Add leave type
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  //   endAdornment={
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         aria-label="toggle password visibility"
                  //         edge="end"
                  //         sx={{
                  //           display:
                  //             newLeaveType === undefined || newLeaveType === ""
                  //               ? "none"
                  //               : "block",
                  //         }}
                  //         onClick={addLeaveType}
                  //       >
                  //         <SendIcon color="primary" />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   }
                  //   onChange={(e) => setNewLeaveType(e.target.value)}
                  //   value={newLeaveType}
                  label="Add leave type"
                />
              </FormControl>
            </div>

            <div className="space-y-2 ">
              <label className="text-sm" htmlFor="demo-simple-select-label">
                Enter shift name
              </label>
              <div
                class="relative"
                data-te-with-icon="false"
                data-te-timepicker-init
                data-te-input-wrapper-init
                id="timepicker-just-input"
              >
                <input
                  type="text"
                  class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  data-te-toggle="timepicker-just-input"
                  id="form15"
                />
                <label
                  for="form15"
                  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Select a time
                </label>
              </div>
            </div>

            <div className="flex gap-4  mt-4 justify-end">
              <Button
                onClick={handleClose}
                size="small"
                color="error"
                variant="outlined"
              >
                cancal
              </Button>
              <Button
                // onClick={createLeave}
                size="small"
                variant="contained"
                color="primary"
              >
                Apply
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ShiftModal;
