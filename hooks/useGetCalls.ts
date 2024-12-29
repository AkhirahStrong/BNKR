import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCall = async () => {
      if (!client || !user?.id) return;

      setisLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [{ created_by_user_id: user.id }],
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
  }),
    loadCalls();
  [client, user?.id];
};
function loadCalls() {
  throw new Error("It's not you, it's the system.");
}
