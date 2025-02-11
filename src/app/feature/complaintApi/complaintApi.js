import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseURL from '../../../utils/baseURL';

export const complaintApi = createApi({
  reducerPath: 'complaintApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL()}/complaint/` }),
  tagTypes: ["Complaint"], // ✅ Tag for automatic cache updates

  endpoints: (builder) => ({
    // Add Complaint
    addComplaint: builder.mutation({
      query: (complaintData) => ({
        url: "/complaint-uploaded",
        method: "POST",
        body: complaintData,
      }),
      invalidatesTags: ["Complaint"], // ✅ Refetch complaints after adding
    }),

    // Get All Complaints
    getAllComplaints: builder.query({
      query: () => "/all-complaint",
      providesTags: ["Complaint"], // ✅ Keeps complaints updated
    }),

    // Get Multiple Complaints by ID
    getMultipleComplaints: builder.query({
      query: () => `/multiple-complaint`,
      providesTags: ["Complaint"], // ✅ Ensures freshness
    }),

    // Get Single Complaint by ID
    getSingleComplaintById: builder.query({
      query: (id) => `/single-complaint/${id}`,
      providesTags: ["Complaint"], // ✅ Ensures correct single item updates
    }),

    // Update Complaint
    updateComplaint: builder.mutation({
      query: ( optionData ) => ({
        url: `/update-complaint/${optionData.id}`,
        method: "PUT",
        body: optionData,
      }),
      invalidatesTags: ["Complaint"], // ✅ Forces refetch after updating
    }),

    // Update Status
    updateComplaintStatus: builder.mutation({
      query: ( StatusChange ) => ({
        url: `/update-complaint-status/${StatusChange.id}`,
        method: "PUT",
        body: StatusChange,
      }),
      invalidatesTags: ["Complaint"], // ✅ Forces refetch after updating
    }),

    // Delete Complaint
    deleteComplaint: builder.mutation({
      query: (id) => ({
        url: `/delete-complaint/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Complaint"], // ✅ Removes deleted complaint from cache
    }),
  }),
});

export const {
  useAddComplaintMutation,
  useGetAllComplaintsQuery,
  useGetMultipleComplaintsQuery,
  useGetSingleComplaintByIdQuery,
  useUpdateComplaintMutation,
  useDeleteComplaintMutation,
  useUpdateComplaintStatusMutation
} = complaintApi;
