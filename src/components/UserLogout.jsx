import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { useLogoutUserMutation } from "../app/feature/userApi/userApi";
import { removeUser } from "../app/feature/userApi/userSlices";
import Swal from "sweetalert2";

const UserLogout = (user) => {
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  //   const [loading, setLoading] = useState(false); // State for loading

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUser().unwrap();
          dispatch(removeUser());
          localStorage.removeItem("id");
          Swal.fire({
            title: "Logged Out!",
            text: "You have been successfully logged out.",
            icon: "success",
          });

          window.location.href = "/";
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to log out. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div>
      {user?.user ? (
        <button
          onClick={handleLogout}
          className="text-lg md:text-xl text-white rounded bg-primary px-6 py-2 font-light w-full md:w-auto"
        >
          Logout
        </button>
      ) : (
        <Link to="/login" className="mt-4 md:mt-0 w-full md:w-auto">
          <button className="text-lg md:text-xl text-white rounded bg-primary px-6 py-2 font-light w-full md:w-auto">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default UserLogout;
