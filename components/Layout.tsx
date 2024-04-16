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
      <Style>
        {css`
          :root {
            --text-color: hsl(0, 0%, 0%);
            --bg-color: hsl(0, 0%, 100%);
            --bg-hover-color: hsl(0, 0%, 95%);
            --border-color: hsl(0, 0%, 65%);
            --link-color: hsl(0, 0%, 65%)
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --text-color: hsl(0, 0%, 100%);
              --bg-color: hsl(217, 33%, 17%);
              --bg-hover-color: hsl(217, 33%, 22%);
              --border-color: hsl(0, 0%, 40%);
            }
          }
        `}
      </Style>
      <title>{SITE_TITLE}</title>
    </head>
    <body class={css`margin: 0;`}>
      {children}
    </body>
  </html>
);
