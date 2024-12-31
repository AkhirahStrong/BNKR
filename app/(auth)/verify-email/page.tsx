import { useUser } from "@clerk/nextjs";
import React from "react";

export default function VerifyEmail() {
  const { user } = useUser();

  const resendVerification = async () => {
    try {
      if (!user || !user.primaryEmailAddressId) {
        alert("User or primary email address not found.");
        return;
      }

      const primaryEmail = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      );

      if (!primaryEmail) {
        alert("Primary email address not found.");
        return;
      }

      await primaryEmail.prepareVerification({
        strategy: "email_link",
        redirectUrl: `${window.location.origin}/auth/email-verified`,
      });
      alert("Verification email sent!");
    } catch (error) {
      console.error("Error resending email:", error);
      alert("Failed to resend verification email. Try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Please Verify Your Email</h1>
      <p>
        Check your inbox for a verification email. Once verified, you can access
        the application.
      </p>
      <button
        onClick={resendVerification}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Resend Verification Email
      </button>
    </div>
  );
}
