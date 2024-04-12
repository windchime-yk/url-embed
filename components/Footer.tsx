import { FC } from "hono/jsx";

export const Footer: FC = () => (
  <footer>
    <p>
      <small>
        &copy; {new Date().getFullYear()}{" "}
        <a href="http://whyk.dev" target="_blank" rel="noopener noreferrer">
          WhyK
        </a>
      </small>
    </p>
  </footer>
);
