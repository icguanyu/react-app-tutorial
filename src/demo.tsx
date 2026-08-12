import { useState } from 'react'
import { useCounterStore } from '@/store/counterStore'

// ── 子元件：只訂閱 count，不關心 actions ────────────────────────
function CountDisplay() {
  const count = useCounterStore((state) => state.count)
  return <p style={{ fontSize: '3rem', margin: '0' }}>{count}</p>
}

// ── 子元件：只訂閱 actions，count 變化不會觸發此元件重新渲染 ─────
function CountActions() {
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const reset = useCounterStore((state) => state.reset)

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={decrement}>－</button>
      <button onClick={increment}>＋</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 為什麼 Hook 只能在最頂層呼叫？
// ════════════════════════════════════════════════════════════════
//
// React 用「槽位順序」追蹤每個 Hook 的值。
// 每次渲染，第 N 個 Hook 就讀取槽位 [N-1]。
// 如果 Hook 在 if 裡被跳過，後面的 Hook 全部槽位錯位，
// React 就會把 A 的值讀給 B。
//
// 假設有這段程式碼（實際上 React 會直接報錯拒絕執行）：
//
//   function BadComp() {
//     const [show, setShow]   = useState(false)  // 永遠是第 1 個
//     if (show) {
//       const [name, setName] = useState('')      // 條件式第 2 個 ← 問題在這
//     }
//     const [count, setCount] = useState(100)    // 期望是第 3 個
//   }
//
// 下面的表格讓你看到 React 的槽位在 show 切換時怎麼錯位。
// ════════════════════════════════════════════════════════════════

const th: React.CSSProperties = {
  padding: '5px 16px',
  borderBottom: '1px solid #444',
  color: '#888',
  fontWeight: 'normal',
  textAlign: 'left',
}
const td: React.CSSProperties = { padding: '5px 16px' }

// ── ❌ 錯誤示範（視覺化模擬） ─────────────────────────────────────
function BadHookVisualizer() {
  const [show, setShow] = useState(false)

  // 模擬 React 在兩種情況下「看到」的槽位分配
  type Row = { slot: number; varName: string; value: string; ok: boolean }
  const slots: Row[] = show
    ? [
        { slot: 0, varName: 'show',  value: 'true',                                   ok: true  },
        // name 插進來，佔走了原本 count 的 [1]
        { slot: 1, varName: 'name',  value: '???  ← 這格上次存的是 count = 100！',    ok: false },
        // count 被推到 [2]，但上次只存到 [1]，[2] 根本不存在
        { slot: 2, varName: 'count', value: '（找不到槽位，React 直接 throw Error）', ok: false },
      ]
    : [
        { slot: 0, varName: 'show',  value: 'false', ok: true },
        // name 被跳過，count 排在 [1]
        { slot: 1, varName: 'count', value: '100',   ok: true },
      ]

  return (
    <div style={{ display: 'inline-block', textAlign: 'left', marginTop: '12px', fontFamily: 'monospace' }}>
      <p style={{ fontSize: '0.82rem', color: '#9da3b8', marginBottom: '8px' }}>
        {show
          ? '❌ show 變 true → name 插進來 → count 槽位錯位！'
          : '第一次渲染 show=false：一切正常'}
      </p>
      <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr>
            <th style={th}>槽位</th>
            <th style={th}>Hook 變數</th>
            <th style={th}>React 取到的值</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((s) => (
            <tr key={s.slot} style={{ background: s.ok ? 'transparent' : '#3a1212' }}>
              <td style={{ ...td, color: '#666' }}>[{s.slot}]</td>
              <td style={{ ...td, color: s.ok ? '#7dd3fc' : '#f87171' }}>{s.varName}</td>
              <td style={{ ...td, color: s.ok ? '#86efac' : '#f87171' }}>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setShow((p) => !p)}
        style={{ marginTop: '10px', padding: '4px 14px' }}
      >
        切換 show（{show ? 'true → false' : 'false → true'}）
      </button>
    </div>
  )
}

// ── ✅ 正確示範：三個 Hook 永遠在頂層，槽位永遠不變 ──────────────
function GoodHookVisualizer() {
  const [show,  setShow]  = useState(false)  // 永遠是 [0]
  const [name,  setName]  = useState('')     // 永遠是 [1]
  const [count, setCount] = useState(100)   // 永遠是 [2]

  const slots = [
    { slot: 0, varName: 'show',  value: String(show)        },
    { slot: 1, varName: 'name',  value: name  || '(空字串)' },
    { slot: 2, varName: 'count', value: String(count)       },
  ]

  return (
    <div style={{ display: 'inline-block', textAlign: 'left', marginTop: '12px', fontFamily: 'monospace' }}>
      <p style={{ fontSize: '0.82rem', color: '#9da3b8', marginBottom: '8px' }}>
        ✅ 不管按什麼按鈕，槽位順序永遠固定
      </p>
      <table style={{ borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr>
            <th style={th}>槽位</th>
            <th style={th}>Hook 變數</th>
            <th style={th}>值</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((s) => (
            <tr key={s.slot}>
              <td style={{ ...td, color: '#666' }}>[{s.slot}]</td>
              <td style={{ ...td, color: '#7dd3fc' }}>{s.varName}</td>
              <td style={{ ...td, color: '#86efac' }}>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={() => setShow((p) => !p)}>show 切換</button>
        <button onClick={() => setName((n) => (n ? '' : 'Alice'))}>name 切換</button>
        <button onClick={() => setCount((c) => c + 1)}>count＋1</button>
      </div>
      {/* 條件渲染放在 return 裡，完全不影響 Hook 的槽位 */}
      {show && (
        <p style={{ marginTop: '8px', color: '#a3e635' }}>
          名字：{name || '（還沒設定）'}
        </p>
      )}
    </div>
  )
}

// ── 頁面 ────────────────────────────────────────────────────────
export default function Demo() {
  return (
    <div style={{ textAlign: 'center', padding: '48px' }}>
      <h1>Zustand Counter</h1>
      <CountDisplay />
      <CountActions />
      <p style={{ marginTop: '24px', color: '#9da3b8', fontSize: '0.85rem' }}>
        CountDisplay 和 CountActions 是不同元件，卻共用同一個 store
      </p>

      <hr style={{ margin: '40px auto', maxWidth: '500px', borderColor: '#333' }} />

      <h2 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
        Hook 只能在最頂層呼叫
      </h2>
      <p style={{ color: '#9da3b8', fontSize: '0.82rem', maxWidth: '480px', margin: '0 auto 20px' }}>
        React 用「槽位順序」對應每個 Hook 的值。<br />
        條件 Hook 插進中間 → 後面的 Hook 全部槽位錯位 → 取到錯誤的值。
      </p>

      <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div>
          <p style={{ color: '#f87171', marginBottom: '4px', fontSize: '0.9rem' }}>❌ 如果 name 在 if 裡（模擬）</p>
          <BadHookVisualizer />
        </div>
        <div>
          <p style={{ color: '#86efac', marginBottom: '4px', fontSize: '0.9rem' }}>✅ 三個 Hook 都在頂層</p>
          <GoodHookVisualizer />
        </div>
      </div>
    </div>
  )
}
