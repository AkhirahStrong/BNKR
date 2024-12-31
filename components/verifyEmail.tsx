// import { useUser } from "@clerk/nextjs";

// export default function VerifyEmail() {
//   const { user } = useUser();

//   const resendVerification = async () => {
//     try {
//       if (!user || !user.primaryEmailAddressId) {
//         alert("User or primary email address not found.");
//         return;
//       }

//       // Find the primary email address
//       const primaryEmail = user.emailAddresses.find(
//         (email) => email.id === user.primaryEmailAddressId
//       );

//       if (!primaryEmail) {
//         alert("Primary email address not found.");
//         return;
//       }

//       // Trigger verification
//       await primaryEmail.prepareVerification({
//         strategy: "email_link",
//         redirectUrl: `${window.location.origin}/email-verified`, // Redirect after verification
//       });
//       alert("Verification email sent!");
//     } catch (error) {
//       console.error("Error resending email:", error);
//       alert("Failed to resend verification email. Try again later.");
//     }
//   };

//   return (
//     <div>
//       <h1>Please Verify Your Email</h1>
//       <p>
//         Check your inbox for a verification email. Once verified, you can access
//         the app.
//       </p>
//       <button onClick={resendVerification}>Resend Verification Email</button>
//     </div>
//   );
// }
