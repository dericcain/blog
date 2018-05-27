import React from 'react';
import { pure } from 'recompose';

import PostExcerpt from './PostExcerpt';

const Posts = ({ posts }) =>
  posts.map(({ node: { frontmatter, id, excerpt } }) => (
    <PostExcerpt
      key={id}
      id={id}
      title={frontmatter.title}
      excerpt={excerpt}
      date={frontmatter.date}
      path={frontmatter.path}
    />
  ));
export default pure(Posts);
