import Link from "next/link";
import Image from "next/image";

function AdminMenu() {
  return (
    <div className="well" style={{ margin: "10px 0 60px 0px" }}>
      <p style={{ textAlign: "center" }}>
        <Image src="/images/logo.png" height={75} alt="logo" width={150} />
      </p>
      <h4 style={{ textAlign: "center", margin: "15px 0 -10px 0" }}>
        <b>MENU DASHBOARD</b>
        <br />
        STATUS KELOLOSAN PENDAFTAR
        <br />
      </h4>
      <hr></hr>

      <div
        className="alert alert-dismissable alert-info"
        style={{ margin: "0 0 10px 0" }}
      >
        <h4 style={{ textAlign: "center" }}>
          <b>MENU DASHBOARD</b>
        </h4>
      </div>
      <div
        className="alert alert-dismissable alert-success"
        style={{ margin: "0 0 0 0" }}
      >
        <div
          className="alert alert-dismissable alert-danger"
          style={{ margin: "0 0 10px 0" }}
        >
          <h4 style={{ fontSize: "14px" }}>
            {" "}
            <Link href="/admin" className="alert">
              <b>ATUR PROFIL</b>
            </Link>
          </h4>
        </div>
        <div
          className="alert alert-dismissable alert-danger"
          style={{ margin: "0 0 10px 0" }}
        >
          <h4 style={{ fontSize: "14px" }}>
            <Link className="alert" href="/admin/registrar">
              <b>DATA PENDAFTAR</b>
            </Link>
          </h4>
        </div>
        <div
          className="alert alert-dismissable alert-danger"
          style={{ margin: "0 0 10px 0" }}
        >
          <h4 style={{ fontSize: "14px" }}>
            <Link className="alert" href="/admin/importExcel">
              <b>UPLOAD DATA</b>
            </Link>
          </h4>
        </div>
        <div
          className="alert alert-dismissable alert-danger"
          style={{ margin: "0 0 10px 0" }}
        >
          <h4 style={{ fontSize: "14px" }}>
            <Link className="alert" href="/admin/users">
              <b>TAMBAH PENGELOLA</b>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
