// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaSignOutAlt, FaUserShield, FaSuitcase, FaPlane, FaTrain, FaBus, FaHotel,FaCar} from "react-icons/fa";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const username = localStorage.getItem("username");
//   const email = localStorage.getItem("email");
//   const role = localStorage.getItem("userRole");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-indigo-500 flex flex-col items-center py-10 px-4">
//       <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-2">
//         <FaUserShield className="text-yellow-300" /> Admin Dashboard
//       </h1>

//       {/* Admin Info */}
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center mb-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, Admin</h2>
//         <p className="text-gray-600"><strong>Username:</strong> {username}</p>
//         <p className="text-gray-600"><strong>Email:</strong> {email}</p>
//         <p className="text-gray-600"><strong>Role:</strong> {role}</p>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
//         <LinkCard to="/admin/manage-packages" label="Packages" icon={<FaSuitcase />} color="black" />
//         <LinkCard to="/admin/manage-flights" label="Flights" icon={<FaPlane />} color="black" />
//         <LinkCard to="/admin/manage-trains" label="Trains" icon={<FaTrain />} color="purple" />
//         <LinkCard to="/admin/manage-buses" label="Buses" icon={<FaBus />} color="orange" />
//         <LinkCard to="/admin/manage-hotels" label="Hotels" icon={<FaHotel />} color="teal" />
//         <LinkCard to="/admin/manage-buses" label="cabs" icon={<FaCar />} color="black" />
//       </div>

//       {/* Logout */}
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow-md transition duration-300"
//       >
//         <FaSignOutAlt /> Logout
//       </button>
//     </div>
//   );
// };

// // Reusable LinkCard Component
// const LinkCard = ({ to, label, icon, color }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex flex-col items-center justify-center bg-white border-t-4 border-${color}-500 hover:shadow-xl rounded-lg p-4 text-center transition duration-300`}
//     >
//       <div className={`text-${color}-500 text-3xl mb-2`}>
//         {icon}
//       </div>
//       <span className="font-semibold text-gray-700">{label}</span>
//     </Link>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserShield,
  FaSuitcase,
  FaPlane,
  FaTrain,
  FaBus,
  FaHotel,
  FaCar,
} from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("userRole");

  const [bookings, setBookings] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/login");
    }

    // Fetch all bookings from backend
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [role, navigate]);

  const groupedBookings = bookings.reduce((acc, booking) => {
    if (!acc[booking.type]) acc[booking.type] = [];
    acc[booking.type].push(booking);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-indigo-500 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-6 flex items-center gap-2">
        <FaUserShield className="text-yellow-300" /> Admin Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, Admin</h2>
        <p className="text-gray-600"><strong>Username:</strong> {username}</p>
        <p className="text-gray-600"><strong>Email:</strong> {email}</p>
        <p className="text-gray-600"><strong>Role:</strong> {role}</p>
      </div>

      {/* Admin Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        <LinkCard to="/admin/manage-packages" label="Packages" icon={<FaSuitcase />} color="black" />
        <LinkCard to="/admin/manage-flights" label="Flights" icon={<FaPlane />} color="black" />
        <LinkCard to="/admin/manage-trains" label="Trains" icon={<FaTrain />} color="purple" />
        <LinkCard to="/admin/manage-buses" label="Buses" icon={<FaBus />} color="orange" />
        <LinkCard to="/admin/manage-hotels" label="Hotels" icon={<FaHotel />} color="teal" />
        <LinkCard to="/admin/manage-cabs" label="Cabs" icon={<FaCar />} color="black" />
      </div>

      {/* All Bookings Section */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📋 All Bookings</h2>
        {Object.keys(groupedBookings).length === 0 ? (
          <p className="text-gray-500">No bookings available.</p>
        ) : (
          Object.entries(groupedBookings).map(([type, bookings]) => (
            <div key={type} className="mb-4">
              <h3 className="text-xl font-bold mb-2 capitalize">{type} Bookings</h3>
              <ul className="space-y-2">
                {bookings.map((b) => (
                  <li
                    key={b._id}
                    className="border rounded p-3 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
                  >
                    <span><strong>User:</strong> {b.username}</span>
                    <span><strong>Date:</strong> {new Date(b.bookingDate).toLocaleDateString()}</span>
                    <span><strong>Price:</strong> ₹{b.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow-md transition duration-300"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

// Reusable LinkCard Component
const LinkCard = ({ to, label, icon, color }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center bg-white border-t-4 border-${color}-500 hover:shadow-xl rounded-lg p-4 text-center transition duration-300`}
    >
      <div className={`text-${color}-500 text-3xl mb-2`}>{icon}</div>
      <span className="font-semibold text-gray-700">{label}</span>
    </Link>
  );
};

export default AdminDashboard;
