import type { UserAgent } from "./UserAgent";

export interface Policy {
  /**
   * @description
   * Indicates the robot to which the rules listed in "robots.txt" apply.
   * @example
   * ```ts
   * policy:[
   *  {
   *    userAgent: [
   *      'Googlebot',
   *      'Applebot',
   *      'Baiduspider',
   *      'bingbot'
   *    ],
   *    // crawling rule(s) for above bots
   *  }
   * ]
   * ```
   * Verified bots, refer to [DITIG](https://www.ditig.com/robots-txt-template#regular-template) or [Cloudflare Radar](https://radar.cloudflare.com/traffic/verified-bots).
   */
  userAgent: UserAgent | UserAgent[];
  /**
   * @description
   * [ At least one or more `allow` or `disallow` entries per rule ] Allows indexing site sections or individual pages.
   * @example
   * ```ts
   * policy:[{allow:["/"]}]
   * ```
   * Path-based URL matching, refer to [SYNTAX](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt#url-matching-based-on-path-values) via Google.
   */
  allow?: string | string[];
  /**
   * @description
   * [ At least one or more `disallow` or `allow` entries per rule ] Prohibits indexing site sections or individual pages.
   * @example
   * ```ts
   * policy:[
   *  {
   *    disallow:[
   *      "/admin",
   *      "/uploads/1989-08-21/*.jpg$"
   *    ]
   *  }
   * ]
   * ```
   * Path-based URL matching, refer to [SYNTAX](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt#url-matching-based-on-path-values) via Google.
   */
  disallow?: string | string[];
  /**
   * @description
   *Specifies the minimum interval (in seconds) for the search robot to wait after loading one page, before starting to load another.
   *
   * @example
   * ```ts
   * policy:[{crawlDelay:5}]
   * ```
   * About the [Crawl-delay](https://yandex.com/support/webmaster/robot-workings/crawl-delay.html#crawl-delay) directive.
   */
  crawlDelay?: number;
  /**
   * @description
   * Indicates to the robot that the page URL contains parameters (like UTM tags) that should be ignored when indexing it.
   *
   * @example
   * ```shell
   * # for URLs like:
   * www.example2.com/index.php?page=1&sid=2564126ebdec301c607e5df
   * www.example2.com/index.php?page=1&sid=974017dcd170d6c4a5d76ae
   * ```
   *
   * ```js
   * policy:[
   *  {
   *    cleanParam: [
   *      "sid /index.php",
   *    ]
   *  }
   * ]
   * ```
   * For more additional examples, see the
   * Yandex [SYNTAX](https://yandex.com/support/webmaster/robot-workings/clean-param.html#clean-param__additional) guide.
   */
  cleanParam?: string | string[];
}
