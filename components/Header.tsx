import { FC } from "hono/jsx";
import { SITE_TITLE } from "~/constants.ts";

export const Header: FC = () => (
  <header>
    <h1>{SITE_TITLE}</h1>
  </header>
);
