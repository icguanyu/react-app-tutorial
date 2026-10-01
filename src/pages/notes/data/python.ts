import type { NotesConfig } from "../types";

// 整理自 python-training/ 的練習檔
export const pythonNotes: NotesConfig = {
  language: "python",
  name: "Python",
  color: "#3572a5",
  repo: "python-training/",
  lessons: [
    {
      id: "start",
      title: "Hello, Python — 第一支程式",
      source: "start.py",
      date: "2026-09-16",
      tags: ["基礎"],
      summary: "一行 `print()` 就是一支完整的 Python 程式。",
      points: [
        "Python 是直譯式語言，不需要 `main` 函式，檔案從上到下依序執行。",
        "執行方式：`python start.py`。",
        "`print()` 輸出後會**自動換行**。",
        "`#` 開頭是單行註解。",
      ],
      code: `print("hello world")`,
      output: "hello world",
      pitfalls: [
        "Python 用**縮排**代表程式區塊（Go / JS 用大括號），縮排不一致會直接 `IndentationError`。",
      ],
    },
    {
      id: "datatype",
      title: "資料型別總覽",
      source: "datatype.py",
      date: "2026-09-16",
      tags: ["基礎", "型別", "容器"],
      summary: "四種內建容器：Tuple、List、Set、Dictionary，以及變數。",
      points: [
        "變數**不用宣告型別**，直接 `x = 5`，型別由值決定（動態型別）。",
        "`(1, 2, 3)` **Tuple**：有序、不可修改。",
        "`[1, 2, 3]` **List**：有序、可修改。",
        "`{1, 2, 3}` **Set**：無序、不重複。",
        "`{'a': 1}` **Dictionary**：鍵值對（key-value）。",
        "`print('Tuple:', t)` 多個參數會以空格分隔輸出。",
      ],
      code: `# Tuple 範例
t = (1, 2, 3)
print('Tuple:', t)

# List 範例
l = [1, 2, 3]
print('List:', l)

# 集合 Set
s = {1, 2, 3}
print('Set:', s)

# 字典 Dictionary
d = {'a': 1, 'b': 2, 'c': 3}
print('Dictionary:', d)

# 變數
x = 5
print('Variable:', x)`,
      output: `Tuple: (1, 2, 3)
List: [1, 2, 3]
Set: {1, 2, 3}
Dictionary: {'a': 1, 'b': 2, 'c': 3}
Variable: 5`,
      pitfalls: [
        "空的 `{}` 是**空字典**，不是空集合；空集合要寫 `set()`。",
        "只有一個元素的 tuple 要加逗號：`(1,)`，否則 `(1)` 只是數字 1。",
        "`type(x)` 可以查看變數目前的型別。",
      ],
    },
    {
      id: "list",
      title: "List 串列與切片",
      source: "list.py",
      date: "2026-09-16",
      tags: ["容器", "切片"],
      summary: "有序可變動的串列，以及 `[start:stop:step]` 切片語法。",
      points: [
        "切片 `lst[start:stop]` 取索引 start 到 **stop 前一個**（不含 stop）。",
        "`lst[::2]` 每隔一個取；`lst[::-1]` **反轉**整個串列。",
        "`list1 + list2` 串接；`list * 2` 重複。",
        "巢狀 List：`nested[0]` 取出內層串列，可整個替換。",
        "`[6] * len(x)` 產生與 x 等長、全是 6 的新串列。",
      ],
      code: `my_list = [1, 2, 3, 4, 5]
my_list = my_list[1:4]
# 切片後的列表為 [2, 3, 4] 從索引 1 到索引 4（不包括索引 4）的元素
print("切片後的列表:", my_list)
print("反向列表:", my_list[::-1])

# List 相加
my_list1 = [1, 2, 3]
my_list2 = [4, 5, 6]
print("List 相加:", my_list1 + my_list2)
# List 重複
my_list3 = [1, 2, 3]
print("List 重複:", my_list3 * 2)

# 巢狀List
nested_list = [[1, 2], [0, 1, 2, 3], [5, 6]]
print("巢狀List:", nested_list)

nested_list[0] = [6] * len(nested_list[0])
nested_list[1] = [6] * len(nested_list[1])
nested_list[2] = [6] * len(nested_list[2])
print("修改巢狀List:", nested_list)`,
      output: `切片後的列表: [2, 3, 4]
反向列表: [4, 3, 2]
List 相加: [1, 2, 3, 4, 5, 6]
List 重複: [1, 2, 3, 1, 2, 3]
巢狀List: [[1, 2], [0, 1, 2, 3], [5, 6]]
修改巢狀List: [[6, 6], [6, 6, 6, 6], [6, 6]]`,
      pitfalls: [
        "練習檔 list.py 的註解寫「反向列表輸出 [5, 4, 3, 2, 1]」，但此時 `my_list` 已經被切成 `[2, 3, 4]`，實際輸出是 `[4, 3, 2]`。",
        "同理「修改巢狀List」實際是 `[[6, 6], [6, 6, 6, 6], [6, 6]]`，第二個內層有 4 個元素。",
        "`[[0] * 3] * 3` 會產生 3 個**指向同一個串列**的參考，改一個全部跟著變；要用 `[[0] * 3 for _ in range(3)]`。",
      ],
    },
    {
      id: "tuple",
      title: "Tuple 元組（不可變）",
      source: "tuple.py",
      date: "2026-09-16",
      tags: ["容器", "切片"],
      summary: "有序但**不可修改**的序列，切片語法和 List 相同。",
      points: [
        "`t[:]`、`t[0:5]`、`t[:5]`、`t[0:len(t)]` 在這裡都取得完整內容。",
        "省略 start 代表從頭開始；省略 stop 代表到結尾。",
        "對 tuple 指定值 `t[0] = 10` 會丟出 `TypeError`。",
        "適合存放「不該被改動」的資料，例如座標 `(x, y)`、函式多回傳值。",
      ],
      code: `# 有序不可變動元組 Tuple
tuple = (1, 2, 3, 4, 5)

print("元組:", tuple[:])
print("元組:", tuple)  # 等同
print("元組:", tuple[0:5])  # 等同
print("元組:", tuple[:5])  # 等同
print("元組:", tuple[0:len(tuple)])  # 等同

tuple[0] = 10  # 這行會引發錯誤，因為元組是不可變的`,
      output: `元組: (1, 2, 3, 4, 5)
元組: (1, 2, 3, 4, 5)
元組: (1, 2, 3, 4, 5)
元組: (1, 2, 3, 4, 5)
元組: (1, 2, 3, 4, 5)
Traceback (most recent call last):
  File "tuple.py", line 10, in <module>
    tuple[0] = 10
TypeError: 'tuple' object does not support item assignment`,
      pitfalls: [
        "變數名稱用了 `tuple` 會**蓋掉內建的 `tuple()` 函式**，之後想用 `tuple([1, 2])` 轉型就會壞掉，建議改名 `my_tuple`。",
        "錯誤發生後程式就停止，所以檔案最後一行 `print` 不會執行。",
      ],
    },
    {
      id: "set",
      title: "Set 集合運算",
      source: "set.py",
      date: "2026-09-16",
      tags: ["容器", "運算子"],
      summary: "無序、不重複，支援聯集 / 交集 / 差集 / 對稱差集。",
      points: [
        "`s1 | s2` **聯集**：兩邊所有不重複的元素。",
        "`s1 & s2` **交集**：兩邊都有的元素。",
        "`s1 - s2` **差集**：s1 有、s2 沒有；順序不同結果不同。",
        "`s1 ^ s2` **對稱差集**：只出現在其中一邊的元素。",
        "`set(\"Hello\")` 把字串拆成字元並**去除重複**；`list(\"Hello\")` 則保留重複。",
        "`in` / `not in` 檢查元素是否存在，速度比 List 快。",
      ],
      code: `s1 = {1, 2, 3}
s2 = {3, 4, 5}
# 聯集 : 取兩個集合中所有"不重複"的元素
print("聯集:", s1 | s2)
# 交集 : 取兩個集合中"都存在"的元素
print("交集:", s1 & s2)
# 差集 : 取集合 s1 中有，但集合 s2 中沒有的元素
print("差集:", s1 - s2)
print("差集:", s2 - s1)
# 對稱差集(反交集) : 取兩個集合中"不重疊"的部分
print("對稱差集:", s1 ^ s2)

s = set("Hello")  # 會自動去除重複的字母
print("集合:", s)
print({"H", "e", "l", "o"} == {"l", "e", "H", "o"})  # 集合無序

s_list = list("Hello")  # 保留重複的字母
print("列表:", s_list)`,
      output: `聯集: {1, 2, 3, 4, 5}
交集: {3}
差集: {1, 2}
差集: {4, 5}
對稱差集: {1, 2, 4, 5}
集合: {'H', 'e', 'o', 'l'}
True
列表: ['H', 'e', 'l', 'l', 'o']`,
      pitfalls: [
        "集合是**無序**的，`set(\"Hello\")` 每次執行印出的字母順序可能不同。",
        "集合不能用索引取值，`s[0]` 會出錯。",
      ],
    },
    {
      id: "dictionary",
      title: "Dictionary 字典與推導式",
      source: "dictionary.py",
      date: "2026-09-16",
      tags: ["容器", "推導式"],
      summary: "用 key 查 value，並用字典推導式一行產生資料。",
      points: [
        "`dic[\"apple\"]` 直接取值；key 不存在會丟出 `KeyError`。",
        "`dic.get(\"banana\", \"預設值\")` 取不到時回傳預設值，不會出錯。",
        "`\"dog\" in dic` 檢查的是 **key** 是否存在。",
        "`del dic[\"cat\"]` 刪除一組鍵值對。",
        "字典推導式：`{key: value for i in 可迭代物件}`。",
        "`f\"2的{i}次方\"` 是 **f-string**，`{}` 內可放變數或運算式；`2**i` 是次方。",
      ],
      code: `dic = {
    "apple": "蘋果",
    "cat": "貓",
    "dog": "狗",
}

print("Dictionary:", dic["apple"])
print("get:", dic.get("cat"))
print("get:", dic.get("banana", "找不到該鍵值"))

print("in:", "dog" in dic)
print("not in:", "banana" not in dic)

# 刪除 key (刪除字典中的鍵值對 key-value pair)
del dic["cat"]
print("刪除 key 後的 dic:", dic)

dic = {f"2的{i}次方": 2**i for i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
print("字典推導式:", dic)`,
      output: `Dictionary: 蘋果
get: 貓
get: 找不到該鍵值
in: True
not in: True
刪除 key 後的 dic: {'apple': '蘋果', 'dog': '狗'}
字典推導式: {'2的1次方': 2, '2的2次方': 4, '2的3次方': 8, ..., '2的10次方': 1024}`,
      pitfalls: [
        "練習檔的註解寫「值為鍵的平方」，但程式實際算的是 `2**i`（2 的 i 次方），平方應該是 `i**2`。",
        "`[1, 2, ..., 10]` 可以改寫成 `range(1, 11)`：`range` 包含起點、**不含**終點。",
        "Python 3.7 起字典會**保留插入順序**。",
      ],
    },
    {
      id: "number-string",
      title: "字串：建立、索引、切片",
      source: "number-string.py",
      date: "2026-09-22",
      tags: ["基礎", "字串", "切片"],
      summary: "字串的幾種寫法，以及和 List 一樣的索引 / 切片操作。",
      points: [
        "單引號 `'...'` 和雙引號 `\"...\"` 都是字串，沒有差別。",
        "三個引號 `\"\"\"...\"\"\"` 可以直接寫多行字串。",
        "`\\n` 是換行字元。",
        "`\"Hello! \" * 3` 重複字串。",
        "`s[1]` 取單一字元；`s[0:5]`、`s[:5]`、`s[1:]` 切片規則同 List。",
        "`len(s)` 字串長度；`s.upper()` 轉大寫。",
      ],
      code: `s = "Hello, World!"
print('字串:', s)

# 換行
s_multiline = """This is a
multiline string."""
print('三個引號換行:', s_multiline)

s_with_newline = "This is a string\\nwith a newline."
print('/n換行:', s_with_newline)

# 重複字串
print('重複字串:', "Hello! " * 3)

# 字串索引
print('字串索引:', "Hello"[1])  # 'e'

# 字串切片
s_slice = "Hello, World!"
print('字串切片:', s_slice[0:5])
print('[:5]:', s_slice[:5])
print('[1:]:', s_slice[1:])`,
      output: `字串: Hello, World!
三個引號換行: This is a
multiline string.
/n換行: This is a string
with a newline.
重複字串: Hello! Hello! Hello!
字串索引: e
字串切片: Hello
[:5]: Hello
[1:]: ello, World!`,
      pitfalls: [
        "換行字元是**反斜線** `\\n`，不是 `/n`（練習檔的標籤文字寫成 /n）。",
        "字串和 tuple 一樣**不可變**：`s[0] = \"h\"` 會出錯，要產生新字串。",
        "Python 沒有獨立的字元型別，`s[1]` 拿到的是長度 1 的字串（Go 則是 `byte` / `rune`）。",
      ],
    },
    {
      id: "if",
      title: "流程控制：if / elif / else",
      source: "if.py",
      date: "2026-09-16",
      tags: ["流程控制", "輸入"],
      summary: "讀取使用者輸入，做一個四則運算小計算機。",
      points: [
        "`input(\"提示\")` 讀一行輸入，**回傳值一定是字串**。",
        "`int(...)` 把字串轉成整數才能做數學運算。",
        "條件後面要加冒號 `:`，區塊用縮排表示。",
        "多重條件用 `elif`（不是 `else if`）。",
        "Python 3.10+ 也可用 `match` / `case`，`case _:` 相當於 default。",
      ],
      code: `a = int(input("輸入數字1: "))
b = int(input("輸入數字2: "))
option = input("輸入運算符號(+,-,*,/): ")

if option == "+":
    print("結果:", a + b)
elif option == "-":
    print("結果:", a - b)
elif option == "*":
    print("結果:", a * b)
elif option == "/":
    print("結果:", a / b)
else:
    print("無效的運算符號")


def check_positive_match(num):
    match num:
        case num if num > 0:
            print("This is true")
        case 0:
            print("This is zero")
        case _:
            print("This is false")`,
      output: `輸入數字1: 7
輸入數字2: 3
輸入運算符號(+,-,*,/): *
結果: 21`,
      pitfalls: [
        "`/` 永遠回傳浮點數：`6 / 3` 是 `2.0`；要整數除法用 `//`。",
        "除以 0 會丟出 `ZeroDivisionError`，可以先檢查 `b != 0`。",
        "輸入非數字時 `int()` 會丟出 `ValueError`，之後可用 `try / except` 處理。",
      ],
    },
    {
      id: "while-for",
      title: "迴圈：while 與 for",
      source: "while-for.py",
      date: "2026-09-16",
      tags: ["流程控制", "迴圈"],
      summary: "`while` 依條件重複，`for` 逐一走訪序列。",
      points: [
        "`while 條件:` 條件為 True 就持續執行，記得在迴圈內改變條件。",
        "`while True:` 是無限迴圈，需要搭配 `break` 跳出。",
        "`for i in range(5):` 產生 0～4，共 5 次。",
        "`for` 可以直接走訪 List、字串、字典等任何可迭代物件。",
        "Python 沒有 `i++`，要寫 `i += 1`。",
      ],
      code: `print("\\nwhile 迴圈介紹")
n = 0
while n < 5:
    print("n =", n)
    n += 1

print("最終的 n 值:", n)

# for 迴圈介紹
print("\\nfor 迴圈介紹")
for i in range(5):  # range(5) 會產生 0, 1, 2, 3, 4
    print("i =", i)`,
      output: `while 迴圈介紹
n = 0
n = 1
n = 2
n = 3
n = 4
最終的 n 值: 5

for 迴圈介紹
i = 0
i = 1
i = 2
i = 3
i = 4`,
      pitfalls: [
        "對照 Go：Go 只有 `for`，`for n < 5 { }` 就是 Python 的 `while n < 5:`。",
        "`break` 結束整個迴圈、`continue` 跳到下一圈，用法和 Go 相同。",
      ],
    },
  ],
  reference: {
    title: "切片語法速查",
    columns: ["語法", "意思", "範例（s = [0, 1, 2, 3, 4]）"],
    rows: [
      ["`s[i]`", "取索引 i 的元素", "`s[1] → 1`"],
      ["`s[-1]`", "倒數第一個", "`s[-1] → 4`"],
      ["`s[a:b]`", "索引 a 到 b-1", "`s[1:3] → [1, 2]`"],
      ["`s[:b]`", "從頭到 b-1", "`s[:2] → [0, 1]`"],
      ["`s[a:]`", "從 a 到結尾", "`s[3:] → [3, 4]`"],
      ["`s[::k]`", "每隔 k 個取一個", "`s[::2] → [0, 2, 4]`"],
      ["`s[::-1]`", "反轉", "`s[::-1] → [4, 3, 2, 1, 0]`"],
      ["`len(s)`", "長度", "`len(s) → 5`"],
    ],
  },
};
