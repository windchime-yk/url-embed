import { Child, FC } from "hono/jsx";
import { css, Style } from "hono/css";
import { SITE_TITLE } from "~/constants.ts";

interface LayoutProps {
  children: Child;
}

export const PageLayout: FC<LayoutProps> = ({ children }) => (
  <html lang="ja">
    <head>
      <link
        rel="stylesheet"
        href="https://fonts.xz.style/serve/inter.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
      />
      <title>{SITE_TITLE}</title>
    </head>
    <body>
      {children}
    </body>
  </html>
);

export const CardLayout: FC<LayoutProps> = ({ children }) => (
  <html lang="ja">
    <head>
      <Style />
      <title>{SITE_TITLE}</title>
    </head>
    <body class={css`margin: 0;`}>
      {children}
    </body>
  </html>
);
