import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox, Delete} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log('AddItemForm is called')
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    };
    return <div>
        <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label='Title'
                   helperText={error}
                   error={!!error}
            // className={error ? 'error' : ''}
        />
        <IconButton color='primary' onClick={addItem}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className='error-message'>{error}</div>}*/}
    </div>;
})
