import React,{Component} from 'react';
import './UserDialog.css';
import {signUp,signIn} from './leanCloud';

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp',
            formData:{
                username:'',
                password:''
            }
        }
    }

    signUp(e){
        e.preventDefault()
        let {username,password}=this.state.formData
        let success=(user)=>{
            this.props.onSignUp.call(null,user)
        }
        let error=(error)=>{
            alert(error)
        }
        signUp(username,password,success,error)
    }

    signIn(e){
        e.preventDefault()
        let {username,password}=this.state.formData
        let success=(user)=>{
            this.props.onSignIn.call(null,user)
        }
        let error=(error)=>{
            alert(error)
        }
        signIn(username,password,success,error)
    }

    changeFormData(key,e){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key]=e.target.value
        this.setState(stateCopy)
    }

    switch(e){
        this.setState({
            selected:e.target.getAttribute('data-status')
        })
    }
    render(){
        let signUpForm=(
            <form className="signUp" onSubmit={this.signUp.bind(this)}>
                 <div className="row">
                    <label>用户名</label>
                       <input type="text"
                        value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this,'username')} />
                  </div>
                  <div className="row">
                    <label>密码</label>
                    <input type="password"
                    value={this.state.formData.password} 
                    onChange={this.changeFormData.bind(this,'password')} />
                  </div>
                  <div className="row actions">
                     <button type="submit">注册</button>
                  </div>
            </form>
        )

        let signInForm=(
            <form className="signIn" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text"
                    value={this.state.formData.username}
                    onChange={this.changeFormData.bind(this,'username')} />
                </div>
                 <div className="row">
                    <label>密码</label>
                    <input type="password"
                    value={this.state.formData.password} 
                    onChange={this.changeFormData.bind(this,'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                </div>
            </form>
        )
        return(
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav onClick={this.switch.bind(this)}>
                        <span className={this.state.selected==="signUp"?"active":""} data-status="signUp">注册</span>
                        <span data-status="signIn" className={this.state.selected==="signIn"?"active":""}>登录</span>
                    </nav>
                    <div className="panes">
                        {this.state.selected==="signIn"?signInForm:signUpForm}
                    </div>
                </div>
            </div>
        )
    }
}