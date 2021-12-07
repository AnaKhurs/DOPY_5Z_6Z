import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: {...state[action.payload.todolistId].filter(t => t.id !== action.payload.id)}
            }
        case "ADD-TASK":
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id === action.payload.id ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id === action.payload.id ? {
                        ...t,
                        title: action.payload.newTitle
                    }
                    : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.id];
            return copyState
        default:
            return state
    }
}
type ActionType = RemoveTaskAT | AddTaskAT | ChangeStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT
type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeStatusAT = ReturnType<typeof changeStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id,
            todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistId
        }
    } as const
}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            id,
            newTitle,
            todolistId
        }
    } as const
}