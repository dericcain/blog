import React from 'react'

import Loading from '../loading'
import Gist from './gist'

const Gists = ({ gists }) =>
  gists.length === 0 ? (
    <Loading isActive={true} />
  ) : (
    gists.map(({ id, title, comments, commentsCount, body }) => (
      <Gist
        key={id}
        id={id}
        title={title}
        commentsCount={commentsCount}
        comments={comments}
        body={body}
      />
    ))
  )

export default Gists
