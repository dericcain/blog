import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { pure } from 'recompose';
import { TypographyStyle, GoogleFont } from 'react-typography';
import styled, { injectGlobal } from 'styled-components';

import { grey } from '../styles/colors';
import typography from '../styles/typography';
require('../styles/syntax.css');

injectGlobal`
  body {
    height: 100vh;
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
