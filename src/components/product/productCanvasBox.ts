/**
 * Pixel-identical box for scroll-linked WebGL: `#scroll-product-frame` is the source of truth;
 * `#scroll-product-hero-anchor` must use the same size classes so hero and product canvases match.
 */
export const PRODUCT_CANVAS_BOX_CLASSNAME =
  "h-[min(65vh,700px)] w-full min-h-[300px] md:h-[min(76vh,820px)] md:min-h-[400px] md:max-h-[min(86vh,900px)]";

/**
 * Same horizontal nudge on hero anchor + overview frame so `getBoundingClientRect()` matches
 * during scroll interpolation (avoids the box sliding sideways while scrolling).
 */
export const PRODUCT_CANVAS_SCROLL_SYNC_OFFSET_CLASSNAME =
  "md:-translate-x-10 lg:-translate-x-14";
