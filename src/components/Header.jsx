import React from "react";

function Header({ title }) {
  return (
    <header style={{ marginBottom: 20, textAlign: "center" }}>
      <h2>{title}</h2>
    </header>
  );
}

export default Header;