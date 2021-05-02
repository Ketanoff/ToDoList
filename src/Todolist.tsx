import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './AppWithReducers';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import s from './App.module.css';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    removeTodoList: (todoListId: string) => void
    
}

export function Todolist (props: PropsType) {
    
    const onAllClickHandler = () => props.changeFilter(props.id, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');
    const addTask = (title: string) => {props.addTask(title, props.id);};
    const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle);};
    
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            {/*<button onClick={() => {props.removeTodoList(props.id)}}>Del</button>*/}
            <IconButton onClick={() => {props.removeTodoList(props.id);}}>
                <Delete fontSize='small'/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    };
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    };
                    
                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            color='primary'
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete fontSize='small'/>
                        </IconButton>
                    </div>;
                })
            }
        </div>
        <div>
            <Button
                // className={props.filter === 'all' ? 'active-filter' : ''}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                // className={props.filter === 'active' ? 'active-filter' : ''}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                color='secondary'
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                // className={props.filter === 'completed' ? 'active-filter' : ''}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                color='primary'
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>;
}

