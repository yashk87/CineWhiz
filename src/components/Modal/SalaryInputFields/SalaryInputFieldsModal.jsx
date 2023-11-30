import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Tooltip,
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
import {
  Add,
  Remove,
  RemoveCircleOutline,
  RemoveOutlined,
} from "@mui/icons-material";

const SalaryInputFieldsModal = ({ handleClose, open, id, salaryId }) => {
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];

  let salaryComponentArray = [
    "Basic",
    "HRA",
    "DA",
    "Varialble allowance",
    "Special allowance",
    "Travel allowance",
    "Food allowance",
    "Sales allowance",
    "other",
  ];

  const [SalaryComponent, setSalaryComponent] = useState(salaryComponentArray);
  const [filterdArray, setFillterArray] = useState(salaryComponentArray);

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
  //   ["salaryComponent", salaryId],
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

  // About  row
  const [salaryStructures, setSalaryStructures] = useState([
    { salaryComponent: "", manuallyInput: "", calculation: "None" },
  ]);

  const handleSalaryStructureChange = (index, field, value) => {
    setSalaryStructures((prevStructures) => {
      const newStructures = [...prevStructures];
      newStructures[index][field] = value;

      const filteredArray = salaryComponentArray.filter((item) => {
        return !newStructures.some(
          (structure) => structure.salaryComponent === item
        );
      });

      setFillterArray(filteredArray);

      return newStructures;
    });
  };

  const handleAddRow = () => {
    setSalaryStructures((prevStructures) => [
      ...prevStructures,
      { salaryComponent: "", manuallyInput: "", calculation: "None" },
    ]);
  };

  const handleRemoveRow = (index) => {
    setSalaryStructures((prevStructures) =>
      prevStructures.filter((_, i) => i !== index)
    );
  };

  const queryClient = useQueryClient();

  const AddSalaryInputs = useMutation(
    (data) =>
      axios.post(`${process.env.REACT_APP_API}/route/salary-template`, data, {
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
  //   if (data?.salaryComponent) {
  //     setTitleEmpType(data?.salaryComponent?.title || "hii");
  //   }
  // }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (workingFrom === "") return handleError("Shift type field is mandatory");
    try {
      const data = {
        salaryStructure: salaryStructures,
        ...userInput,
        salaryComponent: empTypes,
      };

      if (salaryId) {
        // await EditEmployeeType.mutateAsync(data);
      } else {
        await AddSalaryInputs.mutateAsync(data);
      }
      // Reset form state
      setError("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating a neemppTypet");
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "800px!important",
          height: "100%",
          maxHeight: "85vh!important",
        },
      }}
      open={open}
      onClose={handleClose}
      className="w-full"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex w-full justify-between py-4 items-center  px-4">
        <h1 id="modal-modal-title" className="text-lg pl-2 font-semibold">
          {salaryId ? "Edit Salary Template" : "Create Salary Template"}
        </h1>
        <IconButton onClick={handleClose}>
          <CloseIcon className="!text-[16px]" />
        </IconButton>
      </div>

      <DialogContent className="border-none  !pt-0 !px-0  shadow-md outline-none rounded-md">
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
                name={"name"}
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
                name={"desc"}
                value={userInput.desc}
                onChange={handleInputChange}
              />
            </FormControl>
          </div>

          <div className="space-y-2 ">
            <label className="text-md" htmlFor="demo-simple-select-label">
              Select Employment Types
              {/* {shiftId && isLoading ? "loading" : "Select shift type"} */}
            </label>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Employment Types
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

          <p className="text-md">Salary Structure</p>
          <div className="overflow-auto  !p-0  border-[.5px] border-gray-200">
            <table className="min-w-full bg-white  text-left !text-sm font-light">
              <thead className="border-b bg-gray-100  font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="!text-left pl-8 py-3 ">
                    Salary Component
                  </th>
                  <th scope="col" className="py-3 ">
                    Manually input
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Calculation
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {salaryStructures.map((structure, index) => (
                  <tr
                    key={index}
                    className="px-2 !border border-gray-300 !py-4 !space-x-4 gap-4 w-full"
                  >
                    <td className="w-[40%] py-4 pl-2">
                      <FormControl className="w-[90%]" size="small">
                        <InputLabel id="demo-simple-select-label">
                          Salary Component
                        </InputLabel>
                        <Select
                          labelId={`salaryComponent-label-${index}`}
                          id={`salaryComponent-select-${index}`}
                          value={structure.salaryComponent}
                          onChange={(e) =>
                            handleSalaryStructureChange(
                              index,
                              "salaryComponent",
                              e.target.value
                            )
                          }
                          label="Select Leave Type"
                        >
                          {SalaryComponent.length > 0 ? (
                            SalaryComponent?.map((item, id) => (
                              <MenuItem
                                className={`${
                                  !filterdArray.includes(item) && "hidden"
                                }`}
                                key={id}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))
                          ) : (
                            <div className="flex w-full items-center justify-center p-2">
                              No data Found
                            </div>
                          )}
                        </Select>
                      </FormControl>
                    </td>
                    <td className="w-[40%] !mx-4">
                      <FormControl size="small" className="w-[90%]">
                        <InputLabel id="demo-simple-select-label">
                          Select Employment Types
                        </InputLabel>
                        <Select
                          labelId={`manuallyInput-label-${index}`}
                          id={`manuallyInput-select-${index}`}
                          value={structure.manuallyInput}
                          onChange={(e) =>
                            handleSalaryStructureChange(
                              index,
                              "manuallyInput",
                              e.target.value
                            )
                          }
                          label="Select Employment Types"
                        >
                          <MenuItem key={id} value={"yes"}>
                            yes
                          </MenuItem>
                          <MenuItem key={id} value={"no"}>
                            No
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </td>

                    <td className="w-[10%]">None</td>
                    <td className="w-[10%]">
                      <Tooltip title="Remove this row">
                        <IconButton
                          className="!text-sm !text-red-500  rounded-full"
                          onClick={() => handleRemoveRow(index)}
                        >
                          <RemoveOutlined />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Tooltip title="Add a row for salary structure">
              <IconButton
                onClick={handleAddRow}
                className="!bg-sky-100 !text-sky-500 shadow-md  rounded-full  "
              >
                <Add />
              </IconButton>
            </Tooltip>
          </div>

          <DialogActions>
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
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                disabled={AddSalaryInputs.isLoading}
              >
                {AddSalaryInputs.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  "submit"
                )}
              </Button>
            )}
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalaryInputFieldsModal;
