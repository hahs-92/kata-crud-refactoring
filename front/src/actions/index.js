//actionsTypes
import { actionTypes } from "./actionTypes"


export const addList = payload => ({
    type: actionTypes.ADD_LIST,
    payload: payload
})

export const deleteList = payload => ({
    type: actionTypes.DELETE_LIST,
    payload: payload
})

export const addTodo = payload => ({
    type: actionTypes.ADD_TODO,
    payload: payload
})

export const editTodo = payload => ({
    type: actionTypes.EDIT_TODO,
    payload: payload
})

export const deleteTodo = payload => ({
    type: actionTypes.DELETE_TODO,
    payload: payload
})

export const CompletedTodo = payload => ({
    type: actionTypes.COMPLETED_TODO,
    payload: payload
})

