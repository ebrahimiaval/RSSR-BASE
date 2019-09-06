import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {axios} from "../../setup/utility/axios";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {formValidation} from "../../setup/utility/formValidation";
import {regexp} from "../../setup/constant";




class ResetPassword extends Component {

    state = {
        viewMod: 'loading', // loading || form || error
        newpassword: '',
        repassword: ''
    }


    componentDidMount() {
        axios({
            url: api.resetPassword.trust,
            type: 'POST',
            data: {
                token: this.props.match.params.token
            }
        })
        //--------------------------------------------------
            .then(() => {
                this.setState({viewMod: 'form'});
            })
            .catch((e) => {
                if (e.status === 404)
                    this.setState({viewMod: 'error'});
                else
                    toast.error('خطا: ارتباط خود را چک کنید و مجددا امتحان نمایید.');
            });
    }




    submitForm(e) {
        if (!formValidation(e))
            return false;

        axios({
            url: api.resetPassword.submit,
            type: 'POST',
            data: {
                password: this.state.newpassword,
                token: this.props.match.params.token
            }
        })
            .then(() => {
                toast.success('پسورد با موفقیت تغییر کرد.');
                this.props.history.replace(route.home);
            })
            .catch(() => {
                toast.error('خطا: ارتباط خود را چک کنید و مجددا امتحان نمایید.');
            });
    }


    render() {
        const {newpassword, repassword, viewMod} = this.state;

        return (
            <div id="rsp" className="container-fluid">
                <div className="row">
                    <div className="forget-password-wrap col-md-10 offset-md-7 pt-5">
                        <h3 className="mb-5">تغییر رمز عبور</h3>
                        {
                            (viewMod === 'form') ? (
                                <form onSubmit={this.submitForm.bind(this)}
                                      noValidate>

                                    <div className="form-group">
                                        <label>رمز عبور جدید</label>
                                        <input name="newPassword"
                                               className="form-control"
                                               type='password'
                                               pattern={regexp.password}
                                               value={newpassword}
                                               onChange={(e) => this.setState({newpassword: e.target.value})}
                                               required/>
                                        <div className="invalid-feedback">رمز عبور باید حداقل 8 کاراکتر باشد.</div>
                                    </div>

                                    <div className="form-group">
                                        <label>تکرار رمز عبور جدید</label>
                                        <input name="renewPassword"
                                               className="form-control"
                                               type='password'
                                               pattern={`^${newpassword}$`}
                                               value={repassword}
                                               onChange={(e) => this.setState({repassword: e.target.value})}
                                               required/>
                                        <div className="invalid-feedback">تکرار رمز عبور باید مشابه رمز عبور باشد.</div>
                                    </div>

                                    <button className="btn btn-primary mt-4" type="submit">ثبت</button>
                                </form>
                            ) : (
                                viewMod === 'loading' ?
                                    <strong className="animated flash">اعتبار سنجی. لطفا صبر کنید...</strong>
                                    :
                                    <strong>توکن معتبر نیست!</strong>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ResetPassword);
