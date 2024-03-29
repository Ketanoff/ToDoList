import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');
    
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    
    return editMode
        ? <TextField value={title}
                     margin='dense'
                     variant='outlined'
                     onBlur={activateViewMode}
                     autoFocus
                     onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>;
})
