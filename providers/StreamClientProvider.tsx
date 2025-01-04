"use client";
//@ts-nocheck

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/ui/Loader";
import {
  // StreamCall,
  StreamVideo,
  StreamVideoClient,
  // User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import "stream-chat-react/dist/css/v2/index.css";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [VideoClient, setVideoClient] = useState<StreamVideoClient>();

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },

      tokenProvider: async () => {
        // Use the current user ID to fetch a token
        const token = await tokenProvider(user.id);
        return token; // Ensure it matches the expected type: Promise<string>
      },

      // tokenProvider: tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!VideoClient) return <Loader />;

  return <StreamVideo client={VideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
// function userUser(): { user: any; isLoaded: any } {
//   throw new Error("Function not implemented.");
// }
