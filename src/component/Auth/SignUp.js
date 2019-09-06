import React, {Component} from 'react';
import {connect} from "trim-redux";
import {withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {formValidation} from "../../setup/utility/formValidation";
import {regexp} from "../../setup/constant";
import {axios} from "../../setup/utility/axios";
import {api} from "../../setup/api";
import {isSet} from "../../setup/utility/checkSet";
import {signingIn} from "./action/signingIn";



class SignUp extends Component {
    state = {
        isLoading: false,
        username: '',
        password: ''
    }

    closeModal = () => {
        if (isSet(this.props.notify))
            this.props.notify.$modal.modal('hide');
    }

    submitSignUp = (e) => {
        if (!formValidation(e))
            return false;

        const {username, password} = this.state;

        this.setState({isLoading: true});

        axios({
            url: api.signup,
            method: 'POST',
            data: {
                email: username,
                password: password
            }
        })
            .then((response) => {
                // close modal when launched from modal (Notify modal)
                this.closeModal();

                // set token to localStorage if remember me checked and get user details
                signingIn(response.data.token, true)
                    .then(function () {
                        toast.success('ثبت نام با موفقیت انجام شد و وارد حساب شدید.');
                    });
            })
            .catch(() => {
                this.setState({isLoading: false});
                toast.error('خطا. مجددا تلاش نمایید و در صورت تکرار با پشتیبانی تماس بگیرید.');
            });
    }


    render() {
        const
            {localUser} = this.props,
            {isLoading} = this.state;

        return (

            <form
                className="signup-form"
                onSubmit={this.submitSignUp}
                noValidate>

                <div className="form-group">
                    <label>ایمیل</label>
                    <input type="text"
                           className="form-control ltr-value"
                           aria-describedby="emailHelp"
                           name="username"
                           pattern={regexp.email}
                           value={this.state.username}
                           onChange={(e) => this.setState({username: e.target.value})}
                           required/>
                    <div className="invalid-feedback">ایمیل معتبری درج نشده است!</div>
                </div>

                <div className="form-group">
                    <label>رمز عبور (حداقل ۸ کاراکتر)</label>
                    <input type="password"
                           name="password"
                           className="form-control ltr-value"
                           pattern={regexp.password}
                           value={this.state.password}
                           onChange={(e) => this.setState({password: e.target.value})}
                           required/>
                    <div className="invalid-feedback">رمز عبور باید بیش از ۸ کاراکتر باشد.</div>
                </div>

                <button type="submit"
                        className={`btn btn-block mt-7 ${(isLoading) ? 'loading-effect' : 'btn-primary'} `}
                        disabled={isLoading || !localUser.updated}>
                    ثبت نام
                </button>
            </form>
        );
    }
}

const mstp = (state) => ({
    localUser: state.localUser
})

export default withRouter(connect(mstp)(SignUp));
