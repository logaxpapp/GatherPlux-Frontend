import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";

export const adminBaseAPISlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ADMIN_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).user.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (endpoint === "uploadFile") {
        headers.set("Content-Type", "multipart/form-data");
      } else {
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  tagTypes: ["Admin"],
  endpoints: () => ({}),
});
