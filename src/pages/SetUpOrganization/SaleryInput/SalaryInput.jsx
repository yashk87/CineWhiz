import React from "react";
import Setup from "../Setup";
import { PriceChangeOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import SalaryInputFieldsModal from "../../../components/Modal/SalaryInputFields/SalaryInputFieldsModal";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SalaryInput = () => {
  const [open, setOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [empTypeId, setempTypeId] = useState(null);
  const { id } = useParams;
  const handleOpen = () => {
    setOpen(true);
    setempTypeId(null);
  };

  const handleClose = () => {
    setOpen(false);
    setempTypeId(null);
    setEditModalOpen(false);
  };

  return (
    <>
      <section className="bg-gray-50 overflow-hidden min-h-screen w-full">
        <Setup>
          <article className="SetupSection bg-white w-[80%]  h-max shadow-md rounded-sm border  items-center">
            <div className="p-4  border-b-[.5px] flex items-center justify-between  gap-3 w-full border-gray-300">
              <div className="flex items-center  gap-3 ">
                <div className="rounded-full bg-sky-500 h-[30px] w-[30px] flex items-center justify-center">
                  <PriceChangeOutlined className="!text-lg text-white" />
                </div>
                <h1 className="!text-lg tracking-wide">
                  Salary Input Field selection
                </h1>
              </div>
              <Button
                className="!font-semibold !bg-sky-500 flex items-center gap-2"
                onClick={handleOpen}
                variant="contained"
              >
                Create salary template
              </Button>
            </div>
          </article>
        </Setup>
      </section>

      <SalaryInputFieldsModal id={id} open={open} handleClose={handleClose} />
    </>
  );
};

export default SalaryInput;
