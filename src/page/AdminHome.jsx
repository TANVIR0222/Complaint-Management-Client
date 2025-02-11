import React, { useState } from "react";
import {
  useDeleteComplaintMutation,
  useGetMultipleComplaintsQuery,
  useUpdateComplaintStatusMutation,
} from "../app/feature/complaintApi/complaintApi";
import Opinion from "../components/Opinion";

const AdminHome = () => {
  const { data, isLoading } = useGetMultipleComplaintsQuery();

  const [deleteComplaint, { isLoading: deleteLogin }] =
    useDeleteComplaintMutation();

  const postDelete = async (id) => {
    try {
      if (!id) return toast.error("Invalid Complaint ID");

      await deleteComplaint(id).unwrap(); // ✅ Delete request

      toast.success("Complaint deleted successfully!");
    } catch (error) {
      console.error("Error deleting complaint:", error);
      toast.error("Failed to delete complaint. Please try again.");
    }
  };

  const [updateComplaintStatus, { isLoading: statusLoading }] =
    useUpdateComplaintStatusMutation();

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI update (immediate feedback to the user)

    // Assuming you're using a state to hold the complaints data
    // Optimistically update the UI (this step might vary depending on your state management)
    // updateComplaintsState(updatedItem);

    try {
      // Send the update to the backend
      const response = await updateComplaintStatus({
        id,
        status: newStatus,
      }).unwrap();

      console.log("Updated successfully:", response);
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error (e.g., revert UI or show error message)
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control modal visibility

  // Function to open the dialog
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) return "Loading...";

  return (
    <div className=" container mt-16">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
        {data?.data?.map((item, index) => (
          <div
            key={item._id}
            className="   my-3 bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="  px-3 my-3 ">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {index + 1} - {item?.title}
                </h2>
                {/*  */}
                <td className="px-4 py-3 font-semibold focus:outline-none">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    } // Update to the selected status
                    className={`${
                      item.status === "Resolved"
                        ? "text-green-600"
                        : item.status === "In Progress"
                        ? "text-blue-600"
                        : item.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } focus:outline-none `}
                  >
                    <option value="Resolved" className="text-green-600">
                      Resolved
                    </option>
                    <option value="In Progress" className="text-blue-600">
                      In Progress
                    </option>
                    <option value="Pending" className="text-yellow-600">
                      Pending
                    </option>
                    <option value="Rejected" className="text-red-600">
                      Rejected
                    </option>
                  </select>
                </td>
              </div>

              <p className="text-gray-600 text-sm mb-4">{item?.description}</p>
              <div className=" my-6">
                { item?.opinion && <p className="text-black text-sm mb-4 p-2 bg-gray-100 rounded ">
                  {item?.opinion}
                </p>}
              </div>

              <div className=" flex items-center gap-4">
                <button
                  onClick={() => postDelete(item?._id)}
                  className="text-lg md:text-xl text-white rounded bg-primary px-6 py-2 font-light w-full md:w-auto"
                >
                  {deleteLogin ? "Loading" : "Delete"}
                </button>

                <div>
                  {/* Opinion Button */}
                  <button
                    onClick={openDialog}
                    className="text-lg md:text-xl text-white rounded bg-black px-6 py-2 font-light w-full md:w-auto"
                  >
                    Opinion
                  </button>

                  {/* Modal/Dialog */}
                  {isDialogOpen && (
                    <Opinion closeDialog={closeDialog} id={item?._id} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
