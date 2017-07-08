import React,{Component} from 'react';
import './TodoItem.css';

export default class TodoItem extends Component{
    
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
    delete(e){
        this.props.onDelete(this.props.todo)
    }

    render(){
        return(
            <div className="TodoItem">
            <input type="checkbox"
            checked={this.props.todo.status==="completed"} 
            onChange={this.toggle.bind(this)} />
            <span className="title">{this.props.todo.title}</span>
            <button onClick={this.delete.bind(this)}>删除</button>
            </div> 
        ) 
    }
} 