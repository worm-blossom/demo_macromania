# Demo Macromania

This repository gives a demo of creating a website with macromania. While it will eventually evolve into something quite fancy, the current macros are extremely basic.

## Setup

First, install the [deno javascript runtime](https://deno.com/). The [macros](https://github.com/worm-blossom/macromania-fs) [for](https://github.com/worm-blossom/macromania-outfs) [file IO](https://github.com/worm-blossom/macromania-assets) currently only work with deno. Eventually, they should become runtime agnostic (and pluggable enough to work even in environments that don't have a file system), but we are not there yet.

Next, clone this repo, cd in there.

That is it. You can build the website with `deno task build`, you can make it build automatically after saving with `deno task watch`, and you can start a webserver for viewing the website with `deno task serve`.

## Editing

The entrypoint to macro expansion is `src/main.tsx`. Have fun!