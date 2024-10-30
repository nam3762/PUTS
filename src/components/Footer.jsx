import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-gradient-to-b from-base-200 to-base-100 text-base-content rounded p-10 pt-20">
      <nav className="grid grid-flow-col gap-6">
        <Link to="/about" className="link link-hover">
          About us
        </Link>
      </nav>
      <aside>
        <p>Copyright © 2024 - All right reserved by CBNU - PUTS</p>
      </aside>
    </footer>
  );
}
