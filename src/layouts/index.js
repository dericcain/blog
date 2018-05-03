import React from 'react';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';

import Header from '../components/header';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Cormorant+Garamond:300,300i,400,500,600');
  *,
    *::after,
    *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
    }
  
    html {
      // We use % here to not override a user's default browser settings for font size. Otherwise, 
      // we would simply put 10px here. 16px is the browser's default font size so... 
      font-size: 100%; //1 rem = 10px; 10px/16px = 62.5%
      font-family: 'Cormorant Garamond', serif;
    }
  
    body {
      box-sizing: border-box;
      font-family: inherit;
    }
    
`;

const Content = styled.main`
  margin-left: 300px;
`;

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,400i,700"
      />
    </Helmet>
    <Header />
    <Content>{children()}</Content>
  </div>
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
