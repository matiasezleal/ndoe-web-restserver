import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

// Create server instance
export const server = new Server({
  port: envs.PORT,
  public_path: envs.PUBLIC_PATH,
  router: AppRoutes.routes,
});

// Export app instance for testing
export const app = server.getApp();

// Only start the server if we're running the file directly
if (require.main === module) {
  (async () => {
    main();
  })();
}

function main() {
  server.start();
}