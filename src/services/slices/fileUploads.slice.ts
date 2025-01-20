
// Giving error when uploading file
import { clientBaseAPISlice } from "../clientBaseAPI";

const extendApiSlice = clientBaseAPISlice.injectEndpoints({
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