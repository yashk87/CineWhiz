import React, { useState } from "react";
import { OutlinedInput, FormControl, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";

const EmpTemplate = () => {
  // const data = [
  //   { id: 1, name: "John", age: 25, city: "New York" },
  //   { id: 2, name: "Jane", age: 30, city: "Los Angeles" },
  //   { id: 3, name: "Bob", age: 28, city: "Chicago" },
  //   // Add more data as needed
  // ];

  const [filter, setFilter] = useState("");

  // const filteredData = data.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(filter.toLowerCase()) ||
  //     item.age.toString().includes(filter) ||
  //     item.city.toLowerCase().includes(filter.toLowerCase())
  // );

  return (
    <>
      <div className="p-8 min-h-screen bg-gray-50">
        <h1 className="text-semibold text-2xl  ">Edit Employee Settings</h1>
        <div className="w-[20%]">
          <FormControl
            size="small"
            sx={{ width: "100%", background: "white", margin: "10px 0" }}
            variant="outlined"
          >
            <OutlinedInput
              id="name"
              startAdornment={
                <Search className="!text-[19px] !text-gray-500 mr-2" />
              }
              placeholder="Search employee"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </FormControl>
        </div>

        <div class="py-8">
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Invoices</h2>
          </div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Client / Invoice
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Issued / Due
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div class="flex items-center">
                        <Avatar
                          variant="circular"
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                          sx={{ width: "35px", height: "35px" }}
                        />
                        <p class="text-gray-900 whitespace-no-wrap">
                          Michael Roberts
                        </p>
                      </div>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">$214,000</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                        Sept 25, 2019
                      </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span class="relative">Paid</span>
                      </span>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                      <button
                        type="button"
                        class="inline-block text-gray-500 hover:text-gray-700"
                      >
                        btn
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpTemplate;
