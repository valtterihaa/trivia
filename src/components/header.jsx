import { useState } from "react"
import { Link } from "react-router-dom"
import { Stats } from "./stats"

export const Header = () => {
    const [stat, setStat] = useState(false)
    return (<header>
        <Link to="/">
            <h1>Valtteri's Trivia App</h1>
        </Link>
        <button onClick={() => setStat(!stat)}>Stats</button>
        <div className="test">
            {stat ? <Stats /> : <></>}
        </div>
    </header>)
}