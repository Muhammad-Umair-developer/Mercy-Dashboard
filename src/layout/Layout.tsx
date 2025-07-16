import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Profile from "./components/Profile";

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex bg-theme-light">
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-20 transition-transform transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:w-fit`}
      >
        <Sidebar setMobileOpen={setMobileOpen} />
      </div>
      {/* Main Content */}
      <div className="w-full h-screen overflow-auto transition-all duration-300 bg-gray-100" id="main-content-wrapper">
        <div>
          <div
            className="
            min-h-[72px] sticky top-0 z-[100]
            flex justify-between items-center
              px-4 md:px-8 py-2
             border-[#093826]
             bg-white
             shadow-sm 
             shadow-gray-300
              "
          >
            <div className="flex items-center gap-2">
              <button
                className="block lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <i className="bi bi-list text-4xl"></i>
              </button>
              {/* <Agents agents={TopbarProfileLeft} /> */}
            </div>
            <div>
              <Profile />
            </div>
          </div>
          <div className="bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
