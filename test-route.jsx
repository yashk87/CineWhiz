import React from "react";
import { Route, Routes } from "react-router-dom";

// Components
import AnimationComponent from "./components/emailverify/verification-animation";
import ForgotPassword from "./components/forgotpassword/forgotpassword";
import ResetPassword from "./components/resetpassword/resetpassword";
import Home from "./pages/Home/Home";
import OrgList from "./pages/OrgList/OrgList";
import SignIn from "./pages/SignIn/SignIn";
import Signup from "./pages/SignUp/Signup";
import WaitMain from "./pages/Waiting-comp/waiting-main";

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
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        path="/terms-and-conditions"
        element={<TermsAndConditionsPage />}
      />
      <Route path="/notification" element={<Notification />} />
      <Route path="/application" element={<Application />} />

      {/* organisatio related stufff */}
      <Route path="/add-organisation" element={<AddOrganisation />} />

      {/* organisation setup  */}
      <Route path="organisation/:organisationId/setup" element={<Setup />} />
      <Route
        path="organisation/:organisationId/setup/add-organization-locations"
        element={<OrganizationLocations />}
      />
      <Route
        path="organisation/:organisationId/setup/set-designation"
        element={<Designation />}
      />
      <Route
        path="organisation/:organisationId/setup/set-shifts"
        element={<Shifts />}
      />
      <Route
        path="organisation/:organisationId/setup/add-inputfield"
        element={<Inputfield />}
      />
      <Route
        path="organisation/:organisationId/setup/add-roles"
        element={<AddRoles />}
      />
      <Route
        path="organisation/:organisationId/setup/leave-types"
        element={<LeaveTypes />}
      />
      <Route
        path="organisation/:organisationId/setup/set-shifts"
        element={<Shifts />}
      />
      <Route
        path="/setup/employement-types/:id"
        element={<EmployementTypes />}
      />

      <Route
        path="organisation/:organisationId/setup/salary-input-selection"
        element={<SalaryInput />}
      />
      <Route
        path="organisation/:organisationId/setup/employee-code-genreation"
        element={<EmployeeCodeGenerator />}
      />
      <Route
        path="organisation/:organisationId/setup/public-holidays"
        element={<PublicHoliday />}
      />
      <Route
        path="organisation/:organisationId/setup/email-setting"
        element={<EmailSetting />}
      />
      {/* organisation employee  */}
      <Route
        path="organisation/:organisationId/employee-list"
        element={<OrganisationEmployeeList />}
      />
      {/* organisation department */}
      <Route
        path="/:organisationId/department/:departmentId"
        element={<SingleDepartment />}
      />
    </Routes>
  );
};

export default App;
