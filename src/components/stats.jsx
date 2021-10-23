import { useSelector } from "react-redux"
import { useState } from "react"

export const Stats = () => {
    const myStats = useSelector(state => state.trivia)
    const [stat, setStat] = useState(false)


    return(<>
    <button onClick={() => setStat(!stat)} className="show-stats">Stats</button>
        
            {stat ? 
            // <div className="test">
            <section className="dropdown">
                <div>
                    <h2>Rounds played</h2>
                    <h2>{myStats.roundsPlayed}</h2>
                </div>
                <div>
                    <h2>Correct answers</h2>
                    <h2>{myStats.questionsCorrectlyAnswered} / {myStats.questionsAnswered}</h2>
                </div>
                <div>
                    <h2>Categories</h2>
                    <h2>{myStats.categoriesPlayed.size}</h2>
                </div>
            </section> 
            // </div>
            : 
            <></>}
        
    
    </>)
}