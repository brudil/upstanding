import { InMemoryCache } from 'apollo-client-preset';
import { ApolloClient } from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { imgixText, imgixURL } from '../../../core/components/utils';

export default function generateOpenGraphImage(link, req, res) {
  // generate apollo client

  // query with info needed for opengraph image

  // gen url and redirect

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql`
        query OpenGraphImageForContent($contentId: Int) {
          vertical(identifier: "thedrab") {
            content(contentId: $contentId) {
              content {
                headline
                posterImage {
                  resourceName
                }
              }
            }
          }
        }
      `,
      variables: {
        contentId: req.params.contentId,
      },
    })
    .then(result => {
      const content = result.data.vertical.content.content;

      const textBlend = imgixText({
        fm: 'png',
        textfit: 'max',
        h: 630,
        w: 1200,
        txtfont64: new Buffer('Helvetica Neue Condensed, Bold').toString(
          'base64'
        ),
        txt64: new Buffer(content.headline)
          .toString('base64')
          .replace(/=/g, ''),
        txtpad: 70,
        bg: 'aa6D4D2D',
        txtclr: 'fff',
        txtsize: 80,
      });

      const sharer = imgixURL(content.posterImage.resourceName, {
        fit: 'crop',
        bm: 'normal',
        markw: 220,
        mark: 'https://drafty.imgix.net/50d2c118-344a-40be-9d13-47d7b2840292',
        h: 630,
        w: 1200,
        markpad: 30,
        blend64: new Buffer(textBlend).toString('base64'),
      });

      res.redirect(301, sharer);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send('Not Found.');
    });
}
