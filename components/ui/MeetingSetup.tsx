// "use client";

// import {
//   DeviceSettings,
//   VideoPreview,
//   useCall,
// } from "@stream-io/video-react-sdk";
// import React, { useEffect, useState } from "react";

// const MeetingSetup = ({
//   setisSetupComplete,
// }: {
//   setisSetupComplete: (value: boolean) => void;
// }) => {
//   const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false);

//   const call = useCall();

//   if (!call) {
//     throw new Error("usecall must be used within StreamCall component");
//   }

//   useEffect(() => {
//     if (isMicCamToggledOn) {
//       call?.camera.disable();
//       call?.microphone.disable();
//     } else {
//       call?.camera.enable();
//       call?.microphone.enable();
//     }
//   }, [isMicCamToggledOn, call?.camera, call?.microphone]);
//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
//       <h1 className="text-2xl font-bold">Setup</h1>
//       <VideoPreview />
//       <div className="flex h-16 items-center justify-center gap-3">
//         <label className="flex items-center justify-center gap-2 front-medium">
//           <input
//             type="checkbox"
//             checked={isMicCamToggledOn}
//             onChange={(e) => setisMicCamToggledOn(e.target.checked)}
//           />
//           Join with mic and camera off
//         </label>
//         <DeviceSettings />
//       </div>
//       <button
//         className="rounded-md bg-green-500 px-4 py-2.5"
//         onClick={() => {
//           call.join();

//           setisSetupComplete(true);
//         }}
//       >
//         Join Meeting
//       </button>
//     </div>
//   );
// };

// export default MeetingSetup;
"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const MeetingSetup = ({
  setisSetupComplete,
}: {
  setisSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false);

  const call = useCall();
  const router = useRouter(); // Initialize useRouter

  if (!call) {
    throw new Error("useCall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 front-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setisMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <div className="flex gap-4">
        {/* Join Meeting Button */}
        <button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();
            setisSetupComplete(true);
          }}
        >
          Join Meeting
        </button>

        {/* Home Button */}
        <button
          className="rounded-md bg-blue-500 px-4 py-2.5"
          onClick={() => router.push("/")} // Navigate back to home
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default MeetingSetup;
