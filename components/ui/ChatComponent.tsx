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
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatComponent;
