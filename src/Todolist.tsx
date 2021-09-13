import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from './AppWithReducers';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    removeTodoList: (todoListId: string) => void
    
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist is called")
    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'),[props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'),[props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'),[props.changeFilter, props.id])
    const addTask = useCallback((title: string) => {props.addTask(title, props.id);},[props.addTask, props.id])
    const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle);};
    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }
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
                props.tasks.map(t => <Task
                task={t} removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
                todolistId={props.id} key={t.id}
                />)
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
})

