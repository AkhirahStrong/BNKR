import { useStreamChat } from "@/providers/StreamChatProvider";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
// import { StreamChat } from "stream-chat";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  // const [chatChannel, setChatChannel] = useState<any>();
  // const [isChatLoading, setIsChatLoading] = useState(true);

  const client = useStreamVideoClient();
  // const chatClient = useStreamChat();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });

      if (calls.length > 0) setCall(calls[0]);

      setIsCallLoading(false);
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
