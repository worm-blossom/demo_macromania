# Demo Macromania Pseudocode

This repository gives a demo of writing pseudocode with Macromania.

## Setup

First, install the [deno javascript runtime](https://deno.com/). The [macros](https://github.com/worm-blossom/macromania-fs) [for](https://github.com/worm-blossom/macromania-outfs) [file IO](https://github.com/worm-blossom/macromania-assets) currently only work with deno. Eventually, they should become runtime agnostic (and pluggable enough to work even in environments that don't have a file system), but we are not there yet.

Next, clone this repo, cd in there.

That is it. You can build the website with `deno task build`, you can make it build automatically after saving with `deno task watch`, and you can start a webserver for viewing the website with `deno task serve`.

If your text editor gives type errors for the jsx, you might have to add workspace-level jsx configuration in a `/path/to/workspace/deno.json` file:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Deno",

  "imports": {
    "macromaniajsx/jsx-dev-runtime": "https://deno.land/x/macromania@v0.1.0/mod.ts",
    "macromaniajsx/jsx-runtime": "https://deno.land/x/macromania@v0.1.0/mod.ts"
  },

  "compilerOptions": {
    "jsx": "react-jsxdev",
    "jsxImportSource": "macromaniajsx",
  }
}
```

## Editing

The entrypoint to macro expansion is in `src/main.tsx`. Have fun!
