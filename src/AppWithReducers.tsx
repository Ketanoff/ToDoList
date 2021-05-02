import React, {useReducer} from 'react';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import s from './App.module.css';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './state/todolists-reducer/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-todolists-reducer/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers () {
    
    const todoListID1 = v1();
    const todoListID2 = v1();
    
    const [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ]);
    
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Dog', isDone: true},
            {id: v1(), title: 'Cat', isDone: true},
            {id: v1(), title: 'Horse', isDone: false},
            {id: v1(), title: 'Rabbit', isDone: false}
        ]
    });
    
    function removeTask (id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action);
    }
    
    function addTask (title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId));
    }
    
    function changeFilter (todolistId: string, newFilterValuesType: FilterValuesType) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, newFilterValuesType));
    }
    
    function changeTaskStatus (taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todoListId));
    }
    
    function changeTaskTitle (taskId: string, newTitle: string, todoListId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todoListId));
    }
    
    function changeTodolistTitle (id: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle));
    }
    
    function removeTodoList (todoListId: string) {
        const action = removeTodolistAC(todoListId);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }
    
    function addTodoList (title: string) {
        const action = addTodolistAC(title);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    }
    
    return (
        <div>
            {/*<Paper style={{padding: '10px'}}>*/}
            <AppBar position='static'>
                <Toolbar className={s.appBar}>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography className={s.title} variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;
                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    filter={tl.filter}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    removeTodoList={removeTodoList}
                                />
                            </Paper>
                        </Grid>;
                    })}
                </Grid>
            </Container>
            {/*</Paper>*/}
        </div>
    );
}

export default AppWithReducers;
