import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ReactHtmlParser from 'react-html-parser';

import { Row, Column, H4, theme } from 'gfw-components';
import SimpleCard from '../card-simple';

const Footer = ({ tools, openContactUsModal }) => {
  const support = tools?.find((t) => t.slug === 'community-forum');
  const contactUs = tools?.find((t) => t.slug === 'contact-us');

  return (
    <Row>
      <Column>
        <Title>Get support</Title>
      </Column>
      <Column
        width={[1, 1 / 2]}
        css={css`
          margin-bottom: 30px;
        `}
      >
        <a
          href={support?.acf?.alt_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleCard
            {...support}
            title={support?.title?.rendered}
            text={ReactHtmlParser(support?.excerpt?.rendered)}
          />
        </a>
      </Column>
      <Column
        width={[1, 1 / 2]}
        css={css`
          margin-bottom: 30px;
        `}
      >
        <button
          css={css`
            text-align: left;
            padding: 0;
            width: 100%;
          `}
          onClick={openContactUsModal}
        >
          <SimpleCard
            {...contactUs}
            title={contactUs?.title?.rendered}
            text={ReactHtmlParser(contactUs?.excerpt?.rendered)}
          />
        </button>
      </Column>
    </Row>
  );
};

const Title = styled(H4)`
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    margin-bottom: 30px;
  }
`;

Footer.propTypes = {
  tools: PropTypes.array,
  openContactUsModal: PropTypes.func,
};

export default Footer;
