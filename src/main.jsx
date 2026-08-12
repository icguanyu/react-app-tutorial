import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./index.scss";
import App from "./App";
import Demo from "./demo";
import ArticleLayout from "./pages/articles/ArticleLayout";
import ArticleDetail from "./pages/articles/[id]";
import ApiTest from "./pages/apitest";
import ShopPage from "./pages/shop";
import ShopZustandPage from "./pages/shop-zustand";
import ShopReduxPage from "./pages/shop-redux";
import ConceptsPage from "./pages/concepts";
import { CartProvider } from "./context/CartContext";
const root = document.getElementById("root");
if (!root) throw new Error("#root element not found");

createRoot(root).render(
  <BrowserRouter basename="/react-app-tutorial/">
    <CartProvider>
      <nav className="site-nav">
        <NavLink to="/" end>
          首頁
        </NavLink>
        <NavLink to="/demo">Demo</NavLink>
        <NavLink to="/articles">文章列表</NavLink>
        <NavLink to="/apitest">API 測試</NavLink>
        <NavLink to="/shop">購物車 Context</NavLink>
        <NavLink to="/shop-zustand">購物車 Zustand</NavLink>
        <NavLink to="/shop-redux">購物車 Redux</NavLink>
        <NavLink to="/concepts">概念索引</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/articles" element={<ArticleLayout />}>
          <Route path=":id" element={<ArticleDetail />} />
        </Route>
        <Route path="/apitest" element={<ApiTest />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop-zustand" element={<ShopZustandPage />} />
        <Route path="/shop-redux" element={<ShopReduxPage />} />
        <Route path="/concepts" element={<ConceptsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </CartProvider>
  </BrowserRouter>,
);
