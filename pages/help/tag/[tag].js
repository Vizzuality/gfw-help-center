import { getTags, getTagBySlug, getPostsByType } from 'lib/api';

import ArchivePage from 'layouts/archive';

import Layout from 'layouts/layout';

export default function Tag(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} hasPageData={!!props.tag}>
      <ArchivePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const tags = await getTags();
  const tag = await getTagBySlug({ slug: params.tag });

  const articles = await getPostsByType({
    type: 'articles',
    params: {
      help_tags: tag.id,
    },
  });

  const webinars = await getPostsByType({
    type: 'webinars',
    params: {
      help_tags: tag.id,
    },
  });

  return {
    props: {
      tag,
      tags,
      articles: articles || [],
      webinars: webinars || [],
      metaTags: tag?.yoast_head,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allTags = await getTags();

  const paths = allTags?.map((tag) => `/help/tag/${tag.slug}/`);

  return {
    paths: paths || [],
    fallback: true,
  };
}
