import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../const";

export const gamesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.accessToken;
      if (token) {
        headers.set("token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllGames: builder.query({
      query: () => "games",
    }),
    getGameById: builder.query({
      query: (id) => `games/${id}`,
    }),
    getUserDataById: builder.mutation({
      query: (uid) => `/users/${uid}`,
      method: "get",
    }),
    placebet: builder.mutation({
      query: (data) => ({ url: "/bets/createBet", method: "POST", body: data }),
    }),
    getAllMyBetsByToken: builder.query({
      query: () => "/bets",
    }),
    initiatePayment: builder.mutation({
      query: (data) => ({ url: "/payments/init", method: "POST", body: data }),
    }),
    addPhoneNumberToUser: builder.mutation({
      query: (data) => ({
        url: "/users/addPhone",
        method: "post",
        body: { ...data },
      }),
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/users/signup",
        method: "post",
        body: { ...data },
      }),
    }),
    getBetDetailsById: builder.query({
      query: (id) => `/bets/${id}`,
    }),
    getGameResults: builder.mutation({
      query: (data) => ({
        url: "/games/getGameResults",
        method: "post",
        body: { ...data },
      }),
    }),
    createWithDraw: builder.mutation({
      query: (data) => ({
        url: "/payments/withdraw",
        method: "post",
        body: { ...data },
      }),
    }),
    phonePeGateway: builder.mutation({
      query: (data) => ({
        url: "/payments/init/phonePe",
        method: "post",
        body: { ...data },
      }),
    }),
    phonePeGatewayIntent: builder.mutation({
      query: (data) => ({
        url: "/payments/init/phonePe/intent",
        method: "post",
        body: { ...data },
      }),
    }),
    phonePeGatewayQr: builder.mutation({
      query: (data) => ({
        url: "/payments/init/phonePe/qr",
        method: "post",
        body: { ...data },
      }),
    }),
    phonePeUpiCollect: builder.mutation({
      query: (data) => ({
        url: "/payments/init/phonePe/vpaCollect",
        method: "post",
        body: { ...data },
      }),
    }),
    phonePeCheckStauts: builder.query({
      query: (transactionId) => `/payments/phonepe/status/${transactionId}`,
    }),
    getAllTransactions: builder.mutation({
      query: () => ({url:"/payments/all",method:'post'}),      
    }),
  }),
});



export const {
  useGetAllGamesQuery,
  useGetGameByIdQuery,
  useGetUserDataByIdMutation,
  usePlacebetMutation,
  useGetAllMyBetsByTokenQuery,
  useInitiatePaymentMutation,
  useAddPhoneNumberToUserMutation,
  useGetBetDetailsByIdQuery,
  useGetGameResultsMutation,
  useSignupUserMutation,
  useCreateWithDrawMutation,
  usePhonePeGatewayMutation,
  usePhonePeGatewayQrMutation,
  usePhonePeGatewayIntentMutation,
  usePhonePeUpiCollectMutation, 
  useGetAllTransactionsMutation,
  usePhonePeCheckStautsQuery,
  useLazyPhonePeCheckStautsQuery
} = gamesApi;
