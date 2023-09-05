<br><br><br><br><br><br><br><br><br><br>
# What is Astro Robots

The lightweight `robots.txt` generator package makes it simple to create compliant robots.txt files specifically for [Astro Integrations](https://astro.build/integrations/), with zero-config support, an intuitive JSDoc API, and always up-to-date [Verified Bots](https://radar.cloudflare.com/traffic/verified-bots) support.

[Features](#features) · [Installation](#installation) · [Usage](#usage) · [Configuration](#configuration) · [Changelog](/CHANGELOG.md)

## Overview

Robots.txt is one of the simplest files on a website, but it’s also one of the easiest to mess up. Just one character out of place can wreak havoc on your SEO and prevent search engines from accessing important content on your site.

This is why robots.txt misconfigurations are extremely common — even amongst experienced SEO professionals (the `astro-robots` may help you do better).

### Key Features

<details>
<summary><strong>Speeds Creation:</strong> Effortlessly genertate customized <i>robots.txt<sup>[<a href="https://www.rfc-editor.org/rfc/rfc9309.html" target="_blank">1</a>]</sup></i> files.</summary>
<br>

With just one click, our robot.txt generator allows you to easily create optimized and customized robots.txt files for your website.

- Easily generate optimized custom robots.txt files with one click.
- Conveniently manage bot access rules without coding.
- Supports setting crawling delay, allowing/blocking specified bots, etc.
- The generated files follow the latest standards and can be correctly parsed by
- Smart automation to get optimized robots.txt without the hassle and guesswork

<br>
</details>

<details>
<summary><strong>Validated Bots:</strong> Uses the most recent <i>Validated Bots<sup>[<a href="https://radar.cloudflare.com/traffic/verified-bots" target="_blank">2</a>]</sup></i> from leading search engines.</summary>
<br>

Stay ahead of the curve with the most up-to-date verified bot user-agents from search leaders like Google, Bing, Yahoo, Yandex, and Baidu.

- Uses latest verified bot user-agents from major search engines.
- Integrates real-world bot data to optimize for emerging bots.
- Evolving lists that auto-update as the market changes.
- Saves time from manually tracking user-agent changes.

<br>
</details>

<details>
<summary><strong>Flexible Configuration:</strong> Streamline bot crawling with universal rules or customized settings per bot.</summary>
<br>

- Allows unified rule application OR customization per bot for flexibility
- Package handles enforcement of either unified or individualized rules
- Time-saving standardization is available but customization is also supported
- Full control whether through common or customized crawling rules

<br>
</details>

<details>
<summary><strong>UI-Friendly:</strong> With the blessing of <i>VSCode<sup>[<a href="https://code.visualstudio.com/" target="_blank">3</a>]</sup></i>, there is no need to pay too much attention to configuration.</summary>
<br>

- VSCode integration means complex configs aren't required
- Streamlines process so users can concentrate on building

> For localization support, it is recommended that you install _Commment Translate<sup>[[3.1](#https://marketplace.visualstudio.com/items?itemName=intellsmi.comment-translate)]</sup>_ for a better experience.

<br>
</details>

## Installation

<details>
<summary><strong>Quick Install</strong> (Astro Official Support)</summary><br>

Install the `astro-robots` package into any Astro project using your preferred package manager:

```sh
# Using NPM
$ npx astro add astro-robots

# Using Yarn
$ yarn astro add astro-robots

# Using PNPM
$ pnpx astro add astro-robots
```

<br>
</details>

### Manual Install

First, install the `astro-robots` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install --save-dev astro-robots
```

Then, apply this integration to your `astro.config.*` file using the integrations property:

```ts
// astro.config.mjs

import { defineConfig } from "astro/config";
import robots from "astro-robots"; // Add code manually

const siteUrl = "https://example.com";

export default defineConfig({
  site: siteUrl,
  integrations: [robots()], // Add code manually
});
```

### Usage

If you have completed added code manually or installed automatically (`zero-configuration`), the `robots.txt` file will be generated when you run the `npm run build` or `yarn build` command.

```sh
npm run build
```

✨ dist > robots.txt

```txt
User-agent: *
Allow: /

# crawling rule(s) for above bots
Sitemap: https://example.com/sitemap-index.xml
```

## Configuration

<details>

<summary><strong>Getting Started</strong> (A hands-on crash course with example walkthroughs).</summary><br>

To configure this integration, pass an object to the `robots()` function call in `astro.config.*` file.

```ts
const siteUrl = "https://example.com";

export default defineConfig({
  //...
  integrations: [
    robots({
      host: siteUrl.replace(/^https?:\/\/|:\d+/g, ""),
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
          userAgent:'BLEXBot',
          disallow: ['/assets','/uploades/1989-08-21/*jpg$']
        }
      ],
    }),
  ],

  //...
});
```

With the above configuration you will get a `robots.txt` file as shown below.

✨ dist > robots.txt

```txt
User-agent: Applebot
User-agent: Googlebot
User-agent: bingbot
User-agent: Yandex
User-agent: Yeti
User-agent: Baiduspider
User-agent: 360Spider
User-agent: *
User-agent: 
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

> **Note:** Some directives (`Host` `Clean-param` `Crawl-delay`) are only supported by a few crawlers. For example from February 22, 2018, Yandex ignores the Crawl-delay directive. To set the speed at which robots downloads the site pages, use the [Site crawl rate](https://yandex.com/support/webmaster/service/crawl-rate.html#crawl-rate) in Yandex.Webmaster.

<br>
</details>

<details>

<summary><strong>Integration API</strong> (Add new directives and behaviors for your <i>robots.txt</i> file with only a few lines of config).</summary><br>

Through the above examples, you must have understood how `astro-robots` works. Next, let us learn more about its interface.

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

_For more detailed content, please refer to [JSDoc consts](./dist/consts.d.ts)._

```ts
export type UsertAgentType =
  | "*"
  | SearchEngines[keyof SearchEngines]
  | SocialNetwork[keyof SocialNetwork]
  | SearchEngineOptimization[keyof SearchEngineOptimization];
```

Still clueless, don't worry! We have powerful [JSDoc support](./dist/index.d.ts), whether you are an SEO expert or a novice, you can easily manage it.

Now just use `astro-robots` in your Astro project and it will tell everything about `robots.txt`.

</details>

### Examples

Visit the [Yandex Support](https://yandex.com/support/webmaster/controlling-robot/robots-txt.html#recommend) to learn more about directives.

We're planning to release more practical examples to cater to the mainstream search engine market.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.
