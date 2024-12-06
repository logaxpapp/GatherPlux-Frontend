
// Giving error when uploading file
import { baseApiSlice } from "..";

const extendApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<{ url: string; }, FormData>({
      query: (formData) => ({
        url: '/file',
        method: 'POST',
        body: formData,

      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUploadFileMutation } = extendApiSlice;