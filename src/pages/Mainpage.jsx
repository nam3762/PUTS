import { Link } from "react-router-dom";
import putsLogo from "../assets/PUTS2.png";

export default function Mainpage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-base-200 min-h-screen">
      <div className="text-center w-full">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <img src={putsLogo} alt="PUTS Logo" className="h-36" />
          <p className="py-6 text-base-content">
            The best timetable generator for <br></br>CBNU School of Computer
            Science
          </p>
          <Link to="/timetable" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
