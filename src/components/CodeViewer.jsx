import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);

export default function CodeViewer({ files }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = files[active];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #2d2d2d", fontSize: "0.82rem" }}>
      {/* 檔案頁籤列 */}
      <div style={{ display: "flex", background: "#1e1e1e", overflowX: "auto" }}>
        {files.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderBottom: i === active ? "2px solid #3d5af1" : "2px solid transparent",
              background: i === active ? "#252526" : "transparent",
              color: i === active ? "#fff" : "#888",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "0.78rem",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
            }}
          >
            {f.name}
          </button>
        ))}
        <button
          onClick={handleCopy}
          style={{
            marginLeft: "auto",
            padding: "8px 14px",
            border: "none",
            background: "transparent",
            color: copied ? "#22c55e" : "#666",
            cursor: "pointer",
            fontSize: "0.75rem",
            whiteSpace: "nowrap",
          }}
        >
          {copied ? "已複製 ✓" : "複製"}
        </button>
      </div>

      {/* 說明列（選填） */}
      {current.desc && (
        <div style={{ background: "#252526", padding: "8px 16px", color: "#9da3b8", fontSize: "0.78rem", borderBottom: "1px solid #2d2d2d" }}>
          {current.desc}
        </div>
      )}

      {/* 程式碼區塊 */}
      <SyntaxHighlighter
        language={current.language ?? "jsx"}
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{ margin: 0, borderRadius: 0, maxHeight: "480px", fontSize: "0.82rem" }}
      >
        {current.code}
      </SyntaxHighlighter>
    </div>
  );
}
