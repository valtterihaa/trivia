const initialState = {
    category: 0,
    boolean: false,
    difficulty: null,
    amount: 5
}

export default function setupReducer(state = initialState, action) {
    switch (action.type){
        case 'triviaSetup/choseCategory': {
            console.log("does this even work here",action.payload)
            return {
                ...state,
                category: action.payload
            }
        }
        case 'triviaSetup/toggledBoolean': {
            return {
                ...state,
                boolean: action.payload.boolean
            }
        }
        case 'triviaSetup/choseDifficulty': {
            return {
                ...state,
                difficulty: action.payload.difficulty
            }
        }
        case 'triviaSetup/choseAmount': {
            return {
                ...state,
                amount: action.payload.amount
            }
        }
        default: return state
    }
}