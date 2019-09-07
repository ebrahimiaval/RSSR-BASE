import React, {useState} from 'react';
import {connect} from "trim-redux";
import {LOADING_CLASS, regexp} from "../../../setup/constant";
import {formValidation} from "../../../setup/utility/formValidation";
import {axios} from "../../../setup/utility/axios";
import {api} from "../../../setup/api";
import {route} from "../../../setup/route";
import {toast} from "react-toastify";


function ForgetPasswordForm(props) {

    const
        [isLoading, setIsLoading] = useState(false),
        [email, setEmail] = useState(''),
        {localUser, showSignInForm} = props;





    function submitForgetPassword(e) {
        if (!formValidation(e))
            return false;

        setIsLoading(true);

        axios({
            url: api.forgetPassword,
            // method: 'POST',
            data: {
                "email": email,
                // server most be add token number to end of url and redirect to it
                "callback": window.location.origin + route.resetPassword('')
            }
        })
            .then(() => {
                // close the modal when launched from  modal
                props.closeModal();

                const message = (
                    <div>
                        ایمیل بازیابی ارسال شد.
                        <br/>
                        برای بازیابی بر روی لینک ارسال شده به ایمیل زیر کلیک نمایید.
                        <br/>
                        {email}
                        <br/>
                        در صورت عدم دریافت مجددا درخواست نمایید.
                    </div>
                );
                toast.success(message, {autoClose: false});
            })
            .catch((e) => {
                setIsLoading(false);

                if (e.status === 400)
                    toast.error('ایمیل معتبر نمی‌باشد!');
                else
                    toast.error('خطا. مجددا تلاش نمایید و در صورت تکرار با پشتیبانی تماس بگیرید.');
            });
    }





    return (
        <form className="forget-password-form"
              onSubmit={submitForgetPassword}
              noValidate>
            <div className="d-flex justify-content-between pb-5">
                <h5>بازیابی رمز عبور</h5>
                <a className="signin-toggle" onClick={() => showSignInForm()}>بازگشت</a>
            </div>
            <div className="form-group">
                <label>ایمیل خود را وارد نمایید</label>
                <input type="text"
                       className="form-control ltr-value"
                       name="forgetpassword"
                       pattern={regexp.email}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                <div className="invalid-feedback">آدرس ایمیل وارد شده معتبر نیست!</div>
            </div>
            <button className={`btn btn-block btn-primary ${(isLoading || !localUser.updated) ? LOADING_CLASS : ''} `}
                    disabled={isLoading || !localUser.updated}
                    type="submit">
                بازیابی
            </button>
        </form>
    )
}

export default connect(s => ({localUser: s.localUser}))(ForgetPasswordForm);