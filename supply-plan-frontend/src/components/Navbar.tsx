"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import "./styles/navbar.css"

export function Navbar() {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Закрываем меню при изменении маршрута
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    return (
        <header className="app-header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m12 6 4 6-8 6 4-12"></path>
                    </svg>
                    <h1>Медицинский планировщик</h1>
                </Link>

                <div className="nav-container">
                    <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
                        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                            Главная
                        </Link>
                        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
                            О проекте
                        </Link>
                        <Link to="/contacts" className={location.pathname === "/contacts" ? "active" : ""}>
                            Контакты
                        </Link>
                    </nav>

                    <div className="nav-controls">
                        <ThemeToggle />
                        <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span className="sr-only">Меню</span>
                            <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
