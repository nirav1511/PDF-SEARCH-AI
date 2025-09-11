// app/layout.js
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import '../../src/app/custom.css';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl="/"
    >
      <html lang="en">
        <body>
          <div className="user-button-container">
            <div className="back-arrow-wrapper">
              <Link href="/" className="back-arrow">
                <span className="back-arrow-text">Home</span>
              </Link>
            </div>
            <UserButton
              afterSignOutUrl="/login"
              appearance={{
                elements: {
                  userButtonAvatarBox: "width:64px;height:64px;border-radius:50%;",
                },
              }}
            />
          </div>

          {/* Render the page content */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
