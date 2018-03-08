import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
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
                channel
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
      const isBitch = content.channel === 'BITCH';

      const textBlend = imgixText({
        fm: 'png',
        textfit: 'max',
        h: 630,
        w: 1200,
        txtfont64: new Buffer(isBitch ? 'Futura-Medium' : 'Helvetica Neue Condensed, Bold').toString(
          'base64'
        ),
        txt64: new Buffer(`${content.headline}`)
          .toString('base64')
          .replace(/=/g, ''),
        txtpad: 60,
        bg: isBitch ? '22fc2aa4' : 'aa6D4D2D',
        txtclr: 'fff',
        txtsize: 80,
        txtshad: isBitch ? 20 : 0
      });

      const sharer = imgixURL(content.posterImage.resourceName, {
        fit: 'crop',
        bm: 'normal',
        markw: 220,
        mark: isBitch ? 'https://drafty.imgix.net/eb3e0a51-10f4-49de-a054-042c2d277f95' : 'https://drafty.imgix.net/50d2c118-344a-40be-9d13-47d7b2840292',
        h: 630,
        w: 1200,
        markpad: 60,
        blend64: new Buffer(textBlend).toString('base64'),
      });

      res.redirect(301, sharer);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send('Not Found.');
    });
}
