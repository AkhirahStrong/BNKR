"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";

// import { useGetCallById } from "@/hooks/useGetCallById";
import MeetingSetup from "@/components/ui/MeetingSetup";
import MeetingRoom from "@/components/ui/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            //note
            <MeetingSetup />
          ) : (
            //note
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};
export default Meeting;