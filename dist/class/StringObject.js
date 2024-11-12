import { Datetime } from "./datetime/Datetime.js";
/**
 * 文字列のクラス。
 */
class StringObject {
    /**
     * コンストラクタ。初期値を指定する。
     *
     * @param value
     */
    constructor(value) {
        this.parts = [];
        if (typeof value === "undefined" || value === null) {
            return;
        }
        if (value instanceof Date) {
            this.parts.push(Datetime.from(value).toString());
        }
        else if (value instanceof Uint8Array) {
            this.parts.push(new TextDecoder().decode(value));
        }
        else {
            this.parts.push(new String(value).toString());
        }
    }
    /**
     * 内部の配列に保持している文字列を結合して取得する。
     *
     * @returns
     */
    joinAndResetParts() {
        if (this.parts.length === 0) {
            return "";
        }
        if (this.parts.length === 1) {
            return this.parts[0];
        }
        let value = this.parts.join("");
        this.parts = [value];
        return value;
    }
    /**
     * 指定された変数の文字列表現をセットする。
     *
     * @param value
     * @returns このインスタンス。
     */
    set(value) {
        let stringValue = "";
        if (typeof value !== "undefined" && value !== null) {
            stringValue = new String(value).toString();
        }
        this.parts = [stringValue];
        return this;
    }
    /**
     * 指定された変数の文字列表現を末尾に追加する。
     *
     * @param addition
     * @returns このインスタンス。
     */
    append(addition) {
        if (typeof addition !== "undefined" && addition !== null) {
            this.parts.push(new String(addition).toString());
        }
        return this;
    }
    /**
     * 指定された変数の文字列表現を先頭に追加する。
     *
     * @param addition
     * @returns このインスタンス。
     */
    prepend(addition) {
        if (typeof addition !== "undefined" && addition !== null) {
            this.parts.unshift(new String(addition).toString());
        }
        return this;
    }
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
    insert(addition, index) {
        if (typeof addition !== "undefined" && addition !== null) {
            let value = this.joinAndResetParts();
            this.parts = [value.slice(0, index)];
            this.parts.push(new String(addition).toString());
            this.parts.push(value.slice(index));
        }
        return this;
    }
    /**
     * @deprecated
     */
    extract(parameter1, parameter2) {
        if (typeof parameter1 === "number") {
            let value = this.joinAndResetParts();
            this.parts = [value.slice(parameter1, parameter2)];
        }
        else if (typeof parameter1 === "string") {
            let value = this.joinAndResetParts();
            this.parts = [];
            let match = value.match(new RegExp(parameter1, "g"));
            if (match) {
                match.forEach((one, index) => {
                    this.parts.push(one);
                });
            }
        }
        return this;
    }
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
    replace(regex, replacement) {
        const value = this.joinAndResetParts();
        this.parts = [value.replaceAll(new RegExp(regex, "g"), replacement)];
        return this;
    }
    /**
     * 先頭と末尾のスペースをすべて削除する。スペースとは String.fromCharCode(32), String.fromCharCode(12288) に該当する文字列。
     *
     * @returns このインスタンス。
     */
    trim() {
        const regex = new StringObject(String.fromCharCode(32, 12288));
        regex.prepend("[");
        regex.append("]{1,}");
        this.replace(regex.clone().prepend("^").toString(), "");
        this.replace(regex.clone().append("$").toString(), "");
        return this;
    }
    /**
     * CRを置き換える。CRLFのCRは置き換えられない。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceCR(replacement) {
        return this.replace("\r([^\n])|\r$", replacement + "$1");
    }
    /**
     * LFを置き換える。CRLFのLFは置き換えられない。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceLF(replacement) {
        return this.replace("([^\r])\n|^\n", "$1" + replacement);
    }
    /**
     * CRLFを置き換える。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceCRLF(replacement) {
        return this.replace("\r\n", replacement);
    }
    /**
     * タブを置き換える。
     *
     * @param replacement
     * @returns このインスタンス。
     */
    replaceTab(replacement) {
        return this.replace("\t", replacement);
    }
    /**
     * 意味のない小数点以下を削除する。
     * @example
     * new StringObject("123.000").removeMeaninglessDecimalPoint() returns "123"
     *
     * @returns このインスタンス。
     */
    removeMeaninglessDecimalPoint() {
        return this.replace("\\.{1}0{1,}$", "");
    }
    /**
     * 日本語全角文字を半角に置き換える。
     *
     * @returns このインスタンス。
     */
    narrow() {
        const value = new StringObject(this.joinAndResetParts());
        this.parts = [];
        for (const one of value.toString()) {
            if (StringObject.WIDE_TO_NARROW_MAP[one]) {
                this.parts.push(StringObject.WIDE_TO_NARROW_MAP[one]);
            }
            else {
                this.parts.push(one);
            }
        }
        return this;
    }
    /**
     * 半角を日本語全角に置き換える。
     *
     * @returns このインスタンス。
     */
    wide() {
        const value = new StringObject(this.joinAndResetParts());
        this.parts = [];
        for (const one of value.toString()) {
            if (StringObject.NARROW_TO_WIDE_MAP[one]) {
                this.parts.push(StringObject.NARROW_TO_WIDE_MAP[one]);
            }
            else {
                this.parts.push(one);
            }
        }
        return this;
    }
    /**
     * 大文字を小文字に置き換える。
     *
     * @returns このインスタンス。
     */
    lower() {
        const value = new StringObject(this.joinAndResetParts());
        this.parts = [];
        for (const one of value.toString()) {
            if (StringObject.JAPANESE_UPPER_TO_LOWER_MAP[one]) {
                this.parts.push(StringObject.JAPANESE_UPPER_TO_LOWER_MAP[one]);
            }
            else {
                this.parts.push(one.toLowerCase());
            }
        }
        return this;
    }
    /**
     * 小文字を大文字に置き換える。
     *
     * @returns このインスタンス。
     */
    upper() {
        const value = new StringObject(this.joinAndResetParts());
        this.parts = [];
        for (const one of value.toString()) {
            if (StringObject.JAPANESE_LOWER_TO_UPPER_MAP[one]) {
                this.parts.push(StringObject.JAPANESE_LOWER_TO_UPPER_MAP[one]);
            }
            else {
                this.parts.push(one.toUpperCase());
            }
        }
        return this;
    }
    /**
     * カタカナをひらがなに置き換える。
     *
     * @returns このインスタンス。
     */
    hiragana() {
        const value = new StringObject(this.joinAndResetParts());
        this.parts = [];
        for (const one of value.toString()) {
            if (StringObject.KATAKANA_TO_HIRAGANA_MAP[one]) {
                this.parts.push(StringObject.KATAKANA_TO_HIRAGANA_MAP[one]);
            }
            else {
                this.parts.push(one);
            }
        }
        return this;
    }
    /**
     * ひらがなをカタカナに置き換える。
     *
     * @returns このインスタンス。
     */
    katakana() {
        const value = new StringObject(this.joinAndResetParts());
        this.parts = [];
        for (const one of value.toString()) {
            if (StringObject.HIRAGANA_TO_KATAKANA_MAP[one]) {
                this.parts.push(StringObject.HIRAGANA_TO_KATAKANA_MAP[one]);
            }
            else {
                this.parts.push(one);
            }
        }
        return this;
    }
    /**
     * 指定された長さまで左側を文字で埋める。
     *
     * @param length
     * @param addition
     * @returns このインスタンス。
     */
    paddingLeft(length, addition) {
        if (typeof addition !== "undefined" && addition !== null) {
            let before = this.joinAndResetParts();
            let after = before.padStart(length, addition);
            this.parts = [after];
        }
        return this;
    }
    /**
     * 指定された長さまで右側を文字で埋める。
     *
     * @param length
     * @param addition
     * @returns このインスタンス。
     */
    paddingRight(length, addition) {
        if (typeof addition !== "undefined" && addition !== null) {
            let before = this.joinAndResetParts();
            let after = before.padEnd(length, addition);
            this.parts = [after];
        }
        return this;
    }
    /**
     * 文字数を取得する。
     *
     * @returns
     */
    length() {
        return this.joinAndResetParts().length;
    }
    /**
     * 文字列表現を取得する。
     *
     * @returns
     */
    toString() {
        return this.joinAndResetParts();
    }
    /**
     * 文字列をbyteに変換する。
     *
     * @returns
     */
    toByte() {
        return new TextEncoder().encode(this.joinAndResetParts());
    }
    /**
     * 文字列を数値に変換する。失敗した場合はnullを返す。
     */
    toNumber() {
        const value = Number.parseFloat(this.joinAndResetParts());
        if (isNaN(value)) {
            return null;
        }
        return value;
    }
    /**
     * 文字列を真偽値に変換する。具体的には大文字小文字全角半角を問わない "true" または "1" という文字列に一致した場合にtrueを返す。
     *
     * @returns
     */
    toBoolean() {
        const value = this.clone();
        value.narrow();
        if (value.clone().lower().toString() === "true" || value.toString() === "1") {
            return true;
        }
        return false;
    }
    /**
     * 文字列をDatetimeインスタンスに変換する。失敗した場合はnullを返す。
     *
     * @returns
     */
    toDatetime() {
        const datetime = new Datetime(this.joinAndResetParts());
        if (datetime.getAllMilliseconds() === 0) {
            return null;
        }
        return datetime;
    }
    /**
     * 文字列をDateインスタンスに変換する。失敗した場合はnullを返す。
     *
     * @returns
     */
    toDate() {
        const datetime = this.toDatetime();
        if (datetime === null) {
            return null;
        }
        return datetime.date;
    }
    /**
     * このインスタンスのクローンを作成する。
     *
     * @returns
     */
    clone() {
        const cloned = new StringObject(this.joinAndResetParts());
        return cloned;
    }
    /**
     * 指定された変数が表す文字列が同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equals(comparison) {
        if (typeof comparison !== "undefined" && comparison !== null) {
            if (this.joinAndResetParts() === StringObject.from(comparison).toString()) {
                return true;
            }
        }
        return false;
    }
    /**
     * イテレーターの実装。
     */
    *[Symbol.iterator]() {
        for (const one of this.joinAndResetParts()) {
            yield new StringObject(one);
        }
    }
    /**
     * この文字列を指定された回数繰り返す。
     *
     * @param numberOfRepeats
     */
    repeat(numberOfRepeats) {
        const value = this.joinAndResetParts();
        for (let index = 0; index < numberOfRepeats - 1; index++) {
            this.parts.push(value);
        }
        return this;
    }
    /**
     * この文字列を指定された正規表現の一致で分割する。
     * @example
     * new StringObject("1.2.3.4").splitToStrings("\\.") returns ["1", "2", "3", "4"]
     *
     * @param regexDelimiter
     * @returns
     */
    splitToStrings(regexDelimiter) {
        return this.joinAndResetParts().split(new RegExp(regexDelimiter, "g"));
    }
    /**
     * この文字列を指定された正規表現の一致で分割する。
     * @example
     * new StringObject("1.2.3.4").split("\\.") returns ["1", "2", "3", "4"]
     *
     * @param regexDelimiter
     * @returns
     */
    split(regexDelimiter) {
        const values = [];
        for (const part of this.splitToStrings(regexDelimiter)) {
            values.push(new StringObject(part));
        }
        return values;
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param value
     * @returns
     */
    static from(value) {
        return new StringObject(value);
    }
    /**
     * 指定された長さのランダムな文字列の新しいインスタンスを生成する。
     *
     * @param length
     * @param baseCharacters 生成に使用する文字。省略した場合は数字とアルファベットが使用される。
     */
    static random(length, baseCharacters) {
        const base = new StringObject(baseCharacters);
        if (base.length() === 0) {
            base.append(this.randomBaseCharacters);
        }
        const result = new StringObject();
        for (let index = 0; index < length; index++) {
            const randomIndex = Math.floor(Math.random() * base.length());
            result.append(base.toString().charAt(randomIndex));
        }
        return result;
    }
    /**
     * 指定された長さの暗号学的にランダムな文字列の新しいインスタンスを生成する。
     *
     * @param length
     * @param baseCharacters 生成に使用する文字。省略した場合は数字とアルファベットが使用される。
     */
    static secureRandom(length, baseCharacters) {
        const base = new StringObject(baseCharacters);
        if (base.length() > 255) {
            throw new Error("Too many characters in Base Characters.");
        }
        if (base.length() === 0) {
            base.append(this.randomBaseCharacters);
        }
        const material = base.clone();
        while (material.length() + base.length() < 255) {
            material.append(base);
        }
        const result = new StringObject();
        while (result.length() < length) {
            crypto.getRandomValues(new Uint8Array(length)).forEach((randomValue) => {
                if (result.length() < length) {
                    result.append(material.toString().charAt(randomValue));
                }
            });
        }
        return result;
    }
    /**
     * 指定された配列の値のtoStringメソッドの結果を連結した新しいインスタンスを作成する。
     *
     * @param values
     * @param separator
     * @returns
     */
    static join(values, separator) {
        const stringObject = new StringObject();
        for (const value of values) {
            if (stringObject.length() > 0) {
                stringObject.append(separator);
            }
            stringObject.append(value);
        }
        return stringObject;
    }
    /**
     * 指定されたFormDataからクエリ文字列の新しいインスタンスを作成する。
     *
     * @param formData
     * @returns
     */
    static queryString(formData) {
        const stringObject = new StringObject();
        const parameters = {};
        for (const [key, value] of formData) {
            if (typeof value === "string") {
                parameters[key] = value;
            }
        }
        stringObject.append(new URLSearchParams(parameters).toString());
        return stringObject;
    }
}
StringObject.randomBaseCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
/**
 * 半角を全角に置き換えるための連想配列。
 */
StringObject.NARROW_TO_WIDE_MAP = {
    "a": "ａ",
    "b": "ｂ",
    "c": "ｃ",
    "d": "ｄ",
    "e": "ｅ",
    "f": "ｆ",
    "g": "ｇ",
    "h": "ｈ",
    "i": "ｉ",
    "j": "ｊ",
    "k": "ｋ",
    "l": "ｌ",
    "m": "ｍ",
    "n": "ｎ",
    "o": "ｏ",
    "p": "ｐ",
    "q": "ｑ",
    "r": "ｒ",
    "s": "ｓ",
    "t": "ｔ",
    "u": "ｕ",
    "v": "ｖ",
    "w": "ｗ",
    "x": "ｘ",
    "y": "ｙ",
    "z": "ｚ",
    "A": "Ａ",
    "B": "Ｂ",
    "C": "Ｃ",
    "D": "Ｄ",
    "E": "Ｅ",
    "F": "Ｆ",
    "G": "Ｇ",
    "H": "Ｈ",
    "I": "Ｉ",
    "J": "Ｊ",
    "K": "Ｋ",
    "L": "Ｌ",
    "M": "Ｍ",
    "N": "Ｎ",
    "O": "Ｏ",
    "P": "Ｐ",
    "Q": "Ｑ",
    "R": "Ｒ",
    "S": "Ｓ",
    "T": "Ｔ",
    "U": "Ｕ",
    "V": "Ｖ",
    "W": "Ｗ",
    "X": "Ｘ",
    "Y": "Ｙ",
    "Z": "Ｚ",
    "0": "０",
    "1": "１",
    "2": "２",
    "3": "３",
    "4": "４",
    "5": "５",
    "6": "６",
    "7": "７",
    "8": "８",
    "9": "９",
    "ｧ": "ァ",
    "ｱ": "ア",
    "ｨ": "ィ",
    "ｲ": "イ",
    "ｩ": "ゥ",
    "ｳ": "ウ",
    "ｪ": "ェ",
    "ｴ": "エ",
    "ｫ": "ォ",
    "ｵ": "オ",
    "ｶ": "カ",
    "ｶﾞ": "ガ",
    "ｷ": "キ",
    "ｷﾞ": "ギ",
    "ｸ": "ク",
    "ｸﾞ": "グ",
    "ｹ": "ケ",
    "ｹﾞ": "ゲ",
    "ｺ": "コ",
    "ｺﾞ": "ゴ",
    "ｻ": "サ",
    "ｻﾞ": "ザ",
    "ｼ": "シ",
    "ｼﾞ": "ジ",
    "ｽ": "ス",
    "ｽﾞ": "ズ",
    "ｾ": "セ",
    "ｾﾞ": "ゼ",
    "ｿ": "ソ",
    "ｿﾞ": "ゾ",
    "ﾀ": "タ",
    "ﾀﾞ": "ダ",
    "ﾁ": "チ",
    "ﾁﾞ": "ヂ",
    "ｯ": "ッ",
    "ﾂ": "ツ",
    "ﾂﾞ": "ヅ",
    "ﾃ": "テ",
    "ﾃﾞ": "デ",
    "ﾄ": "ト",
    "ﾄﾞ": "ド",
    "ﾅ": "ナ",
    "ﾆ": "ニ",
    "ﾇ": "ヌ",
    "ﾈ": "ネ",
    "ﾉ": "ノ",
    "ﾊ": "ハ",
    "ﾊﾞ": "バ",
    "ﾊﾟ": "パ",
    "ﾋ": "ヒ",
    "ﾋﾞ": "ビ",
    "ﾋﾟ": "ピ",
    "ﾌ": "フ",
    "ﾌﾞ": "ブ",
    "ﾌﾟ": "プ",
    "ﾍ": "ヘ",
    "ﾍﾞ": "ベ",
    "ﾍﾟ": "ペ",
    "ﾎ": "ホ",
    "ﾎﾞ": "ボ",
    "ﾎﾟ": "ポ",
    "ﾏ": "マ",
    "ﾐ": "ミ",
    "ﾑ": "ム",
    "ﾒ": "メ",
    "ﾓ": "モ",
    "ｬ": "ャ",
    "ﾔ": "ヤ",
    "ｭ": "ュ",
    "ﾕ": "ユ",
    "ｮ": "ョ",
    "ﾖ": "ヨ",
    "ﾗ": "ラ",
    "ﾘ": "リ",
    "ﾙ": "ル",
    "ﾚ": "レ",
    "ﾛ": "ロ",
    "ﾜ": "ワ",
    "ｦ": "ヲ",
    "ﾝ": "ン",
    "ｳﾞ": "ヴ",
    "!": "！",
    "\"": "”",
    "#": "＃",
    "$": "＄",
    "%": "％",
    "&": "＆",
    "'": "’",
    "(": "（",
    ")": "）",
    "=": "＝",
    "-": "－",
    "~": "～",
    "^": "＾",
    "\\": "￥",
    "@": "＠",
    "+": "＋",
    "*": "＊",
    "{": "｛",
    "}": "｝",
    "[": "［",
    "]": "］",
    ";": "；",
    ":": "：",
    "<": "＜",
    ">": "＞",
    ",": "，",
    ".": "．",
    "?": "？",
    "_": "＿",
    "/": "／",
    " ": "　",
};
/**
 * 全角を半角に置き換えるための連想配列。
 */
StringObject.WIDE_TO_NARROW_MAP = {
    "ａ": "a",
    "ｂ": "b",
    "ｃ": "c",
    "ｄ": "d",
    "ｅ": "e",
    "ｆ": "f",
    "ｇ": "g",
    "ｈ": "h",
    "ｉ": "i",
    "ｊ": "j",
    "ｋ": "k",
    "ｌ": "l",
    "ｍ": "m",
    "ｎ": "n",
    "ｏ": "o",
    "ｐ": "p",
    "ｑ": "q",
    "ｒ": "r",
    "ｓ": "s",
    "ｔ": "t",
    "ｕ": "u",
    "ｖ": "v",
    "ｗ": "w",
    "ｘ": "x",
    "ｙ": "y",
    "ｚ": "z",
    "Ａ": "A",
    "Ｂ": "B",
    "Ｃ": "C",
    "Ｄ": "D",
    "Ｅ": "E",
    "Ｆ": "F",
    "Ｇ": "G",
    "Ｈ": "H",
    "Ｉ": "I",
    "Ｊ": "J",
    "Ｋ": "K",
    "Ｌ": "L",
    "Ｍ": "M",
    "Ｎ": "N",
    "Ｏ": "O",
    "Ｐ": "P",
    "Ｑ": "Q",
    "Ｒ": "R",
    "Ｓ": "S",
    "Ｔ": "T",
    "Ｕ": "U",
    "Ｖ": "V",
    "Ｗ": "W",
    "Ｘ": "X",
    "Ｙ": "Y",
    "Ｚ": "Z",
    "０": "0",
    "１": "1",
    "２": "2",
    "３": "3",
    "４": "4",
    "５": "5",
    "６": "6",
    "７": "7",
    "８": "8",
    "９": "9",
    "ァ": "ｧ",
    "ア": "ｱ",
    "ィ": "ｨ",
    "イ": "ｲ",
    "ゥ": "ｩ",
    "ウ": "ｳ",
    "ェ": "ｪ",
    "エ": "ｴ",
    "ォ": "ｫ",
    "オ": "ｵ",
    "カ": "ｶ",
    "ガ": "ｶﾞ",
    "キ": "ｷ",
    "ギ": "ｷﾞ",
    "ク": "ｸ",
    "グ": "ｸﾞ",
    "ケ": "ｹ",
    "ゲ": "ｹﾞ",
    "コ": "ｺ",
    "ゴ": "ｺﾞ",
    "サ": "ｻ",
    "ザ": "ｻﾞ",
    "シ": "ｼ",
    "ジ": "ｼﾞ",
    "ス": "ｽ",
    "ズ": "ｽﾞ",
    "セ": "ｾ",
    "ゼ": "ｾﾞ",
    "ソ": "ｿ",
    "ゾ": "ｿﾞ",
    "タ": "ﾀ",
    "ダ": "ﾀﾞ",
    "チ": "ﾁ",
    "ヂ": "ﾁﾞ",
    "ッ": "ｯ",
    "ツ": "ﾂ",
    "ヅ": "ﾂﾞ",
    "テ": "ﾃ",
    "デ": "ﾃﾞ",
    "ト": "ﾄ",
    "ド": "ﾄﾞ",
    "ナ": "ﾅ",
    "ニ": "ﾆ",
    "ヌ": "ﾇ",
    "ネ": "ﾈ",
    "ノ": "ﾉ",
    "ハ": "ﾊ",
    "バ": "ﾊﾞ",
    "パ": "ﾊﾟ",
    "ヒ": "ﾋ",
    "ビ": "ﾋﾞ",
    "ピ": "ﾋﾟ",
    "フ": "ﾌ",
    "ブ": "ﾌﾞ",
    "プ": "ﾌﾟ",
    "ヘ": "ﾍ",
    "ベ": "ﾍﾞ",
    "ペ": "ﾍﾟ",
    "ホ": "ﾎ",
    "ボ": "ﾎﾞ",
    "ポ": "ﾎﾟ",
    "マ": "ﾏ",
    "ミ": "ﾐ",
    "ム": "ﾑ",
    "メ": "ﾒ",
    "モ": "ﾓ",
    "ャ": "ｬ",
    "ヤ": "ﾔ",
    "ュ": "ｭ",
    "ユ": "ﾕ",
    "ョ": "ｮ",
    "ヨ": "ﾖ",
    "ラ": "ﾗ",
    "リ": "ﾘ",
    "ル": "ﾙ",
    "レ": "ﾚ",
    "ロ": "ﾛ",
    "ワ": "ﾜ",
    "ヲ": "ｦ",
    "ン": "ﾝ",
    "ヴ": "ｳﾞ",
    "！": "!",
    "”": "\"",
    "＃": "#",
    "＄": "$",
    "％": "%",
    "＆": "&",
    "’": "'",
    "（": "(",
    "）": ")",
    "＝": "=",
    "－": "-",
    "～": "~",
    "＾": "^",
    "￥": "\\",
    "＠": "@",
    "＋": "+",
    "＊": "*",
    "｛": "{",
    "｝": "}",
    "［": "[",
    "］": "]",
    "；": ";",
    "：": ":",
    "＜": "<",
    "＞": ">",
    "，": ",",
    "．": ".",
    "？": "?",
    "＿": "_",
    "／": "/",
    "　": " ",
};
/**
 * ひらがなをカタカナに置き換えるための連想配列。
 */
StringObject.HIRAGANA_TO_KATAKANA_MAP = {
    "ぁ": "ァ",
    "あ": "ア",
    "ぃ": "ィ",
    "い": "イ",
    "ぅ": "ゥ",
    "う": "ウ",
    "ぇ": "ェ",
    "え": "エ",
    "ぉ": "ォ",
    "お": "オ",
    "か": "カ",
    "が": "ガ",
    "き": "キ",
    "ぎ": "ギ",
    "く": "ク",
    "ぐ": "グ",
    "け": "ケ",
    "げ": "ゲ",
    "こ": "コ",
    "ご": "ゴ",
    "さ": "サ",
    "ざ": "ザ",
    "し": "シ",
    "じ": "ジ",
    "す": "ス",
    "ず": "ズ",
    "せ": "セ",
    "ぜ": "ゼ",
    "そ": "ソ",
    "ぞ": "ゾ",
    "た": "タ",
    "だ": "ダ",
    "ち": "チ",
    "ぢ": "ヂ",
    "っ": "ッ",
    "つ": "ツ",
    "づ": "ヅ",
    "て": "テ",
    "で": "デ",
    "と": "ト",
    "ど": "ド",
    "な": "ナ",
    "に": "ニ",
    "ぬ": "ヌ",
    "ね": "ネ",
    "の": "ノ",
    "は": "ハ",
    "ば": "バ",
    "ぱ": "パ",
    "ひ": "ヒ",
    "び": "ビ",
    "ぴ": "ピ",
    "ふ": "フ",
    "ぶ": "ブ",
    "ぷ": "プ",
    "へ": "ヘ",
    "べ": "ベ",
    "ぺ": "ペ",
    "ほ": "ホ",
    "ぼ": "ボ",
    "ぽ": "ポ",
    "ま": "マ",
    "み": "ミ",
    "む": "ム",
    "め": "メ",
    "も": "モ",
    "ゃ": "ャ",
    "や": "ヤ",
    "ゅ": "ュ",
    "ゆ": "ユ",
    "ょ": "ョ",
    "よ": "ヨ",
    "ら": "ラ",
    "り": "リ",
    "る": "ル",
    "れ": "レ",
    "ろ": "ロ",
    "ゎ": "ヮ",
    "わ": "ワ",
    "ゐ": "ヰ",
    "ゑ": "ヱ",
    "を": "ヲ",
    "ん": "ン",
};
/**
 * カタカナをひらがなに置き換えるための連想配列。
 */
StringObject.KATAKANA_TO_HIRAGANA_MAP = {
    "ァ": "ぁ",
    "ア": "あ",
    "ィ": "ぃ",
    "イ": "い",
    "ゥ": "ぅ",
    "ウ": "う",
    "ェ": "ぇ",
    "エ": "え",
    "ォ": "ぉ",
    "オ": "お",
    "カ": "か",
    "ガ": "が",
    "キ": "き",
    "ギ": "ぎ",
    "ク": "く",
    "グ": "ぐ",
    "ケ": "け",
    "ゲ": "げ",
    "コ": "こ",
    "ゴ": "ご",
    "サ": "さ",
    "ザ": "ざ",
    "シ": "し",
    "ジ": "じ",
    "ス": "す",
    "ズ": "ず",
    "セ": "せ",
    "ゼ": "ぜ",
    "ソ": "そ",
    "ゾ": "ぞ",
    "タ": "た",
    "ダ": "だ",
    "チ": "ち",
    "ヂ": "ぢ",
    "ッ": "っ",
    "ツ": "つ",
    "ヅ": "づ",
    "テ": "て",
    "デ": "で",
    "ト": "と",
    "ド": "ど",
    "ナ": "な",
    "ニ": "に",
    "ヌ": "ぬ",
    "ネ": "ね",
    "ノ": "の",
    "ハ": "は",
    "バ": "ば",
    "パ": "ぱ",
    "ヒ": "ひ",
    "ビ": "び",
    "ピ": "ぴ",
    "フ": "ふ",
    "ブ": "ぶ",
    "プ": "ぷ",
    "ヘ": "へ",
    "ベ": "べ",
    "ペ": "ぺ",
    "ホ": "ほ",
    "ボ": "ぼ",
    "ポ": "ぽ",
    "マ": "ま",
    "ミ": "み",
    "ム": "む",
    "メ": "め",
    "モ": "も",
    "ャ": "ゃ",
    "ヤ": "や",
    "ュ": "ゅ",
    "ユ": "ゆ",
    "ョ": "ょ",
    "ヨ": "よ",
    "ラ": "ら",
    "リ": "り",
    "ル": "る",
    "レ": "れ",
    "ロ": "ろ",
    "ヮ": "ゎ",
    "ワ": "わ",
    "ヰ": "ゐ",
    "ヱ": "ゑ",
    "ヲ": "を",
    "ン": "ん",
};
/**
 * 日本語の小文字を大文字に置き換えるための連想配列。
 */
StringObject.JAPANESE_LOWER_TO_UPPER_MAP = {
    "ぁ": "あ",
    "ぃ": "い",
    "ぅ": "う",
    "ぇ": "え",
    "ぉ": "お",
    "ゃ": "や",
    "ゅ": "ゆ",
    "ょ": "よ",
    "っ": "つ",
    "ァ": "ア",
    "ィ": "イ",
    "ゥ": "ウ",
    "ェ": "エ",
    "ォ": "オ",
    "ャ": "ヤ",
    "ュ": "ユ",
    "ョ": "ヨ",
    "ッ": "ツ",
};
/**
 * 日本語の大文字を小文字に置き換えるための連想配列。
 */
StringObject.JAPANESE_UPPER_TO_LOWER_MAP = {
    "あ": "ぁ",
    "い": "ぃ",
    "う": "ぅ",
    "え": "ぇ",
    "お": "ぉ",
    "や": "ゃ",
    "ゆ": "ゅ",
    "よ": "ょ",
    "つ": "っ",
    "ア": "ァ",
    "イ": "ィ",
    "ウ": "ゥ",
    "エ": "ェ",
    "オ": "ォ",
    "ヤ": "ャ",
    "ユ": "ュ",
    "ヨ": "ョ",
    "ツ": "ッ",
};
export default StringObject;
