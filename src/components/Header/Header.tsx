import { Link } from "react-router-dom";
import "./Header.css";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <span className="header-logo-mark">Y</span>
        Hacker News
      </Link>
    </header>
  );
};
