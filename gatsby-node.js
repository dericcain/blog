/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

// exports.modifyBabelrc = ({ babelrc }) => ({
//   ...babelrc,
//   plugins: babelrc.plugins.concat(['transform-regenerator']),
// });

exports.modifyWebpackConfig = (config, env) => {
  if (env === 'build-javascript' || env === 'develop') {
    const previous = config.resolve().entry
    config._config.entry = []
    config.merge({
      entry: ['babel-polyfill'].concat(previous)
    })
  }
  return config
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/blog-template.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};
