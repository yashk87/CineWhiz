import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UseContext } from "../../State/UseState/UseContext";
import { TestContext } from "../../State/Function/Main";
import axios from "axios";
import { useQuery } from "react-query";
import { Checkbox, FormControlLabel, Skeleton, Switch } from "@mui/material";
import Setup from "../SetUpOrganization/Setup";
import InputIcon from "@mui/icons-material/Input";

const Inputfield = () => {
  const { id } = useParams("");
  const { cookies } = useContext(UseContext);
  const { handleAlert } = useContext(TestContext);
  const authToken = cookies["aeigs"];

  const initialInputField = [
    {
      inputType: "text",
      label: "Shifts allocation",
      placeholder: "Enter Shifts allocation",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Department cost center no",
      placeholder: "Enter Department cost center no",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Middle Name",
      placeholder: "Enter Middle Name",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Martial status",
      placeholder: "Enter Martial status",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Primary nationality",
      placeholder: "Enter Primary nationality",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Education",
      placeholder: "Enter Education",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Permanent Address",
      placeholder: "Enter Permanent Address",
      isActive: false,
    },

    {
      inputType: "text",
      label: "Relative Information",
      placeholder: "Enter Relative Information",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Manager Name",
      placeholder: "Enter Manager Name",
      isActive: false,
    },
    {
      inputType: "text",
      label: "Emergency contact",
      placeholder: "Enter Emergency contact",
      isActive: false,
    },
  ];

  const [inputDetail, setinputDetail] = useState(initialInputField);

  const fetchInputField = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/route/inputfield/${id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      console.log(response.data);
      console.log(response.data.inputField.inputDetail);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching Input Field");
    }
  };
  const { data, isLoading } = useQuery("inputField", fetchInputField);

  useEffect(() => {
    if (data) {
      const transformedInputField = data.inputField.inputDetail.map(
        (field) => ({
          placeholder: field.placeholder,
          label: field.label,
          isActive: field.isActive,
        })
      );
      setinputDetail(transformedInputField);
    }
  }, [data]);

  const handleInputFieldChange = (field) => {
    const updatedInputField = inputDetail.map((inputField) => {
      if (inputField.label === field.label) {
        // Toggle the isActive property
        return { ...inputField, isActive: !inputField.isActive };
      }
      return inputField;
    });

    setinputDetail(updatedInputField);
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen w-full">
        <Setup>
          <div className="SetupSection bg-white lg:!w-[80%] md:!w-[70%]   shadow-md rounded-sm border  items-center">
            <div className="p-4  border-b-[.5px] flex items-center  gap-3 w-full border-gray-300">
              <div className="rounded-full bg-sky-500 h-[30px] w-[30px] flex items-center justify-center">
                <InputIcon className="!text-lg text-white" />
              </div>
              <h1 className="!text-lg italic">
                Add Input Field for organization
              </h1>
            </div>
            {isLoading ? (
              <div className="space-y-4 flex flex-col flex-wrap">
                {Array.from({ length: 5 }, (_, id) => (
                  <div
                    key={id}
                    className=" flex justify-between p-2 rounded-md "
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
              <div className="flex flex-col flex-wrap">
                {inputDetail.map((field, index) => (
                  <div
                    key={index}
                    className="border-gray-200 flex justify-between py-2 px-6 "
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.isActive}
                          onChange={() => handleInputFieldChange(field)}
                        />
                      }
                      label={field.label}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="w-max px-4 py-2 mt-2">
              <button
                // onClick={sendRequestToBackend}
                className=" flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </Setup>
      </section>
    </>
  );
};

export default Inputfield;
