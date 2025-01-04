"use client";
//@ts-nocheck

import { useEffect, useState, ReactNode } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useUser } from "@clerk/nextjs";

import "stream-chat-react/dist/css/v2/index.css";
import { tokenProvider } from "@/actions/stream.actions";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error("Stream API key is missing");

    const client = new StreamChat(API_KEY);

    const connectUser = async () => {
      const token = await tokenProvider(user.id);
      client.connectUser(
        {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        token
      );
      setChatClient(client);
    };

    connectUser();

    return () => {
      client.disconnectUser();
    };
  }, [user, isLoaded]);

  if (!chatClient) return <div>Loading...</div>;

  return <Chat client={chatClient}>{children}</Chat>;
};

export default StreamChatProvider;
