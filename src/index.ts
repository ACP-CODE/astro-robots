import type { AstroConfig, AstroIntegration } from "astro";
import type { Policy } from "./types";
import fs from "fs/promises";
import { fileURLToPath } from "node:url";
import { generate, logInfo } from "./core";
import { measureExecutionTime, getFileSizeInKilobytes } from "./utils";

export interface RobotsOptions {
  /**
   * @description
   * Used to specify rules that apply to one or more robots.
   * @default
   * All robots are allowed.
   * ```ts
   * policy:[
   *  {
   *    userAgent: "*",
   *    allow: "/"
   *  }
   * ]
   * ```
   * For more help, refer to [SYNTAX](https://yandex.com/support/webmaster/controlling-robot/robots-txt.html#recommend) by Yandex.
   */
  policy: Policy[];
  /**
   * @description
   * The location of a sitemap for this website.
   * @example
   * ```ts
   * sitemap: [
   *  "https://example.com/sitemap.xml",
   *  "https://www.example.com/sitemap.xml"
   * ]
   * ```
   * The value of the [SITEMAP](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt#sitemap)
   * field is case-sensitive.
   */
  sitemap?: boolean | string | string[];
  /**
   * @default null
   * @description
   * Specify the value of `Host`, some crawlers(Yandex) support and only accept domain names.
   * @example
   * ```ts
   * host: siteUrl.replace(/^https?:\/\/|:\d+/g, "")
   * ```
   */
  host?: null | string;
}

const defaults: RobotsOptions = {
  policy: [
    {
      userAgent: "*",
      allow: "/",
    },
  ],
  sitemap: true,
  host: null,
};

export default function robots(options?: RobotsOptions): AstroIntegration {
  let config: AstroConfig;
  let finalSiteMapHref: string;

  const filename = "robots.txt";
  const opts = { ...defaults, ...options };

  return {
    name: "astro-robots",
    hooks: {
      "astro:config:setup": ({ config: cfg, }) => {
        config = cfg;
        if (config.site) {
          finalSiteMapHref = new URL(config.base, config.site).href;
        }
      },
      "astro:server:setup": ({ server, logger }) => {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith(`/${filename}`)) {
            res.setHeader("Content-Type", "text/plain");
            res.setHeader("Cache-Control", "no-cache");
            res.end(generate(opts, finalSiteMapHref, logger));
          } else {
            next();
          }
        });
      },
      "astro:build:done": async ({ dir, logger }) => {
        const fileURL = new URL(filename, dir);
        const destDir = fileURLToPath(dir);
        const fileBuffer = generate(opts, finalSiteMapHref, logger);

        try {
          await fs.mkdir(destDir, { recursive: true });
          await fs.writeFile(fileURL, fileBuffer, "utf-8");
          throw "done";
        } catch (e) {
          if( e === "done") {
            const fileSize = getFileSizeInKilobytes(fileBuffer);
            logInfo(fileSize, logger, destDir);
          } else {
            throw e;
          }
        }
      },
    },
  };
}
