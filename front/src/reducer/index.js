//actions types
import { actionTypes } from '../actions/actionTypes'


function reducer(state, action) {
    switch (action.type) {
        case actionTypes.SET_INITIAL_STATE:
            console.log("initaal")
            return {
                ...state,
                lists: action.payload
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
            console.log("add list")
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
            const listIndex = state.lists.findIndex(l => l.id === action.payload.listId)
            const todoIndex = state.lists[listIndex].todos.findIndex(t => t.id === action.payload.todo.id)
            return {
                ...state,
                lists: [
                    ...state.lists.map(l => {
                        if(l.id === action.payload.listId) {

                            l.todos[todoIndex] = {
                                ...action.payload.todo
                            }
                        }
                        return l
                    })
                ]
            }
        case actionTypes.DELETE_TODO:
            const listIndex2 = state.lists.findIndex(l => l.id === action.payload.listId)
            const filteredTodos = state.lists[listIndex2].todos
                .filter(t => t.id !== action.payload.id)
            return {
                ...state,
                lists: [
                    ...state.lists.map(l => {
                        if(l.id === action.payload.listId) {
                            l.todos = filteredTodos
                        }

                        return l
                    })
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
