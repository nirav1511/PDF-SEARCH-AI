"use client";
import { SignIn } from "@clerk/nextjs";
import '../../custom.css';


export default function Page() {
  return (
    <div className="signin-wrapper">
      {/* Wrap Clerk component inside card */}
      <div className="signin-card">
        <SignIn />
      </div>
    </div>
  );
}
