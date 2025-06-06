import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
