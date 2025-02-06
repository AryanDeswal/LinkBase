import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ViewArchitecturalProject from "./components/ViewArchitectural";
import ViewInteriorProject from "./components/ViewInterior";
import ViewUsers from "./components/ViewUser";
import { useAdmin } from "../context/AdminContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("viewData");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  const logoutHandler = () => {
    window.sessionStorage.removeItem("authorizationadmin");
    navigate("/adminlogin");
  };

  // Render content dynamically based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "viewData":
        return <ViewUsers />;
      case "viewReport":
        return <ViewArchitecturalProject />;
      case "seeUsers":
        return <ViewInteriorProject />;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  // If not admin, render "Not an admin" message
  if (!isAdmin) {
    return <div className="text-center mt-20 text-red-600">Not an admin</div>;
  }

  // Admin dashboard
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-blue-800 text-white p-4">
        <button
          className="text-lg font-bold"
          onClick={() => setSidebarOpen(!sidebarOpen)} // Toggle sidebar state
        >
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-blue-800 text-white p-4 md:min-h-screen`}
      >
        <h2 className="text-xl font-bold mb-6">Mayur Gandhi & Associate</h2>
        <ul>
          <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === "viewData" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("viewData")}
            >
              View Users
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === "viewReport" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("viewReport")}
            >
              View Architectural Report
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 mb-2 rounded hover:bg-blue-700 ${
                activeTab === "seeUsers" ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab("seeUsers")}
            >
              View Interior Report
            </button>
          </li>
        </ul>
        <div className="flex flex-col items-center bg-red-500 p-2 mt-4">
          <button
            onClick={logoutHandler}
            className="text-white font-semibold px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-3/4 bg-white p-6">
        <div className="p-4 bg-gray-100 rounded shadow">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
