import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimationComponent from "./components/emailverify/verification-animation";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import ResetPassword from "./components/resetpassword/resetpassword";
import TermsAndConditionsPage from "./components/termscondition/termsconditonpage";
import About from "./pages/About/About";
import AddEmployee from "./pages/AddEmployee/addemployee";
import AddOrganisation from "./pages/AddOrganisation/AddOrganisation";
import AddRole from "./pages/AddRole/AddRole";
import Application from "./pages/Application/Application";
import DeleteEmployee from "./pages/DeleteEmployee/DeleteEmployee";
import Designation from "./pages/Designation/Designation";
import Home from "./pages/Home/Home";
import AddProfile from "./pages/Home/components/addprofile";
import LeaveRequisitiion from "./pages/LeaveRequisition/LeaveRequisition";
import Notification from "./pages/Notification/notification";
import OrgList from "./pages/OrgList/OrgList";
import AddRoles from "./pages/Roles/AddRoles";
import EmployeeCodeGenerator from "./pages/SetUpOrganization/EmployeeCodeGenerator/EmployeeCodeGenerator";
import EmployementTypes from "./pages/SetUpOrganization/EmployementType/EmployementTypes";
import LeaveTypes from "./pages/SetUpOrganization/LeaveComponents/LeaveTypes";
import OrganizationLocation from "./pages/SetUpOrganization/OrganizationLocations/OrganizationLocations";
import PublicHoliday from "./pages/SetUpOrganization/PublicHolidayPage/PublicHoliday";
import SalaryInput from "./pages/SetUpOrganization/SaleryInput/SalaryInput";
import Setup from "./pages/SetUpOrganization/Setup";
import DeleteDepartment from "./pages/SetupPage/DepartmentDeletion";
import EmailSetting from "./pages/SetupPage/EmailSetting";
import Shifts from "./pages/SetupPage/Shifts";
import Inputfield from "./pages/SetupPage/inputfield";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/Signup";
import MyCalendar from "./pages/Test/test2";
import UserProfile from "./pages/UserProfile/UserProfile";
import WaitMain from "./pages/Waiting-comp/waiting-main";
import Department from "./pages/addDepartment/addDepartment";
import SingleDepartment from "./pages/single-department/single-department";
import SigleOrganisaiton from "./pages/single-orgnisation/single-organisation";

const App = () => {
  // const [user, setUser] = useState("");

  // const { cookies } = useContext(UseContext);
  // const authToken = cookies["aeigs"];

  // useEffect(() => {
  //   try {
  //     const decodedToken = jwtDecode(authToken);
  //     if (decodedToken && decodedToken.user) {
  //       setUser(decodedToken.user);
  //     } else {
  //       setUser("");
  //     }
  //   } catch (error) {
  //     console.error("Failed to decode the token:", error);
  //   }
  // }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/organizationList" element={<OrgList />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/sign-in" element={<SignIn />} />
      <Route exact path="/sign-up" element={<Signup />} />
      <Route exact path="/add-organisation" element={<AddOrganisation />} />
      <Route
        exact
        path="/setup/add-organization-locations/:id"
        element={<OrganizationLocation />}
      />
      <Route exact path="/add-department" element={<Department />} />
      <Route exact path="/del-department" element={<DeleteDepartment />} />
      <Route exact path="/del-employee" element={<DeleteEmployee />} />
      <Route exact path="/menu" element={<MyCalendar />} />
      <Route exact path="/verify/:token/" element={<AnimationComponent />} />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/add-role" element={<AddRole />} />
      <Route exact path="/add-inputfield/:id" element={<Inputfield />} />
      <Route exact path="/set-shifts/:id" element={<Shifts />} />
      {/* <Route exact path="/set-shiftsdisp" element={<ShiftsDisp />} /> */}
      <Route exact path="/set-designation" element={<Designation />} />
      <Route exact path="/waiting" element={<WaitMain />} />
      <Route exact path="/reset-password/:token" element={<ResetPassword />} />
      <Route exact path="/userprofile" element={<UserProfile />} />

      <Route exact path="/organisation/:id" element={<SigleOrganisaiton />} />
      <Route
        exact
        path="/organisation/:id/add-employee"
        element={<AddEmployee />}
      />
      <Route
        exact
        path="/organisation/:id/add-profile"
        element={<AddProfile />}
      />

      <Route exact path="/setup/add-roles/:id" element={<AddRoles />} />
      <Route exact path="/setup/leave-types/:id" element={<LeaveTypes />} />
      <Route exact path="/setup/set-shifts/:id" element={<Shifts />} />
      <Route
        exact
        path="/setup/employement-types/:id"
        element={<EmployementTypes />}
      />

      {/* {hasRequiredRoles && ( */}
      <Route
        exact
        path="/setup/salary-input-selection/:id"
        element={<SalaryInput />}
      />
      <Route
        exact
        path="/setup/employee-code-genreation/:id"
        element={<EmployeeCodeGenerator />}
      />
      <Route exact path="/setup/email-setting" element={<EmailSetting />} />

      <Route exact path="/notification" element={<Notification />} />
      <Route exact path="/application" element={<Application />} />
      <Route exact path="/setup/:id" element={<Setup />} />
      <Route exact path="/leave" element={<LeaveRequisitiion />} />
      <Route
        exact
        path="/setup/:id/public-holidays"
        element={<PublicHoliday />}
      />
      <Route
        exact
        path="/terms-and-conditions"
        element={<TermsAndConditionsPage />}
      />

      <Route
        exact
        path="/organisation/:id/department/:departmentId"
        element={<SingleDepartment />}
      />
    </Routes>
  );
};
export default App;
