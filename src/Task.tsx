import {TaskType} from './AppWithReducers';
import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';

type TaskPropsType = {
    todolistId: string
    task: TaskType
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId),
        [props.removeTask, props.task.id, props.todolistId]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    },[props.changeTaskStatus, props.task.id, props.todolistId]);
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.changeTaskTitle, props.todolistId, props.task.id]);
    
    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            color='primary'
            onChange={onChangeHandler}
            checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete fontSize='small'/>
        </IconButton>
    </div>;
    
});