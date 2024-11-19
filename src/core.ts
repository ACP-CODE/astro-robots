import type { RobotsOptions } from ".";
import type { Policy } from "./types";
import type { AstroIntegrationLogger } from "astro";
import path from "node:path";

function validatePolicy(policy: Policy[], logger: AstroIntegrationLogger) {
  if (policy.length === 0) {
    throwMsg("Policy array must contain at least one entry.", "error", logger);
  }

  policy.forEach((policy, index) => {
    if (!policy.userAgent) {
      throwMsg(`policy[${index}].userAgent is required.`, "error", logger);
    }

    if (
      (!policy.allow && !policy.disallow) ||
      (policy.allow?.length === 0 && policy.disallow?.length === 0)
    ) {
      throwMsg(
        `policy[${index}] must have at least one 'disallow' or 'allow' entry.`,
        "error",
        logger,
      );
    }

    if (policy.crawlDelay) {
      if (
        typeof policy.crawlDelay !== "number" ||
        policy.crawlDelay < 0.1 ||
        policy.crawlDelay > 60
      ) {
        throwMsg(
          `policy[${index}].crawlDelay must be between 0.1 and 60 seconds.`,
          "error",
          logger,
        );
      }
    }
  });
}

function generatePolicyContent(policy: Policy[]): string {
  return policy
    .map((rule) => {
      let content = `User-agent: ${Array.isArray(rule.userAgent) ? rule.userAgent.join("\nUser-agent: ") : rule.userAgent || "*"}\n`;

      if (rule.allow) {
        const allowPaths = Array.isArray(rule.allow)
          ? rule.allow
          : [rule.allow];
        allowPaths.forEach((path: any) => (content += `Allow: ${path}\n`));
      }

      if (rule.disallow) {
        const disallowPaths = Array.isArray(rule.disallow)
          ? rule.disallow
          : [rule.disallow];
        disallowPaths.forEach(
          (path: any) => (content += `Disallow: ${path}\n`),
        );
      }

      if (rule.crawlDelay) content += `Crawl-delay: ${rule.crawlDelay}\n`;

      if (rule.cleanParam) {
        const cleanParams = Array.isArray(rule.cleanParam)
          ? rule.cleanParam
          : [rule.cleanParam];
        cleanParams.forEach(
          (param: any) => (content += `Clean-param: ${param}\n`),
        );
      }

      return content;
    })
    .join("\n");
}

function validateSitemapUrl(url: string): boolean {
  const urlPattern =
    /^(https?:\/\/)[^\s/$.?#].[^\s]*\.(xml|xml\.gz|txt|txt\.gz|json|xhtml)$/i;
  return urlPattern.test(url);
}

function generateSitemapContent(
  options: RobotsOptions,
  siteHref: string,
  logger: AstroIntegrationLogger,
): string {
  if (!options.sitemap) return "";

  if (options.sitemap === true) {
    if (siteHref) {
      const defaultSitemap = `${siteHref}sitemap-index.xml`;
      return `Sitemap: ${defaultSitemap}`;
    } else {
      logger.warn(
        "\x1b[33m`sitemap` is configured as true, but `AstroConfig.site` is not provided. Failed to generate default sitemap URL.\x1b[33m",
      );
      return "";
    }
  }

  const sitemaps = Array.isArray(options.sitemap)
    ? options.sitemap
    : [options.sitemap];
  const validSitemaps = sitemaps.filter((url) => {
    if (validateSitemapUrl(url)) {
      return true;
    } else {
      logger.warn(`\x1b[33mInvalid Sitemap URL: ${url}\x1b[33m`);
      return false;
    }
  });

  return validSitemaps.map((url) => `Sitemap: ${url}`).join("\n") + "\n";
}

function validateHost(host: string, logger: AstroIntegrationLogger) {
  const hostPattern =
    /^(?=.{1,253}$)(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$/;

  if (!hostPattern.test(host)) {
    throwMsg(
      "Host is invalid. It should be a valid domain like 'www.example.com'",
      "error",
      logger,
    );
  }
}

function generateHostContent(
  options: RobotsOptions,
  logger: AstroIntegrationLogger,
): string {
  if (options.host) {
    validateHost(options.host, logger); // 验证 host 是否为有效域名
    return `Host: ${options.host}\n`;
  }
  return "";
}

function throwMsg(
  msg: string,
  type: "warn" | "error",
  logger: AstroIntegrationLogger,
) {
  const formattedMsg = {
    warn: () => logger.warn(`\x1b[33mWarning: ${msg}\x1b[0m`),
    error: () => {
      logger.error(`\x1b[31m${msg}\x1b[0m`);
      throw new Error(msg);
    },
  };

  formattedMsg[type]?.();
}

export function generate(
  options: RobotsOptions,
  siteMapHref: string,
  logger: AstroIntegrationLogger,
): string {
  if (!options.policy || options.policy.length === 0) {
    throwMsg("Policy configuration is required.", "error", logger);
  }

  validatePolicy(options.policy, logger);

  const content = [
    generatePolicyContent(options.policy),
    generateSitemapContent(options, siteMapHref, logger),
    generateHostContent(options, logger),
  ].join("\n");

  return content.trim();
}

export function logInfo(
  fileSize: number,
  executionTime: number,
  logger: AstroIntegrationLogger,
  destDir: string,
) {
  const sizeLimit = 10;
  if (fileSize > sizeLimit) {
    console.log(
      `\n\x1b[42m\x1b[30m Generating 'robots.txt' file \x1b[39m\x1b[0m`,
    );
    const warnMsg = [
      `\x1b[33m(!) 'robots.txt' file size is ${fileSize} KB.`,
      `- Keep it under ${sizeLimit} KB for best results.\x1b[0m\n`,
    ];
    console.log(warnMsg.join("\n"));
  }

  logger.info(
    `\`robots.txt\` (${fileSize}KB) created at \`${path.relative(process.cwd(), destDir)}\` in ${executionTime}ms`,
  );
}
