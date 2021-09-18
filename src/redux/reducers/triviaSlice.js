const initialState = {
    questionsAnswered: [],
    questionsCorrectlyAnswered: [],
    roundsPlayed: 0
}

export default function triviaReducer(state = initialState, action) {
    let roundsPlayed = state.roundsPlayed
    switch (action.type){
        case 'trivia/answeredQuestions': {
            return {
                ...state,
                roundsPlayed: roundsPlayed + 1
            }
        }
        default: 
            return state
    }
}