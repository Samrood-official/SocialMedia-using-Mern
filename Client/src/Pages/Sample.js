import React from "react";

const ThreeBarLayout = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen ">
            <div className="w-full md:w-1/5 bg-red-500 md:block hidden"></div> {/* Left Bar */}
            <div className="flex-1 bg-green-500"></div> {/* Main Bar */}
            <div className="w-full md:w-1/5 bg-yellow-500  md:block hidden"></div> {/* Right Bar */}
        </div>
    );
};

export default ThreeBarLayout;