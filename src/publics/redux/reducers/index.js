import {combineReducers} from 'redux'

import book from './book'
import category from './category'
import pinjam from './pinjam'
import user from './user'

const appReducer = combineReducers({
    book,
    category,
    pinjam,
    user
})


export default appReducer   