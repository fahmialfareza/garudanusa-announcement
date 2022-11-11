function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="navbar navbar-inverse navbar-fixed-bottom">
      <h5 align="center" style={{ color: "#FFF" }}>
        Garudanusa Youth Summit
        <br />
        GARUDANUSA &copy; {year}
      </h5>
    </div>
  );
}

export default Footer;
