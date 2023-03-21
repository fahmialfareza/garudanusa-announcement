import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminContainer from "../../../components/AdminContainer";
import { useAppDispatch } from "../../../redux";
import authActions from "../../../redux/actions/authActions";
import { selectAuth } from "../../../redux/reducers/auth";
import Protected from "../../../components/Protected";
import { selectLoading } from "../../../redux/reducers/loading";

function Users() {
  const dispatch = useAppDispatch();

  const { users, error, isSuccess } = useSelector(selectAuth);
  const { loading } = useSelector(selectLoading);

  useEffect(() => {
    dispatch(authActions.getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Berhasil menghapus pengelola");
      dispatch(authActions.getAllUsers());
    }
  }, [dispatch, isSuccess]);

  return (
    <Protected>
      <AdminContainer>
        <div className="cleaner_h5"></div>
        <div
          className="well"
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            marginBottom: "60px",
          }}
        >
          <fieldset>
            <table className="table table-striped table-bordered">
              <thead className="bg-danger text-white">
                <tr>
                  <th>ID</th>
                  <th>NAMA ADMIN</th>
                  <th>USERNAME</th>
                  <th>AKSI</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 &&
                  users.map((user) => (
                    <tr key={user.id} className="success">
                      <td>{user.number}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();

                            if (
                              // eslint-disable-next-line no-restricted-globals
                              confirm("Yakin ingin menghapus pengguna ini?")
                            ) {
                              if (!loading)
                                dispatch(authActions.deleteUser(user.id));
                            }
                          }}
                        >
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={loading}
                          >
                            {loading ? "MEMUAT..." : "HAPUS"}
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </fieldset>
          <p style={{ textAlign: "right" }}>
            <Link href="/admin/users/add" className="btn btn-info">
              TAMBAH PENGELOLA
            </Link>
          </p>
        </div>
        <br />
        <ToastContainer theme="colored" />
      </AdminContainer>
    </Protected>
  );
}

export default Users;
