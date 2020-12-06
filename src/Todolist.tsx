import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    removeTodoList: (todoListID: string) => void
    
}

export function Todolist (props: PropsType) {
    
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const addTask = (title: string) => {props.addTask(title, props.id)}
    const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}
    
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            {/*<button onClick={() => {props.removeTodoList(props.id)}}>Del</button>*/}
            <IconButton onClick={() => {props.removeTodoList(props.id)}}>
                <Delete fontSize='small'/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    // const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }
                    
                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            color='primary'
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={() => {props.removeTask(t.id, props.id)}}>
                            <Delete fontSize='small'/>
                        </IconButton>
                    </div>
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
    </div>
}

