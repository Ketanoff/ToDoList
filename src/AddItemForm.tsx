import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox, Delete} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm (props: AddItemFormPropsType) {
    
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return <div>
        <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label='Title'
                   helperText={error}
                   error={!!error}
            // className={error ? 'error' : ''}
        />
        <IconButton color='primary' onClick={addTask}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className='error-message'>{error}</div>}*/}
    </div>
}
