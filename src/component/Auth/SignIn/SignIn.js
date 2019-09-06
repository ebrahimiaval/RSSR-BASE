import React, {Component} from 'react';
import ForgetPasswordForm from "./ForgetPasswordForm";
import SignInForm from "./SignInForm";
import {isSet} from "../../../setup/utility/checkSet";


class SignIn extends Component {
    state = {
        showSignInForm: true
    }

    toggleView = (showSignInForm) => this.setState({showSignInForm: showSignInForm});

    closeModal = () => {
        if (isSet(this.props.notify))
            this.props.notify.$modal.modal('hide');
    }

    render() {
        return (
            this.state.showSignInForm ?
                <SignInForm showForgetPasswordForm={() => this.toggleView(false)} closeModal={this.closeModal}/>
                :
                <ForgetPasswordForm showSignInForm={() => this.toggleView(true)} closeModal={this.closeModal}/>
        )
    }
}

export default SignIn;
