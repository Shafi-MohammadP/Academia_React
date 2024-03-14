import React from "react";
import { Container } from "reactstrap";

function TutorCount({ count }) {
  return (
    <>
      <Container>
        <div class="border-2 border-solid shadow-lg p-4 flex items-start justify-start bg-gray-200">
          <p class="txt">Total Tutor Count</p>
          <div class="ml-2 w-8 h-8 flex items-center justify-center border-3 border-blue-900 rounded-full">
            <span class="text-black font-bold">{count}</span>
          </div>
        </div>
      </Container>
    </>
  );
}

export default TutorCount;
