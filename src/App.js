import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      newTodo:'',
      todoLists:[]
    }
  }

  addTodo(title){
      this.state.todoLists.push({
        id:idMaker(),
        title:title,
        status:null,
        deleted:false
      })

      this.setState({
        newTodo:'',
        todoLists:this.state.todoLists
      })
  }

  ChangeTitle(title){
    this.setState({
      newTodo:title,
      todoLists:this.state.todoLists
    })
  }

  toggle(e,todo){
    todo.status=todo.status==="completed"?null:"completed"
    this.setState(this.state)
  }

  delete(todo){
    todo.deleted=true
    this.setState(this.state)
  }

  render(){
    let todos=this.state.todoLists.filter((item)=>!item.deleted).map((item)=>{
      return(
        <li  key={item.id}>
          <TodoItem todo={item}
           onToggle={this.toggle.bind(this)} 
           onDelete={this.delete.bind(this)} />
        </li>
      )
    })
    return(
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput
          content={this.state.newTodo}
          onSubmit={this.addTodo.bind(this)}
          onChange={this.ChangeTitle.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
      </div> 
    )
  }
  
}

export default App;

let id=0;
function idMaker(){
  id+=1
  return id
}
