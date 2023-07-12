import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../../const";

export const gamesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.accessToken;
      // If we have a token set in state, let's assume that we should be passing it.
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
    getAllMyBetsByToken:builder.query({
      query:()=>'/bets',           
    }),
    initiatePayment:builder.mutation({
      query:(data)=>({url:'/payments/init',
      method:'POST',body:data})
    }),
    addPhoneNumberToUser:builder.mutation({
      query:(data)=>({url:'/users/addPhone',
      method:'post',
      body:{...data}})
    })
  }),
});

export const {
  useGetAllGamesQuery,
  useGetGameByIdQuery,
  useGetUserDataByIdMutation,
  usePlacebetMutation,
  useGetAllMyBetsByTokenQuery,
  useInitiatePaymentMutation,
  useAddPhoneNumberToUserMutation
} = gamesApi;
