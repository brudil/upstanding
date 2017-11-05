export function openSocial(url) {
  window.open(
    url,
    '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=522,width=556'
  );
}

export default {
  facebook(link) {
    if (link == null) {
      link = window.location.href;
    }
    const url = `https://www.facebook.com/v2.8/dialog/share?href=${encodeURIComponent(
      link
    )}&app_id=696155863910264`;
    return url;
  },
  twitter(text, link) {
    const hashtags = '',
      related = 'readthedrab';

    if (link === null) {
      link = window.location.href;
    }
    const url =
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        link
      )}&text=${encodeURIComponent(text)}&via=readthedrab` +
      `&hashtags=${hashtags}&related=${encodeURIComponent(related)}`;

    return url;
  },
};
