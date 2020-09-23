import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

import {
  GlobalStyles,
  Loader,
  Header,
  Footer,
  ContactUsModal,
} from 'gfw-components';

import { initAnalytics, handlePageTrack } from 'analytics';

import ErrorPage from 'layouts/error';
import HelpFooter from 'components/footer';
import PreviewBanner from 'components/preview-banner';

const renderPage = (isError, statusCode, children, setOpen, preview) => (
  <>
    {isError ? (
      <PageWrapper>
        <ErrorPage statusCode={statusCode || 404} />
      </PageWrapper>
    ) : (
      <PageWrapper>
        {preview && <PreviewBanner />}
        {children}
        <HelpFooterWrapper>
          <HelpFooter openContactUsModal={() => setOpen(true)} />
        </HelpFooterWrapper>
      </PageWrapper>
    )}
  </>
);

export default function Layout({
  children,
  metaTags,
  isError,
  statusCode,
  preview,
  noIndex,
}) {
  const [open, setOpen] = useState(false);
  const { isFallback, asPath } = useRouter();

  useEffect(() => {
    if (!window.ANALYTICS_INITIALIZED) {
      initAnalytics();
      window.ANALYTICS_INITIALIZED = true;
    }
    handlePageTrack();
  }, [asPath]);

  return (
    <>
      <Head>
        <meta name="author" content="Vizzuality" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@globalforests" />
        <meta
          name="twitter:description"
          content="Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers."
        />
        <meta
          property="og:title"
          content="How to Use Global Forest Watch Maps & Tools | GFW Help Center"
        />
        <meta
          property="og:description"
          content="Find tutorials, webinars and other resources in the GFW Help Center to help guide you through the forest monitoring data, analysis, technology and tools that GFW offers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/help/preview.jpg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="700" />
        <meta
          property="og:url"
          content={`https://www.globalforestwatch.org/help${asPath}`}
        />
        <meta
          property="fb:appid"
          content={process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}
        />
        <link
          rel="canonical"
          href={`https://www.globalforestwatch.org/help${asPath}`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {noIndex && <meta name="robots" content="noindex" />}
        {metaTags && ReactHtmlParser(metaTags)}
      </Head>
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          relative
          pathname="https://www.globalforestwatch.org/help/"
          openContactUsModal={() => setOpen(true)}
        />
      </HeaderWrapper>
      <main>
        {isFallback ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          renderPage(isError, statusCode, children, setOpen, preview)
        )}
      </main>
      <Footer openContactUsModal={() => setOpen(true)} />
      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  margin-bottom: 20px;
`;

const PageWrapper = styled.div`
  padding-top: 56px;
`;

const LoaderWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

Layout.propTypes = {
  children: PropTypes.node,
  metaTags: PropTypes.string,
  isError: PropTypes.bool,
  statusCode: PropTypes.number,
  preview: PropTypes.bool,
  noIndex: PropTypes.bool,
};

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
`;
