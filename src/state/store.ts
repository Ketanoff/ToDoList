import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer/todolists-reducer';
import {tasksReducer} from './tasks-todolists-reducer/tasks-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks    : tasksReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;