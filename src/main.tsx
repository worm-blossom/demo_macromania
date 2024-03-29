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
  Li,
  M,
  Marginale,
  MM,
  Ol,
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
  Strong,
  Ul,
  WaitForMarginales,
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
          will assume basic familiarity with JSX/TSX going forward.
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

        <P>
          We can now delve into writing texts with Macromania. If you want to
          learn about writing your own macros, head to the{" "}
          <A href="https://github.com/worm-blossom/macromania/blob/main/test/tutorial.tsx">
            tutorial
          </A>.
        </P>
      </Hsection>
    </Hsection>

    <Hsection n="basicTypography" title="Basic HTML and Typography">
      <P>
        We use HTML-like tags to mark up the input text. Wrap paragraphs in{" "}
        <Code>P</Code> tags; you can use other tags to produce{" "}
        <Em>emphasized</Em> or <Strong>strong</Strong> text, for example. You
        {" "}
        <Em>must</Em>{" "}
        capitalize these macro names. There are macros for most HTML tags, the
        missing ones are a work-in-progress.
      </P>

      <P>
        You can include inline <Code>code samples</Code> and{" "}
        <A href="https://example.org/">hyperlinks</A>. As you can see with the
        {" "}
        <Code>A</Code> macro, HTML attributes are supported. The{" "}
        <Code>class</Code> HTML attribute must be spelled as <Code>clazz</Code>
        {" "}
        though, because TypeScript reserves the name <Code>class</Code>{" "}
        for different purposes.
      </P>

      <Ul>
        <Li>Lists</Li>
        <Li>are</Li>
        <Li>nice.</Li>
      </Ul>

      <Ol>
        <Li>Numbered</Li>
        <Li>
          lists<Ul>
            <Li>Nested</Li>
            <Li>list!</Li>
          </Ul>
        </Li>
        <Li>too.</Li>
      </Ol>

      <P>
        There is a macro for escaping HTML:{" "}
        <EscapeHtml>{`<em>hi</em>`}</EscapeHtml>, for example, would render as
        {" "}
        <Em>hi</Em> if not escaped.
      </P>

      <P>
        You can dynamically create HTML tags with a general-purpose macro; here
        is an example of an{" "}
        <Code>
          <EscapeHtml>{`<img/>`}</EscapeHtml>
        </Code>{" "}
        tag:
      </P>

      <H
        name="img"
        isVoid
        attrs={{
          src: `/assets/macromania_deco.png`,
          alt:
            `A Macromania logotype, written in a rather manic, hand-lettered font, and adorned with silly little emblems.`,
        }}
      />

      <P>
        To typeset math, we use <M>{`\\href{https://katex.org/}{\\KaTeX}`}</M>
        {" "}
        to render LaTeX input to HTML. We support both inline math such as{" "}
        <M>{`x^{1 - p}`}</M> and display math:
      </P>

      <MM>
        {`f(n) := \\sum_{i = 0}^{n} \\frac{1}{2 \\cdot i}`}
      </MM>

      <P>
        You can find the list of KaTeX-supported math input{" "}
        <A href="https://katex.org/docs/support_table">here</A>.
      </P>

      <P>
        Due to a long-standing{" "}
        <A href="https://github.com/KaTeX/KaTeX/issues/1233">KaTeX issue</A>
        {" "}
        with line breaks directly before or after inline math, you can add
        options to the{" "}
        <Code>
          <EscapeHtml>{`<M>`}</EscapeHtml>
        </Code>{" "}
        macro to prefix or postfix the math with regular text that cannot be
        separated from the math via linebreaks:{" "}
        <M pre="(" post=")">x \cdot y</M>{" "}
        for example. The most common usecase is for punctuation after a formula,
        like this: <M post=".">{`\\sqrt{n}`}</M>
      </P>

      <P>
        Be careful with escaping curly braces in JSX and backslashes in
        TypeScript when writing LaTeX math.
      </P>

      <P>
        You can place marginalia{" "}
        <Marginale>
          A marginale is placed in the margins without an associated counter.
        </Marginale>{" "}
        as well as{" "}
        <Sidenote
          note={
            <>
              A sidenote ist anchored to some body text and is visually tied to
              the anchor through a counter.
            </>
          }
        >
          sidenotes
        </Sidenote>. There is a separate{" "}
        <Sidenotes
          notes={[
            <>
              This may seem cumbersome, but is actually nicer for inputting
              text.
            </>,
            <>
              If there was no separate macro, Macromania might split a note that
              you intended as a single sidenote into several sidenotes. Better
              to be explicit in the input markup.
            </>,
          ]}
        >
          macro
        </Sidenotes>{" "}
        for attaching multiple sidenotes to the same anchor text.
      </P>

      <P>
        As this paragraph demonstrates, marginales can extend well below the
        paragraph to which they belong.
      </P>

      <WaitForMarginales />

      <P>
        You can use the{" "}
        <Code>
          <EscapeHtml>{`<WaitForMarginales/>`}</EscapeHtml>
        </Code>{" "}
        macro to delay the placement of body text until all marginales have run
        their course.
      </P>
    </Hsection>

    <Hsection n="sections" title="Sections">
    </Hsection>

    <Hsection n="defref" title="DefRef">
    </Hsection>

    <Hsection n="numbered" title="Numbered Elements">
    </Hsection>

    <Hsection n="cite" title="Citing">
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
