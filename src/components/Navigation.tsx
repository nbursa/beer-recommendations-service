import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const getLinkClasses = (path: string) =>
    `p-2  ${location.pathname === path ? "font-bold" : ""}`;

  return (
    <nav className="p-4">
      <div className="flex justify-center space-x-4">
        <Link to="/" className={getLinkClasses("/")}>
          Home
        </Link>
        <Link to="/management" className={getLinkClasses("/management")}>
          Management
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
