import { Hono } from "hono";
import { parsedMeta } from "ogp-parser";
import { CardLayout, PageLayout } from "~/components/Layout.tsx";
import { Header } from "~/components/Header.tsx";
import { Footer } from "~/components/Footer.tsx";
import { LinkCard } from "~/components/LinkCard.tsx";

const app = new Hono();

app.get("/robots.txt", (ctx) => {
  return ctx.text("User-agent: *\nDisallow: /");
});

app.get("/", (ctx) => {
  return ctx.html(
    <PageLayout>
      <Header />
      <main>
        <section>
          <h2>What's "WhyK Embed"</h2>
          <p>
            WhyK created <code>&lt;iframe /&gt;</code> embed element API.
          </p>
          <p>
            Scope is limited to private use.<br />We will not be responsible for
            any problems that may occur if anyone other than WhyK uses the
            system.
          </p>

          <iframe
            src={`${new URL(ctx.req.url).origin}/embed?url=https://example.com`}
            frameborder="0"
            height={120}
            width={400}
          />
        </section>
      </main>
      <Footer />
    </PageLayout>,
  );
});

app.get("/embed", async (ctx) => {
  const { url } = ctx.req.query();

  if (!url || !URL.canParse(url)) {
    return ctx.notFound();
  }

  const { title, twitter, open_graph } = await parsedMeta(url);

  const cardTitle = open_graph.title || twitter.title || title ||
    "タイトルなし";

  return ctx.html(
    <CardLayout>
      <LinkCard url={url} title={cardTitle} />
    </CardLayout>,
  );
});

app.notFound((ctx) => {
  return ctx.html(
    <PageLayout>
      <Header />
      <main>
        <section>
          <h2>Page not found!</h2>
          <p>
            Please jump <a href="/">Top page</a>
          </p>
        </section>
      </main>
      <Footer />
    </PageLayout>,
  );
});

Deno.serve(app.fetch);
