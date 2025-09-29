// source.config.ts
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  // point to your posts folder
  dir: 'src/posts',

});

export default defineConfig();