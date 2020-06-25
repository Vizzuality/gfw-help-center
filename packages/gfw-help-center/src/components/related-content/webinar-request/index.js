import React from 'react';
import { styled } from 'frontity';

import RequestWebinarForm from '../../forms/request-webinar';
import { Divider } from '../styles';

const WebinarRequest = () => (
  <FormWrapper>
    <Divider />
    <RequestWebinarForm />
  </FormWrapper>
);

const FormWrapper = styled.div`
  margin: 50px 0 100px;
`

export default WebinarRequest;
