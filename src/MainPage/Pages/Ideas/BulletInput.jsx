import React, { useState, useRef, useEffect } from "react";
import "./BulletInput.css"

const BulletPointsInput = ({parentState, setParentState}) => {
  const [bulletPoints, setBulletPoints] = useState(parentState );
  const lastInputRef = useRef(null);

  const handleAddBulletPoint = (index) => {
    setBulletPoints([...bulletPoints, ""]);
    if(lastInputRef.current) {
      lastInputRef.current.focus();
    }
  };
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleAddBulletPoint();
    }
  }

  const handleBulletPointChange = (event, index) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints[index] = event.target.value;
    setBulletPoints(newBulletPoints);
    setParentState(newBulletPoints);
  };

  const handleRemoveBulletPoint = (index) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints.splice(index, 1);
    setBulletPoints(newBulletPoints);
    setParentState(newBulletPoints);
  };
  console.log("inside bullt",parentState)

  // useEffect(() => {
  //   if(lastInputRef.current) {
  //     lastInputRef.current.focus();
  //   }
  // }, [bulletPoints])
  
  console.log("parentstate",parentState)
  
  return (
    <div>
      {/* <button onClick={handleAddBulletPoint}>Add</button> */}
    {bulletPoints.map((bulletPoint, index) => (
         <div key={index} className="bullet-point-container"> 
          {/* <span className="bullet">-></span> */}
          
          <input
            className="bullet-point-input"
            type="text"
            ref={lastInputRef}
            value={bulletPoint}
            onKeyPress={handleKeyPress}
            onChange={(event) => handleBulletPointChange(event, index)}
          />
          <button className="remove-button" style={{display:index === 0 ? "none" : "flex"}} onClick={() => handleRemoveBulletPoint(index)}>X</button>
          
          <button className="add-button" onClick={() => handleAddBulletPoint()}>+</button>

        </div> 
    ))}
    </div>
  );
};

export default BulletPointsInput;
