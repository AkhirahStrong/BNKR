"use client";
import React from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
// import { Button } from "./button";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  const { useLocalParticipant } = useCallStateHooks();
  const LocalParticipant = useLocalParticipant();

  const isMeetingOwner =
    LocalParticipant &&
    call?.state.createdBy &&
    LocalParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      className="bg-red-500"
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
