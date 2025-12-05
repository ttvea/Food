import React from "react";
import {NavLink} from "react-router-dom";
import "../styles/styles.css"

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">

                {/* LOGO */}
                <div className="logo">
                    <img src="https://anzi.com.vn/images/icon/logo-red.png" alt="Anzi Logo" />
                </div>

                {/* MENU */}
                <nav className="nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        TRANG CHỦ
                    </NavLink>

                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        MENU
                    </NavLink>


                    <NavLink
                        to="/order"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        ĐẶT HÀNG
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? "nav-item active" : "nav-item"
                        }
                    >
                        LIÊN HỆ
                    </NavLink>

                </nav>

            </div>
        </header>
    )
}

export default Header;