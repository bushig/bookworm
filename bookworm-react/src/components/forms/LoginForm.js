import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import Validator from 'validator'

import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => {
        console.log(e.target.value);
        this.setState({data: {...this.state.data, [e.target.name]: e.target.value}})
    };

    onSubmit = () =>{
        const errors = this.validate(this.state.data);
        console.log(errors);
        this.setState({errors});
        if(Object.keys(errors).length === 0 ){
            this.props.submit(this.state.data)
        }

    };

    validate = (data) => {
        let errors = {};
        if(!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if(!data.password) errors.password = "Cant be blank";
        return errors;
    };

    render(){
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!this.state.errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@example.com" value={this.state.data.email} onChange={this.onChange}/>
                    {this.state.errors.email && <InlineError text={this.state.errors.email}/>}
                </Form.Field>
                <Form.Field error={!!this.state.errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Make it secure" value={this.state.data.password} onChange={this.onChange}/>
                    {this.state.errors.password && <InlineError text={this.state.errors.password}/>}
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        )
    }
}

export default LoginForm;