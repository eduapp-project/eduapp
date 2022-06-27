import React from "react";

export default function Input(props) {
  return (
    <input
      type={props.type}
      id={props.id}
      className={props.className}
      autoComplete={props.autoComplete}
      placeholder={String(props.placeholder)}
      disabled={props.disabled}
    />
  );
}