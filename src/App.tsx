import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from '@material-ui/core';
// import {Menu} from '@material-ui/icons';
// import s from './App.module.css';
//
// export type FilterValuesType = 'all' | 'active' | 'completed';
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function App () {
//
//     const todoListID1 = v1();
//     const todoListID2 = v1();
//
//     const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
//         {id: todoListID1, title: 'What to learn', filter: 'all'},
//         {id: todoListID2, title: 'What to buy', filter: 'all'}
//     ]);
//
//     const [tasks, setTasks] = useState<TasksStateType>({
//         [todoListID1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoListID2]: [
//             {id: v1(), title: 'Dog', isDone: true},
//             {id: v1(), title: 'Cat', isDone: true},
//             {id: v1(), title: 'Horse', isDone: false},
//             {id: v1(), title: 'Rabbit', isDone: false}
//         ]
//     });
//
//     // let [tasks, setTasks] = useState([
//     //     {id: v1(), title: 'HTML&CSS', isDone: true},
//     //     {id: v1(), title: 'JS', isDone: true},
//     //     {id: v1(), title: 'ReactJS', isDone: false},
//     //     {id: v1(), title: 'Rest API', isDone: false},
//     //     {id: v1(), title: 'GraphQL', isDone: false}
//     // ]);
//     // let [filter, setFilter] = useState<FilterValuesType>('all');
//
//
//     function removeTask (taskID: string, todoListID: string) {
//         const todoListTasks = tasks[todoListID];
//         tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID);
//         setTasks({...tasks});
//     }
//
//     function addTask (title: string, todoListID: string) {
//         const newTask: TaskType = {id: v1(), title: title, isDone: false};
//         // const todoListTasks = tasks[todolistID]
//         tasks[todoListID] = [newTask, ...tasks[todoListID]];
//         setTasks({...tasks});
//     }
//
//     function changeFilter (todolistID: string, newFilterValuesType: FilterValuesType) {
//         const todoList = todoLists.find(tl => tl.id === todolistID);
//         if (todoList) {
//             todoList.filter = newFilterValuesType;
//         }
//         setTodoLists([...todoLists]);
//     }
//
//     function changeTaskStatus (taskId: string, isDone: boolean, todoListID: string) {
//         const todoListTasks = tasks[todoListID];
//         const task: TaskType | undefined = todoListTasks.find(t => t.id === taskId);
//         if (task) {
//             task.isDone = isDone;
//             setTasks({...tasks});
//         }
//     }
//
//     function changeTaskTitle (taskId: string, newTitle: string, todoListID: string) {
//         const todoListTasks = tasks[todoListID];
//         const task: TaskType | undefined = todoListTasks.find(t => t.id === taskId);
//         if (task) {
//             task.title = newTitle;
//             setTasks({...tasks});
//         }
//     }
//
//     function removeTodoList (todoListID: string) {
//         const filteredTodoLists = todoLists.filter(tl => tl.id !== todoListID);
//         // setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
//         setTodoLists(filteredTodoLists);
//         delete tasks[todoListID];
//         setTasks({...tasks});
//     }
//
//     function changeTodolistTitle (id: string, newTitle: string) {
//         const todolist = todoLists.find(tl => tl.id === id);
//         if (todolist) {
//             todolist.title = newTitle;
//             setTodoLists([...todoLists]);
//         }
//     }
//
//     // function taskFilter () {
//     //     let tasksForTodolist = tasks;
//     //     if (filter === 'active') {
//     //         tasksForTodolist = tasks.filter(t => t.isDone === false);
//     //     }
//     //     if (filter === 'completed') {
//     //         tasksForTodolist = tasks.filter(t => t.isDone === true);
//     //     }
//     //     return tasksForTodolist
//     // }
//
//     function addTodoList (title: string) {
//         let todoList: TodolistType = {
//             id    : v1(),
//             filter: 'all',
//             title : title
//         };
//         setTodoLists([todoList, ...todoLists]);
//         setTasks({
//             ...tasks,
//             [todoList.id]: []
//         });
//     }
//
//     return (
//         <div>
//             {/*<Paper style={{padding: '10px'}}>*/}
//             <AppBar position='static'>
//                 <Toolbar className={s.appBar}>
//                     <IconButton edge='start' color='inherit' aria-label='menu'>
//                         <Menu/>
//                     </IconButton>
//                     <Typography className={s.title} variant='h6'>
//                         News
//                     </Typography>
//                     <Button color='inherit'>login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todoLists.map(tl => {
//                         let tasksForTodolist = tasks[tl.id];
//                         if (tl.filter === 'active') {
//                             tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
//                         }
//                         if (tl.filter === 'completed') {
//                             tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
//                         }
//                         return <Grid item>
//                             <Paper style={{padding: '10px'}}>
//                                 <Todolist
//                                     key={tl.id}
//                                     id={tl.id}
//                                     title={tl.title}
//                                     tasks={tasksForTodolist}
//                                     filter={tl.filter}
//                                     removeTask={removeTask}
//                                     changeFilter={changeFilter}
//                                     addTask={addTask}
//                                     changeTaskStatus={changeTaskStatus}
//                                     changeTaskTitle={changeTaskTitle}
//                                     changeTodolistTitle={changeTodolistTitle}
//                                     removeTodoList={removeTodoList}
//                                 />
//                             </Paper>
//                         </Grid>;
//                     })}
//                 </Grid>
//             </Container>
//             {/*</Paper>*/}
//         </div>
//     );
// }

// export default App;
