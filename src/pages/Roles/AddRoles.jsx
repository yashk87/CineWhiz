import { Button, Checkbox, FormControlLabel, Switch } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import { useQuery } from "react-query";

const AddRoles = () => {
  const { id } = useParams("");
  const { cookies } = useContext(UseContext);
  const { handleAlert } = useContext(TestContext);
  const authToken = cookies["aeigs"];

  const initialRoles = [
    {
      placeholder: "Department Head",
      label: "departmentHead",
      isApprover: false,
      isActive: false,
    },
    {
      placeholder: "Department Head Delegate",
      label: "delegateDepartmentHead",
      isApprover: false,
      isActive: false,
    },
    {
      placeholder: "Department Admin",
      label: "departmentAdmin",
      isApprover: false,
      isActive: false,
    },

    {
      placeholder: "Department Delegate Admin",
      label: "delegateDepartmentAdmin",
      isApprover: false,
      isActive: false,
    },
    {
      placeholder: "Human Resource",
      label: "hr",
      isApprover: false,
      isActive: false,
    },
    {
      placeholder: "Department Head Delegate",
      label: "delegateHr",
      isApprover: false,
      isActive: false,
    },
    {
      placeholder: "Manager",
      label: "manager",
      isApprover: false,
      isActive: false,
    },
  ];

  const [roles, setRoles] = useState(initialRoles);

  const handleRoleChange = (role) => {
    const updatedRoles = roles.map((r) => {
      if (r.label === role.label) {
        return { ...r, isSelected: !r.isSelected, isActive: !r.isSelected };
      }
      return r;
    });
    setRoles(updatedRoles);
  };

  const handleIsApproverChange = (event, role) => {
    const updatedRoles = roles.map((r) => {
      if (r.label === role.label) {
        return { ...r, isApprover: event.target.checked };
      }
      return r;
    });
    setRoles(updatedRoles);
  };

  const sendRequestToBackend = async () => {
    try {
      // Filter the roles that are selected

      const newRoles = roles.map((role) => ({
        ...role,
        organisationId: id,
      }));

      console.log(newRoles);

      const rolesObject = newRoles.reduce((acc, role) => {
        acc[role.label] = {
          isApprover: role.isApprover,
          isActive: role.isActive,
          // creatorId:
          organisationId: id,
        };
        return acc;
      }, {});
      // console.log(rolesObject);

      const sendData = await axios.post(
        `${process.env.REACT_APP_API}/route/profile/role/create`,
        rolesObject,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      handleAlert(true, "success", sendData.data.message);
    } catch (error) {
      handleAlert(
        true,
        "success",
        error?.response?.data?.message || "Failed to sign in. Please try again."
      );
      console.log(error, "error");
    }

    // Simulate sending the selected roles to the backend
    // Replace this with your actual backend request
    // axios.post("/api/your-endpoint", selectedRoles)
    //   .then((response) => {
    //     // Handle the response from the backend, if needed
    //     console.log("Request sent successfully");
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occur during the request
    //     console.error("Error sending request:", error);
    //   });
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/route/profile/role/${id}`,
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
  const { data } = useQuery("profiles", fetchProfiles);

  console.log(data, "data");

  return (
    <div className="flex items-center flex-col min-h-screen bg-gray-50">
      <div className="bg-white mt-10 w-[800px] mb-4 shadow-lg rounded-lg border py-8 px-8 grid items-center">
        <h1 className="mb-6 text-2xl font-semibold text-blue-500">
          Add Roles For Organization
        </h1>

        <div className="space-y-4 flex flex-col flex-wrap">
          {roles.map((role, index) => (
            <div
              key={index}
              className="border-gray-200 flex justify-between p-2 rounded-md border-[.5px]"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={role.isSelected || false}
                    onChange={() => handleRoleChange(role)}
                  />
                }
                label={role.placeholder}
              />
              {role.isSelected && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={role.isApprover || false}
                      onChange={(event) => handleIsApproverChange(event, role)}
                    />
                  }
                  label="Is Approver"
                />
              )}
            </div>
          ))}

          <div className="w-max">
            <Button onClick={sendRequestToBackend} variant="contained">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoles;
