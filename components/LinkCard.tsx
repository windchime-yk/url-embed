import { type FC } from "hono/jsx";
import { css } from "hono/css";

interface LinkCardProps {
  title: string;
  url: string;
}

const cardStyle = css`
  box-sizing: border-box;
  height: 100px;
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--border-color);
  background-color: var(--bg-color);
  font-size: 16.5px;
  text-decoration: none;
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    background-color: var(--bg-hover-color);
  }
`;
const invalidCardStyle = css`
  ${cardStyle}
  &:hover {
    background-color: var(--bg-color);
  }
`;
const titleStyle = css`
  color: var(--text-color);;
  font-size: 1.08em;
  font-weight: bold;
`;
const urlWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const urlStyle = css`
  color: var(--link-color);
`;

export const LinkCard: FC<LinkCardProps> = ({ url, title }) => (
  <a class={cardStyle} href={url} target="_blank" rel="noopener noreferrer">
    <span class={titleStyle}>{title}</span>
    <div class={urlWrapperStyle}>
      <img
        src={`https://www.google.com/s2/favicons?sz=14&domain_url=${url}`}
        alt=""
      />
      <span class={urlStyle}>{url}</span>
    </div>
  </a>
);

export const InvalidLinkCard: FC<Pick<LinkCardProps, "title">> = (
  { title },
) => (
  <div class={invalidCardStyle}>
    <span class={titleStyle}>{title}</span>
  </div>
);
