const intialState = {
    pinjamList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}
const book = (state = intialState, action) => {
    switch (action.type) {
        case 'GET_PINJAMS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_PINJAMS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_PINJAMS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                pinjamList: action.payload.data
            }
        case 'POST_PINJAM_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_PINJAM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_PINJAM_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                pinjamList: action.payload.data
            }
        case 'GET_PINJAM_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_PINJAM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_PINJAM_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                pinjamList: action.payload.data
            }
        case 'PATCH_PINJAM_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'PATCH_PINJAM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'PATCH_PINJAM_FULFILLED':
            if (action.payload.data.result && action.payload.data.result.returned_at ) {
                const find = state.pinjamList.result.find(item => Number(item.id) === Number(action.payload.data.result[0].id))
                state.pinjamList.result[state.pinjamList.result.indexOf(find)] = action.payload.data.result[0]
            }
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }

        default:
            return state
    }
}

export default book