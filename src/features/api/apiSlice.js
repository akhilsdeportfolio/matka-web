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
    getUserDataById:builder.query({
      query:(uid)=>`/users/${uid}`,
    })
  }),
});

export const { useGetAllGamesQuery, useGetGameByIdQuery,useGetUserDataByIdQuery} =
  gamesApi;
