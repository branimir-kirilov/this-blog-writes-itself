import TOCInline from "pliny/ui/TOCInline.js";
import Pre from "pliny/ui/Pre.js";
import type { MDXComponents } from "mdx/types";
import Image from "./Image";
import CustomLink from "./Link";

export const components: MDXComponents = {
  Image,
  TOCInline,
  pre: Pre,
  a: CustomLink,
};
