/* eslint-disable react/prop-types */
function Header({ status }) {
  return (
    <header className="app-header">
      <img src="logo512.png" alt="React logo" />
      <h1>{status === "initialize" ? "Welcome" : "The Quiz"}</h1>
    </header>
  );
}

export default Header;
XMLDocument;
