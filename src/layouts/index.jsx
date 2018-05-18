import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { TypographyStyle, GoogleFont } from 'react-typography';
import styled from 'styled-components';

import typography from '../styles/typography';
require('../styles/syntax.css');

const PageWrapper = styled.main`
  max-width: 768px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 32px 9px;
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

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
