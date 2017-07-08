import React,{Component} from 'react';
import "./TodoInput.css"


export default class TodoInput extends Component{
    
    submit(e){
        if(e.key==="Enter"){
            this.props.onSubmit(e.target.value)
        }
    }

    changeTitle(e){
        this.props.onChange(e.target.value)
    }

    render(){
        return(
            <div>
                <input type="text"
                className="TodoInput"
                value={this.props.content}
                onKeyPress={this.submit.bind(this)}
                onChange={this.changeTitle.bind(this)} />
            </div>
        )
    }
}