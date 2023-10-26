import StringObject from "./StringObject.js";

/**
 * 正規表現のクラス。
 */
export class Regex {

    /**
     * コンストラクタ。正規表現の文字列とフラグ(未指定の場合は"g")を指定する。
     * 
     * @param regex 
     * @param flags
     */
    public constructor(regex: string, flags: string = "g") {
        this.regex = regex;
        this.flags = flags;
    }

    /**
     * 正規表現の文字列。
     */
    public readonly regex: string;

    /**
     * フラグ。
     */
    public readonly flags: string;

    /**
     * 正規表現の文字列からRegExpを作成する。
     * 
     * @returns 
     */
    public toRegExp(): RegExp {
        return new RegExp(this.regex, this.flags);
    }

    /**
     * 指定された文字列が正規表現に一致する場合はtrueを返す。
     * 
     * @param string 
     * @returns 
     */
    public test(string: string): boolean {
        return this.toRegExp().test(string);
    }

    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     * 
     * @param regex 
     * @param flags 
     * @returns 
     */
    public static from(regex: string, flags: string = "g"): Regex {
        return new Regex(regex, flags);
    }

    /**
     * 全角/半角の英数、大文字/小文字の英数、ひらがな/全角カタカナを区別しない正規表現を作成する。
     * 
     * @param value 
     * @returns 
     */
    public static makeRoughComparison(value: string): string {
        const valueObject = new StringObject(value);
        if (valueObject.length() === 0) {
            return valueObject.toString();
        }
        const result = new StringObject();
        for (const one of valueObject) {
            switch (true) {
                case RegexTypes.hiragana.test(one.toString()):
                    result.append("(").append(one).append("|").append(one.clone().katakana()).append(")");
                    break;
                case RegexTypes.katakanaWide.test(one.toString()):
                    result.append("(").append(one).append("|").append(one.clone().hiragana()).append(")");
                    break;
                case RegexTypes.integer.test(one.toString()):
                    result.append("(").append(one).append("|").append(one.clone().wide()).append(")");
                    break;
                case RegexTypes.integerWide.test(one.toString()):
                    result.append("(").append(one).append("|").append(one.clone().narrow()).append(")");
                    break;
                case RegexTypes.alphabetNarrow.test(one.toString()):
                    result.append("(").append(one.clone().lower()).append("|").append(one.clone().upper());
                    result.append("|").append(one.clone().wide().lower()).append("|").append(one.clone().wide().upper()).append(")");
                    break;
                case RegexTypes.alphabetWide.test(one.toString()):
                    result.append("(").append(one.clone().lower()).append("|").append(one.clone().upper());
                    result.append("|").append(one.clone().narrow().lower()).append("|").append(one.clone().narrow().upper()).append(")");
                    break;
            }
        }
        return result.toString();
    }
}

/**
 * 入力制限などに使用する正規表現の種類。
 */
export const RegexTypes: { integer: Regex, integerNegative: Regex, integerWide: Regex, decimal: Regex, decimalNegative: Regex, telephone: Regex, datetime: Regex, date: Regex, time: Regex, half: Regex, wide: Regex, alphabetNarrow: Regex, alphabetWide: Regex, katakanaNarrow: Regex, katakanaWide: Regex, hiragana: Regex } = {
    integer: new Regex("^[0-9]{0,}$"),
    integerNegative: new Regex("^[\-0-9]{0,}$"),
    integerWide: new Regex("^[０-９]{0,}$"),
    decimal: new Regex("^[0-9.]{0,}$"),
    decimalNegative: new Regex("^[\-0-9.]{0,}$"),
    telephone: new Regex("^[0-9\-*#]{0,}$"),
    datetime: new Regex("^[0-9\-/: ]{0,}$"),
    date: new Regex("^[0-9\-/]{0,}$"),
    time: new Regex("^[0-9:]{0,}$"),
    half: new Regex("^[ -~｡-ﾟ]{0,}$"),
    wide: new Regex("^[^ -~｡-ﾟ]{0,}$"),
    alphabetNarrow: new Regex("^[a-zA-Z]{0,}$"),
    alphabetWide: new Regex("^[ａ-ｚＡ-Ｚ]{0,}$"),
    katakanaNarrow: new Regex("^[ｦ-ﾟ]{0,}$"),
    katakanaWide: new Regex("^[ァ-ヴー]{0,}$"),
    hiragana: new Regex("^[ぁ-んー]{0,}$"),
}
