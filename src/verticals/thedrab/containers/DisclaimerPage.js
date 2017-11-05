import React from 'react';
import { Helmet } from 'react-helmet';
import FrontsHeader from '../components/FrontsHeader';

function DisclaimerPage() {
  return (
    <div className="Main">
      <Helmet title="Disclaimer" />
      <FrontsHeader title="Disclaimer" />
      <div className="Container Container">
        <p>
          The Drab is a satirical site parodying new media and student journalism.
          All articles posted on The Drab are largely or entirely fictitious. The
          use of celebrities names and likenesses may be used through-out the site
          and it’s associated media. Any resemblance to real people and events
          outside the world of celebrity, politics and news are purely
          coincidental.
        </p>
    <p>
    All photographs used in articles either do not require attribution, 
    or are covered by licenses which can be accessed via the credit links under the respective image.
    </p>
        <p>
          The opinions expressed on The Drab and it’s associated media do not
          necessarily reflect the views and opinions of The Drab’s founders,
          writers or contributors.
        </p>
        <p>The Drab may include mature content or content which may be considered offensive.</p>
      </div>
    </div>
  );
}

export default DisclaimerPage;
