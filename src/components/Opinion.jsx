import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateComplaintMutation } from "../app/feature/complaintApi/complaintApi";

const Opinion = ({ closeDialog, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submissionError, setSubmissionError] = useState("");

  const [updateComplaint] = useUpdateComplaintMutation();

  //opinion
  // Handle form submission
  const onSubmit = async (data) => {
    const optionData = {
      opinion: data.opinion,
      id: id,
    };

    try {
      const response = await updateComplaint(optionData).unwrap(); // Send the data
      console.log("Response:", response);

      // Close the dialog on successful submission
      closeDialog();
    } catch (error) {
      console.error("Error:", error);
      setSubmissionError(
        "There was an error saving your opinion. Please try again."
      );
    }
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96">
          <h2 className="text-xl font-semibold mb-4">Share Your Opinion</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("opinion", { required: "Opinion is required" })} // Register input with React Hook Form
              rows="4"
              className="w-full p-2 border focus:outline-none border-gray-300 rounded mb-4"
              placeholder="Write your opinion here..."
            />
            {/* Display error message if opinion is required */}
            {errors.opinion && (
              <p className="text-red-500 text-sm">{errors.opinion.message}</p>
            )}

            {/* Display submission error */}
            {submissionError && (
              <p className="text-red-500 text-sm">{submissionError}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-sm font-semibold text-black "
              >
                Submit
              </button>
              <button
                type="button"
                onClick={closeDialog} // Close the dialog without submitting
                className="text-sm font-semibold text-primary texthover ml-4"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Opinion;
