import { Add, BeachAccessOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { TestContext } from "../../../State/Function/Main";
import { UseContext } from "../../../State/UseState/UseContext";
import Setup from "../Setup";
import LeaveTypeEditBox from "./components/leave-type-layoutbox";
import SkeletonForLeaveTypes from "./components/skeleton-for-leavetype";

const LeaveTypes = ({ open, handleClose, id }) => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [leaveTypeToDelete, setLeaveTypeToDelete] = useState(null);

  console.log(`🚀 ~ leaveTypes:`, leaveTypes);
  const params = useParams();
  const { invalidateQueries } = useQueryClient();
  const { data = [], isLoading } = useQuery("leaveTypes", async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/leave-types-details/get`,
      config
    );
    setLeaveTypes(response.data.data);
    return response.data.data.leaveTypes;
  });

  const [newLeaveType, setNewLeaveType] = useState("");
  const handleDeleteType = (leaveTypeId) => {
    setLeaveTypeToDelete(leaveTypeId);
    setConfirmOpen(true);
  };
  const { handleAlert } = useContext(TestContext);
  const handleCreateLeave = () => {};

  return (
    <section className="bg-gray-50 min-h-screen w-full">
      <Setup>
        <div className="SetupSection w-[80%] h-full bg-white   shadow-xl  rounded-sm">
          <div className="p-4  border-b-[.5px] flex items-center  gap-3 w-full border-gray-300 justify-between">
            <div className="flex gap-3">
              {" "}
              <div className="rounded-full bg-sky-500 h-[30px] w-[30px] flex items-center justify-center">
                <BeachAccessOutlined className="!text-lg text-white" />
              </div>
              <h1 className="!text-lg tracking-wide">Create Leave Types</h1>
            </div>
            <Button
              className="!bg-[#0ea5e9]"
              variant="contained"
              onChange={handleCreateLeave}
            >
              <Add />
              Apply For Leave
            </Button>
          </div>

          <ul className=" flex flex-col justify-between ">
            {isLoading ? <SkeletonForLeaveTypes /> : ""}
            {leaveTypes &&
              leaveTypes.map((leaveType, index) => (
                <LeaveTypeEditBox
                  key={index}
                  leaveType={leaveType}
                  index={index}
                />
              ))}
          </ul>

          {/* <div className="flex gap-4 px-4 items-center">
            <div className="w-max p-2 my-2  cursor-pointer rounded-full border ring-sky-300 shadow-md">
              <AddIcon onClick={handleInput} className="!text-2xl" />
            </div>
            {isinputOpen && (
              <Stack width="100%" className="px-2">
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
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          sx={{
                            display:
                              newLeaveType === undefined || newLeaveType === ""
                                ? "none"
                                : "block",
                          }}
                          onClick={addLeaveType}
                        >
                          <SendIcon color="primary" />
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => setNewLeaveType(e.target.value)}
                    value={newLeaveType}
                    label="Add leave type"
                  />
                </FormControl>
              </Stack>
            )}
          </div> */}
          {/* <div className="flex px-4 py-4 ">
            <Button
              onClick={createLeave}
              size="small"
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
          </div> */}
        </div>
      </Setup>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this leave type?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteType()} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default LeaveTypes;
