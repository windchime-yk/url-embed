import { type FC } from "hono/jsx";
import { css } from "hono/css";

interface LinkCardProps {
  title: string;
  url: string;
}

const style = {
  card: css`
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
  `,
  title: css`
    color: var(--text-color);;
    font-size: 1.08em;
    font-weight: bold;
  `,
  urlWrapper: css`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  url: css`
    color: var(--link-color);
  `,
};

export const LinkCard: FC<LinkCardProps> = ({ url, title }) => (
  <a class={style.card} href={url} target="_blank" rel="noopener noreferrer">
    <span class={style.title}>{title}</span>
    <div class={style.urlWrapper}>
      <img
        src={`https://www.google.com/s2/favicons?sz=14&domain_url=${url}`}
        alt=""
      />
      <span class={style.url}>{url}</span>
    </div>
  </a>
);
