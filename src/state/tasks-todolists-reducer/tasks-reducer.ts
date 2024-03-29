import {TasksStateType, TaskType, TodolistType} from '../../AppWithReducers';
import {v1} from 'uuid';
import {AddTodolistTitleActionType, RemoveTodolistActionType, todoListId1, todoListId2} from '../todolists-reducer/todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistTitleActionType | RemoveTodolistActionType

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: 'Dog', isDone: true},
        {id: v1(), title: 'Cat', isDone: true},
        {id: v1(), title: 'Horse', isDone: false},
        {id: v1(), title: 'Rabbit', isDone: false}
    ]
};


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            // stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]]
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.taskId
            ? {...t, isDone: action.isDone} : t)
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            const tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, title: action.title} : t)
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId};
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    
    return {type: 'ADD-TASK', title, todolistId};
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId};
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId};
};