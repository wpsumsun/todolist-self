import React, { Component } from 'react';
import './App.css';
import 'normalize.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut} from './leanCloud';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:getCurrentUser() || {},
      newTodo:'',
      todoLists:[]
    }
  }
  componentDidUpdate(){
  
  }
  addTodo(title){
      this.state.todoLists.push({
        id:this.idMaker(),
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


idMaker(){
  let id=this.state.todoLists[this.state.todoLists.length-1].id || 0;
  id+=1
  return id
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
        <h1>{this.state.user.username||'我'}的待办
            {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button>:null}
        </h1>
        <div className="inputWrapper">
          <TodoInput
          content={this.state.newTodo}
          onSubmit={this.addTodo.bind(this)}
          onChange={this.ChangeTitle.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? 
        null:
        <UserDialog
         onSignUp={this.onSignUpOrSignIn.bind(this)}
         onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div> 
    )
  }

  onSignUpOrSignIn(user){
    let stateCopy=JSON.parse(JSON.stringify(this.state))
    stateCopy.user=user
    this.setState(stateCopy)

  }

  signOut(){
    signOut()
    let stateCopy=JSON.parse(JSON.stringify(this.state))
    stateCopy.user={}
    this.setState(stateCopy)
  }
  
}

export default App;


