import React from "react";
import Typed from "react-typed";

function TextCycler() {
  return (
    <div className="pb-4">
      <Typed
        strings={[
          "Hi Welcome to <div class='inline text-red-500'> AEIGS</div> 👨‍💻 software !",
          "Software build for <div class='inline text-red-500 pulse' >HR </div>🧑🏻‍💻 !",
          "Software build for <div class='inline text-red-500 pulse' >companies like you </div> 🫵 !",
          "Software build for<div class='inline text-red-500 pulse' > those who know <div class='inline underline font-extrabold'> Importance</div> of simplicity </div> 🙂 !",
        ]}
        typeSpeed={50}
        backSpeed={30}
        className="text-[#1976d2] font-bold"
        loop
      />
    </div>
  );
}

export default TextCycler;
