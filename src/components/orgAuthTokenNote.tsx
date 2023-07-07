import React from 'react';
import {useLocation} from '@reach/router';
import {graphql, StaticQuery} from 'gatsby';

import {ExternalLink} from './externalLink';
import {Note} from './note';
import {SignedInCheck} from './signedInCheck';

const siteMetaQuery = graphql`
  query SignInNoteQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

export function OrgAuthTokenNote(): JSX.Element {
  const location = useLocation();

  return (
    <SignedInCheck isUserAuthenticated={false}>
      <StaticQuery
        query={siteMetaQuery}
        render={data => {
          const url = data.site.siteMetadata.siteUrl + location.pathname;
          return (
            <Note>
              {' '}
              You can{' '}
              <ExternalLink
                href="https://sentry.io/settings/auth-tokens/"
                target="_blank"
              >
                manually create an Auth Token
              </ExternalLink>{' '}
              or{' '}
              <ExternalLink href={`https://sentry.io/auth/login/?next=${url}`}>
                sign in
              </ExternalLink>{' '}
              to create a token directly from the docs.
            </Note>
          );
        }}
      />
    </SignedInCheck>
  );
}
