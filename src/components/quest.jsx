import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { answeredRound } from "../redux/actions"

export const Quest = () => {
    const dispatch = useDispatch()
    const url = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple&encode=url3986'
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])
    const [chosenAnswers, setChosenAnswers] = useState([])
    const [allChosen, setAllChosen] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [amountOfCorrects, setAmountOfCorrects] = useState(0)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [results, setResults] = useState('here we go')
    // hmm, what is going on here...
    const playedRounds = useSelector(state => state.trivia.roundsPlayed)

    useEffect(() => {
        axios.get(url)
            .then(res => setQuestionsAndAnswers(res.data.results))
            .catch(err => console.log(err))
    },[results])

    const showState = () => {
        console.log(playedRounds)
        checkAnswerAmount()
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
            // splice the old answer out and replace with the new answer; element.splice() has that functionality built-in!
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

    // arrange questions alphabetically to start with?
    // so comparing later will be easier
    // they do be in the same order tho to start with anyway
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

    // when answers are submitted, they are arranged alphabetically by question and compared so there's no need to do in depth comparisons
    const submitAnswers = () => {
        let correctAnswersNotState = []
        let givenAnswers = []
        let correctAmount = 0
        qa.sort().map(q => {
            correctAnswersNotState.push(decodeURIComponent(q.correct_answer))
            console.log(decodeURIComponent(q.correct_answer))
        })
        chosenAnswers.map(c => {
            givenAnswers.push(c.answer)
            console.log(c.answer)
        })
        for (let i = 0; i < givenAnswers.length; i++){
            if (correctAnswersNotState[i] === givenAnswers[i]) correctAmount++
        }
        setAmountOfCorrects(correctAmount)
        setHasAnswered(true)
        dispatch(answeredRound)
        checkAnswers()
    }

    const checkAnswerAmount = () => {
        console.log(questionsAndAnswers.length, chosenAnswers.length,"lengths here, qa and chosen")
        if (questionsAndAnswers.length === refNumber.current.length) setAllChosen(true)
    }
    
    const checkAnswers = () => {
        const informOfCorrectAnswers = qa.map((q,i) => {
            // let questions = [...q.question]
            let answers = [...q.incorrect_answers]
            answers.push(q.correct_answer)
            answers.sort()
            console.log("Chosen answers:",chosenAnswers,"actual answers:",decodeURIComponent(q.correct_answer))
            let educateAnswers = answers.map((a) => {

                // dammit. cannot compare bc refnumber.current[i].answer does not exist yet. Had to put it in a function and return result to state
                if (decodeURIComponent(a) === chosenAnswers[i].answer && chosenAnswers[i].answer === decodeURIComponent(q.correct_answer)) {
                    console.log("This is an answer?",decodeURIComponent(a),chosenAnswers[i])
                    return (<div key={a} className="answer-choice correct">
                        <span> {decodeURIComponent(a)} CORRECT!</span>
                    </div>)
                }
                if (decodeURIComponent(a) === chosenAnswers[i].answer && chosenAnswers[i].answer !== decodeURIComponent(q.correct_answer)) {
                    console.log("This is an answer?",decodeURIComponent(a),chosenAnswers[i])
                    return (<div key={a} className="answer-choice incorrect">
                        <span> {decodeURIComponent(a)} WRONGO!</span>
                    </div>)
                }
                if (decodeURIComponent(a) === decodeURIComponent(q.correct_answer) && chosenAnswers[i].answer !== decodeURIComponent(q.correct_answer)) {
                    console.log("This is an answer?",decodeURIComponent(a),chosenAnswers[i])
                    return (<div key={a} className="answer-choice actually">
                        <span> {decodeURIComponent(a)} ACHKCHUALLY</span>
                    </div>)
                }
                return (<div key={a} className="answer-choice">
                    <span> {decodeURIComponent(a)}</span>
                </div>)
            })
            return (<div className="trivia-answer-check" key={q.question}>
                <div className="question">{decodeURIComponent(q.question)}</div>
                <div className="answers">{educateAnswers}</div>
            </div>)
        })
        setResults(informOfCorrectAnswers)
    }
    
    const goAgain = () => {
        console.log("I wanna play another round mommy")
        setQuestionsAndAnswers([])
        newSetChosenAnswers([])
        setAllChosen(false)
        setCorrectAnswers([])
        setAmountOfCorrects(0)
        setHasAnswered(false)
        setResults('here we go')
        checkAnswers()
    }
    

    return (<>
    <div className="dashboard">
        Hello this is quest
        <button onClick={showState}>Show state</button>
        {hasAnswered ? 
            <span>You answered correctly to {amountOfCorrects} out of 5 questions.</span>
                :
            <span>You have answered {refNumber.current.length} questions</span>
        }
    </div>
        {hasAnswered ? 
        <>
        <div>{results}</div>
        <button onClick={goAgain}>AGAIN</button>
        <Link to="/">Choose a new category</Link>
        </>
        :
        <>
        <div className="trivia-container">
            {showQuestionsAndAnswers}
        </div>
        <div className="submit-container flex-row space-evenly">
            {allChosen ? 
                <button onClick={submitAnswers} className="trivia-submit">Submit answers</button>
                    : 
                <>Answer all q's first</>
            }
        </div>
        </>}
        
    </>)
}