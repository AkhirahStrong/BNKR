"use client";
import StreamChatProvider from "@/providers/StreamChatProvider";
// import { StreamChatProvider } from "@/providers/StreamChatProvider";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamChatProvider>
        <StreamVideoProvider>{children}</StreamVideoProvider>
      </StreamChatProvider>
    </main>
  );
};
export default RootLayout;

// "use client";

// // import { StreamChatProvider } from "@/providers/StreamChatProvider";
// import StreamVideoProvider from "@/providers/StreamClientProvider";
// import React, { ReactNode } from "react";

// const RootLayout = ({ children }: { children: ReactNode }) => {
//   return (
//     <main>
//       {/* <StreamChatProvider> */}
//         <StreamVideoProvider>{children}</StreamVideoProvider>
//       {/* </StreamChatProvider> */}
//     </main>
//   );
// };

// export default RootLayout;
