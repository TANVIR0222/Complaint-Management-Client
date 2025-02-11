import toast from "react-hot-toast";
import {
  useDeleteComplaintMutation,
  useGetSingleComplaintByIdQuery,
} from "../app/feature/complaintApi/complaintApi";
import useUser from "../Hooks/useUser";

const AllComplaintCart = () => {
  const [user] = useUser();

  const { data, isLoading } = useGetSingleComplaintByIdQuery(user?.data?._id);

  const [deleteComplaint, { isLoading: complaintLoading }] =
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

  if (isLoading) return "Loading...";

  return (
      <div className={`${data?.data?.length > 0 && 'h-[550px] overflow-y-auto border rounded bg-gray-50  p-4 w-1/2'}`}>
      {data?.data?.map((item) => (
        <div
          key={item._id}
          className="   my-3 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="  px-3 my-3 ">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item?.title}
              </h2>
              {/*  */}
              <td
                className={`px-4 py-3 font-semibold ${
                  item.status === "Resolved"
                    ? "text-green-600"
                    : item.status === "In Progress"
                    ? "text-blue-600"
                    : item.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600" // Default: Rejected or other invalid status
                }`}
              >
                {item.status} {/* Display the status text inside the cell */}
              </td>
            </div>

            <p className="text-gray-600 text-sm mb-4">{item?.description}</p>
            <div className=" my-6">
              {item?.opinion && 
               <p className="text-black text-sm mb-4 p-2 bg-gray-100 rounded">
                {item?.opinion}
              </p>}
            </div>

            <button
              onClick={() => postDelete(item?._id)}
              className="text-lg md:text-xl text-white rounded bg-primary px-6 py-2 font-light w-full md:w-auto"
            >
              {complaintLoading ? "Loading" : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComplaintCart;
