import React from "react";

function TextInput({ value, onChange, onKeyDown, placeholder }) {
  return (
    <input
      style={{
        flex: 1,
        marginRight: 8,
        borderRadius: 9,
        padding: 8,
        border: "1px solid #bbb",
        fontSize: 16,
      }}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      type="text"
      autoComplete="off"
    />
  );
}

export default TextInput;