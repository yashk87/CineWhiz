import {
  Button,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Switch,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
  const { data, isLoading } = useQuery("profiles", fetchProfiles);

  useEffect(() => {
    // Update the state with the transformed roles
    if (data) {
      const transformedRoles = data.roles.map((role) => ({
        placeholder: role.roleName, // Adjust this mapping based on your actual data
        label: role.roleName, // Assuming label is also derived from roleName
        isApprover: role.isApprover,
        isActive: role.isActive,
      }));
      setRoles(transformedRoles);
    }
  }, [data]);

  const [roles, setRoles] = useState(initialRoles);

  const handleRoleChange = (role) => {
    if (data) {
      const updatedRoles = roles.map((r) => {
        if (r.placeholder === role.label) {
          return { ...r, isActive: !r.isActive };
        }
        return r;
      });

      setRoles(updatedRoles);
    } else {
      const updatedRoles = roles.map((r) => {
        if (r.placeholder === role.label) {
          return { ...r, isSelected: !r.isSelected, isActive: !r.isSelected };
        }
        return r;
      });
      setRoles(updatedRoles);
    }
  };

  const handleIsApproverChange = (event, role) => {
    const updatedRoles = roles.map((r) => {
      if (r.placeholder === role.label) {
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

      const rolesObject = newRoles.reduce((acc, role) => {
        acc[role.label] = {
          isApprover: role.isApprover,
          isActive: role.isActive,
          organisationId: id,
        };
        return acc;
      }, {});

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
  };

  return (
    <div className="flex items-center flex-col min-h-screen bg-gray-50">
      <div className="bg-white mt-10 w-[800px] mb-4 shadow-lg rounded-lg border py-8 px-8 grid items-center">
        <h1 className="mb-6 text-2xl font-semibold text-blue-500">
          Add Roles For Organization
        </h1>
        {isLoading ? (
          <div className="space-y-4 flex flex-col flex-wrap">
            {Array.from({ length: 5 }, (_, id) => (
              <div
                key={id}
                className="border-gray-200 flex justify-between p-2 rounded-md border-[.5px]"
              >
                <div className="flex gap-2 w-full">
                  <Skeleton width={"5%"} height={45} />
                  <Skeleton width={"30%"} height={45} />
                </div>
                <Skeleton width={"20%"} height={45} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 flex flex-col flex-wrap">
            {roles.map((role, index) => (
              <div
                key={index}
                className="border-gray-200 flex justify-between p-2 rounded-md border-[.5px]"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={role.isActive}
                      onChange={() => handleRoleChange(role)}
                    />
                  }
                  label={role.placeholder}
                />
                {role.isActive && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={role.isApprover || false}
                        onChange={(event) =>
                          handleIsApproverChange(event, role)
                        }
                      />
                    }
                    label="Is Approver"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="w-max mt-4">
          <Button onClick={sendRequestToBackend} variant="contained">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddRoles;
