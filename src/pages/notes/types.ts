/*
 * 練習筆記的資料格式（Go / Python / React 共用）
 * 新增一個練習：在對應的 data/*.ts 陣列最後面加一個物件即可，
 * 頁面會自動產生側邊目錄、標籤篩選與內容區塊。
 *
 * summary / points / pitfalls / reference 的字串內可用 `程式碼` 與 **粗體**
 */
export interface CodeFile {
  name: string; // 頁籤名稱，副檔名決定語法上色
  code: string;
}

export interface Lesson {
  id: string; // 唯一識別（網址錨點 #id），建議與檔名 / 資料夾同名
  title: string;
  source: string; // 對應的練習檔案或資料夾
  date: string; // YYYY-MM-DD
  tags: string[];
  summary: string;
  points: string[];
  sections?: { title: string; items: string[] }[]; // 重點之後的額外段落（小標題 + 清單）
  code?: string; // 單一程式碼區塊
  files?: CodeFile[]; // 多個檔案，以頁籤切換（React 筆記用）
  output?: string;
  pitfalls?: string[];
  demo?: string; // 站內實際頁面路由，例如 "/shop"
  compare?: [string, string][]; // [React 概念, Vue 3 對照]
}

export interface Reference {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface NotesConfig {
  language: string; // 預設語法上色語言
  name: string; // 顯示名稱，如 "Go"
  color: string;
  repo: string; // 練習來源
  lessons: Lesson[];
  reference?: Reference;
}
