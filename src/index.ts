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

const defaultConfig: RobotsOptions = {
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
  let executionTime: number;

  const opts = { ...defaultConfig, ...options };

  return {
    name: "astro-robots",
    hooks: {
      "astro:config:setup": ({ config: cfg }) => {
        config = cfg;
      },
      "astro:build:start": () => {
        if (config.site) {
          finalSiteMapHref = new URL(config.base, config.site).href;
        }
      },
      "astro:build:done": async ({ dir, logger }) => {
        const fileURL = new URL("robots.txt", dir);

        executionTime = measureExecutionTime(async () => {
          await fs.writeFile(
            fileURL,
            generate(opts, finalSiteMapHref, logger),
            "utf-8",
          );
        });

        const fileSize = await getFileSizeInKilobytes(fileURL);
        const destDir = fileURLToPath(dir);

        logInfo(fileSize, executionTime, logger, destDir);
      },
    },
  };
}
