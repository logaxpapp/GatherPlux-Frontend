import { baseApiSlice } from "..";

const extendApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: 'account/token',
        method: 'POST',
        body,
      }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: 'account',
        method: 'POST',
        body,
      }),
    }),
    verifyUser: builder.mutation({
      query: (body) => ({
        url: 'account/activate',
        method: 'POST',
        body,
      }),
    }),
    resetUserPasswordRequest: builder.mutation({
      query: (body) => ({
        url: 'account/request-password-reset',
        method: 'POST',
        body,
      }),
    }),
    setNewPassword: builder.mutation({
      query: (body) => ({
        url: 'account/reset-password',
        method: 'POST',
        body,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: 'profile',
        method: 'GET',
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: 'profile',
        method: 'PATCH',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: 'profile/password',
        method: 'PUT',
        body,
      }),
    }),
    updateUserEmail: builder.mutation({
      query: (body) => ({
        url: 'profile/email',
        method: 'PUT',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation, useCreateUserMutation, useVerifyUserMutation, useResetUserPasswordRequestMutation, useSetNewPasswordMutation, useGetUserProfileQuery, useLazyGetUserProfileQuery, useUpdateUserProfileMutation, useResetPasswordMutation, useUpdateUserEmailMutation } = extendApiSlice;