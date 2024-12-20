<div align="center">

**Latest Updates! 🎉 See the [change log](./CHANGELOG.md) for details.**

<img height="128" alt="" src="./assets/logo.svg">

# astro-robots

It simplifies SEO management with a reliable robots.txt generator for Astro projects, offering zero-config setup and [Verified Bots](https://radar.cloudflare.com/traffic/verified-bots) support.

[![Build Status](https://github.com/ACP-CODE/astro-robots/actions/workflows/release.yaml/badge.svg?style=flat-square)](https://github.com/ACP-CODE/astro-robots/actions/workflows/release.yaml)
![NPM Version](https://img.shields.io/npm/v/astro-robots?labelColor=black&color=light)
![NPM Downloads](https://img.shields.io/npm/d18m/astro-robots?labelColor=balck)

</div>

## Installation

> The package compatible with Astro 4.0.0 and later.

Quickly install with the `astro add` command:

```sh
npx astro add astro-robots
```

If you run into issues, try with [Manual Setup](#setup) guide.

## Usage

<details>
<summary>Manual Setup</summary>

#### Setup

To install manually, run:

```sh
npm install astro-robots
```

Add the integration to your Astro config file (`astro.config.*`):

```ts
// @ts-check
import { defineConfig } from "astro/config";
import robots from "astro-robots"; // Add code manually

export default defineConfig({
  site: "https://example.com"; // If you want to support `@astrojs/sitemap` please provide this value
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

#### Live Access

Start the server with `npm run dev`, then access the virtual `robots.txt` at `http://localhost:4321/robots.txt`.


</details>

<details>

<summary>Getting Started with Reference</summary><br>

To configure the integration, pass an object to the `robots()` function in your `astro.config.*` file:

```ts
// @ts-check
import { defineConfig } from "astro/config";
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

## Contributing

Submit your issues or feedback on our [GitHub](https://github.com/ACP-CODE/astro-robots/issues) channel.

## License

MIT
