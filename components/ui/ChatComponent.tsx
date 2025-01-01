"use client";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";

const ChatComponent = ({
  userId,
  userToken,
  channelId,
}: {
  userId: string;
  userToken: string;
  channelId: string;
}) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    // Initialize the chat client
    const client = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY || "");

    // Connect the user
    client
      .connectUser(
        {
          id: userId,
          name: `User ${userId}`, // Set the username dynamically
        },
        userToken
      )
      .then(() => setChatClient(client));

    // Cleanup on component unmount
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [userId, userToken]);

  if (!chatClient) return <p>Loading chat...</p>;

  // Fetch or create a channel
  const channel = chatClient.channel("messaging", channelId, {
    name: "Meeting Chat",
    members: [userId],
  });

  return (
    <Chat client={chatClient} theme="messaging light">
      <Channel channel={channel}>
        <div className="h-[400px] w-full bg-[#1a1d21] text-white rounded-lg p-4">
          {/* Channel Header */}
          <ChannelHeader />
          {/* Message List */}
          <MessageList />
          {/* Message Input */}
          <MessageInput />
        </div>
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
