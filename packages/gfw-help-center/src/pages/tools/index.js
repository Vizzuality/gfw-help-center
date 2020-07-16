/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, css } from 'frontity';
import { Row, Column, Desktop, Mobile, theme } from 'gfw-components';

import Breadcrumbs from '../../components/breadcrumbs';
import Dropdown from '../../components/dropdown';

import Content from '../../components/content';
import Menu from '../../components/menu';
import RelatedContent from '../../components/related-content';

import {
  Wrapper,
  ContentWrapper,
  SearchMobile,
  SearchDesktop,
  Title,
  HeaderWrapper,
} from './styles';

const Page = ({ state, libraries }) => {
  const { tools } = state.source.data['all-tools/'];
  const route = state.source.get(state.router.link);

  const allParentPages = tools?.['0'];
  const currentPage = state.source[route.type][route.id];
  const siblingPages = currentPage?.parent
    ? tools[currentPage.parent]
    : tools[currentPage.id];

  // build the options for the dropdown
  const parentPageOptions = allParentPages?.map((tool) => ({
    name: tool.title.rendered,
    id: tool.id,
    link: tool.link,
  }));

  const primaryTools = parentPageOptions.slice(0, 4);
  const secondaryTools = parentPageOptions.slice(4, 8);
  const toolsOptions = [
    ...primaryTools,
    {
      name: 'divider',
      id: 'div-1',
    },
    ...secondaryTools,
  ];

  // active parent page ID
  const currentParentPage = currentPage.parent || currentPage.id;
  const parentPage = currentPage.parent
    ? allParentPages.find((p) => p.id === currentPage.parent)
    : currentPage;

  // build the options for the side bar menu
  const sidebarPages = siblingPages
    ? [parentPage]?.concat(siblingPages)
    : [parentPage];

  const links = sidebarPages?.map((sub) => ({
    label: sub?.parent ? sub?.title?.rendered : 'Overview',
    link: sub?.acf?.alt_link || sub?.link,
    active:
      currentPage?.link === sub?.link || currentPage?.link === `${sub?.link}/`,
  }));

  // get page content
  const { title, content, acf, parent } = currentPage || {};

  // build related content from acf
  const { related_content: relatedContent } = acf || {};

  const Html2React = libraries?.html2react?.Component;

  return (
    <Wrapper>
      <Row>
        <Column width={[3 / 4]}>
          <Breadcrumbs
            css={css`
              margin-bottom: 25px;

              ${theme.mediaQueries.small} {
                margin-bottom: 40px;
              }
            `}
          />
        </Column>
        <Column width={[1 / 4]}>
          <SearchMobile open={state.theme.searchIsActive} />
        </Column>
      </Row>
      <Row
        css={css`
          position: relative;
        `}
      >
        <HeaderWrapper width={[1, 2 / 3]}>
          <Dropdown items={toolsOptions} selected={currentParentPage} />
        </HeaderWrapper>
        <Column width={[1, 1 / 3]}>
          <SearchDesktop showTitle open={state.theme.searchIsActive} />
        </Column>
      </Row>
      <Row>
        <Column width={[1, 1 / 4]}>
          <Desktop>
            <Menu links={links} />
          </Desktop>
        </Column>
        <Column width={[1, 7 / 12]}>
          {title && (
            <Title>
              <Html2React html={parent ? title?.rendered : 'Overview'} />
            </Title>
          )}
          {content && (
            <ContentWrapper>
              <Content>
                <Html2React html={content?.rendered} />
              </Content>
            </ContentWrapper>
          )}
          {relatedContent?.length > 0 && (
            <RelatedContent sections={relatedContent} />
          )}
        </Column>
      </Row>
      <Mobile>
        <Menu links={links} />
      </Mobile>
    </Wrapper>
  );
};

Page.propTypes = {
  state: PropTypes.object,
  libraries: PropTypes.object,
};

export default connect(Page);
