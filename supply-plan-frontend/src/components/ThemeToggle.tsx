import {useTheme} from "./ThemeProvider"
import {MoonIcon, SunIcon} from "./icons"
import "./styles/theme-toggle.css"

export function ThemeToggle() {
    const {setTheme} = useTheme()

    return (
        <div className="theme-toggle">
            <button
                className="theme-toggle-button"
                onClick={() => {
                    const html = document.documentElement
                    if (html.classList.contains("dark")) {
                        setTheme("light")
                    } else {
                        setTheme("dark")
                    }
                }}
            >
                <SunIcon className="sun-icon" size={20}/>
                <MoonIcon className="moon-icon" size={20}/>
                <span className="sr-only">Переключить тему</span>
            </button>
        </div>
    )
}
