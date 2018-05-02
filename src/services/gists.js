import React from 'react'

const cachedGists = []

export const gistsRequest = async () => {
  const url = `https://api.github.com/users/dericgw/gists`
  return await githubRequest(url, cachedGists)
}

const formatGists = gists =>
  gists.map(({ id, description, comments, comments_url, files }) => ({
    id,
    title: description,
    comments: comments_url,
    commentsCount: comments,
    body: files[Object.keys(files)[0]].raw_url,
  }));

async function githubRequest(url, shouldReturnHeaders = false) {
  if (cachedGists[url]) {
    return cachedGists[url]
  }

  try {
    const response = await fetch(url)
    const gists = await response.json()

    const formattedGists = formatGists(gists)

    console.log(formattedGists)

    if (shouldReturnHeaders) {
      const links = parseLinkHeader(response.headers.get('Link'))

      cachedGists[url] = {
        gists: formattedGists,
        links,
      }

      return cachedGists[url]
    }

    cachedGists[url] = formattedGists
    return cachedGists[url]
  } catch (error) {
    throw new Error(error)
  }
}

function parseLinkHeader(linkHeader) {
  if (!linkHeader) return null
  // Split parts by comma
  const parts = linkHeader.split(',')
  const links = {}

  // Parse each part into a named link
  parts.forEach(link => {
    const section = link.split(';')
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'")
    }
    const url = section[0].replace(/<(.*)>/, '$1').trim()
    const name = section[1].replace(/rel="(.*)"/, '$1').trim()
    links[name] = url
  })

  return links
}
