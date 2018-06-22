import React, { Component } from 'react';
import logo from './logo.svg';
import './Profile.css';
import ChartSelect from './components/ChartSelect';
import Sales from './components/Sales';
import NowTrading from './components/NowTrading';
import Accounts from './components/Accounts';
import WalletInfo from './components/WalletInfo';
import WalletInfoChild from './components/WalletInfoChild';


import { Route } from 'react-router-dom';
import { Home, Auth } from './pages';
import HeaderContainer from './containers/Base/HeaderContainer';

import storage from './lib/storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './redux/modules/user';
import * as baseActions from './redux/modules/base';

import styled from 'styled-components';

class Profile extends Component {
  // initializeUserInfo = async () => {
  //   const loggedInfo = storage.get('loggedInfo'); // 로그인 정보 가져옴
  //   if (!loggedInfo) return; // 로그인 정보가 없다면 return.
  //
  //   const { UserActions } = this.props;
  //   UserActions.setLoggedInfo(loggedInfo);
  //   try {
  //     await UserActions.checkStatus();
  //   } catch (e) {
  //     storage.remove('loggedInfo');
  //     window.location.href = '/auth/login?expired';
  //   }
  // }

  render() {

    return (
      <div className="Profile">
        <div className="profile_title">
          Tass
        </div>
      </div>

    );
  }
}

export default Profile;
