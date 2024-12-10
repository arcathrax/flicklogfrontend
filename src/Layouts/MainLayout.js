import React from "react";

import Navbar from "../Components/Navbar";


const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="mainLayoutBody">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
