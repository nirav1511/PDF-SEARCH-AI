// app/layout.js
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import '../../src/app/custom.css';
import Footer from './footer'
import { FaRobot } from "react-icons/fa6";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // match the weights you used
});


export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl="/"
    >
      <html lang="en">
        <body>

          <nav className="ai-navbar">
            {/* Logo (Left) */}
            <div className="ai-navbar-logo">
              <FaRobot className="ai-logo-icon" />
              ALPHANSO <span>AI</span>
            </div>

            {/* Links (Center) */}
            <ul className="ai-navbar-links">
              <SignedIn>
                <li><a href="/">Home</a></li>
              </SignedIn>
              <li><a href="/features">Features</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>

            {/* UserButton (Right) */}
            <SignedIn>
              <div className="ai-navbar-user">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonPopoverCard: {
                        background: "#161b23",
                        color: "#e3eeff",
                        boxShadow: "0 0 30px #14f7ff55, 0 2px 8px #1cf8ff20",
                        border: "1.5px solid #233248",
                        borderRadius: "22px",
                        padding: "18px",
                      },
                      userButtonPopoverActionButton: {
                        color: "#12eafd",
                        background: "#151d29",
                        borderRadius: "12px",
                        fontWeight: 600,
                        margin: "3px 0"
                      },
                      userButtonPopoverActionButtonIcon: {
                        color: "#12eafd",
                      },
                      userButtonPopoverActionButton__signOut: {
                        color: "#ff65a3",
                        background: "#141a1c"
                      }
                    },
                    variables: {
                      colorPrimary: "#12eafd",
                      colorText: "#e3eeff",
                      colorBackground: "#181b23",
                      borderRadius: "22px",
                      fontSize: "15px"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </nav>



          {children}
        </body>
       
      </html>
       <Footer />
    </ClerkProvider>
  );
}
