import {
  ConfigDefref,
  ConfigHsection,
  ConfigPreviews,
  ConfigWebserverRoot,
  Div,
  JsDependency,
  makeNumberingRenderer,
  ScriptDependencyInfo,
  TableOfContents,
} from "../deps.ts";
import { ScriptDependency } from "../deps.ts";
import { Section } from "../deps.ts";
import {
  Assets,
  Config,
  ConfigKatex,
  CssDependency,
  Dir,
  Expression,
  Expressions,
  File,
  Hsection,
  Html5,
  ServerRoot,
} from "../deps.ts";
import { LayoutStyles } from "./layoutStyles.tsx";

export type ArticleTemplateProps = {
  title: Expression;
  titleId: string;
  abstract?: Expressions;
  authors?: AuthorInfo[];
};

export type AuthorInfo = {
  name: Expressions;
  email?: Expressions;
  affiliation?: Expressions;
  other?: Expressions;
};

const prettyPreviewsInfo: ScriptDependencyInfo = {
  dep: ["pretty_previews.js"],
  scriptProps: { defer: true },
};

export function ArticleTemplate(
  { title, titleId, abstract, children, authors }: ArticleTemplateProps & {
    children?: Expressions;
  },
): Expression {
  const headingPreRenderer = makeNumberingRenderer(1);
  return (
    <Config
      options={[
        <ConfigKatex stylesheet={["katex.min.css"]} />,
        <ConfigHsection
          titleRenderPre={(ctx, numbering) => {
            if (numbering.length <= 1) {
              return "";
            } else {
              return <>{headingPreRenderer(ctx, numbering)}{" "}</>;
            }
          }}
        />,
        <ConfigPreviews
          previewPath={["build", "previews"]}
          cssDeps={[{ dep: ["index.css"] }]}
          jsDeps={[prettyPreviewsInfo]}
        />,
        <ConfigDefref
          depsCssDef={[]}
          depsJsDef={[prettyPreviewsInfo]}
          depsCssPreview={[]}
          depsJsPreview={[]}
          depsCssRef={[]}
          depsJsRef={[prettyPreviewsInfo]}
          wrapPreviews={(_ctx, preview) => {
            return <Div id="wrapContent">{preview}</Div>
          }}
        />,
      ]}
    >
      {/* Create some assets before the "real" build step. */}
      <Dir clean={false} name="src">
        <Dir clean={false} name="assets">
          <File mode="assertive" name="layout.css">
          <LayoutStyles
                htmlFontSizeInPx={19.2}
                paddingLeft={0.8}
                paddingRight={0.8}
                maxMain={32}
                paddingMarginalia={1.6}
                marginalia={14}
                paddingToc={1.6}
                toc={13}
                // dev
              />
          </File>
        </Dir>
      </Dir>

      <Dir name="build">
        <ServerRoot url="">
          <Dir name="assets">
            {/* See https://github.com/worm-blossom/macromania-assets */}
            <Assets input={["src", "assets"]} assets={{}} />
          </Dir>
          <File name="index.html">
            <Html5 title="Macromania Demo" headContents={`<meta name="viewport" content="width=device-width, initial-scale=1">`}>
              <CssDependency dep={["index.css"]} />
              <ScriptDependency
                dep={["defs.js"]}
                scriptProps={{ type: "module" }}
              />

              <Div id="wrapContent">
                <Hsection title={title} n={titleId}>
                  <TableOfContents stopLevel={99} />
                  <Div>
                    <RenderAuthors authors={authors ?? []} />
                  </Div>
                  <Div>
                    <RenderAbstract children={abstract} />
                  </Div>
                  <exps x={children} />
                </Hsection>
              </Div>
            </Html5>
          </File>
        </ServerRoot>
      </Dir>
    </Config>
  );
}

function RenderAbstract({ children }: { children?: Expressions }): Expression {
  if (children === undefined) {
    return "";
  }
  return <Section clazz="abstract" children={children} />;
}

function RenderAuthors({ authors }: { authors: AuthorInfo[] }): Expression {
  if (authors.length === 0) {
    return "";
  }

  const authorRendering = authors.map(renderAuthor);
  return (
    <Div clazz="authors">
      <exps x={authorRendering} />
    </Div>
  );
}

function renderAuthor(author: AuthorInfo): Expression {
  return (
    <Div clazz="author">
      <Div clazz="authorName">{author.name}</Div>
      {author.affiliation
        ? <Div clazz="authorAffiliation">{author.affiliation}</Div>
        : ""}
      {author.email ? <Div clazz="authorEmail">{author.email}</Div> : ""}
      {author.other ? <Div clazz="authorOther">{author.other}</Div> : ""}
    </Div>
  );
}
