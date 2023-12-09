import { createNextRouteHandler } from 'uploadthing/next';

import { uploadthingFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: uploadthingFileRouter,
});
