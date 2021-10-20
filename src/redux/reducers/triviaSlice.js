const initialState = {
    questionsAnswered: 0,
    questionsCorrectlyAnswered: 0,
    roundsPlayed: 0,
    categoriesPlayed: new Set(),
    perfectRounds: 0,
}

export default function triviaReducer(state = initialState, action) {
    const roundsPlayed = state.roundsPlayed
    const questionsAnswered = state.questionsAnswered
    const questionsCorrectlyAnswered = state.questionsCorrectlyAnswered
    const categoriesPlayed = state.categoriesPlayed
    const perfectRounds = state.perfectRounds
    switch (action.type){
        case 'trivia/answeredQuestions': {
            // console.log(action.payload,state,"in triviaSlice")
            return {
                ...state,
                roundsPlayed: roundsPlayed + 1,
                questionsAnswered: questionsAnswered + action.payload.questionsAnswered,
                questionsCorrectlyAnswered: questionsCorrectlyAnswered + action.payload.questionsCorrectlyAnswered,
                categoriesPlayed: categoriesPlayed.add(action.payload.categoriesPlayed),
                perfectRounds: perfectRounds + action.payload.perfectRounds
            }
        }
        default: 
            return state
    }
}