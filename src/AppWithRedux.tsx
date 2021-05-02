import React from 'react';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import s from './App.module.css';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-todolists-reducer/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

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

function AppWithRedux () {
    
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    
    function removeTask (id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId);
        dispatch(action);
    }
    
    function addTask (title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId));
    }
    
    function changeFilter (todolistId: string, newFilterValuesType: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, newFilterValuesType));
    }
    
    function changeTaskStatus (taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    }
    
    function changeTaskTitle (taskId: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
    }
    
    function changeTodolistTitle (id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle));
    }
    
    function removeTodoList (todoListId: string) {
        const action = removeTodolistAC(todoListId);
        dispatch(action);
    }
    
    function addTodoList (title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
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
                    {todolists.map(tl => {
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

export default AppWithRedux;
