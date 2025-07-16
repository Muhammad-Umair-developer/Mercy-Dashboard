import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPage = useCallback(
    (
      path: string,
      options?: {
        replace?: boolean;
        clearUserContext?: boolean;
      }
    ) => {
      try {
        console.log(`Navigating from ${location.pathname} to ${path}`);

        // Clear user context if requested or when leaving user-mgt section
        const isLeavingUserMgt =
          location.pathname.startsWith("/users") && !path.startsWith("/users");

        if (options?.clearUserContext || isLeavingUserMgt) {
          localStorage.removeItem("selectedTableRowUser");
          localStorage.removeItem("selectedContextUserId");
          console.log("Cleared user context during navigation");
        }

        // Navigate with the specified options
        navigate(path, {
          replace: options?.replace || false,
          state: { from: location.pathname },
        });
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback navigation
        navigate(path);
      }
    },
    [navigate, location.pathname]
  );

  return { navigateToPage, currentPath: location.pathname };
};

export default useAppNavigation;
