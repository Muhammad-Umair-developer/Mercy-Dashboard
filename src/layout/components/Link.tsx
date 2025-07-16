import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SubLink {
  name: string;
  link: string;
  icon: string;
}

interface LinkCompProps {
  name: string;
  link: string;
  sub?: SubLink[];
  isActiveCheck: boolean;
  icon: string;
  onClick: () => void;
  menuStatus: boolean;
}

const LinkComp: React.FC<LinkCompProps> = ({
  name,
  link,
  sub = [],
  isActiveCheck,
  icon,
  onClick,
  menuStatus,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(isActiveCheck);

  useEffect(() => {
    // Check if current path matches this link
    const currentPath = location.pathname;
    const linkPath = link;

    // More robust path matching
    const isPathMatch =
      currentPath === linkPath ||
      (linkPath !== "/" && currentPath.startsWith(linkPath)) ||
      currentPath.split("/")[1] === linkPath.split("/")[1] ||
      sub.some(
        (item) =>
          currentPath === item.link ||
          (item.link !== "/" && currentPath.startsWith(item.link)) ||
          currentPath.split("/")[1] === item.link.split("/")[1]
      );

    setIsActive(isPathMatch);
  }, [location.pathname, link, sub]);

  // Handle navigation with both onClick callback and router navigation
  const handleNavigation = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent default anchor behavior
      e.stopPropagation(); // Stop event bubbling

      console.log("Navigating to:", link);

      // Clear user context when leaving user-mgt section
      if (
        location.pathname.startsWith("/users") &&
        !link.startsWith("/users")
      ) {
        localStorage.removeItem("selectedTableRowUser");
        localStorage.removeItem("selectedContextUserId");
        console.log("Cleared user context");
      }

      // Navigate without replace to ensure proper content updates
      navigate(link);

      // Call the parent's onClick handler
      onClick();
    },
    [onClick, navigate, link, location.pathname]
  );

  return (
    <div className="relative">
      {/* Purple Side Border for Active Tab */}

      <div
        onClick={handleNavigation}
        className={`cursor-pointer group flex items-center py-3 p-3 rounded-md transition-all duration-200 mx-4 relative group:
          ${
            isActive
              ? "bg-[#590B28] text-white"
              : "text-gray-400 hover:bg-[#590B28] hover:text-white"
          }`}
        role="button"
        tabIndex={0}
        style={{ outline: "none" }}
      >
        <img
          src={icon}
          alt={`${name} icon`}
          className={`w-6 h-6 ${isActive ? "" : "group-hover:"} `}
        />
        {!menuStatus && (
          <span className="font-normal" style={{ marginLeft: "5px" }}>
            {name}
          </span>
        )}
        <div
          className={`absolute right-1 top-1/2 h-[40%] bg-white w-1 rounded hidden transform -translate-y-1/2 ${
            isActive ? "block" : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

export default LinkComp;
