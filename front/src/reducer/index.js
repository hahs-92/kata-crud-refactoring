//actions types
import { actionTypes } from '../actions/actionTypes'


function reducer(state, action) {
    switch (action.type) {
        case actionTypes.SET_INITIAL_STATE:
            return {
                ...state,
                lists: action.payload
            }
        case actionTypes.SET_ITEM_TODO:
            return {
                ...state,
                itemTodo: action.payload
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionTypes.ADD_LIST:
            return {
                ...state,
                lists: [
                    ...state.lists,
                    action.payload
                ]
            }
        case actionTypes.DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list.id !== action.payload)
            }
        case actionTypes.ADD_TODO:
            return {
                ...state,
                lists: state.lists.map(list => list.id === action.payload.listId
                    ? {
                    ...list,
                    todos: [
                        ...list.todos,
                        action.payload.todo
                    ]
                    }
                    : list
                )
            }
        case actionTypes.EDIT_TODO:
            const listIndex = state.lists.findIndex(list => list.id === action.payload.listId)
            return {
                ...state,
                lists: [
                    ...state.lists,
                    state.lists[listIndex].todos = state.lists[listIndex].todos
                        .map(todo => todo.id === action.payload.todo.id ? action.payload.todo : todo)
                ]
            }
        case actionTypes.DELETE_TODO:
            const listIndex2 = state.lists.findIndex(list => list.id === action.payload.listId)
            return {
                ...state,
                lists: [
                    ...state.lists,
                    state.lists[listIndex2].todos = state.lists[listIndex2].todos
                        .filter(todo => todo.id !== action.payload.id)
                ]
            }
        case actionTypes.COMPLETED_TODO:
            const listIndex3 = state.lists.findIndex(list => list.id === action.payload.listId)
            return {
                ...state,
                lists: [
                    ...state.lists,
                    state.lists[listIndex3].todos = state.lists[listIndex3].todos
                        .map(todo => todo.id === action.payload.id
                            ? { ...todo, completed: !todo.completed }
                            : todo
                        )
                ]
            }

        default:
            return state
    }
}

export default reducer
