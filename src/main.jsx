import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./index.scss";
import ArticleLayout from "./pages/articles/ArticleLayout";
import ArticleDetail from "./pages/articles/[id]";
import NotesPage from "./pages/notes/NotesPage";
import { reactNotes } from "./pages/notes/data/react";
import { reactPreviews } from "./pages/notes/data/react-previews";
import { goNotes } from "./pages/notes/data/go";
import { pythonNotes } from "./pages/notes/data/python";
import { CartProvider } from "./context/CartContext";
const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

// 練習頁面都已嵌入 React 筆記的「實際操作」，舊網址導過去
const MOVED_TO_REACT_NOTES = ["/demo", "/apitest", "/shop", "/shop-zustand", "/shop-redux", "/concepts"];

createRoot(root).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <CartProvider>
      <nav className="site-nav">
        <NavLink to="/react">React 筆記</NavLink>
        <NavLink to="/go">Go 筆記</NavLink>
        <NavLink to="/python">Python 筆記</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/react" replace />} />
        <Route
          path="/react"
          element={<NotesPage key="react" config={reactNotes} previews={reactPreviews} />}
        />
        <Route path="/go" element={<NotesPage key="go" config={goNotes} />} />
        <Route path="/python" element={<NotesPage key="python" config={pythonNotes} />} />
        {/* 巢狀路由練習需要真正的網址，保留成獨立頁面（從 React 筆記連過來） */}
        <Route path="/articles" element={<ArticleLayout />}>
          <Route path=":id" element={<ArticleDetail />} />
        </Route>
        {MOVED_TO_REACT_NOTES.map((path) => (
          <Route key={path} path={path} element={<Navigate to="/react" replace />} />
        ))}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </CartProvider>
  </BrowserRouter>,
);
