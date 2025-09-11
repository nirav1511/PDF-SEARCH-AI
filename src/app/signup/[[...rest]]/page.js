"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignUp} from "@clerk/nextjs";
import '../../custom.css';

export default function Page() {
  
  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <SignUp />
      </div>
    </div>
  );
}
