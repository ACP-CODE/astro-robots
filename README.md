<div align="center">

**Latest Updates! 🎉 See the [change log](./CHANGELOG.md) for details.**

<img height="128" alt="" src="./assets/logo.svg">

# astro-robots

A lightweight `robots.txt` generator designed specifically for [Astro Integration](http://www.npmjs.com/package/astro) . With zero-config support, an intuitive JSDoc API, and up-to-date [Verified Bots](https://radar.cloudflare.com/traffic/verified-bots) support

[Features](#features) · [Installation](#installation) · [Usage](#usage) · [Configuration](#configuration) · [Change Log](/CHANGELOG.md)

</div>

## Overview

Robots.txt file are simple yet crucial for your website's SEO. A single misstep can prevent search engines from accessing important content. With `astro-robots` help, you can avoid common misconfigurations and ensure optimal SEO performance.

## Installation

> This package is compatible with **Astro 3.0.0** and above, due to the use of AstroIntegrationLogger.

To automate the installation, use the `astro add` command-line tool. You can initialize it via `npx`, `yarn`, or `pnpm` based on your preference.

```sh
npx astro add astro-robots
```
Alternatively, you can manually install it by running the following command in your terminal:

```sh
npm install astro-robots
```

## Usage

To use this integration, add it to your `astro.config.*` file using the integrations property:

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import robots from "astro-robots"; // Add code manually

export default defineConfig({
  site: "https://example.com";
  integrations: [robots()], // Add code manually
});
```

After installing, run `npm run build` or `yarn build` in terminal:

```sh
npm run build
```

This will output `robots.txt` to the `dist` folder with default rules:

```yaml
User-agent: *
Allow: /

# crawling rule(s) for above bots
Sitemap: https://example.com/sitemap-index.xml
```

## Configuration

<details>

<summary><b>Getting Started</b> - A hands-on crash course with example walkthroughs.</summary><br>

To configure the integration, pass an object to the `robots()` function in your `astro.config.*` file:

```ts
//....
import robots from "astro-robots";

export default defineConfig({
  //...
  integrations: [
    robots({
      host: "https://example.com";,
      sitemap: [
        "https://example.com/sitemap.xml",
        "https://www.example.com/sitemap.xml",
      ],
      policy: [
        {
          userAgent: [
            "Applebot",
            "Googlebot",
            "bingbot",
            "Yandex",
            "Yeti",
            "Baiduspider",
            "360Spider",
            "*",
          ],
          allow: ["/"],
          disallow: ["/admin", "/login"],
          crawlDelay: 5,
          cleanParam: ["sid /", "s /forum/showthread"],
        },
        {
          userAgent: "BLEXBot",
          disallow: ["/assets", "/uploades/1989-08-21/*jpg$"],
        },
      ],
    }),
  ],
});
```

With the above configuration, the generated `robots.txt` file will look like this:

```yaml
User-agent: Applebot
User-agent: Googlebot
User-agent: bingbot
User-agent: Yandex
User-agent: Yeti
User-agent: Baiduspider
User-agent: 360Spider
User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Crawl-delay: 5
Clean-param: sid /
Clean-param: s /forum/showthread

User-agent: BLEXBot
Disallow: /assets
Disallow: /uploades/1989-08-21/*jpg$

# crawling rule(s) for above bots
Sitemap: https://example.com/sitemap.xml
Sitemap: https://www.example.com/sitemap.xml
Host: example.com
```

> **Note:** Some directives like `Host`, `Clean-param`, and `Crawl-delay` may not be supported by all crawlers. For example, Yandex has ignored `Crawl-delay` since February 2018. To control Yandex's crawl rate, use the [Site crawl rate setting](https://yandex.com/support/webmaster/service/crawl-rate.html#crawl-rate) in Yandex Webmaster.

<br>
</details>

<details>
<summary>
<b>Integration API</b> - Customize your robots.txt directives and behaviors.

</summary><br>

Through the above examples, you must have understood how `astro-robots` works. Now, let's learn more about its interface.

|        Name         |                      Type                       | Required |           Default value            |   Directive   |
| :-----------------: | :---------------------------------------------: | :------: | :--------------------------------: | :-----------: |
|        host         |               `Boolean` `String`                |    No    |              `false`               |    `Host`     |
|       sitemap       |          `Boolean` `String` `String[]`          |    No    |               `true`               |   `Sitemap`   |
|      policy[]       |                    `Strig[]`                    |    No    | `[{ userAgent: '*', allow: '/' }]` |       -       |
| plicy[{userAgent}]  | `UserAgentType`<sup>[[4](#useragenttype)]</sup> |   Yes    |                 -                  | `User-agent`  |
|   plicy[{allow}]    |               `String` `String[]`               |    \*    |                 -                  |    `Allow`    |
|  plicy[{disAllow}]  |               `String` `String[]`               |    \*    |                 -                  |  `Disallow`   |
| plicy[{crawlDelay}] |                    `Number`                     | Optional |                 -                  | `Crawl-delay` |
| plicy[{cleanParam}] |               `String` `String[]`               | Optional |                 -                  | `Clean-param` |

> - `*` [ Optional ] At least one or more `allow` or `disallow` entries per rule.
> - `-` [ Undefinded ] There is no initial value in the default configuration.

#### UserAgentType

**type:** `UserAgentType` `(UserAgentType)[]`

- UserAgentType - `UnionTypes` Stored are the latest verified bots.
- (UserAgentType)[] - `UnionTypeArray` Make it work in array mode too.

If you still have questions, don't worry! We have powerful [JSDoc](./dist/index.d.ts) support, which makes it easy for both SEO experts and novices to manage.

</details>

<details>
<summary><b>Practical Examples</b> - Visit the <a href="https://yandex.com/support/webmaster/controlling-robot/robots-txt.html#recommend">Yandex Support</a> to learn more about directives.</summary>

> I'm planning to release more practical examples to cater to the mainstream search engine market.
</details>

## Need Help or Feedback?

Submit your issues or feedback on our [GitHub](https://github.com/ACP-CODE/astro-robots/issues) channel.

## Changelog

Check out the [CHANGELOG.md](CHANGELOG.md) file for a history of changes to this integration.

