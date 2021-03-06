import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from '../../components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../redux/modules/auth';


import {isEmail, isLength, isAlphanumeric} from 'validator';

import debounce from 'lodash/debounce';

import * as userActions from '../../redux/modules/user';
import storage from '../../lib/storage';

import axios from 'axios';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state={
      registerInfo:
        {
          email: null,
          phoneNumber: null,
          userId: null,
          password: null,
        }
    }
  }


   setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'register',
            message
        });
    }

    //검증 작업
    validate = {
        email: (value) => {
            if(!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        phoneNumber: (value) => {
            if(!isLength(value, { min: 6 })) {
                this.setError('올바른 전화번호를 입력하세요.');
                return false;
            }
            this.setError(null);
            return true;
        },
        // userName: (value) => {
        //     if(!isAlphanumeric(value) || !isLength(value, { min:2, max: 15 })) {
        //         this.setError('올바르게 입력하세요.');
        //         return false;
        //     }
        //     return true;
        // },
        userId: (value) => {
            if(!isAlphanumeric(value) || !isLength(value, { min:4, max: 15 })) {
                this.setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if(!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 진행
            return true;
        },
        passwordConfirm: (value) => {
            if(this.props.form.get('password') !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null);
            return true;
        }
    }

    checkEmailExists = debounce(async (email) => {
       const { AuthActions } = this.props;
       try {
           await AuthActions.checkEmailExists(email);
           if(this.props.exists.get('email')) {
               this.setError('이미 존재하는 이메일입니다.');
           } else {
               this.setError(null);
           }
       } catch (e) {
           console.log(e);
       }
   }, 300)

   checkUserIdExists = debounce(async (userId) => {
       const { AuthActions } = this.props;
       try {
           await AuthActions.checkUserIdExists(userId);
           if(this.props.exists.get('userId')) {
               this.setError('이미 존재하는 아이디입니다.');
           } else {
               this.setError(null);
           }
       } catch (e) {
           console.log(e);
       }
   }, 300)

    handleChange = (e,i) => { //0:email,1:phone,2:id,3:pw
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });

        // 검증작업 진행
        const validation = this.validate[name](value);
        const crypto = require('crypto');
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

        // TODO: 이메일, 아이디 중복 확인
         // name 에 따라 이메일체크할지 아이디 체크 할지 결정
        const check = name === 'email' ? this.checkEmailExists : this.checkUserIdExists;
        check(value);
        if(i===0){
          let register=this.state.registerInfo;
          register.email=value;
          this.setState({registerInfo:register});
        }
        else if(i===1){
          let register=this.state.registerInfo;
          register.phone=value;
          this.setState({registerInfo:register});
        }else if(i===2){
          let register=this.state.registerInfo;
          register.id=value;
          this.setState({registerInfo:register});
        }else if(i===3){ 
          let register=this.state.registerInfo;
          register.password=crypto.createHash('sha512').update('value').digest('base64');
          this.setState({registerInfo:register});
        }
    }

    handleLocalRegister=()=>{
      let users=this.state.registerInfo;
      console.log(users);
      axios.post('/api/signup',users)
      .then(res=>{
        console.log(res);
        if(res.data.redirect==="/")
          window.location.href = '/auth/profile';
      })
      .catch(err=>console.log(err));
    }


    render() {
        const { error } = this.props;
        const { email, phoneNumber, /*userName,*/ userId, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange, handleLocalRegister } = this;

        return (
            <AuthContent title="회원가입">
                <InputWithLabel
                    label="이메일"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e)=>handleChange(e,0)}
                />
                <InputWithLabel
                    label="전화번호"
                    name="phoneNumber"
                    placeholder="전화번호"
                    value={phoneNumber}
                    onChange={(e)=>handleChange(e,1)}
                />
                <InputWithLabel
                    label="아이디"
                    name="userId"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e)=>handleChange(e,2)}
                />
                <InputWithLabel
                    label="비밀번호"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e)=>handleChange(e,3)}
                />
                <InputWithLabel
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                {
                  error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={ () => {
                  this.handleLocalRegister();
                  }
                }>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
        );
    }
}


export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        error: state.auth.getIn(['register', 'error']),
        exists: state.auth.getIn(['register', 'exists']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    }),

)(Register);
