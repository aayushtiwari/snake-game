import React from "react";

export default props => {
  const style = {
    left: `${props.point[0]}%`,
    top: `${props.point[1]}%`
  };

  return <div className="food" style={style} />;
};
