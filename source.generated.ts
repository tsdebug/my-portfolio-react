/// <reference types="vite/client" />
import { fromConfig } from 'fumadocs-mdx/runtime/vite';
import type * as Config from './source.config';

export const create = fromConfig<typeof Config>();

export const docs = {
  doc: create.doc("docs", "./src/posts", import.meta.glob(["./**/*.{mdx,md}"], {
    "base": "./src/posts",
    "query": {
      "collection": "docs"
    }
  })),
  meta: create.meta("docs", "./src/posts", import.meta.glob(["./**/*.{json,yaml}"], {
    "import": "default",
    "base": "./src/posts",
    "query": {
      "collection": "docs"
    }
  }))
};