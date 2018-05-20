module.exports = {
  siteMetadata: {
    title: 'Deric Cain - Blog',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-next',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typography',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [{ resolve: `gatsby-remark-prismjs` }],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-58169396-1',
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Deric Cain',
        short_name: 'Deric Cain',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#683E44',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        cacheId: `dericcain.com-offline`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
};
