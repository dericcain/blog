import React, { Fragment } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import BackIcon from 'react-icons/lib/io/android-arrow-back';

import { grey } from '../styles/colors';

const Title = styled.h1`
  text-align: center;
`;

const Date = styled.p`
  text-align: center;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${grey.default};
  margin: 24px 0;
`;

const BackButton = styled(BackIcon)`
  color: ${grey.light};
  font-size: 22px;
  margin-bottom: 6px;
`;

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Fragment>
      <Title>{frontmatter.title}</Title>
      <Date>{frontmatter.date}</Date>
      <Divider>
        <Link to="/">
          <BackButton />
        </Link>
      </Divider>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Fragment>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
