"use client";

// import { useStreamChat } from "@/providers/StreamChatProvider";
import { useEffect, useState } from "react";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelHeader,
  useChatContext,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const ChatComponent = () => {
  // const chatClient = useStreamChat();
  const { client } = useChatContext(); // Access the chat client from context
  const [channel, setChannel] = useState<any>(null);

  useEffect(() => {
    if (!client) return;

    // Create or get a channel (e.g., "general")
    const chatChannel = client.channel("messaging", "general", {
      name: "General Chat",
    });

    const initializeChannel = async () => {
      // Watches the channel for updates (messages, reactions, etc.)
      await chatChannel.watch();
      // Sets the initialized channel in the component's state
      setChannel(chatChannel);
    };

    initializeChannel();

    return () => {
      if (channel) {
        channel.stopWatching();
      }
    };
  }, [client, channel]); // Only run this effect when chatClient changes

  // Wait for the channel to be ready
  if (!channel) {
    return <p>Loading chat...</p>;
  }

  return (
    <div className="h-screen flex flex-col max-w-lg mx-auto border rounded-lg overflow-hidden shadow-lg">
      <Channel channel={channel}>
        {/* Chat Input */}
        <div className="border-b p-2 bg-white">
          <MessageInput />
        </div>

        {/* Chat Messages */}
        <div className="flex-1  bg-gray-50 p-4">
          <MessageList />
        </div>
      </Channel>
    </div>
  );
};

export default ChatComponent;
