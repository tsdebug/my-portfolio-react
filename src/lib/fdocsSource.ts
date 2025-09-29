import { loader } from 'fumadocs-core/source';
import { create, docs } from '../../source.generated';

export const source = loader({
  // Build the in-memory source from generated maps
  source: await create.sourceAsync(docs.doc, docs.meta),
  // This lets Fumadocs build links relative to /blog
  baseUrl: '/blog',
});