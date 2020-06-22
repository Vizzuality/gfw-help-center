import { styled } from 'frontity';
import theme from '../../app/theme';

export const CardWrapper = styled.article`
  position: relative;

  img,
  h3 {
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    h3 {
      color: ${theme.colors.darkGreen};
      text-decoration: underline;
    }

    img {
      transition: all 0.2s ease-in-out;
      transform: scale(1.05);
    }
  }
`;

export const MediaWrapper = styled.div`
  height: 200px;
  overflow: hidden;
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        height: 300px;
    `}
  }
`;

export const PostTitle = styled.h3`
  font-size: 22px;
  line-height: 28px;
  color: ${theme.colors.darkestGrey};
  width: 100%;
  margin-bottom: 20px;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        font-size: 30px;
        line-height: 38px;
    `}
  }
`;

export const PostExcerpt = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: ${theme.colors.mediumGrey};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${theme.mediaQueries.small} {
    ${({ large }) =>
      large &&
      `
        font-size: 16px;
        line-height: 28px;
    `}
  }
`;
