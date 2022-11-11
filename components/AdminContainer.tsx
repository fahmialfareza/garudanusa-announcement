import AdminMenu from "./AdminMenu";

function AdminContainer({ children }: any) {
  return (
    <>
      <br />
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          border: "0px solid #000",
        }}
      >
        <AdminMenu />
        <table>
          <tbody>
            <tr>
              <td>{children}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminContainer;
