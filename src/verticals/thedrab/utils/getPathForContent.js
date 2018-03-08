const forms = {
  ARTICLE: 'article',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
  GALLERY: 'gallery',
};

export default function getPathForContent(container) {
  if (container.content.channel === 'BITCH') {
    return `/bitch/${forms[container.content.form]}/${container.content
      .slug}-${container.contentId}`
  }

  return `/${forms[container.content.form]}/${container.content
    .slug}-${container.contentId}`;
}
