import {useEffect, useState} from "react"
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import {Navbar} from "./Navbar.tsx"
import {MedicalSupplyPlanner} from "./medicalSupplyPlanner.tsx"
import {AboutPage} from "./aboutPage.tsx"
import {ContactsPage} from "./ContactPage.tsx"

export function AppRouter() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Router>
            <div className="app-container">
                <Navbar/>
                <main className="app-main">
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<MedicalSupplyPlanner/>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/contacts" element={<ContactsPage/>}/>
                            <Route path="*" element={<Navigate to="/" replace/>}/>
                        </Routes>
                    </div>
                </main>
                <footer className="app-footer">
                    <div className="footer-content">
                        <div className="footer-copyright">© {new Date().getFullYear()} Медицинский планировщик
                            снабжения
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    )
}
