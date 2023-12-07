import { IconButton, TextField } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import React, { useContext, useEffect, useState } from "react";
import Setup from "../SetUpOrganization/Setup";
import { TestContext } from "../../State/Function/Main";
import { UseContext } from "../../State/UseState/UseContext";
import ReactPaginate from "react-paginate";
const EmployeeList = () => {
  const { handleAlert } = useContext(TestContext);
  const { cookies } = useContext(UseContext);
  const authToken = cookies["aeigs"];
  const [nameSearch, setNameSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [deptSearch, setDeptSearch] = useState("");
  const [availableEmployee, setAvailableEmployee] = useState([]);

  const fetchAvailableEmployee = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/route/employee/get-employee`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setAvailableEmployee(response.data.employeeData);
    } catch (error) {
      console.log(error);
      handleAlert(true, "error", "Failed to Fetch Employee");
    }
  };
  useEffect(() => {
    fetchAvailableEmployee();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <section className="bg-gray-50 min-h-screen w-full">
        <Setup>
          <article className="SetupSection bg-white w-[80%]  h-max shadow-md rounded-sm border  items-center">
            <div className="p-4  border-b-[.5px] flex items-center justify-between  gap-3 w-full border-gray-300">
              <div className="flex items-center  gap-3 ">
                <TextField
                  onChange={(e) => setNameSearch(e.target.value)}
                  placeholder="Search Employee Name...."
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
              </div>
              <div className="flex items-center  gap-3 ">
                <TextField
                  onChange={(e) => setDeptSearch(e.target.value)}
                  placeholder="Search Department Name...."
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
              </div>
              <div className="flex items-center  gap-3 ">
                <TextField
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search Location ...."
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
              </div>
            </div>

            <div className="overflow-auto !p-0  border-[.5px] border-gray-200">
              <table className="min-w-full bg-white  text-left !text-sm font-light">
                <thead className="border-b bg-gray-200  font-medium dark:border-neutral-500">
                  <tr className="!font-semibold">
                    <th scope="col" className="!text-left pl-8 py-3">
                      SR NO
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      First Name
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Last Name
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Email
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Location
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Department
                    </th>
                    <th scope="col" className="!text-left pl-8 py-3">
                      Phone Number
                    </th>

                    <th scope="col" className="px-6 py-3 ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {availableEmployee
                    .filter((item) => {
                      return (
                        (!nameSearch.toLowerCase() ||
                          (item.first_name &&
                            item.first_name
                              .toLowerCase()
                              .includes(nameSearch))) &&
                        (!deptSearch.toLowerCase() ||
                          (item.deptname &&
                            item.deptname
                              .toLowerCase()
                              .includes(deptSearch))) &&
                        (!locationSearch.toLowerCase() ||
                          item.worklocation.some(
                            (location) =>
                              location.city &&
                              location.city
                                .toLowerCase()
                                .includes(locationSearch)
                          ))
                      );
                    })

                    .map((item, id) => (
                      <tr className="!font-medium border-b" key={id}>
                        <td className="!text-left pl-8 py-3">{id + 1}</td>
                        <td className="py-3">{item.first_name}</td>
                        <td className="py-3">{item.last_name}</td>
                        <td className="py-3">{item.email}</td>
                        <td className="py-3">
                          {item.worklocation.map((location, index) => (
                            <span key={index}>{location.city}</span>
                          ))}
                        </td>
                        <td className="py-3">{item.deptname}</td>
                        <td className="py-3">{item.phone_number}</td>

                        <td className="whitespace-nowrap px-6 py-2">
                          <IconButton>
                            <EditIcon className="!text-xl" color="error" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </article>
        </Setup>
      </section>
    </>
  );
};

export default EmployeeList;
