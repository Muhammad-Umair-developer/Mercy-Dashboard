import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LinkComp from "./components/Link";
import { Sidebar_links } from "../constants/siderbar";
import images from "../constants/images";

interface SidebarProps {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>("/dashboard");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Update active link when location changes
    console.log("Location changed to:", location.pathname);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  // Handle logo click navigation
  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigate("/dashboard");
      setActiveLink("/dashboard");
    },
    [navigate]
  );

  return (
    <div
      className={`h-screen pb-10 overflow-auto transition-all duration-300 ${
        menuOpen ? "w-[80px]" : "w-[300px]"
      } bg-[#992C55] text-white`}
      style={{
        // Adjusting scrollbar styling
        scrollbarWidth: "thin",
        scrollbarColor: "white #273E8E",
      }}
    >
      {/* Mobile Close Button */}
      <div className="flex justify-end lg:hidden p-4">
        <button
          className="text-xl cursor-pointer"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4">
        <div onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img
            src={images.logo}
            alt="logo"
            className="w-50 ml-[-25px] h-auto mb-5"
          />
        </div>

        {/* Toggle Menu Icon */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 left-4 bg-gray-800 p-2 rounded-md"
          >
            <i className="bi bi-arrow-left-short text-2xl"></i>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="">
        <ul className="space-y-2">
          {Sidebar_links.map((x, index) => (
            <li key={index}>
              <LinkComp
                name={x.name}
                link={x.link}
                icon={x.icon}
                sub={x.sublinks}
                isActiveCheck={activeLink === x.link}
                onClick={() => setActiveLink(x.link)}
                menuStatus={menuOpen}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className=" pt-6 mx-4 mt-4 flex items-center justify-center">
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            navigate("/login");
          }}
          className="flex items-center p-2 py-4 cursor-pointer gap-2 text-[#FF0000] font-bold rounded-lg w-full bg-white"
        >
          <img src={images.logout} alt="logout" className="w-6 h-6" />
          {!menuOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
