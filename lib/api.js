import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';

const serializePosts = (posts) =>
  posts.map((p) => ({
    ...p,
    ...(p.featured_media && {
      featured_media_id: p.featured_media,
      featured_media: p._embedded?.['wp:featuredmedia']?.[0],
    }),
    ...(p.help_tags && {
      tag_ids: p.help_tags,
      tags: p._embedded?.['wp:term']?.[0],
    }),
  }));

apiFetch.setFetchHandler((options) => {
  const { url, path, data, method, params } = options;

  return axios({
    url: url || path,
    method,
    data,
    params,
  });
});

export async function getPostsByType({ type, params, cancelToken } = {}) {
  const postsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}`,
    params: {
      ...params,
      _embed: true,
    },
    cancelToken,
  });

  return serializePosts(postsResponse?.data);
}

export async function getPostByType({ type, slug, params, cancelToken } = {}) {
  const postResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/${type || 'posts'}`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
    cancelToken,
  });

  return serializePosts(postResponse?.data)[0];
}

export async function getTags({ params } = {}) {
  const tagsResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/help_tags`,
    params: {
      ...params,
      _embed: true,
    },
  });

  return tagsResponse?.data;
}

export async function getTagBySlug({ slug, params }) {
  const tagResponse = await apiFetch({
    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2/help_tags`,
    params: {
      ...params,
      slug,
      _embed: true,
    },
  });

  return tagResponse?.data[0];
}
