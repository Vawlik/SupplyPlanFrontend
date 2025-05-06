import {useEffect, useState} from "react"
import {Link, useLocation} from "react-router-dom"
import {ThemeToggle} from "./ThemeToggle"
import {ArrowIcon} from "./icons"
import "./styles/navbar.css"

export function Navbar() {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    return (
        <header className="app-header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <ArrowIcon size={24}/>
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
                        <ThemeToggle/>
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
