

const userReducer = (state, action) => {
    switch (action.type) {
        case 'AUTH':
            return {...action.payload}
        case 'UN_AUTH':
            return {id: null, username: null, email: null}
        default:
        return state
    }
}
const chatReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {...action.payload}
        case 'REMOVE':
            return {id: null, receiver: null, receiverId: null}
        default:
        return state
    }
 }


const msgReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...action.payload]
        case 'REMOVE':
            return []
        default:
        return state
    }
 }

export {userReducer, chatReducer, msgReducer}