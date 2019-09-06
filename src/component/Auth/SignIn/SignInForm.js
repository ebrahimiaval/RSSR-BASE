import React, {Component} from 'react';
import {toast} from "react-toastify";
import {formValidation} from "../../../setup/utility/formValidation";
import {axios} from "../../../setup/utility/axios";
import {api} from "../../../setup/api";
import {signingIn} from "../action/signingIn";
import {LOADING_CLASS, regexp} from "../../../setup/constant";
import {random} from "../../../setup/utility/random";
import {connect} from "trim-redux";

class SignInForm extends Component {
    state = {
        isLoading: false,
        userName: '',
        rememberMe: true,
        password: '',
    }





    submitSignIn = (e) => {
        if (!formValidation(e))
            return false;

        const {userName, password, rememberMe} = this.state;

        this.setState({isLoading: true});

        axios({
            url: api.signin,
            method: 'POST',
            data: {email: userName, password: password}
        })
            .then((response) => {
                // close the modal when launched from  modal
                this.props.closeModal();

                // set token to localStorage if remember me checked and get user details
                signingIn(response.data.token, rememberMe)
                    .then(function () {
                        toast.success('با موفقیت وارد حساب شدید.');
                    });
            })
            .catch(() => {
                this.setState({isLoading: false});
                toast.error('نام کاربری یا رمز عبور اشتباه است!');
            });
    }





    render() {
        const
            {localUser, showForgetPasswordForm} = this.props,
            {isLoading, userName, password, rememberMe} = this.state,
            readmeId = "remmber-me-" + random(1000); // fix confilict in Parallel usage

        return (
            <form className="signin-form"
                  onSubmit={this.submitSignIn}
                  noValidate>

                <div className="form-group">
                    <label>ایمیل</label>
                    <input type="text"
                           className="form-control ltr-value"
                           name="username"
                           pattern={regexp.email}
                           value={userName}
                           onChange={(e) => this.setState({userName: e.target.value})}
                           required/>
                    <div className="invalid-feedback">ایمیل معتبری درج نشده است!</div>
                </div>

                <div className="form-group">
                    <label>رمز عبور</label>
                    <input type="password"
                           name="password"
                           className="form-control"
                           value={password}
                           pattern={regexp.password}
                           onChange={(e) => this.setState({password: e.target.value})}
                           required/>
                    <div className="invalid-feedback">رمز عبور معتبر نیست! باید بیش از 8 کاراکتر باشد.</div>
                </div>

                <div className="d-flex justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox"
                               name="rememberme"
                               className="custom-control-input"
                               id={readmeId}
                               checked={rememberMe}
                               onChange={(e) => this.setState({rememberMe: e.target.checked})}
                        />
                        <label className="custom-control-label" htmlFor={readmeId}>مرا به خاطر بسپار</label>
                    </div>

                    <a onClick={() => showForgetPasswordForm()}>
                        <span>فراموشی رمز عبور</span>
                        <i className="icon-angle-right"></i>
                    </a>
                </div>

                <button className={`btn btn-block btn-primary mt-3  ${(isLoading || !localUser.updated) ? LOADING_CLASS : ''} `}
                        disabled={isLoading || !localUser.updated}
                        type="submit">
                    ورود
                </button>
            </form>
        );
    }
}

export default connect(s => ({localUser: s.localUser}))(SignInForm);