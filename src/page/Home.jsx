import { Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAddComplaintMutation } from "../app/feature/complaintApi/complaintApi";
import toast from "react-hot-toast";
import useUser from "../Hooks/useUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import AllComplaintCart from "../components/AllComplaintCart";
import isAdmin from "../utils/isAdmin";

const Home = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [addComplaint, { isLoading, isError, error, isSuccess }] =
    useAddComplaintMutation();

  const [user ] = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (user && user?.data.email) {
        const { subject, description } = data;

        const complaintData = {
          title: subject,
          description: description,
          userId: user?.data?._id,
        };

        // Send request to API
        await addComplaint(complaintData).unwrap();

        toast.success("Complaint submitted successfully!");
        reset();
      } else {
        Swal.fire({
          title: "You ar not logged in",
          text: "Please login to add to  the card? ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, log in !",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      toast.error("Failed to submit complaint. Please try again.");
    }
  };


  return (
    <div className="container mx-auto ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 my-10">
        Submit a Complaint
      </h2>

      <div className="  flex  justify-between ">
        {/* Title */}
        <div className="mb-4 w-1/2 mx-auto ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96">
            {/* Complaint Title */}
            <Controller
              name="subject"
              control={control}
              defaultValue=""
              rules={{ required: "Complaint title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Complaint Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E51A17",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#E51A17" },
                  }}
                />
              )}
            />

            {/* More Details */}
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Complaint details are required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="More Details"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E51A17",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#E51A17" },
                  }}
                />
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#E51A17",
                "&:hover": { backgroundColor: "#c21816" },
                borderRadius: "4px",
              }}
            >
              Submit Complaint
            </Button>
          </form>
        </div>

        {/* Scrollable Content */}
            <AllComplaintCart />
      </div>
    </div>
  );
};

export default Home;
