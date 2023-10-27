import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import React, { useState } from "react";
const TermsCondition = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  console.log(isTermsAccepted);

  return (
    <>
      <div>
        <Checkbox
          required
          checked={isTermsAccepted}
          onChange={(e) => setIsTermsAccepted(e.target.checked)}
        />
        I accept the
        <Link href="https://www.amazon.com/">Terms and Conditions</Link>
      </div>
    </>
  );
};

export default TermsCondition;
