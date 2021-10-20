import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { emptyCategory } from "../redux/actions"

export const Quest = () => {
    const dispatch = useDispatch()
    // const url = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple&encode=url3986'
    const url = useSelector(state => `https://opentdb.com/api.php?amount=5&category=${state.setup.category}&type=multiple&encode=url3986`)
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])
    const [chosenAnswers, setChosenAnswers] = useState([])
    const [allChosen, setAllChosen] = useState(false)
    const [amountOfCorrects, setAmountOfCorrects] = useState(0)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [results, setResults] = useState('here we go')
    // const playedRounds = useSelector(state => state.trivia)
    const playedCategory = useSelector(state => state.setup.category)

    useEffect(() => {
        axios.get(url)
            .then(res => setQuestionsAndAnswers(res.data.results))
            .catch(err => console.log(err))
    },[results, url])

    const showState = () => {
        // console.log(playedRounds)
        console.log(questionsAndAnswers)
        console.log(refNumber.current,"chosen stuff")
        // console.log(url)
        checkAnswerAmount()
    }

    const refNumber = useRef(chosenAnswers)
    const newSetChosenAnswers = x => {
        refNumber.current = x
        setChosenAnswers(x)
    }

    const handleChange = event => {
        if (chosenAnswers.some(element => element.question === event.target.id)){
            let index = chosenAnswers.findIndex(x => x.question === event.target.id)
            let chosenAnswerDuplicate = [...chosenAnswers]
            chosenAnswerDuplicate.splice(index,1,{question:event.target.id,answer:event.target.value})
            newSetChosenAnswers(chosenAnswerDuplicate)
            showState()
            return
        }
        newSetChosenAnswers([...chosenAnswers,{question:event.target.id,answer:event.target.value}])
        showState()
    }

    const qa = [...questionsAndAnswers]
    qa.sort((a,b) => {
        let first = a.question.toLowerCase()
        let second = b.question.toLowerCase()
        if (first < second) {return -1}
        if (first > second) {return 1}
        return 0
    })

    // arrange questions alphabetically to start with
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
        console.log(chosenAnswers, "sorted answers?")

        let sortedAnswers = chosenAnswers.sort((a,b) => {
            let qa = a.question.toLowerCase()
            let qb = b.question.toLowerCase()
            if (qa < qb) {return -1}
            if (qa > qb) {return 1}
            return 0
        })
        
        // console.log(chosenAnswers, "sorted answers?")
        let correctAnswersNotState = []
        let givenAnswers = []
        let correctAmount = 0
        
        console.log(sortedAnswers,qa)
        qa.map(q => correctAnswersNotState.push(decodeURIComponent(q.correct_answer)))
        sortedAnswers.map(c => givenAnswers.push(c.answer))
        for (let i = 0; i < givenAnswers.length; i++){
            if (correctAnswersNotState[i] === givenAnswers[i]) correctAmount++
        }
        setAmountOfCorrects(correctAmount)
        setHasAnswered(true)
        checkAnswers()
        if (amountOfCorrects === 5) dispatch({type:'trivia/answeredQuestions', payload: {questionsAnswered: 5,questionsCorrectlyAnswered: correctAmount, categoriesPlayed: playedCategory, perfectRounds: 1}})
        else dispatch({type:'trivia/answeredQuestions', payload: {questionsAnswered: 5,questionsCorrectlyAnswered: correctAmount, categoriesPlayed: playedCategory, perfectRounds: 0}})

        window.scrollTo(0, 0)
    }

    const checkAnswerAmount = () => {
        // console.log(questionsAndAnswers.length, chosenAnswers.length,"lengths here, qa and chosen")
        // console.log(playedRounds)
        if (questionsAndAnswers.length === refNumber.current.length) setAllChosen(true)
    }
    
    const checkAnswers = () => {
        const informOfCorrectAnswers = qa.map((q,i) => {
            let answers = [...q.incorrect_answers]
            answers.push(q.correct_answer)
            answers.sort()
            // console.log("Chosen answers:",chosenAnswers,"actual answers:",decodeURIComponent(q.correct_answer))
            let educateAnswers = answers.map((a) => {
                if (decodeURIComponent(a) === chosenAnswers[i].answer && chosenAnswers[i].answer === decodeURIComponent(q.correct_answer)) {
                    // console.log("This is an answer?",decodeURIComponent(a),chosenAnswers[i])
                    return (<div key={a} className="answer-choice correct">
                        <span> {decodeURIComponent(a)}</span>
                    </div>)
                }
                if (decodeURIComponent(a) === chosenAnswers[i].answer && chosenAnswers[i].answer !== decodeURIComponent(q.correct_answer)) {
                    // console.log("This is an answer?",decodeURIComponent(a),chosenAnswers[i])
                    return (<div key={a} className="answer-choice incorrect">
                        <span> {decodeURIComponent(a)}</span>
                    </div>)
                }
                if (decodeURIComponent(a) === decodeURIComponent(q.correct_answer) && chosenAnswers[i].answer !== decodeURIComponent(q.correct_answer)) {
                    // console.log("This is an answer?",decodeURIComponent(a),chosenAnswers[i])
                    return (<div key={a} className="answer-choice actually">
                        <span> {decodeURIComponent(a)}</span>
                    </div>)
                }
                return (<div key={a} className="answer-choice">
                    <span> {decodeURIComponent(a)}</span>
                </div>)
            })
            return (<div className="trivia-answer-check trivia-snippet" key={q.question}>
                <div className="question">{decodeURIComponent(q.question)}</div>
                <div className="answers">{educateAnswers}</div>
            </div>)
        })
        setResults(informOfCorrectAnswers)
    }
    
    const goAgain = () => {
        // console.log("I wanna play another round mommy")
        setQuestionsAndAnswers([])
        newSetChosenAnswers([])
        setAllChosen(false)
        // setCorrectAnswers([])
        setAmountOfCorrects(0)
        setHasAnswered(false)
        setResults('here we go')
        checkAnswers()
    }

    const resetCategory = () => {
        dispatch(emptyCategory)
    }
    

    return (<>
    <div className="dashboard">
        {/* <button onClick={showState}>Show state</button> */}
            {hasAnswered ? <>
                <div>{amountOfCorrects} out of 5 correct.</div>
                <div className="new-game-options flex-row">
                    <button onClick={goAgain}>PLAY AGAIN</button>
                    <Link to="/"><button className="undesirable" onClick={resetCategory}>New category</button></Link>
                </div>
                
                </>
                    :
                <>    
                <span className="question-amount">You have answered {refNumber.current.length} questions</span>
                </>
            }
    </div>
        {hasAnswered ? <>
            <div className="trivia-container">{results}</div>
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