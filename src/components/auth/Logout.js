import React, {Component} from 'react';
import AuthService from '../../services/auth/auth-service';
import {Redirect} from 'react-router-dom';
export class Logout extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    eraseLocalStorage() {
        localStorage.clear();
    }
    render() 
    {
        this
            .eraseLocalStorage()
        this
            .service
            .logout()
            .then((response) => {
                this
                    .props
                    .callback(null);
                    this
                    .props
                    .reset();
                    
            })
            .catch((error) => console.log(error));
            return <Redirect to={'/'}/>;
            
    }
}
export default Logout;
