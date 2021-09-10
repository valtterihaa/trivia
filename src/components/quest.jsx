import axios from "axios"
import { useState, useEffect, useRef } from "react"

export const Quest = () => {
    const url = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple&encode=url3986'
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])
    const [chosenAnswers, setChosenAnswers] = useState([])
    const [allChosen, setAllChosen] = useState(false)

    useEffect(() => {
        axios.get(url)
            .then(res => setQuestionsAndAnswers(res.data.results))
            .catch(err => console.log(err))
    },[])

    const showState = () => {
        checkAnswerAmount()
        console.log(refNumber.current)
    }

    const refNumber = useRef(chosenAnswers)
    const newSetChosenAnswers = x => {
        refNumber.current = x
        setChosenAnswers(x)
    }

    const handleChange = event => {
        if (chosenAnswers.some(element => element.question === event.target.id)){
            // find object index where question is the same as the one altered
            let index = chosenAnswers.findIndex(x => x.question === event.target.id)
            // create duplicate array so original is not mutated
            let chosenAnswerDuplicate = [...chosenAnswers]
            // splice the old answer out and replace with the new answer; element.splice() has the functionality built-in!
            chosenAnswerDuplicate.splice(index,1,{question:event.target.id,answer:event.target.value})
            // then modify the state to contain the new object array
            newSetChosenAnswers(chosenAnswerDuplicate)
            showState()
            return
        }
        newSetChosenAnswers([...chosenAnswers,{question:event.target.id,answer:event.target.value}])
        showState()
    }

    let qa = [...questionsAndAnswers]

    const showQuestionsAndAnswers = qa.map(q => {
        let answers = [...q.incorrect_answers]
        answers.push(q.correct_answer)
        answers.sort()
        let answerChoice = answers.map(a => {
            return (
                <div key={a} className="answer-choice">
                    
                    <input type="radio" name={decodeURIComponent(q.question)} id={decodeURIComponent(q.question)} value={decodeURIComponent(a)} onChange={handleChange} /> 
                    <label htmlFor={decodeURIComponent(q.question)}><span> {decodeURIComponent(a)}</span></label>
                    
                </div>
            )
        })
        return (<div className="trivia-snippet" key={q.question}>
            <div className="question">{decodeURIComponent(q.question)}</div>
            <div className="answers">{answerChoice}</div>
        </div>)
    })

    const submitAnswers = () => {
        console.log("tryinna submit answers here")
    }

    const checkAnswerAmount = () => {
        console.log("i am checking out")
        console.log(questionsAndAnswers.length, chosenAnswers.length)
        if (questionsAndAnswers.length === refNumber.current.length) setAllChosen(true)
    }
    

    return (<>
    <div>
        Hello this is quest
        <button onClick={showState}>Show state</button>
        <span>You have answered {refNumber.current.length} questions</span>
    </div>
        
        <div>
            {showQuestionsAndAnswers}
        </div>
        <div className="submit-container flex-row space-evenly">
            {
            allChosen ? <button onClick={submitAnswers} className="trivia-submit">Submit answers</button>
                : 
            <>Answer all q's first</>
            }
        </div>
        
    </>)
}