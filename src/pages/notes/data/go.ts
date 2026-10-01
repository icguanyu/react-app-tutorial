import type { NotesConfig } from "../types";

// 移植自 go-training/notes/lessons.js
export const goNotes: NotesConfig = {
  language: "go",
  name: "Go",
  color: "#007d9c",
  repo: "go-training/",
  lessons: [
    {
      id: "hello",
      title: "Hello, Go — 第一支程式",
      source: "hello/",
      date: "2026-09-22",
      tags: ["基礎", "fmt", "建置"],
      summary: "認識 Go 程式的最小骨架，以及「撰寫 → 建置 → 執行」的流程。",
      points: [
        "可執行程式必須是 `package main`，並且有 `func main()` 作為進入點。",
        "`import \"fmt\"` 引入標準函式庫的格式化輸出套件。",
        "`fmt.Println()` 輸出後會**自動換行**。",
        "`go run hello.go`：直接編譯並執行，不留下檔案，適合練習。",
        "`go build hello.go`：產生可執行檔（Windows 上是 `hello.exe`），可以單獨拿去執行。",
      ],
      code: `package main

import "fmt"

func main() {
	fmt.Println("Hello, Golang!")
}`,
      output: "Hello, Golang!",
      pitfalls: [
        "左大括號 `{` 必須和 `func main()` 在同一行，換行會編譯錯誤。",
        "import 了卻沒用到的套件會直接編譯失敗，Go 不允許多餘的 import。",
      ],
    },
    {
      id: "data-var",
      title: "資料型別與變數",
      source: "data-var/",
      date: "2026-09-22",
      tags: ["基礎", "型別", "變數"],
      summary: "五種基本型別，以及用 var 宣告變數。",
      points: [
        "宣告語法：`var 名稱 型別 = 值`，例如 `var a int = -10`。",
        "`int` 整數、`float64` 浮點數、`string` 字串、`bool` 布林、`rune` 單一字元。",
        "雙引號 `\"...\"` 是字串；單引號 `'a'` 是 **rune**，本質是 Unicode 編碼的整數。",
        "所以 `fmt.Println('a')` 印出的是 `97`，不是 `a`。",
        "`fmt.Println(a, b, c)` 可一次印多個值，中間自動以空格分隔。",
      ],
      code: `package main

import "fmt"

func main() {
	var a int = -10
	var b float64 = 3.14
	var c string = "Hello, Golang!"
	var d bool = true
	var e rune = 'a'

	fmt.Println(a, b, c, d, e)
}`,
      output: "-10 3.14 Hello, Golang! true 97",
      pitfalls: [
        "宣告了卻沒使用的區域變數會編譯失敗。",
        "沒給初始值的變數會是「零值」：`int` 為 `0`、`string` 為 `\"\"`、`bool` 為 `false`。",
        "想印出 rune 對應的字元可用 `fmt.Printf(\"%c\", e)` 或 `string(e)`。",
      ],
    },
    {
      id: "basic-io",
      title: "基本輸入輸出",
      source: "basic-io/",
      date: "2026-09-30",
      tags: ["基礎", "fmt", "輸入"],
      summary: "用 fmt.Scanln 讀取使用者輸入，並把結果算出來印出。",
      points: [
        "`fmt.Print()` 不換行，適合用在提示文字後面直接讓使用者輸入。",
        "`fmt.Scanln(&a, &b)` 讀一行輸入，以空格分隔依序存進 `a`、`b`。",
        "變數前要加 `&`（取位址），Scanln 才能把值**寫回**變數裡 — 這跟後面的指標章節有關。",
      ],
      code: `package main

import "fmt"

func main() {
	var a int
	var b int
	fmt.Print("請輸入兩個整數，用空格分隔: ")
	fmt.Scanln(&a, &b)
	var result int = a + b
	fmt.Println("兩個整數的和為: ", a, " + ", b, " = ", result)
}`,
      output: "請輸入兩個整數，用空格分隔: 3 4\n兩個整數的和為:  3  +  4  =  7",
      pitfalls: [
        "Println 會在每個參數之間自動加空格，所以字串裡再加空格會變成兩格。想精準排版用 `fmt.Printf(\"%d + %d = %d\\n\", a, b, result)`。",
        "忘了加 `&` 寫成 `fmt.Scanln(a)`，變數不會被改到。",
      ],
    },
    {
      id: "flow-if",
      title: "流程控制：if / else",
      source: "flow-if/",
      date: "2026-09-30",
      tags: ["流程控制"],
      summary: "依條件決定要走哪一段程式。",
      points: [
        "條件**不需要**小括號：`if money > 10000 { ... }`。",
        "大括號是**必須**的，即使只有一行也不能省略。",
        "`else` 必須和前一個 `}` 寫在同一行：`} else {`。",
        "多個條件可串接 `else if`。",
      ],
      code: `package main

import "fmt"

func main() {
	var money int
	fmt.Println("你想領多少錢: ")
	fmt.Scanln(&money)

	if money > 10000 {
		fmt.Println("你領的錢太多了，請重新輸入")
	} else {
		fmt.Println("你領的錢是: ", money)
	}

	fmt.Println("執行完畢")
}`,
      pitfalls: [
        "`}` 換行後才寫 `else` 會編譯錯誤（Go 會在行尾自動補分號）。",
        "比較運算子：`==` `!=` `>` `<` `>=` `<=`；邏輯運算子：`&&` `||` `!`。",
      ],
    },
    {
      id: "for",
      title: "迴圈：for、break、continue",
      source: "for/",
      date: "2026-09-30",
      tags: ["流程控制", "迴圈", "函式"],
      summary: "Go 只有 for 一種迴圈，但可以寫出三種形式。",
      points: [
        "**經典三段式**：`for i := 1; i <= 10; i++ { ... }`。",
        "**像 while**：`for x > 0 { ... }`，只寫條件。",
        "**無限迴圈**：`for { ... }`（或 `for true`），靠 `break` 跳出。",
        "`:=` 是短變數宣告，自動推斷型別，只能用在函式內。",
        "`break` 直接結束整個迴圈；`continue` 跳過這一圈剩下的程式，進入下一圈。",
        "自訂函式：`func doSum(msg string) { ... }`，參數寫成 `名稱 型別`。",
      ],
      code: `func main() {
	var result int
	for i := 1; i <= 10; i++ {
		result += i
	}
	fmt.Println(result) // 55

	doBreak()
}

func doBreak() {
	var x int = 0
	for x < 100 {
		fmt.Println("數到:", x)
		x++
		if x == 1 {
			fmt.Println("跳過:", x)
			x++
			continue
		}
		if x == 5 {
			break
		}
	}
}

func doSum(msg string) {
	var result int = 0
	fmt.Println(msg, "-請輸入數字:(0結束)")
	for {
		var n int
		fmt.Scanln(&n)
		if n == 0 {
			break
		}
		result += n
	}
	fmt.Println("總和:", result)
}`,
      output: "55\n數到: 0\n跳過: 1\n數到: 2\n數到: 3\n數到: 4",
      pitfalls: [
        "doBreak 的輸出可以自己手動追蹤一次：`x` 在 continue 前多加了一次，所以不會印出「數到: 1」。",
        "`x++` 在 Go 是陳述句，不能寫成 `y := x++`。",
        "無限迴圈忘記寫 break 條件，程式會停不下來（Ctrl+C 中斷）。",
      ],
    },
    {
      id: "return",
      title: "函式回傳值（多回傳）",
      source: "return/",
      date: "2026-09-30",
      tags: ["函式"],
      summary: "Go 的函式可以一次回傳多個值。",
      points: [
        "回傳型別寫在參數後面；多個回傳值用括號包起來：`func sum(n1 int, n2 int) (int, string)`。",
        "`return result, text` 依序回傳。",
        "接收：`r, x = sum(3, 4)`，或直接用 `r, x := sum(3, 4)` 宣告加接收。",
        "`fmt.Sprintf()` 格式化後**回傳字串**，不會印出；`%d` 代表整數。",
        "相同型別的參數可合併：`func sum(n1, n2 int)`。",
      ],
      code: `package main

import "fmt"

func main() {
	var r int
	var x string
	r, x = sum(3, 4)
	fmt.Println(r, x)
}

func sum(n1 int, n2 int) (int, string) {
	var result int = n1 + n2
	return result, fmt.Sprintf("總和=%d", result)
}`,
      output: "7 總和=7",
      pitfalls: [
        "不需要的回傳值用 `_` 丟掉：`r, _ := sum(3, 4)`。",
        "多回傳最常見的用法是 `value, err := ...`，之後學錯誤處理會一直看到。",
      ],
    },
    {
      id: "point",
      title: "指標：& 與 *",
      source: "point/",
      date: "2026-09-30",
      tags: ["指標", "函式"],
      summary: "用指標讓函式能修改外面的變數（pass by pointer）。",
      points: [
        "`&w`：取得變數 `w` 的**記憶體位址**。",
        "`*string`：「指向 string 的指標」這個型別，例如 `var wPtr *string = &w`。",
        "`*wPtr`：**反解（dereference）**，透過位址拿到 / 修改原本的值。",
        "**Pass by value**：一般參數傳的是副本，函式內改了，外面不會變。",
        "**Pass by pointer**：傳入位址 `add2(&a)`，函式內用 `*xPtr += 1` 就能改到外面的 `a`。",
        "`fmt.Scanln(&msg)` 就是 pass by pointer 的實例。",
      ],
      code: `package main

import "fmt"

func main() {
	var w string = "Hello"
	var wPtr *string = &w
	fmt.Printf("記憶體位置:%p\\n", wPtr)
	fmt.Printf("反解:%s\\n", *wPtr)

	var a int = 10
	add2(&a)
	fmt.Println("add2() a=", a) // 11
}

// 只是修改副本，外面的值不變
func add(x int) {
	x = x + 1
}

// 透過指標參數修改原本的值
func add2(xPtr *int) {
	*xPtr += 1
}`,
      output: "記憶體位置:0xc000014070\n反解:Hello\nadd2() a= 11",
      pitfalls: [
        "印記憶體位址用的是 `%p`，`%s` 是字串（練習檔 point.go 的註解寫成 %s，記得修正）。",
        "`*` 出現在型別前（`*int`）是「指標型別」；出現在變數前（`*xPtr`）是「取值」。",
        "指標的零值是 `nil`，對 nil 指標取值會讓程式 panic。",
      ],
    },
  ],
  reference: {
    title: "fmt 格式化速查",
    columns: ["動詞", "用途", "範例"],
    rows: [
      ["`%d`", "整數", "`fmt.Printf(\"%d\", 42) → 42`"],
      ["`%f / %.2f`", "浮點數 / 指定小數位", "`fmt.Printf(\"%.2f\", 3.14159) → 3.14`"],
      ["`%s`", "字串", "`fmt.Printf(\"%s\", \"Go\") → Go`"],
      ["`%t`", "布林", "`fmt.Printf(\"%t\", true) → true`"],
      ["`%c`", "字元（rune）", "`fmt.Printf(\"%c\", 'a') → a`"],
      ["`%p`", "指標位址", "`fmt.Printf(\"%p\", &x) → 0xc000…`"],
      ["`%v`", "任何值的預設格式", "`fmt.Printf(\"%v\", x)`"],
      ["`%T`", "印出型別", "`fmt.Printf(\"%T\", 3.14) → float64`"],
      ["`\\n`", "換行（Printf 不會自動換行）", "`fmt.Printf(\"hi\\n\")`"],
    ],
  },
};
