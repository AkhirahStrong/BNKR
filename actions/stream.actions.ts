"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

// Retrieves the API key and secret from environment variables.
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

// Defines an asynchronous function to provide a token.
export const tokenProvider = async () => {
  // Fetches the current user using Clerk.
  const user = await currentUser();

  //Error throws
  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("There is no API key");
  if (!apiSecret) throw new Error("There is no API secret");

  // Initializes a new StreamClient with the API key and secret.
  const client = new StreamClient(apiKey, apiSecret);

  // Calculates the token expiration time as one hour from the current time.
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  // Calculates the token issued time as one minute before the current time.
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.id, exp, issued);

  return token;
};
