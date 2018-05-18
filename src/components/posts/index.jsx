import React from 'react';

import Loading from '../loading';
import PostExcerpt from './PostExcerpt';

const Posts = ({ posts }) => {
  return posts.length === 0 ? (
    <Loading isActive={true} />
  ) : (
    posts.map(({ node: { frontmatter, id, excerpt } }) => (
      <PostExcerpt
        key={id}
        id={id}
        title={frontmatter.title}
        excerpt={excerpt}
        date={frontmatter.date}
        path={frontmatter.path}
      />
    ))
  );
};
export default Posts;
