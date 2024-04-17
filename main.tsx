import { Hono } from "hono";
import { parsedMeta } from "ogp-parser";
import { CardLayout, PageLayout } from "~/components/Layout.tsx";
import { Header } from "~/components/Header.tsx";
import { Footer } from "~/components/Footer.tsx";
import { InvalidLinkCard, LinkCard } from "~/components/LinkCard.tsx";

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

          <section>
            <h3>Valid</h3>
            <iframe
              src={`${
                new URL(ctx.req.url).origin
              }/embed?url=https://example.com`}
              frameborder="0"
              height={100}
              width={400}
            />
          </section>
          <section>
            <h3>Invalid</h3>
            <section>
              <h4>Not URL</h4>
              <iframe
                src={`${new URL(ctx.req.url).origin}/embed`}
                frameborder="0"
                height={100}
                width={400}
              />
            </section>
            <section>
              <h4>Deny URL</h4>
              <iframe
                src={`${
                  new URL(ctx.req.url).origin
                }/embed?url=https://example.net`}
                frameborder="0"
                height={100}
                width={400}
              />
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </PageLayout>,
  );
});

app.get("/embed", async (ctx) => {
  const { url } = ctx.req.query();

  if (!url || !URL.canParse(url)) {
    return ctx.html(
      <CardLayout>
        <InvalidLinkCard title="Haven't url query or can't parse URL" />
      </CardLayout>,
    );
  }

  try {
    const { title, twitter, open_graph } = await parsedMeta(url, {
      allowOrigins: [
        "https://example.com",
        /** @see https://blog.jxck.io/entries/2024-03-27/link-to-rfc.html */
        "https://www.rfc-editor.org",
        "https://tc39.es",
        "https://developer.mozilla.org",
        "https://github.com",
        "https://jser.info",
        "https://deno.com",
        "https://connpass.com",
        "https://efcl.info",
        "https://zenn.dev",
        "https://qiita.com",
        "https://stackoverflow.com",
        "https://blog.jxck.io",
        "https://www.publickey1.jp",
        "https://jsprimer.net",
        "https://ics.media",
        "https://uki00a.github.io",
        "https://azukiazusa.dev",
      ],
    });

    const cardTitle = open_graph.title || twitter.title || title ||
      "タイトルなし";

    return ctx.html(
      <CardLayout>
        <LinkCard url={url} title={cardTitle} />
      </CardLayout>,
    );
  } catch (error) {
    if (error instanceof Deno.errors.InvalidData) {
      return ctx.html(
        <CardLayout>
          <InvalidLinkCard title="URL being denied" />
        </CardLayout>,
      );
    }
    return ctx.html(
      <CardLayout>
        <InvalidLinkCard title="Unkhown Error" />
      </CardLayout>,
    );
  }
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
