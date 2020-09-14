import { getPostsByType, getPostByType } from 'lib/api';

import ArticlePage from 'layouts/article';
import Layout from 'layouts/layout';

export default function Article(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props}>
      <ArticlePage {...props} />
    </Layout>
  );
}

export async function getStaticProps({ params, previewData, preview }) {
  const isPreview = !!preview && previewData?.slug === params.slug;
  const article = await getPostByType({
    type: 'articles',
    ...(isPreview && {
      id: previewData?.id,
      params: {
        status: 'any',
      },
    }),
    slug: params.slug,
  });

  return {
    props: {
      article: article || null,
      metaTags: article?.yoast_head || '',
      isError: !article,
      preview: isPreview,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allArticles = await getPostsByType({
    type: 'articles',
    params: { per_page: 100 },
  });

  const paths = allArticles?.map((article) => `/guides/${article.slug}/`);

  return {
    paths: paths || [],
    fallback: true,
  };
}
