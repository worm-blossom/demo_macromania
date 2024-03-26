import {
  A,
  Context,
  Def,
  EscapeHtml,
  Expression,
  Expressions,
  H,
  Hsection,
  M,
  Marginale,
  MM,
  P,
  PreviewScope,
  R,
  Rb,
  Rc,
  Rs,
  Rsb,
  Sidenote,
  Sidenotes,
  Span,
} from "../deps.ts";
import { ArticleTemplate } from "./articleTemplate.tsx";

const ctx = new Context();

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <ArticleTemplate
    title="Macromania Demo"
    titleId="theDemo"
    abstract={
      <>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac
          arcu elementum, bibendum nisi ac, fermentum tellus. Nunc semper
          finibus nunc sit amet semper. Aliquam erat volutpat. Vivamus lobortis
          gravida nunc, eu luctus ex bibendum ac. Cras posuere nisl non sem
          laoreet, eget porta orci interdum. Phasellus at pellentesque augue.
          Nullam porttitor ex viverra elit euismod cursus. Nam eleifend bibendum
          leo, tempor vulputate eros finibus sed.
        </P>
        <P>
          Integer eu nisi facilisis, rutrum mauris et, fermentum velit. Sed
          interdum condimentum arcu, id scelerisque augue vulputate vitae.
          Quisque pulvinar, augue non sagittis tincidunt, mi dui efficitur
          felis, eu ultricies nisi massa quis libero. Curabitur mollis nisl
          mauris, ac ullamcorper libero tempor quis. Ut eu mi nec augue
          efficitur hendrerit vel sed lorem. Duis placerat mauris a tortor
          egestas, sed congue neque eleifend. Etiam nunc dui, sodales vel ex
          vel, imperdiet suscipit odio.
        </P>
      </>
    }
    authors={[
      {
        name: "Aljoscha Meyer",
        affiliation: "TU Berlin",
        email: "mail@aljoscha-meyer.de",
      },
    ]}
  >
    <Hsection n="introduction" title="Introduction">
      <P>
        Aliquam ultrices in tellus quis imperdiet. Ut sollicitudin velit id
        auctor imperdiet. Donec vel orci tempus, commodo elit vel, dictum
        leo.<Marginale>This is a marginale.</Marginale>{" "}
        Aenean ligula ipsum, pharetra et felis quis, suscipit porta ligula.
        Curabitur id cursus odio, eu lacinia ante. Quisque sem massa, tristique
        sed libero id, auctor accumsan nibh. Nunc in dolor et felis{"  "}
        <Sidenote note="And this is a sidenote. It has an anchor, and everything.">
          eleifend
        </Sidenote>{" "}
        vulputate. Nunc in purus at mauris dignissim vehicula. Sed fermentum,
        turpis at hendrerit blandit, augue ante bibendum nisl, eu pharetra
        tortor enim eu eros.<Marginale>
          This is a marginale. fooooo fo ffffff ooo ooo oo ooo ooooooo oooooo
          oooo oooooooooo oooooooo oooo ooooooo oooooooo o!
        </Marginale>{" "}
        Aliquam feugiat quam sed nunc fringilla, et viverra eros semper. Donec
        vitae accumsan tellus.{" "}
        <Sidenotes
          notes={[
            "the first of two sidenotes.",
            "The second of two sidenotes.",
          ]}
        >{" "}
          Proin
        </Sidenotes>{" "}
        porttitor hendrerit odio a tincidunt.
      </P>
      <P>
        This repository gives a bare-bones demo of generating a basic website
        with{" "}
        <A href="https://github.com/worm-blossom/macromania">
          Macromania
        </A>. Nothing fancy yet. We do have math like <M>{`x^{1 - p}`}</M> via
        {" "}
        <M>\KaTeX</M> rendering though.
      </P>

      <MM>
        {`f(n) := \\sum_{i = 0}^{n} \\frac{1}{2 \\cdot i}`}
      </MM>

      <P>
        {/* Calling an example macro, defined at the end of this file. */}
        <Yell>
          This paragraph is real loud, cause we used a custom macro for yelling.
          This system really can do anything.
        </Yell>
      </P>

      {/* Creating an html tag dynamically */}
      <H name="p" attrs={{ id: "specialParagraph" }}>
        This paragraph was created with a macro that allows dynamic selection of
        HTML element names and attributes.
      </H>

      <P>
        Here is an example of escaping HTML:{" "}
        <EscapeHtml>{`<em>this is not a tag</em>`}</EscapeHtml>
      </P>
    </Hsection>

    <Hsection n="demoSubsection" title="Hey, a Subsection">
      <P>
        We have nested sections. You can reference a section, for example{" "}
        <Rc n="demoSubsection" />.
      </P>

      <Hsection n="demoSubsubsection" title="And a Subsubsection">
        <P>
          Here is a subsection. Yay! <Rc n="demoSubsection" /> and{" "}
          <Rc n="demoSubsubsection" /> exist.
        </P>

        <PreviewScope>
          <P>
            Time to define some concepts. Did you know that a{" "}
            <Def n="tree" rs="trees" /> is a connected, acyclic graph?{" "}
            <Rb n="tree" />, yes, <R n="tree" />. <Rsb n="tree" /> and{" "}
            <Rs n="tree" />.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            What is a <Def n="forest" rs="forests" />{" "}
            again? Not quite sure, but it probably involves fancy math like{" "}
            <M post=".">{`x^{1 - p}`}</M> Notice how the preview for{" "}
            <R n="forest" /> renders the math correctly.
          </P>

          <P>
            Defining another concept in the same PreviewScope means that their
            previews are shared. A <Def n="clearing" /> is a <R n="forest" />
            {" "}
            with a lot of space in between the <Rs n="tree" />.
          </P>
        </PreviewScope>

        <P>
          Instead of using PreviewScopes, you can also explicitly define a
          preview for a term. A{" "}
          <Def
            n="log"
            preview={
              <P>
                A <Def n="log" fake /> is the trunk of a <R n="tree" />.
              </P>
            }
          />{" "}
          has something to do with trees. <Rb n="log" />{" "}
          has a more informative preview.
        </P>
      </Hsection>
    </Hsection>

    <Hsection n="typographicElements" title="Typographic Elements">
      <P>
        This otherwise rather unremarkable paragraph reaches an elevated degree
        of interestingness by virtue of the text in the
        margin<Span clazz="onlyMargin">
          Hey, this text is in the margin. Neat!
        </Span>{" "}
        to its right.
      </P>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

/**
 * An example macro. See the
 * [Macromania tutorial](https://github.com/worm-blossom/macromania/blob/main/test/tutorial.tsx)
 * to learn what is going on here.
 *
 * If you want to write more serious macros, also look into the
 * [config framework](https://github.com/worm-blossom/macromania_config) and the
 * [logging framework](https://github.com/worm-blossom/macromania_logger).
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
