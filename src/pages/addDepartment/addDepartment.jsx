import React, { useContext, useState, useEffect } from "react";
import { Button, TextField, Autocomplete, Checkbox, FormControlLabel} from "@mui/material";
import axios from "axios";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";

const Department = () => {
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const { handleAlert } = useContext(TestContext);
  
  // const [departmentIdRequired, setDepartmentIdRequired] = useState(false);
  // const [prefixRequired, setPrefixRequired] = useState(false);
  // const [prefixLength, setPrefixLength] = useState(0);
  const [enterDepartmentId, setEnterDepartmentId] = useState(false);
  const [numCharacters, setNumCharacters] = useState(0);
  const [departmentId, setDepartmentId] = useState("");
  const [departmentError, setDepartmentError] = useState("");

  const initialFormValues = {
    departmentId: "",
    departmentName: "",
    departmentDescription: "",
    departmentLocation: "",
    costCenterName: "",
    costCenterDescription: "",
    departmentHeadName: "",
    departmentHeadDelegateName: "",
    
  };

  const Employees = [
    { label: "Ramesh patnayak", email: "ramesh1@gmail.com" },
    { label: "Raj Sathe", email: "rsathe@gmail.com" },
    { label: "Jay Jadhav", email: "jayjadhav1@gmail.com" },
    { label: "Vaibhav Pawar", email: "vaibhavp@gmail.com" },
    { label: "Ram Desai", email: "ramdesai1@gmail.com" },
    { label: "Vishal Solanki", email: "vsolanki1@gmail.com" },
    { label: "Viraj Raman", email: "vraman@gmail.com" },
    { label: "Harsh Modi", email: "harshmodi2@gmail.com" },
  ];
  const [formValues, setFormValues] = useState(initialFormValues);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/route/location/getOrganizationLocations", {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        setLocations(response.data)
        console.log("locations are: ",response.data);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  const handleDepartmentIdChange = (e) => {
    const input = e.target.value;
    const charactersOnly = input.replace(/\d/g, '');

    if (charactersOnly.length <= numCharacters) {
      setDepartmentId(input);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/route/department/create",
        formValues,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      handleAlert(true, "success", `Department created successfully`);
      setFormValues(initialFormValues);
      // window.location.reload();
    } catch (error) {
      console.error(error.response.data.error);
      handleAlert(true, "error", error.response.data.error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minWidth: "100vw",
        justifyContent: "center",
        padding: "20px 0 0",
        boxSizing: "border-box",
        minHeight: '100vh',
        overflow: "hidden"
        // overflowY: "auto",
        // height: "100vh"
      }}
    >
      <div className="content-center flex justify-center my-0 p-0 bg-[#F8F8F8]">
        <div className="w-[500px] shadow-lg rounded-lg border py-3 px-8 grid items-center">
          <h4 className="text-center mb-2 text-lg font-bold text-blue-500">
            Add Department details
          </h4>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-5"
          >
            <TextField
              required
              inputProps={{
                pattern: "^[a-zA-Z0-9 ]*$",
                minLength: 2,
                maxLength: 40,
                value: formValues.departmentName,
              }}
              helperText={"Department Name cannot repeat. No special characters, Max 5 words."}
              size="small"
              fullWidth
              name="departmentName"
              label="Department Name"
              type="text"
              placeholder="Enter Department name"
              onChange={handleChange}
            />
            <TextField
              size="small"
              inputProps={{
                minLength: 8,
                maxLength: 250,
                value: formValues.departmentDescription,
              }}
              helperText={"Max 250 characters allowed"}
              fullWidth
              multiline
              name="departmentDescription"
              label="Department Description"
              type="text"
              placeholder="Enter Department Description"
              onChange={handleChange}
            />
               <Autocomplete
              size="small"
              fullWidth
              disablePortal
              id="departmentLocation"
              options={locations}
              onChange={(e, value) => {
                const location = value ? value.shortName : "";
                handleChange({
                  target: { name: "departmentLocation", value: location },
                });
              }}
              isOptionEqualToValue={(option, value) =>
                option.shortName === value.shortName
              }
              getOptionLabel={(option) => option.shortName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Department location"
                  required
                />
              )}
            />
            <TextField
              required
              size="small"
              fullWidth
              name="costCenterName"
              inputProps={{
                value: formValues.costCenterName,
              }}
              label="Cost Center Name"
              type="text"
              placeholder="Enter Cost Center"
              onChange={handleChange}
            />
            <TextField
              size="small"
              fullWidth
              inputProps={{
                minLength: 8,
                maxLength: 50,
                value: formValues.costCenterDescription,
              }}
              name="costCenterDescription"
              label="Cost Center description"
              multiline
              type="text"
              placeholder="Enter Cost Center description"
              onChange={handleChange}
            />
            <div 
              style={{
                width: "100%",
                display: "flex",
                gap: "8px",
                marginTop: "8px",
                marginBottom: "-1rem",
              }}>
            <FormControlLabel 
            style={{
              width: "85%",
              alignItems: "center"
            }}
            control={<Checkbox checked={enterDepartmentId} onChange={() => setEnterDepartmentId(!enterDepartmentId)} 
            />}
            label="Use prefix in ID"
            />
            {/* Make departmentIdRequired And prefixRequired variable and not string. */}

          {enterDepartmentId && (
            <TextField
              style={{ marginTop: "1rem" }}
              inputProps={{
                  min: 1,
              }}
              required
              name="numCharacters"
              size="small"
              className="w-full"
              label="no of Characters"
              type="number"
              value={numCharacters}
              onChange={(e) => setNumCharacters(e.target.value)}
            />
          )}
          </div>{enterDepartmentId && (
            <p style={{alignSelf: "start"}} className="font-extralight">Note: Please adjust the character length of prefix in ID.</p>
            )}
          {!enterDepartmentId && 
          <p className="font-extralight" style={{alignSelf: "start", marginTop: "5px"}}>
            Note : No prefix added to Department ID.
          </p>}
          <TextField
            required
            name="departmentId"
            size="small"
            className="w-full"
            label="Department ID"
            type="text"
            value={departmentId}
            onChange={handleDepartmentIdChange}
            error={departmentError !== ""}
            helperText={departmentError}
          />
          {!departmentId}
            <Autocomplete
              size="small"
              fullWidth
              disablePortal
              id="departmentHeadName"
              options={Employees}
              onChange={(e, value) => {
                const headName = value ? value.label : "";
                handleChange({
                  target: { name: "departmentHeadName", value: headName },
                });
              }}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Department head name"
                  required
                />
              )}
            />
            <Autocomplete
              size="small"
              fullWidth
              disablePortal
              id="departmentHeadDelegateName"
              options={Employees}
              onChange={(e, value) => {
                const delegateName = value ? value.label : "";
                handleChange({
                  target: {
                    name: "departmentHeadDelegateName",
                    value: delegateName,
                  },
                });
              }}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Department head delegate name"
                />
              )}
            />
            <Button
              fullWidth={false}
              variant="contained"
              className="w-[100px] content-center text-white m-auto"
              type="submit"
              style={{ backgroundColor: "#1d6eb7", color: "white" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Department;
