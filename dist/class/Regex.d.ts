/**
 * 正規表現のクラス。
 */
export declare class Regex {
    /**
     * コンストラクタ。正規表現の文字列とフラグ(未指定の場合は"g")を指定する。
     *
     * @param regex
     * @param flags
     */
    constructor(regex: string, flags?: string);
    /**
     * 正規表現の文字列。
     */
    readonly regex: string;
    /**
     * フラグ。
     */
    readonly flags: string;
    /**
     * 正規表現の文字列からRegExpを作成する。
     *
     * @returns
     */
    toRegExp(): RegExp;
    /**
     * 指定された文字列が正規表現に一致する場合はtrueを返す。
     *
     * @param string
     * @returns
     */
    test(string: string): boolean;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param regex
     * @param flags
     * @returns
     */
    static from(regex: string, flags?: string): Regex;
    /**
     * 全角/半角の英数、大文字/小文字の英数、ひらがな/全角カタカナを区別しない正規表現を作成する。
     *
     * @param value
     * @returns
     */
    static makeRoughComparison(value: string): string;
}
/**
 * 入力制限などに使用する正規表現の種類。
 */
export declare const RegexTypes: {
    integer: Regex;
    integerNegative: Regex;
    integerWide: Regex;
    decimal: Regex;
    decimalNegative: Regex;
    telephone: Regex;
    datetime: Regex;
    date: Regex;
    time: Regex;
    half: Regex;
    wide: Regex;
    alphabetNarrow: Regex;
    alphabetWide: Regex;
    katakanaNarrow: Regex;
    katakanaWide: Regex;
    hiragana: Regex;
};
