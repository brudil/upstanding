const forms = {
  ARTICLE: 'article',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
  GALLERY: 'gallery',
};

export default function getPathForContent(container) {
  return `/${forms[container.content.form]}/${container.content
    .slug}-${container.contentId}`;
}
