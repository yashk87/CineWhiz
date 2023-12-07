import React from "react";
import { Route, Routes } from "react-router-dom";

// Components
import AnimationComponent from "./components/emailverify/verification-animation";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import ResetPassword from "./components/resetpassword/resetpassword";
import TermsAndConditionsPage from "./components/termscondition/termsconditonpage";
import AddEmployee from "./pages/AddEmployee/addemployee";
import AddOrganisation from "./pages/AddOrganisation/AddOrganisation";
import AddRole from "./pages/AddRole/AddRole";
import Application from "./pages/Application/Application";
import DeleteEmployee from "./pages/DeleteEmployee/DeleteEmployee";
import Designation from "./pages/Designation/Designation";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import Home from "./pages/Home/Home";
import AddProfile from "./pages/Home/components/addprofile";
import LeaveRequisition from "./pages/LeaveRequisition/LeaveRequisition";
import Notification from "./pages/Notification/notification";
import OrgList from "./pages/OrgList/OrgList";
import AddRoles from "./pages/Roles/AddRoles";
import EmployeeCodeGenerator from "./pages/SetUpOrganization/EmployeeCodeGenerator/EmployeeCodeGenerator";
import EmployementTypes from "./pages/SetUpOrganization/EmployementType/EmployementTypes";
import LeaveTypes from "./pages/SetUpOrganization/LeaveComponents/LeaveTypes";
import OrganizationLocations from "./pages/SetUpOrganization/OrganizationLocations/OrganizationLocations";
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
import SingleOrganisation from "./pages/single-orgnisation/single-organisation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/organizationList" element={<OrgList />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/waiting" element={<WaitMain />} />
      <Route path="/verify/:token/" element={<AnimationComponent />} />
      <Route path="/add-organisation" element={<AddOrganisation />} />

      <Route path="/add-department" element={<Department />} />
      <Route path="/del-department" element={<DeleteDepartment />} />
      <Route path="/del-employee" element={<DeleteEmployee />} />
      <Route path="/menu" element={<MyCalendar />} />
      <Route path="/add-role" element={<AddRole />} />
      <Route path="/add-inputfield/:id" element={<Inputfield />} />
      <Route path="/set-shifts/:id" element={<Shifts />} />
      <Route path="/set-designation" element={<Designation />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/userprofile" element={<UserProfile />} />

      <Route path="/organisation/:id" element={<SingleOrganisation />} />
      <Route path="/organisation/:id/add-employee" element={<AddEmployee />} />
      <Route path="/organisation/:id/add-profile" element={<AddProfile />} />

      <Route
        path="/setup/add-organization-locations/:id"
        element={<OrganizationLocations />}
      />
      <Route path="/setup/add-roles/:id" element={<AddRoles />} />
      <Route path="/setup/leave-types/:id" element={<LeaveTypes />} />
      <Route path="/setup/set-shifts/:id" element={<Shifts />} />
      <Route
        path="/setup/employement-types/:id"
        element={<EmployementTypes />}
      />

      <Route
        path="/setup/salary-input-selection/:id"
        element={<SalaryInput />}
      />
      <Route
        path="/setup/employee-code-genreation/:id"
        element={<EmployeeCodeGenerator />}
      />
      <Route path="/setup/email-setting" element={<EmailSetting />} />

      <Route path="/notification" element={<Notification />} />
      <Route path="/application" element={<Application />} />
      <Route path="/setup/:id" element={<Setup />} />
      <Route path="/leave" element={<LeaveRequisition />} />
      <Route path="/setup/:id/public-holidays" element={<PublicHoliday />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditionsPage />}
      />
      <Route path="/employee-list" element={<EmployeeList />} />

      <Route
        path="/organisation/:id/department/:departmentId"
        element={<SingleDepartment />}
      />
    </Routes>
  );
};

export default App;
