import { Fragment, useMemo, useState } from "react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import go from "react-syntax-highlighter/dist/esm/languages/prism/go";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import type { CodeFile, Lesson, NotesConfig } from "./types";
import "./notes.scss";

SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);

const EXT_LANGUAGE: Record<string, string> = {
  go: "go",
  py: "python",
  jsx: "jsx",
  tsx: "tsx",
  js: "javascript",
  ts: "typescript",
};

function languageOf(fileName: string, fallback: string) {
  const ext = fileName.split(".").pop() ?? "";
  return EXT_LANGUAGE[ext] ?? fallback;
}

// 行內格式：`code` 與 **bold**
function inline(text: string): ReactNode {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function filesOf(l: Lesson): CodeFile[] {
  if (l.files) return l.files;
  return l.code ? [{ name: l.source, code: l.code }] : [];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="notes-copy"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
    >
      {copied ? "已複製 ✓" : "複製"}
    </button>
  );
}

function CodeBlock({ files, fallback }: { files: CodeFile[]; fallback: string }) {
  const [active, setActive] = useState(0);
  const current = files[active];
  return (
    <div className="code-wrap">
      {files.length > 1 && (
        <div className="code-tabs">
          {files.map((f, i) => (
            <button
              key={f.name}
              type="button"
              className={i === active ? "active" : ""}
              onClick={() => setActive(i)}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}
      <div className="code-body">
        <SyntaxHighlighter
          language={languageOf(current.name, fallback)}
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{
            margin: 0,
            borderRadius: files.length > 1 ? "0 0 10px 10px" : 10,
            fontSize: "0.82rem",
            maxHeight: 520,
          }}
        >
          {current.code.trimEnd()}
        </SyntaxHighlighter>
        <CopyButton text={current.code} />
      </div>
    </div>
  );
}

// 可直接操作的練習頁面，展開時才掛載（才會打 API）
function Preview({ component: Component }: { component: ComponentType }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`notes-preview${open ? " open" : ""}`}>
      <button type="button" className="notes-preview__toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "▼ 收合實際操作" : "▶ 實際操作"}
      </button>
      {open && (
        <div className="notes-preview__body">
          <Component />
        </div>
      )}
    </div>
  );
}

interface Props {
  config: NotesConfig;
  previews?: Record<string, ComponentType>; // key 為 lesson id
}

export default function NotesPage({ config, previews = {} }: Props) {
  const { language, name, color, repo, reference } = config;
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // 依日期排序，舊的在前
  const lessons = useMemo(
    () => [...config.lessons].sort((a, b) => a.date.localeCompare(b.date)),
    [config.lessons],
  );

  const allTags = useMemo(
    () => [...new Set(lessons.flatMap((l) => l.tags))],
    [lessons],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lessons.filter((l) => {
      if (activeTag && !l.tags.includes(activeTag)) return false;
      if (!q) return true;
      return [
        l.title,
        l.source,
        l.summary,
        ...l.tags,
        ...l.points,
        ...(l.sections ?? []).flatMap((s) => [s.title, ...s.items]),
        ...(l.pitfalls ?? []),
        ...(l.compare ?? []).flat(),
        ...filesOf(l).map((f) => f.code),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [lessons, query, activeTag]);

  const lastDate = lessons[lessons.length - 1]?.date ?? "—";

  return (
    <div className="notes" style={{ "--notes-accent": color } as CSSProperties}>
      <aside className="notes-aside">
        <h1 className="notes-brand">
          <span>{name}</span> 練習筆記
        </h1>
        <p className="notes-stats">
          {lessons.length} 個練習 · 最近更新 {lastDate}
          <br />
          <span className="notes-repo">{repo}</span>
        </p>
        <input
          className="notes-search"
          type="search"
          placeholder="搜尋關鍵字…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="notes-tags">
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              className={`notes-chip${activeTag === t ? " active" : ""}`}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
        <ul className="notes-toc">
          {visible.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`}>
                <span className="num">{String(lessons.indexOf(l) + 1).padStart(2, "0")}</span>
                {l.title}
              </a>
            </li>
          ))}
          {reference && (
            <li className="ref-link">
              <a href="#reference">
                <span className="num">≡</span>
                {reference.title}
              </a>
            </li>
          )}
        </ul>
      </aside>

      <main className="notes-main">
        {visible.length === 0 && <p className="notes-empty">找不到符合的內容</p>}

        {visible.map((l) => {
          const files = filesOf(l);
          return (
            <article key={l.id} id={l.id} className="notes-lesson">
              <div className="lesson-head">
                <span className="idx">#{String(lessons.indexOf(l) + 1).padStart(2, "0")}</span>
                <h2>{l.title}</h2>
                {l.demo && (
                  <Link className="demo-link" to={l.demo}>
                    看實際頁面 →
                  </Link>
                )}
              </div>
              <div className="meta">
                <span className="source">{l.source}</span>
                <span>{l.date}</span>
                {l.tags.map((t) => (
                  <span key={t} className="tag">
                    #{t}
                  </span>
                ))}
              </div>
              <p className="summary">{inline(l.summary)}</p>

              {previews[l.id] && <Preview component={previews[l.id]} />}

              <h3>重點</h3>
              <ul className="points">
                {l.points.map((p, i) => (
                  <li key={i}>{inline(p)}</li>
                ))}
              </ul>

              {l.sections?.map((s) => (
                <Fragment key={s.title}>
                  <h3>{s.title}</h3>
                  <ul className="points">
                    {s.items.map((item, i) => (
                      <li key={i}>{inline(item)}</li>
                    ))}
                  </ul>
                </Fragment>
              ))}

              {l.compare && l.compare.length > 0 && (
                <>
                  <h3>VUE 3 對照</h3>
                  <div className="compare">
                    {l.compare.map(([react, vue]) => (
                      <Fragment key={react}>
                        <span className="compare-react">{inline(react)}</span>
                        <span className="compare-vue">{inline(vue)}</span>
                      </Fragment>
                    ))}
                  </div>
                </>
              )}

              {files.length > 0 && (
                <>
                  <h3>{files.length > 1 ? "練習程式碼（點頁籤切換檔案）" : "練習程式碼"}</h3>
                  <CodeBlock files={files} fallback={language} />
                </>
              )}

              {l.output && (
                <>
                  <h3>執行結果</h3>
                  <pre className="output">{l.output}</pre>
                </>
              )}

              {l.pitfalls && l.pitfalls.length > 0 && (
                <div className="pitfalls">
                  <h3>⚠ 小提醒</h3>
                  <ul>
                    {l.pitfalls.map((p, i) => (
                      <li key={i}>{inline(p)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}

        {reference && (
          <section id="reference" className="notes-lesson">
            <h2>{reference.title}</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    {reference.columns.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reference.rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((cell, i) => (
                        <td key={i}>{inline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
