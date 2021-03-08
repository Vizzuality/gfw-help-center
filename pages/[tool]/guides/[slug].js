import { getPostsByType, getPostByType } from 'lib/api';

import ArticlePage from 'layouts/article';
import Layout from 'layouts/layout';

import { articlesFilter } from 'utils/articles-filter';

export default function Article(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <Layout {...props} page={props?.article}>
      <ArticlePage {...props} isGuide />
    </Layout>
  );
}

export async function getStaticProps({ params, previewData, preview }) {
  const isPreview = !!preview && previewData?.slug === params.slug;
  const article = await getPostByType({
    type: 'articles',
    slug: params.slug,
    ...articlesFilter(isPreview, previewData),
  });

  const proLoginRequired = article.status === 'private';

  return {
    props: {
      proLoginRequired,
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

  const articlesWithTax = allArticles.filter((a) => a?.help_tools?.length);

  const paths = articlesWithTax?.map((article) => {
    const taxonomy = article?._embedded?.['wp:term']?.[1]?.[0]?.slug;

    return `/${taxonomy}/guides/${article.slug}/`;
  });

  return {
    paths: paths || [],
    fallback: true,
  };
}
