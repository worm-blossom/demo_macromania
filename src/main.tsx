import {
  Assets,
  Body,
  Context,
  Dir,
  EscapeHtml,
  Expression,
  Expressions,
  File,
  H,
  H1,
  Head,
  Html,
  Link,
  M,
  Meta,
  MM,
  P,
  Title,
} from "../deps.ts";

const ctx = new Context();

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <Dir name="build">
    <Dir name="assets">
      {/* See https://github.com/worm-blossom/macromania-assets */}
      <Assets input={["src", "assets"]} assets={{}} />
    </Dir>
    <File name="index.html">
      {"<!DOCTYPE html>"}
      <Html>
        <Head>
          <Title>Macromania Demo</Title>
          <Meta charset="utf-8" />
          <H name="meta" attrs={{ charset: "utf-8" }} isVoid />
          <Link href="assets/index.css" rel="stylesheet" />
          <Link href="assets/katex.min.css" rel="stylesheet" />
        </Head>

        <Body>
          <H1>Macromania Demo</H1>
          <P>
            This repository gives a bare-bones demo of generating a basic
            website with Macromania. Nothing fancy yet. We do have lovely math
            like <M>{`x^{1 - p}`}</M> via <M>\KaTeX</M> rendering though.
          </P>

          <MM>
            {`f(n) := \\sum_{i = 0}^{n} \\frac{1}{2 \\cdot i}`}
          </MM>

          <P>
            {/* Calling an example macro, defined at the end of this file. */}
            <Yell>
              This paragraph is real loud, cause we gave it to a custom macro for
              yelling. This system really can do anything.
            </Yell>
          </P>

          {/* Creating an html tag dynamically */}
          <H name="p" attrs={{ id: "specialParagraph" }}>
            This paragraph was created with a macro that allows dynamic
            selection of HTML element names and attributes.
          </H>

          <P>
            Here is an example of escaping HTML:{" "}
            <EscapeHtml>{`<em>this is not a tag</em>`}</EscapeHtml>
          </P>
        </Body>
      </Html>
    </File>
  </Dir>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

/**
 * An example macro. See the
 * [Macromania tutorial](https://github.com/worm-blossom/macromania/blob/main/test/tutorial.tsx)
 * to learn what is going on here.
 */
function Yell({ children }: { children?: Expressions }): Expression {
  return (
    <map
      fun={(evaled, _ctx) => {
        return evaled.toUpperCase();
      }}
    >
      <exps x={children} />
    </map>
  );
}
