import React from "react";
import "./Reflection.css";

function ReflectionTextBox() {
  return (
    <div className="reflection-wrapper">
      <div>
        <p className="title2">SEL Competencies Reflection Questions:</p>
        <div className="question">
          Looking at the wheel above, what is your greatest
          area of strength?
        </div>
        <div>
          <form>
            <textarea name="Q1" id="Q1" className="input" />
          </form>
        </div>
        <div className="question">
          Looking at the wheel above, what is an area you
          would like to grow in?
        </div>
        <div>
          <form>
            <textarea name="Q2" id="Q2" className="input" />
          </form>
        </div>
      </div>



      <div>
        <p className="title2">Moving Forward Reflection Questions:</p>
        <div className="question">
          What practices would you like to learn more about and develop?
        </div>
        <div>
          <form>
            <textarea name="Q5" id="Q5" className="input" />
          </form>
        </div>
        <div className="question">
          What supports do you envision needing to support you moving forward?
        </div>
        <div>
          <form>
            <textarea name="Q6" id="Q6" className="input" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReflectionTextBox;
