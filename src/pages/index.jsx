import React, { Fragment } from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';
import GithubIcon from 'react-icons/lib/io/social-github';
import TwitterIcon from 'react-icons/lib/io/social-twitter';
import LinkedInIcon from 'react-icons/lib/io/social-linkedin';

import Posts from '../components/posts';
import Header from '../components/Header';
import { grey } from '../styles/colors';

const SocialIcons = styled.div`
  border-top: 1px solid ${grey.default};
  border-bottom: 1px solid ${grey.default};
  padding: 18px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 26px 0;
`;

const StyledGithubIcon = styled(GithubIcon)`
  height: 26px;
  width: 26px;
  margin: 0 8px;
  color: ${grey.default};
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  height: 26px;
  width: 26px;
  margin: 0 8px;
  color: ${grey.default};
`;

const StyledLinkedInIcon = styled(LinkedInIcon)`
  height: 26px;
  width: 26px;
  margin: 0 8px;
  color: ${grey.default};
`;

const IndexPage = ({ data: { allMarkdownRemark: { edges } }}) => {
  const posts = edges.filter(edge => !!edge.node.frontmatter.date);

  return (
    <Fragment>
      <Header title="Some technical thoughts" subtitle="Javascript stuff by Deric Cain" />
      <SocialIcons>
        <a href="https://github.com/dericgw" target="_blank">
          <StyledGithubIcon />
        </a>
        <a href="https://twitter.com/dericcain" target="_blank">
          <StyledTwitterIcon />
        </a>
        <a href="https://www.linkedin.com/in/dericcain/" target="_blank">
          <StyledLinkedInIcon />
        </a>
      </SocialIcons>
      <Posts posts={posts} />
    </Fragment>
  );
};

export default pure(IndexPage);

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
