import React from 'react';
// import PropTypes from 'prop-types';

import ProLogo from 'assets/images/GFW_PRO-logo.png';

import {
  Form,
  Submit,
  Input,
  //   validations,
  //   Loader,
} from 'gfw-components';

import {
  LoginWrapper,
  LogoContainer,
  LoginContainer,
  LoginTitle,
  RequestAccountTitle,
  RequestAccountBtn,
} from './styles';

const handleSubmit = (props) => {
  fetch('/help/api/pro', {
    method: 'POST',
    body: JSON.stringify(props),
  })
    .then((r) => r.json())
    .then((response) => {
      if (response.pro) {
        window.location.reload();
      }
      // TODO: Error handling
    });
};

const ProLogin = () => (
  <LoginWrapper>
    <LogoContainer>
      <img src={ProLogo} alt="GFW Pro" />
    </LogoContainer>
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        {(
          { handleSubmit } // eslint-disable-line
        ) => (
          <form onSubmit={handleSubmit}>
            <LoginTitle>Log in to GFW Pro to continue</LoginTitle>
            <Input name="username" label="Username" required />
            <Input name="password" label="Password" type="password" required />
            <Submit>Login</Submit>
          </form>
        )}
      </Form>
      <RequestAccountTitle>
        <span>Don&apos;t have an account?</span>
      </RequestAccountTitle>
      <RequestAccountBtn
        href="https://pro.globalforestwatch.org/account"
        target="__BLANK"
        rel="noreferrer"
      >
        Request an account
      </RequestAccountBtn>
    </LoginContainer>
  </LoginWrapper>
);

ProLogin.propTypes = {};

export default ProLogin;
