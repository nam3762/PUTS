import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalConfirm from "./modal/modalConfirm"; // Adjust the import path as needed

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextPath, setNextPath] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isTimetableRoute =
    location.pathname.startsWith("/timetable") &&
    location.pathname !== "/timetableinfo";

  const handleAboutUsClick = () => {
    if (isTimetableRoute) {
      setNextPath("/about"); // Set the next path to navigate to
      setIsModalOpen(true); // Open the modal
    } else {
      navigate("/about"); // Navigate directly to the about page
    }
  };

  const confirmNavigation = () => {
    setIsModalOpen(false);
    navigate(nextPath); // Navigate to the stored path
  };

  const cancelNavigation = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <footer className="footer footer-center bg-gradient-to-b from-base-200 to-base-100 text-base-content rounded p-10 pt-20">
        <nav className="grid grid-flow-col gap-6">
          {/* Replace Link with button and attach the onClick handler */}
          <button onClick={handleAboutUsClick} className="link link-hover">
            About us
          </button>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by CBNU - PUTS</p>
        </aside>
      </footer>

      {/* Include the ModalConfirm component */}
      <ModalConfirm
        isOpen={isModalOpen}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
    </>
  );
}
