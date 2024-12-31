import React from "react";

export default function EmailVerified() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem",
      }}
    >
      <h1>Email Verified Successfully</h1>
      <p>
        Thank you for verifying your email. You can now access the application.
      </p>
      <a
        href="/"
        style={{
          color: "#0070f3",
          textDecoration: "underline",
          marginTop: "1rem",
          display: "inline-block",
        }}
      >
        Go to Homepage
      </a>
    </div>
  );
}
