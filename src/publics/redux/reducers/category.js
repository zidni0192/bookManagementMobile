const intialState = {
    categoryList : [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}
const category = (state = intialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: action.payload.data
            }
        default:
            return state
    }
}

export default category