import {
  A,
  Code,
  Context,
  Def,
  Em,
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
    title="Scientific Writing With Macromania"
    titleId="title"
    abstract={
      <>
        <P>
          This document showcases how to use{" "}
          <A href="https://github.com/worm-blossom/macromania">Macromania</A>
          {" "}
          to typeset scientific writing. Unlike the de-facto standard{" "}
          <A href="https://en.wikipedia.org/wiki/LaTeX">LaTeX</A>, Macromania
          expands its input to plaintext, not to PDFs. In this particular
          example document, that output plaintext forms a website that is
          suitable for sharing scientific writing.
        </P>
        <P>
          We show how to use a collection of macro packages to produce articles
          for the web. We do not examine the inner workings of Macromania nor
          how to write custom macros — producing nice output can be achieved
          without looking below the hood of the input markup.
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
        In mathematics and the natural sciences, most scientific writing is
        typeset with{" "}
        <A href="https://en.wikipedia.org/wiki/LaTeX">LaTeX</A>. LaTeX combines
        beautiful mathematical typesetting with a powerful and flexible macro
        system that lets authors abstract over the repetitive or complex parts
        of document preparation. Unfortunately, the macro system of LaTeX is
        rather dated. Macros are full of incidental complexity, often brittle,
        and rarely play nice across packages.
      </P>
      <P>
        <A href="https://github.com/worm-blossom/macromania">Macromania</A>{" "}
        attempts to build a more enjoyable macro expansion system, with a focus
        of principled interaction between packages, high-quality error messages,
        and consistent (and optionally statically typed) input syntax. In this
        document, we present a collection of packages for Macromania that allow
        typesetting documents in a way that should be familiar to users of
        LaTeX.
      </P>
      <P>
        In addition to the purportedly nicer writing experience, the output is
        that of a webpage. This enables styling with CSS, as well as the
        inclusion of interactive figures with javascript. We also showcase some
        niceties like a system for displaying tooltips when hovering over
        defined terms. And of course, there is math rendering via{" "}
        <M post=".">{`\\href{https://katex.org/}{\\KaTeX}`}</M>
      </P>

      <Hsection n="setup" title="Setup">
        <P>
          You can find the sources for generating this document{" "}
          <A href="https://github.com/worm-blossom/demo_macromania">here</A>. In
          particular,{" "}
          <A href="https://github.com/worm-blossom/demo_macromania/blob/main/src/main.tsx">
            main.tsx
          </A>{" "}
          contains the main markup and writing. We now — briefly — sketch what
          is going on below the hood, and how you can set things up to start
          experimenting with Macromania by modifying this document.
        </P>

        <P>
          To play around with typesetting by locally changing this document, you
          need to download the source code. The easiest way to do so is to use
          the program{" "}
          <Sidenote
            note={
              <>
                If you are not used to{" "}
                <A href="https://en.wikipedia.org/wiki/Command-line_interface">
                  command-line software
                </A>{" "}
                such as git, then installing and using Macromania might be
                challenging. It is quite usable once you get there, but do not
                hesitate to ask for help along the way.
              </>
            }
          >
            <A href="https://git-scm.com/">git</A>
          </Sidenote>. After you have installed git, run{" "}
          <Code>
            git clone https://github.com/worm-blossom/demo_macromania.git
          </Code>{" "}
          in a terminal to download the input files. As of writing, there is no
          more convenient or less geeky way for getting started, unfortunately.
        </P>

        <P>
          Whereas (La-)TeX defines its own input format and programming
          language, Macromania is an <Em>embedded</Em>{" "}
          language: Macromania input is a particular kind of{" "}
          <A href="https://www.typescriptlang.org/">TypeScript</A>{" "}
          code. You do not need to learn TypeScript to typeset documents with
          macromania, just like you do not need to learn macro writing to use
          LaTeX. You <Em>do</Em>{" "}
          need a way of executing TypeScript code. There is no dedicated program
          that converts Macromania input into output. The input instead{" "}
          <Em>is</Em> a (TypeScript) program that <Em>produces</Em> some output.
        </P>

        <P>
          As of writing, the only way to execute the input is via the{" "}
          <A href="https://deno.com/">Deno</A>{" "}
          <Sidenote
            note={
              <>
                There exist other ways of running TypeScript code, but, as of
                writing, some of the Macromania packages we use for this
                document rely on certain features of Deno.
              </>
            }
          >
            runtime
          </Sidenote>. After installation, you <Em>should</Em>{" "}
          be able to compile this very document by opening a terminal,{" "}
          <Code>cd</Code>-ing into the cloned git repository, and running{" "}
          <Code>deno task build</Code>. If that produces an error message, you
          will need to troubleshoot the setup.
        </P>

        <P>
          Building the output creates a <Code>build</Code>{"  "}
          directory that contains the finished website. To open the website,
          first run{" "}
          <Code>deno task serve</Code>. This spins up a webserver. You can then
          point your browser to{" "}
          <A href="http://localhost:8000">http://localhost:8000</A>{" "}
          to view the page.
        </P>

        <P>
          Now, you should try changing the input. Open{" "}
          <Code>
            <A href="https://github.com/worm-blossom/demo_macromania/blob/main/src/main.tsx">
              src/main.tsx
            </A>
          </Code>{" "}
          in a{" "}
          <A href="https://en.wikipedia.org/wiki/Text_editor">text editor</A>
          <Marginale>
            If your text error lights up with type errors, ignore them for now —
            this is a configuration issue we treat later.
          </Marginale>; this file contains the markup and text for the document.
          Scroll until you find some text, change it, save the document, rerun
          {" "}
          <Code>deno task build</Code>, and refresh the browser. The changes
          {" "}
          <Sidenote
            note={
              <>
                If they did not, make sure that you saved your edits, that
                building did not report any errors, that the webserver is still
                running, and that your browser is not serving{" "}
                <A href="https://filecamp.com/support/problem-solving/hard-refresh/">
                  cached data
                </A>.
              </>
            }
          >
            should
          </Sidenote>{" "}
          appear in the rendered document.
        </P>

        <P>
          To automatically rebuild the page whenever you change and save an
          input file, run{" "}
          <Code>deno task watch</Code>. You will still need to manually refresh
          the browser.
        </P>

        <P>
          <Marginale>
            While JSX originated from{" "}
            <A href="https://react.dev/">React</A>, Macromania has nothing to do
            with React. It merely uses the same input language.
          </Marginale>
          Macromania uses TSX as its input language, the Typescript version of
          {" "}
          <A href="https://en.wikipedia.org/wiki/JSX_(JavaScript)">JSX</A>. TSX
          allows programmers to write{" "}
          <A href="https://en.wikipedia.org/wiki/XML">XML</A>-like markup inside
          TypeScript code. Such tags are macro invocations that instruct
          Macromania to process their contents in a specific way.
        </P>
        <P>
          This text is not the place for an introduction to TSX, you will need
          to search the web for that. A good introduction to JSX will do as
          well, as the differences only matter when defining your own macros. We
          will assume basic familiaritx with JSX/TSX going forward.
        </P>
        <P>
          If your text editor reports type errors for the (unmodified) input
          document, then the TSX compilation is likely misconfigured. The source
          directory contains a{" "}
          <Code>
            <A href="https://github.com/worm-blossom/demo_macromania/blob/main/deno.json">
              deno.json
            </A>
          </Code>{" "}
          file. Copying this file into the parent directory (your{" "}
          <Em>workspace</Em>) appeases many text editors. If your editor ignores
          Deno-specific configuration files, your best bet is installing an
          editor plugin that knows about Deno.
        </P>
      </Hsection>

      
      
    </Hsection>

    <Hsection n="demoSubsection" title="Hey, a Subsection">

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
