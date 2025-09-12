"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignUp} from "@clerk/nextjs";
import '../../custom.css';

export default function Page() {
  
  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <SignUp
        appearance={{
            elements: {
              card: {
                background: "#1a1f27",     // Card background
                boxShadow: "0 0 60px #14f7ff44",
                borderRadius: "18px",
                color: "#f4faff"
              },
              headerTitle: { color: "#1beaff" },
              headerSubtitle: { color: "#3fefff" },

              formButtonPrimary: {
                background: "linear-gradient(90deg, #14e9fe, #12eafd)",
                color: "#181f24",
                fontWeight: 700,
                border: "none"
              },
              formFieldInput: {
                backgroundColor: "#151821",
                color: "#e3eeff",
                border: "1px solid #222b39"
              },
              socialButtonsBlockButton: {
                background: "#11141c",
                color: "#1beaff",
                borderRadius: "8px",
                border: "1px solid #293444"
              },
              dividerText: { color: "#289ef8" },
              footer: {
                background: "#181b23",
                color: "#74e8ff",
                borderTop: "1px solid #223a47"
              },
              identityPreviewText: { color: "#e3eeff" },
              alternativeMethodsBlockButton: { color: "#12eafd" },
              formResendCodeButton: { color: "#12eafd" },
              formFieldLabel: { color: "#19d7db" },
              formFieldHintText: { color: "#6bdfff" },
              formFieldAction: { color: "#12eafd" },
              formHeaderTitle: { color: "#12eafd" },
              formHeaderSubtitle: { color: "#3fefff" }
            },
            variables: {
              colorPrimary: "#12eafd",
              colorText: "#f4faff",
              borderRadius: "18px",
              colorBackground: "#1a1f27",
              fontSize: "16px",
              fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
              colorInputBackground: "#151821",
              colorInputText: "#e3eeff"
            }
          }}
        />
      </div>
    </div>
  );
}
