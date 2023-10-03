import React from "react";

const StudentToSession = () => {
  return (
    <div className="container pt-5">
      <div
        className="card text-center mx-auto"
        style={{ maxWidth: "600px", backgroundColor: "#acc9af" }}
      >
        <div className="card-body">
          <h5 className="card-title pb-4">Add a student to a session</h5>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="dropdown1" className="form-label">
                  Students
                </label>
                <select className="form-select" id="dropdown1">
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="option1">Student 1</option>
                  <option value="option2">Student 2</option>
                  <option value="option3">Student 3</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="dropdown2" className="form-label">
                  Sessions
                </label>
                <select className="form-select" id="dropdown2">
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="option1">Session 1</option>
                  <option value="option2">Session 2</option>
                  <option value="option3">Session 3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentToSession;
