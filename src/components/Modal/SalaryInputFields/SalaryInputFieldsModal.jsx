import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
} from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { TestContext } from "../../../State/Function/Main";
import { useContext } from "react";
import { UseContext } from "../../../State/UseState/UseContext";
import { useEffect } from "react";

const SalaryInputFieldsModal = ({ handleClose, open, id, salaryId }) => {
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  // Get Query
  const { data: empTypeslist, isLoading } = useQuery("empTypes", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/route/employment-types`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    return response.data;
  });

  // const { data, isLoading } = useQuery(
  //   ["empType", salaryId],
  //   async () => {
  //     if (open && salaryId !== null) {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API}/route/employment-types/${salaryId}`,
  //         {
  //           headers: {
  //             Authorization: authToken,
  //           },
  //         }
  //       );
  //       return response.data;
  //     }
  //   },
  //   {
  //     enabled: open && salaryId !== null,
  //   }
  // );

  const [userInput, setUserInput] = useState({
    name: "",
    desc: "",
  });

  const [empTypes, setEmpTypes] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

  const queryClient = useQueryClient();
  const AddEmployeeTypes = useMutation(
    (data) =>
      axios.post(`${process.env.REACT_APP_API}/route/employment-types`, data, {
        headers: {
          Authorization: authToken,
        },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["empTypes"] });
        handleClose();
        handleAlert(true, "success", "Employee types generated succesfully");
      },
      onError: () => {
        setError("An error occurred while creating a new employe Type");
      },
    }
  );

  // const EditEmployeeType = useMutation(
  //   (data) =>
  //     axios.put(
  //       `${process.env.REACT_APP_API}/route/employment-types/${salaryId}`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: authToken,
  //         },
  //       }
  //     ),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["empTypes"] });
  //       handleClose();
  //       handleAlert(true, "success", "Employee Types updated succesfully");
  //     },
  //     onError: () => {
  //       setError("An error occurred while creating a neemppTypet");
  //     },
  //   }
  // );

  // useEffect(() => {
  //   if (data?.empType) {
  //     setTitleEmpType(data?.empType?.title || "hii");
  //   }
  // }, [data]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // if (workingFrom === "") return handleError("Shift type field is mandatory");
  //   try {
  //     const data = {
  //       title: titleEmpType,
  //     };

  //     if (salaryId) {
  //       // await EditEmployeeType.mutateAsync(data);
  //     } else {
  //       await AddEmployeeTypes.mutateAsync(data);
  //     }
  //     // Reset form state
  //     setError("");
  //   } catch (error) {
  //     console.error(error);
  //     setError("An error occurred while creating a neemppTypet");
  //   }
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="border-none !z-10 !pt-0 !px-0 !w-[90%] lg:!w-[50%] md:!w-[60%] shadow-md outline-none rounded-md"
      >
        <div className="flex justify-between py-4 items-center  px-4">
          <h1 id="modal-modal-title" className="text-lg pl-2 font-semibold">
            {salaryId ? "Edit Salary Template" : "Create Salary Template"}
          </h1>
          <IconButton onClick={handleClose}>
            <CloseIcon className="!text-[16px]" />
          </IconButton>
        </div>

        <div className="w-full">
          <Divider variant="fullWidth" orientation="horizontal" />
        </div>

        <div className="px-5 space-y-4 mt-4">
          {error && <p className="text-red-500">*{error}</p>}

          <div className="space-y-2 ">
            <label className="text-md" htmlFor="demo-simple-select-label">
              Enter template name
            </label>
            <FormControl size="small" sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Enter name"
                value={userInput.name}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>

          <div className="space-y-2 ">
            <label className="text-md" htmlFor="demo-simple-select-label">
              Enter description
            </label>
            <FormControl size="small" sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enter description
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Enter description"
                multiline
                rows={3}
                value={userInput.desc}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>

          <div className="space-y-2 ">
            <label className="text-sm" htmlFor="demo-simple-select-label">
              Select Employment Types
              {/* {shiftId && isLoading ? "loading" : "Select shift type"} */}
            </label>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select shift Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={empTypes}
                onChange={(e) => setEmpTypes(e.target.value)}
                label="Select Leave Type"
              >
                {empTypeslist?.empTypes?.length > 0 ? (
                  empTypeslist?.empTypes?.map((item, id) => (
                    <MenuItem key={id} value={item?._id}>
                      {item?.title}
                    </MenuItem>
                  ))
                ) : (
                  <div className="flex w-full items-center justify-center p-2">
                    No data Found
                  </div>
                )}
              </Select>
            </FormControl>
          </div>

          <div className="flex gap-4  mt-4 justify-end">
            <Button onClick={handleClose} color="error" variant="outlined">
              Cancel
            </Button>
            {salaryId ? (
              <Button
                // onClick={handleSubmit}
                variant="contained"
                color="primary"
                // disabled={EditEmployeeType.isLoading}
              >
                {/* {EditEmployeeType.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                )} */}
                Edit Employee Types
              </Button>
            ) : (
              <Button
                // onClick={handleSubmit}
                variant="contained"
                color="primary"
                disabled={AddEmployeeTypes.isLoading}
              >
                {AddEmployeeTypes.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  "submit"
                )}
              </Button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SalaryInputFieldsModal;
