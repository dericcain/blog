import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { pure } from 'recompose';
import { TypographyStyle, GoogleFont } from 'react-typography';
import styled, { injectGlobal } from 'styled-components';
import Link from 'gatsby-link';

import { grey, red } from '../styles/colors';
import typography from '../styles/typography';
require('../styles/syntax.css');

injectGlobal`
  body {
    height: calc(100vh - 60px);
    border-top: 4px solid ${grey.default};
  }
  
  #___gatsby {
    height: 100%;
  }
`;

const PageWrapper = styled.main`
  max-width: 768px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 32px 9px;
  position: relative;
  height: 100%;
`;

const Footer = styled.footer`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  
  a {
    color: ${red.dark};
    font-family: 'Lora', serif;
  }
`;

const Layout = ({ children, data }) => (
  <Fragment>
    <TypographyStyle typography={typography} />
    <GoogleFont typography={typography} />
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <PageWrapper>
      {children()}
    </PageWrapper>
    <Footer>
      <Link to="/subscribe">Wanna subscribe?</Link>
    </Footer>
  </Fragment>
);

export default pure(Layout);

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
