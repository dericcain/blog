import React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

import PostExcerpt from './PostExcerpt';

const PostsWrapper = styled.div`

`;

const Posts = ({ posts }) => (
  <PostsWrapper>
    {posts.map(({ node: { frontmatter, id, excerpt } }) => (
      <PostExcerpt
        key={id}
        id={id}
        title={frontmatter.title}
        excerpt={excerpt}
        date={frontmatter.date}
        path={frontmatter.path}
      />
    ))}
  </PostsWrapper>
)

export default pure(Posts);
