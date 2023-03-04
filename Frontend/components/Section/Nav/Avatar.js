import React from "react";

function Avatar({
  children,
  backgroundColor,
  px,
  py,
  color,
  border,
  borderRadius,
  fontSize,
  cursor,
}) {
  const style = {
    backgroundColor,
    color: color || "black",
    border,
    borderRadius,
    fontSize,
    width: `${px}`,
    height: `${py}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: cursor || "pointer",
    textDecoration: "none",
  };
  return (
    <div className="avatar" style={style}>
      {children}
    </div>
  );
}

export default Avatar;
