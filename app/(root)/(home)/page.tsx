"use client";

import MeetingTypeList from "@/components/ui/MeetingTypeList";
import React from "react";
import { useGetCalls } from "@/hooks/useGetCalls";

const Home = () => {
  // Use `useGetCalls` to fetch call data (meetings)
  const { upcomingCalls, isLoading } = useGetCalls();

  // Current time
  const currentTime = new Date();
  const formattedCurrentTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedCurrentDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(currentTime);

  // Find the nearest upcoming meeting
  const nextMeeting = upcomingCalls
    ? upcomingCalls
        .filter(
          (meeting) =>
            meeting.state?.startsAt && // Ensure startsAt exists
            new Date(meeting.state.startsAt) > currentTime // Filter for future meetings
        )
        .sort((a, b) => {
          const dateA = a.state?.startsAt
            ? new Date(a.state.startsAt).getTime()
            : Infinity; // Use Infinity as a fallback
          const dateB = b.state?.startsAt
            ? new Date(b.state.startsAt).getTime()
            : Infinity; // Use Infinity as a fallback
          return dateA - dateB; // Sort by closest start time
        })[0] // Get the first (earliest) meeting
    : null;

  // Format time and date for the next meeting
  const formattedMeetingTime = nextMeeting
    ? new Date(nextMeeting.state.startsAt!).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No upcoming meetings";

  const formattedMeetingDate = nextMeeting
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
        new Date(nextMeeting.state.startsAt!)
      )
    : "";

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Hero section with background and dynamic time/date */}
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:p-8 lg:p-11">
          <div className="text-4xl font-extrabold lg:text-5xl">
            <p className="text-lg font-medium text-sky-1">
              {formattedCurrentDate}
            </p>
            <h1 className="text-2xl font-extrabold lg:text-3xl">
              {formattedCurrentTime}
            </h1>
          </div>
          {/* Upcoming meeting section */}
          <div className="glassmorphism max-w-[270px] rounded py-2 px-4 text-center text-base font-normal">
            <h2 className="text-lg font-bold">Upcoming Meeting at:</h2>
            {isLoading ? (
              // Display a loading indicator while data is being fetched
              <p className="text-sm text-sky-1">Loading...</p>
            ) : (
              // Display the dynamically fetched meeting time and date
              <>
                <p className="text-lg font-semibold text-white">
                  {formattedMeetingTime}
                </p>
                <p className="text-sm text-sky-1">{formattedMeetingDate}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MeetingTypeList component */}
      <MeetingTypeList />
    </section>
  );
};

export default Home;
