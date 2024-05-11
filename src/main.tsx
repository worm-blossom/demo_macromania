import {
  A,
  B,
  Code,
  Context,
  Counter,
  Def,
  Em,
  EscapeHtml,
  Expression,
  Expressions,
  H,
  Hsection,
  Li,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  Ol,
  P,
  PreviewScope,
  R,
  Rb,
  Rc,
  Rcb,
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

/*
Create macros for figures (which includes theorem-like blocks).
*/

const figureCounter = new Counter("figure-counter", 0);
const Fig = makeFigureMacro(ctx, {
  figureCounter: figureCounter,
  numberingInfo: {
    r: "Figure",
    rb: "Figure",
    rs: "Figures",
    rsb: "Figures",
    render: makeNumberingRenderer(),
  },
});

// A counter shared by several theorem-like blocks.
const thmCounter = new Counter("thm-counter", 0);

const Theorem = makeFigureMacro(ctx, {
  figureCounter: thmCounter,
  numberingInfo: {
    r: "Theorem",
    rb: "Theorem",
    rs: "Theorems",
    rsb: "Theorems",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

const Example = makeFigureMacro(ctx, {
  figureCounter: thmCounter, // Shares the same counter as the `Theorem` macro.
  numberingInfo: {
    r: "Example",
    rb: "Example",
    rs: "Examples",
    rsb: "Examples",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

// Exercises are rendered as theorem-like blocks, but do not share the same counter.
const exerciseCounter = new Counter("exercise-counter", 0);

const Exercise = makeFigureMacro(ctx, {
  figureCounter: exerciseCounter, // Different counter than the `Theorem` macro.
  numberingInfo: {
    r: "Exercise",
    rb: "Exercise",
    rs: "Exercises",
    rsb: "Exercises",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

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
          LaTeX. You <Em>do</Em> need a way of <Em>executing</Em>{" "}
          TypeScript code. There is no dedicated program that converts
          Macromania input into output. The input instead <Em>is</Em>{" "}
          a (TypeScript) program that <Em>produces</Em> some output.
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
            If your text editor lights up with type errors, ignore them for now
            — this is a configuration issue we treat later.
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
          <A href="https://en.wikipedia.org/wiki/XML">XML</A>-like markup tags
          inside TypeScript code. Such tags are macro invocations that instruct
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
          learn about writing your own macros, head to the dedicated{" "}
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
        macro to delay the placement of body text until all prior marginales
        have run their course.
      </P>

      <P>
        <Marginale>
          <H
            name="img"
            isVoid
            attrs={{
              src: `/assets/wormblossom_pretty.jpg`,
              alt:
                `A logo for worm-blossom, the two folks behind Macromania. A circular arrangement of flower petals around a curled-up worm. It is pretty.`,
            }}
          />
        </Marginale>
        For HTML-related reasons, marginalia layout breaks when marginalia
        contain certain HTML elements, such as <Code>div</Code> or{" "}
        <Code>p</Code>{" "}
        elements. To be precise, all elements inside a marginale (or sidenote)
        must be{" "}
        <A href="https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2">
          HTML phrasing content
        </A>{" "}
        for things to work. You <Em>can</Em> use images.
      </P>

      <P>
        Marginalia and sidenotes are displayed only on sufficiently wide
        screens, so keep that in mind when deciding whether some information
        should go into the body text or into the margins.
      </P>

      <P clazz="wide">
        Any HTML elements with the <Code>wide</Code>{" "}
        class extend into the margins. If the screen size is too narrow to
        display marginalia, then those elements do not gain any extra width.
      </P>
    </Hsection>

    <Hsection n="defref" title="DefRef">
      <P>
        <A href="https://github.com/worm-blossom/macromania_defref">DefRef</A>
        {" "}
        is a package for defining terminology and referencing definitions such
        that hovering over a reference displays a tooltip. Here we define{" "}
        <Def n="forest" preview={<P>A forest is a graph without cycles.</P>} />,
        and now we reference <R n="forest" />.
      </P>

      <P>
        The <Code>n</Code> prop uniquely identifies the defined term, the{" "}
        <Code>preview</Code>{" "}
        prop defines the corresponding tooltip. You cannot define the same
        terminology multiple times, so if you want to have the first mention of
        a term in its tooltip look like a definition, use the <Code>fake</Code>
        {" "}
        prop:{" "}
        <Def
          n="tree"
          preview={
            <P>
              A <Def n="tree" fake /> is a connected <R n="forest" />.
            </P>
          }
        />.
      </P>

      <PreviewScope>
        <P>
          Instead of explicitly specifying the preview content, you can also
          instruct DefRef to use the surrounding context of the{" "}
          <Code>
            <EscapeHtml>{`<Def/>`}</EscapeHtml>
          </Code>{" "}
          macro by defining a{" "}
          <Code>
            <EscapeHtml>{`<PreviewScope/>`}</EscapeHtml>
          </Code>.
        </P>

        <P>
          Multiple definitions can share the same scope: <Def n="foo" /> and
          {" "}
          <Def n="bar" />, for example.
        </P>
      </PreviewScope>

      <P>
        When referencing a concept at the beginning of a sentence, use the{" "}
        <Code>
          <EscapeHtml>{`<Rb/>`}</EscapeHtml>
        </Code>{" "}
        macro instead of the{" "}
        <Code>
          <EscapeHtml>{`<R/>`}</EscapeHtml>
        </Code>.{" "}
        <Rb n="tree" />, for example. By default, this capitalizes the term.
      </P>

      <PreviewScope>
        <P>
          The display text for a definition and its references defaults to its
          {" "}
          <Code>n</Code> prop, but you can override it with the <Code>r</Code>
          {" "}
          prop. You can further override the display for the
          beginning-of-sentence version with the <Code>rb</Code>{" "}
          prop: definition of{" "}
          <Def n="naive-set" r="set" rb="Flub" />, and references{" "}
          <Rb n="naive-set" /> and <R n="naive-set" />.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          If a{" "}
          <Code>
            <EscapeHtml>{`<Def>`}</EscapeHtml>
          </Code>{" "}
          macro has children, they give the display text of the definition,
          while references still use the <Code>n</Code> (or <Code>r</Code> or
          {" "}
          <Code>rb</Code>) props: definition of{" "}
          <Def n="die">dice</Def>, references <R n="die" /> and <Rb n="die" />.
        </P>
      </PreviewScope>

      <P>
        Similarly, you can override how a reference renders by giving it
        children: <R n="forest">grove</R>.
      </P>

      <PreviewScope>
        <P>
          Definitions can specify a plural form that can be referenced via the
          {" "}
          <Code>
            <EscapeHtml>{`<Rs>`}</EscapeHtml>
          </Code>{" "}
          macro. For plural references at the beginning of sentences, use{" "}
          <Code>
            <EscapeHtml>{`<Rsb>`}</EscapeHtml>
          </Code>. Definition of <Def n="mouse" rs="mice" />, references{" "}
          <Rs n="mouse" /> and <Rsb n="mouse" />.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          <Marginale>
            This marginale is visible in the preview of <R n="wide_def" />.
          </Marginale>
          By default, previews are wide enough to fit the body text width, but
          they exclude marginalia. To have previews include marginalia on
          sufficiently wide screens, set the <Code>wide</Code>{" "}
          flag on a definition. Definition of{" "}
          <Def n="wide_def" wide />, references <R n="wide_def" /> and{" "}
          <Rb n="wide_def" />.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          You can define concepts in math mode. References outside mathmode
          still work. Definition in math mode of{" "}
          <M>
            <Def n="nat" r="\natnums" />
          </M>, reference in math mode{" "}
          <M>
            <R n="nat" />
          </M>{" "}
          and outside math mode <R n="nat" />.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          The <Code>math</Code>{" "}
          prop of a definition specifies an alternate expansion to be used by
          references in math mode. Definition (outside math mode) of the{" "}
          <Def
            n="integers"
            r="set of integers"
            math={`\\Z`}
          />, reference in math mode{" "}
          <M>
            <R n="integers" />
          </M>{" "}
          and outside math mode <R n="integers" />.
        </P>
      </PreviewScope>
    </Hsection>

    <Hsection n="sections" title="Sections and Numbered Elements">
      <P>
        To define sections, subsections, and so on, use the{" "}
        <Code>
          <EscapeHtml>{`<Hsection>`}</EscapeHtml>
        </Code>{"  "}
        (<B>H</B>ierarchical{" "}
        <B>Section</B>) macro. You can nest up to five times; nesting deeper
        still causes an error.
      </P>

      <P>
        The <Code>title</Code>{" "}
        prop defines the user-visible title of the section. The <Code>n</Code>
        {" "}
        prop defines the HTML id and allows you to reference the section via the
        {" "}
        <Code>
          <EscapeHtml>{`<Rc>`}</EscapeHtml>
        </Code>{" "}
        (<B>r</B>eference <B>c</B>ounted) and{" "}
        <Code>
          <EscapeHtml>{`<Rcb>`}</EscapeHtml>
        </Code>{" "}
        (<B>r</B>eference <B>c</B>ounted <B>b</B>eginning of sentence) macros:
        {" "}
        <Rc n="sections" /> and{" "}
        <Rcb n="sections" />. Both render the same, but some might reconfigure
        them to only capitalize at the beginning of sentences, for example. You
        should always use the appropriate macro, so that the rendering can be
        consistently changed later.
      </P>

      <P>
        You can also use the{" "}
        <Code>
          <EscapeHtml>{`<R>`}</EscapeHtml>
        </Code>{" "}
        and{" "}
        <Code>
          <EscapeHtml>{`<Rb>`}</EscapeHtml>
        </Code>{" "}
        macros to render a reference to a section by its title or arbitrary
        text: <R n="defref" />, <Rb n="defref" />, and <R n="defref">Fblthp</R>.
      </P>

      <P>
        We now demonstrate the various levels of nesting. You probably should
        not use them all.
      </P>

      <Hsection n="sections2" title="Nested Section">
        <P>
          <Rcb n="sections2" /> and <Rc n="sections2" />. Lorem ipsum and stuff.
        </P>

        <Hsection n="sections3" title="Double-Nested Section">
          <P>
            <Rcb n="sections3" /> and{" "}
            <Rc n="sections3" />. Lorem ipsum and stuff.
          </P>

          <Hsection n="sections4" title="Triple-Nested Section">
            <P>
              <Rcb n="sections4" /> and{" "}
              <Rc n="sections4" />. Lorem ipsum and stuff.
            </P>
            <Hsection n="sections5" title="Quadruple-Nested Section">
              <P>
                <Rcb n="sections5" /> and{" "}
                <Rc n="sections5" />. Lorem ipsum and stuff.
              </P>
            </Hsection>
          </Hsection>
        </Hsection>
      </Hsection>

      <Hsection n="figures" title="Figures and Theorems">
        <P>You can insert figures that are numbered automatically:</P>

        <Fig n="firstFigure">
          <H
            name="img"
            isVoid
            attrs={{
              src: `/assets/macromania_deco.png`,
              alt:
                `A Macromania logotype, written in a rather manic, hand-lettered font, and adorned with silly little emblems.`,
            }}
          />
        </Fig>

        <P>
          Figures can have a title:
        </P>

        <Fig n="secondFigure" title="The Macromania Logotype">
          <H
            name="img"
            isVoid
            attrs={{
              src: `/assets/macromania_deco.png`,
              alt:
                `A Macromania logotype, written in a rather manic, hand-lettered font, and adorned with silly little emblems.`,
            }}
          />
        </Fig>

        <P>
          And figures can have a caption:
        </P>

        <Fig
          n="thirdFigure"
          title="The Macromania Logotype"
          caption={
            <P>The Macromania logotype exudes discipline and restraint.</P>
          }
        >
          <H
            name="img"
            isVoid
            attrs={{
              src: `/assets/macromania_deco.png`,
              alt:
                `A Macromania logotype, written in a rather manic, hand-lettered font, and adorned with silly little emblems.`,
            }}
          />
        </Fig>

        <P>
          You can reference figures as well: <Rc n="firstFigure" />,{" "}
          <Rcb n="firstFigure" />.
        </P>

          <P>We also have numbered blocks similar to the LaTeX <Code>\newtheorem</Code> construct:</P>

        <Theorem n="firstTheorem">
          <P>Trees are useful.</P>
        </Theorem>

        <Example n="firstExample">
          <P>Trees provide oxigen, which is useful for breathing.</P>
        </Example>

        <Exercise n="firstExercise">
          <P>List three ways in which trees are useful.</P>
          <P>They must differ from that of <Rc n="firstExample"/>.</P>
        </Exercise>

        <P>
          You can create your own theorem-like macros, see the creation of <Code><EscapeHtml>{`<Theorem>`}</EscapeHtml></Code>, <Code><EscapeHtml>{`<Example>`}</EscapeHtml></Code>, and <Code><EscapeHtml>{`<Exercise>`}</EscapeHtml></Code> at the beginning of this very input file. Notice how theorems and examples share a counter, but exercises use a separate counter. 
        </P>
      </Hsection>
    </Hsection>

    <Hsection n="cite" title="Citing">
      <P>Citations and references are quite an involved topic. We do not have a good package yet, and might not get to it for a while, either. Any serious attempt should probably build on the <A href="https://citationstyles.org/">Citation Style Language</A>.</P>
    </Hsection>

    <Hsection n="assets" title="Assets">
      <P>TODO document asset loading and how to get styles and js into previews.</P>
    </Hsection>

  </ArticleTemplate>
  // Further TODOs: better TOC displaying of whch sections are currently on screen.
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);