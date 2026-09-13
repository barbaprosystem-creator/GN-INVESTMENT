import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    configFile: false,
    server: {
      host: '0.0.0.0',
      port: 5173
    }
  });

  await server.listen();
  console.log('✓ GN Investment Dev Server running stably on http://localhost:5173/');

  // Keep event loop active
  setInterval(() => {}, 60000);
}

start().catch(console.error);
