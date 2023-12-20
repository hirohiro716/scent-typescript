import { Datetime } from "./datetime/Datetime.js";
/**
 * 文字列のクラス。
 */
export default class StringObject {
    /**
     * コンストラクタ。初期値を指定する。
     *
     * @param value
     */
    constructor(value?: string | Uint8Array | any);
    private parts;
    /**
     * 内部の配列に保持している文字列を結合して取得する。
     *
     * @returns
     */
    private joinAndResetParts;
    /**
     * 指定された変数の文字列表現をセットする。
     *
     * @param value
     * @returns このインスタンス。
     */
    set(value: any): StringObject;
    /**
     * 指定された変数の文字列表現を末尾に追加する。
     *
     * @param addition
     * @returns このインスタンス。
     */
    append(addition: any): StringObject;
    /**
     * 指定された変数の文字列表現を先頭に追加する。
     *
     * @param addition
     * @returns このインスタンス。
     */
    prepend(addition: any): StringObject;
    /**
     * 指定された変数の文字列表現を指定位置に挿入する。
     * @example
     * new StringObject("I have money!").insert("don't ", 2) returns "I don't have money!"
     * new StringObject("Fuck!").insert("ind your l", -4) returns "Find your luck!"
     *
     * @param addition
     * @param index
     * @returns このインスタンス。
     */
    insert(addition: any, index: number): StringObject;
    /**
     * 指定された開始インデックスから終了インデックスまでを抽出する。終了インデックスが指定されない場合は最後までを抽出する。
     * @example
     * new StringObject("NoMoney").extract(-5) returns "Money"
     * new StringObject("hamburger").extract(4, 8) returns "urge"
     * new StringObject("I don't have money...").extract(-13, -2) returns "have money."
     *
     * @param startIndex
     * @param endIndex
     * @returns このインスタンス。
     */
    extract(startIndex: number, endIndex?: number): StringObject;
    /**
     * 正規表現に一致する部分を抽出する。
     * @example
     * new StringObject("a12bc34d").extract("[0-9]") returns "1234"
     * new StringObject("cccbbbaaa").extract("^[a-z]") returns "c"
     * new StringObject("A or B").extract("(A|B)") returns "AB"
     * new StringObject("12.34").extract("[0-9]\\.[0-9]") returns "2.3"
     *
     * @param regex
     * @returns このインスタンス。
     */
    extract(regex: string): StringObject;
    /**
     * 指定された正規表現に一致する部分を置き換える。
     * @example
     * new StringObject("test").replace("^t", "R") returns "Rest"
     * new StringObject("5a4b3c2d1e").replace("[0-9]", "") returns "abcde"
     *
     * @param regex
     * @param replacement
     * @returns このインスタンス。
     */
    replace(regex: string, replacement: string): StringObject;
    /**
     * 先頭と末尾のスペースをすべて削除する。スペースとは String.fromCharCode(32), String.fromCharCode(12288) に該当する文字列。
     *
     * @returns このインスタンス。
     */
    trim(): StringObject;
    /**
     * CRを置き換える。CRLFのCRは置き換えられない。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceCR(replacement: string): StringObject;
    /**
     * LFを置き換える。CRLFのLFは置き換えられない。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceLF(replacement: string): StringObject;
    /**
     * CRLFを置き換える。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceCRLF(replacement: string): StringObject;
    /**
     * タブを置き換える。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceTab(replacement: string): StringObject;
    /**
     * 意味のない小数点以下を削除する。
     * @example
     * new StringObject("123.000").removeMeaninglessDecimalPoint() returns "123"
     *
     * @returns このインスタンス。
     */
    removeMeaninglessDecimalPoint(): StringObject;
    /**
     * 日本語全角文字を半角に置き換える。
     *
     * @returns このインスタンス。
     */
    narrow(): StringObject;
    /**
     * 半角を日本語全角に置き換える。
     *
     * @returns このインスタンス。
     */
    wide(): StringObject;
    /**
     * 大文字を小文字に置き換える。
     *
     * @returns このインスタンス。
     */
    lower(): StringObject;
    /**
     * 小文字を大文字に置き換える。
     *
     * @returns このインスタンス。
     */
    upper(): StringObject;
    /**
     * カタカナをひらがなに置き換える。
     *
     * @returns このインスタンス。
     */
    hiragana(): StringObject;
    /**
     * ひらがなをカタカナに置き換える。
     *
     * @returns このインスタンス。
     */
    katakana(): StringObject;
    /**
     * 指定された長さまで左側を文字で埋める。
     *
     * @param length
     * @param addition
     * @returns このインスタンス。
     */
    paddingLeft(length: number, addition: any): StringObject;
    /**
     * 指定された長さまで右側を文字で埋める。
     *
     * @param length
     * @param addition
     * @returns このインスタンス。
     */
    paddingRight(length: number, addition: any): StringObject;
    /**
     * 文字数を取得する。
     *
     * @returns
     */
    length(): number;
    /**
     * 文字列表現を取得する。
     *
     * @returns
     */
    toString(): string;
    /**
     * 文字列をbyteに変換する。
     *
     * @returns
     */
    toByte(): Uint8Array;
    /**
     * 文字列を数値に変換する。失敗した場合はnullを返す。
     */
    toNumber(): number | null;
    /**
     * 文字列を真偽値に変換する。具体的には大文字小文字全角半角を問わない "true" または "1" という文字列に一致した場合にtrueを返す。
     *
     * @returns
     */
    toBoolean(): boolean;
    /**
     * 文字列をDatetimeインスタンスに変換する。失敗した場合はnullを返す。
     *
     * @returns
     */
    toDatetime(): Datetime | null;
    /**
     * 文字列をDateインスタンスに変換する。失敗した場合はnullを返す。
     *
     * @returns
     */
    toDate(): Date | null;
    /**
     * このインスタンスのクローンを作成する。
     *
     * @returns
     */
    clone(): StringObject;
    /**
     * 指定された変数が表す文字列が同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equals(comparison: any): boolean;
    /**
     * イテレーターの実装。
     */
    [Symbol.iterator](): Generator<StringObject, void, unknown>;
    /**
     * この文字列を指定された回数繰り返す。
     *
     * @param numberOfRepeats
     */
    repeat(numberOfRepeats: number): StringObject;
    /**
     * この文字列を指定された正規表現の一致で分割する。
     * @example
     * new StringObject("1.2.3.4").splitToStrings("\\.") returns ["1", "2", "3", "4"]
     *
     * @param regexDelimiter
     * @returns
     */
    splitToStrings(regexDelimiter: string): string[];
    /**
     * この文字列を指定された正規表現の一致で分割する。
     * @example
     * new StringObject("1.2.3.4").split("\\.") returns ["1", "2", "3", "4"]
     *
     * @param regexDelimiter
     * @returns
     */
    split(regexDelimiter: string): StringObject[];
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param value
     * @returns
     */
    static from(value: any): StringObject;
    private static readonly randomBaseCharacters;
    /**
     * 指定された長さのランダムな文字列の新しいインスタンスを生成する。
     *
     * @param length
     * @param baseCharacters 生成に使用する文字。省略した場合は数字とアルファベットが使用される。
     */
    static random(length: number, baseCharacters?: string): StringObject;
    /**
     * 指定された配列の値のtoStringメソッドの結果を連結した新しいインスタンスを作成する。
     *
     * @param values
     * @param separator
     * @returns
     */
    static join(values: any[], separator?: string): StringObject;
    /**
     * 指定されたFormDataからクエリ文字列の新しいインスタンスを作成する。
     *
     * @param formData
     * @returns
     */
    static queryString(formData: FormData): StringObject;
    /**
     * 半角を全角に置き換えるための連想配列。
     */
    private static NARROW_TO_WIDE_MAP;
    /**
     * 全角を半角に置き換えるための連想配列。
     */
    private static WIDE_TO_NARROW_MAP;
    /**
     * ひらがなをカタカナに置き換えるための連想配列。
     */
    private static HIRAGANA_TO_KATAKANA_MAP;
    /**
     * カタカナをひらがなに置き換えるための連想配列。
     */
    private static KATAKANA_TO_HIRAGANA_MAP;
    /**
     * 日本語の小文字を大文字に置き換えるための連想配列。
     */
    private static JAPANESE_LOWER_TO_UPPER_MAP;
    /**
     * 日本語の大文字を小文字に置き換えるための連想配列。
     */
    private static JAPANESE_UPPER_TO_LOWER_MAP;
}
