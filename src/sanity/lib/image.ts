import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "../client";

const builder = createImageUrlBuilder(sanityClient);

/** Sanity の image アセットから URL を構築する。直接 _ref を <img> に渡しても表示されないため必須。 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
