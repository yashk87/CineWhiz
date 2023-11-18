import EventBusyIcon from "@mui/icons-material/EventBusy";
import { Box, Button, Modal } from "@mui/material";
import React from "react";

// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";

const LeaveRejectmodal = ({ open, handleClose, id }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  // console.log(id, "id");

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
          className="border-none md:w-[40%] w-[40%] shadow-md outline-none rounded-md"
        >
          <header className="flex items-center mb-4 gap-2">
            <EventBusyIcon className="h-4 w-4 text-gray-700 !text-[1.7rem]" />
            <h1
              id="modal-modal-title"
              className="text-xl font-semibold leading-relaxed "
            >
              Reject leave request
            </h1>
          </header>

          <div className="w-full space-y-2">
            <label className="mb-2 text-md font-semibold" htmlFor="desc">
              Enter desc for rejecting the leave request
            </label>
            <textarea
              id="desc"
              rows={5}
              className="border-[.5px] border-gray-200 rounded-md w-full"
            ></textarea>
          </div>
          <div className="flex gap-4 mt-4 justify-end">
            <Button
              size="small"
              onClick={handleClose}
              color="error"
              variant="contained"
            >
              cancal
            </Button>
            <Button
              // onClick={createLeave}
              size="small"
              variant="contained"
              color="primary"
            >
              submit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default LeaveRejectmodal;
