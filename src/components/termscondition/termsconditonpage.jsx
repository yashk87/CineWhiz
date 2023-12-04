import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-sm mb-2">
        Welcome to Aegies Software! These terms and conditions outline the rules
        and regulations for the use of Aegies Software's Website and Software
        Applications.
      </p>
      <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
      <p className="text-sm mb-2">
        By accessing our software, you agree to be bound by these terms and
        conditions. If you do not agree with any of these terms, you are
        prohibited from using or accessing this software.
      </p>
      <h2 className="text-lg font-semibold mb-2">2. Use License</h2>
      <p className="text-sm mb-2">
        Permission is granted to download a copy of this software for personal,
        non-commercial transitory viewing only. This is the grant of a license,
        not a transfer of title.
      </p>
      {/* ... more detailed terms and conditions */}
    </div>
  );
};

export default TermsAndConditionsPage;
