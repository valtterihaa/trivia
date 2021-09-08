import axios from "axios"
import { useState, useEffect } from "react"

export const Quest = () => {
    const url = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple&encode=url3986'
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data.results)
                // res.data.results.map(r => {
                //     console.log(r)
                //     setQuestionsAndAnswers([...questionsAndAnswers,{question:r.question,answers:r.incorrect_answers}])
                // })
                // setQuestionsAndAnswers([{question:res.data.results.question}])
                setQuestionsAndAnswers(res.data.results)
            })
            .catch(err => console.log(err))
    },[])

    const showState = () => {
        console.log(questionsAndAnswers)
    }

    let qa = [...questionsAndAnswers]

    const showQuestionsAndAnswers = qa.map(q => {
        let correct = q.correct_answer
        let answers = [...q.incorrect_answers]
        answers.push(q.correct_answer)
        answers.sort()
        let final = answers.map(a => {
            return (
                <div key={a} className="answer-choice">
                    <input type="radio" name={q.question} /> {decodeURIComponent(a)}
                </div>
            )
        })
        return (<div className="trivia-snippet" key={q.question}>
            <div className="question">{decodeURIComponent(q.question)}</div>
            <div className="answers">{final}</div>
        </div>)
    })

    const submitAnswers = () => {
        console.log("tryinna submit answers here")
    }

    return (<>
        Hello this is quest
        <button onClick={showState}>Show state</button>
        <div>
            {showQuestionsAndAnswers}
        </div>
        <button onClick={submitAnswers}>Submit answers</button>
    </>)
}