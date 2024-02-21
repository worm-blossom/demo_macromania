import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.207.0/http/file_server.ts";

Deno.serve((req: Request) => {
  return serveDir(req, {
    fsRoot: "build",
    // urlRoot: "static",
  });
});
