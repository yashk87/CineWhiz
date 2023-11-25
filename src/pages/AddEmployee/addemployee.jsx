import { Button, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const AddEmployee = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: "20px 0 0",
          boxSizing: "border-box",
        }}
      >
        <div className="content-center flex justify-center my-0 p-0 bg-[#F8F8F8]">
          <div className="w-[400px] shadow-lg rounded-lg border py-3 px-8 grid items-center">
            <Button>Add Employee</Button>

            <form className="flex flex-col items-center space-y-5">
              <TextField
                size="small"
                type="text"
                label="First Name"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Last Name"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                size="small"
                type="email"
                label="Personal Email ID"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                size="small"
                type="email"
                label="Company email ID"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Residential current Address"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Phone Number"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Department name"
                fullWidth
                margin="normal"
                required
              />

              <TextField
                size="small"
                type="text"
                label="Manager Employee ID"
                fullWidth
                margin="normal"
                required
              />

              <div className="w-full">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="text-center m-6">
                <Button
                  className="px-4 py-2 text-base bg-blue-500 text-white rounded-lg"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth={false}
                  margin="normal"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
