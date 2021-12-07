import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todoListReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodoList: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodoList, ...state]
        case "CHANGE_FILTER":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.id)
        default:
            return state
    }
}
type ActionType = AddTodolistAT | ChangeFilterAT | ChangeTodolistTitleAT | RemoveTodolistAT
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
type ChangeFilterAT = ReturnType<typeof changeFilterAC>
type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title,
            todolistId: v1()
        }
    } as const
}
export const changeFilterAC = (filter: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE_FILTER",
        payload: {
            filter,
            todolistId
        }
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,
            title
        }
    } as const
}
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id
        }
    } as const
}