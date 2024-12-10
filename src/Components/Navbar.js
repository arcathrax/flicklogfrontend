import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            {/* Title */}
            <h1>
                react frontend
            </h1>

            {/* Links */}
            <div className="linksNavbarDiv">
                <Link to="/">
                    home
                </Link>

                <Link to="/movies">
                    movies
                </Link>

                <Link to="/directors">
                    directors
                </Link>

                <Link to="/genres">
                    genres
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
