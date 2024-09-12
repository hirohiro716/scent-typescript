import StringObject from "../StringObject.js";
/**
 * 文字列の妥当性を確認するクラス。
 */
export class StringValidator {
    /**
     * コンストラクタ。確認する値の名称を指定する。指定された名称はエラーメッセージの作成に使用される。
     *
     * @param nameOfValue
     */
    constructor(nameOfValue) {
        this.scheduledMethods = new Map();
        this.nameOfValue = nameOfValue;
    }
    /**
     * 予約されている確認をすべてクリアする。
     */
    clear() {
        this.scheduledMethods.clear();
    }
    /**
     * 対象が長さゼロの文字列、またはnullの場合に例外をスローする確認を予約する。
     */
    addBlankCheck() {
        this.scheduledMethods.set(Method.blank, null);
    }
    /**
     * 対象に整数以外の文字列が含まれる場合に例外をスローする確認を予約する。
     */
    addIntegerCheck() {
        this.scheduledMethods.set(Method.integer, null);
    }
    /**
     * 対象に整数または小数点以外の文字列が含まれる場合に例外をスローする確認を予約する。
     */
    addDecimalCheck() {
        this.scheduledMethods.set(Method.decimal, null);
    }
    /**
     * 対象の文字数が指定された文字数と異なる場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     *
     * @param length
     */
    addLengthCheck(length) {
        this.scheduledMethods.set(Method.length, length);
    }
    /**
     * 対象の文字数が指定された文字数を超える場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     *
     * @param length
     */
    addMaximumLengthCheck(length) {
        this.scheduledMethods.set(Method.maximumLength, length);
    }
    /**
     * 対象の文字数が指定された文字数に満たない場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     *
     * @param length
     */
    addMinimumLengthCheck(length) {
        this.scheduledMethods.set(Method.minimumLength, length);
    }
    /**
     * 対象がゼロと等しい場合に例外をスローする確認を予約する。
     */
    addZeroCheck() {
        this.scheduledMethods.set(Method.zero, null);
    }
    /**
     * 対象の数値が指定された値を超える場合に例外をスローする確認を予約する。
     *
     * @param value
     */
    addMaximumValueCheck(value) {
        this.scheduledMethods.set(Method.maximumValue, value);
    }
    /**
     * 対象の数値が指定された値に満たない場合に例外をスローする確認を予約する。
     *
     * @param value
     */
    addMinimumValueCheck(value) {
        this.scheduledMethods.set(Method.minimumValue, value);
    }
    /**
     * 対象の値がDateインスタンスではない、または日時として有効ではない文字列の場合に例外をスローする確認を予約する。
     */
    addDatetimeCheck() {
        this.scheduledMethods.set(Method.datetime, null);
    }
    /**
     * 対象の文字列が電話番号として有効ではない場合に例外をスローする確認を予約する。
     */
    addTelephoneNumberCheck() {
        this.scheduledMethods.set(Method.telephoneNumber, null);
    }
    /**
     * 対象の文字列にひらがな以外の文字が含まれている場合に例外をスローする確認を予約する。
     */
    addHiraganaCheck() {
        this.scheduledMethods.set(Method.hiragana, null);
    }
    /**
     * 対象の文字列にカタカナ以外の文字が含まれている場合に例外をスローする確認を予約する。
     */
    addKatakanaCheck() {
        this.scheduledMethods.set(Method.katakana, null);
    }
    /**
     * 対象の文字列が正規表現とマッチしない場合に例外をスローする確認を予約する。
     *
     * @param regex
     */
    addRegexCheck(regex) {
        this.scheduledMethods.set(Method.regex, regex);
    }
    /**
     * 対象の文字列が正規表現とマッチする場合に例外をスローする確認を予約する。
     *
     * @param regex
     */
    addReverseRegexCheck(regex) {
        this.scheduledMethods.set(Method.reverseRegex, regex);
    }
    /**
     * 指定された妥当性確認タイプに対するエラーを作成する。
     *
     * @param method
     * @returns
     */
    createError(method) {
        const message = new StringObject(this.nameOfValue);
        switch (method) {
            case Method.blank:
                message.append("が入力されていません。");
                break;
            case Method.integer:
            case Method.decimal:
                message.append("に数字以外の文字列が含まれています。");
                break;
            case Method.length:
                message.append("は");
                message.append(this.scheduledMethods.get(method));
                message.append("文字である必要があります。");
                break;
            case Method.maximumLength:
                message.append("の文字数が多すぎます。");
                message.append(this.scheduledMethods.get(method));
                message.append("文字以下にする必要があります。");
                break;
            case Method.minimumLength:
                message.append("の文字数が足りません。");
                message.append(this.scheduledMethods.get(method));
                message.append("文字必要です。");
                break;
            case Method.zero:
                message.append("にゼロは入力できません。");
                break;
            case Method.maximumValue:
                message.append("は最大で「");
                message.append(this.scheduledMethods.get(method));
                message.append("まで入力することができます。");
                break;
            case Method.minimumValue:
                message.append("は「");
                message.append(this.scheduledMethods.get(method));
                message.append("」以上である必要があります。");
                break;
            case Method.datetime:
            case Method.telephoneNumber:
            case Method.regex:
            case Method.reverseRegex:
                message.append("が正しくありません。");
                break;
            case Method.hiragana:
            case Method.katakana:
                message.append("に使用できない文字が含まれています。");
                break;
        }
        return new StringValidationError(message.toString());
    }
    /**
     * 指定された値の文字列表現に対して予約されている確認事項をすべて実行する。
     *
     * @param valueLikeString
     * @throws StringValidationError
     */
    validate(valueLikeString) {
        const value = new StringObject(valueLikeString);
        for (const [method, parameter] of this.scheduledMethods.entries()) {
            switch (method) {
                case Method.blank:
                    if (value.length() === 0) {
                        throw this.createError(method);
                    }
                    break;
                case Method.integer:
                    if (value.length() > 0) {
                        if (value.clone().replace("[-0-9]", "").length() > 0 || value.toNumber() === null) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.decimal:
                    if (value.length() > 0 && value.toNumber() === null) {
                        throw this.createError(method);
                    }
                    break;
                case Method.length:
                    if (value.length() > 0 && value.length() != parameter) {
                        throw this.createError(method);
                    }
                    break;
                case Method.maximumLength:
                    if (value.length() > 0 && value.length() > parameter) {
                        throw this.createError(method);
                    }
                    break;
                case Method.minimumLength:
                    if (value.length() > 0 && value.length() < parameter) {
                        throw this.createError(method);
                    }
                    break;
                case Method.zero:
                    if (value.length() > 0) {
                        const valueLikeNumber = value.toNumber();
                        if (valueLikeNumber != null && valueLikeNumber === 0) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.maximumValue:
                    if (value.length() > 0) {
                        const valueLikeNumber = value.toNumber();
                        if (valueLikeNumber != null && valueLikeNumber > parameter) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.minimumValue:
                    if (value.length() > 0) {
                        const valueLikeNumber = value.toNumber();
                        if (valueLikeNumber != null && valueLikeNumber < parameter) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.datetime:
                    if (value.length() > 0) {
                        const valueLikeDatetime = value.toDatetime();
                        if (valueLikeDatetime === null) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.telephoneNumber:
                    if (value.length() > 0) {
                        const numbers = value.splitToStrings("-");
                        if (value.clone().replace("[-+0-9]{10,}", "").length() > 0 || numbers.length < 3 || numbers.includes("")) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.hiragana:
                    if (value.length() > 0) {
                        if (value.clone().replace("[ぁ-んー]", "").length() > 0) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.katakana:
                    if (value.length() > 0) {
                        if (value.clone().replace("[ァ-ヴー]", "").length() > 0) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.regex:
                    if (value.length() > 0) {
                        if (value.clone().replace(parameter, "").length() === value.length()) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.reverseRegex:
                    if (value.length() > 0) {
                        if (value.clone().replace(parameter, "").length() != value.length()) {
                            throw this.createError(method);
                        }
                    }
                    break;
            }
        }
    }
}
/**
 * 妥当性確認タイプの列挙型。
 */
var Method;
(function (Method) {
    Method["blank"] = "blank";
    Method["integer"] = "integer";
    Method["decimal"] = "decimal";
    Method["length"] = "length";
    Method["maximumLength"] = "maximumLength";
    Method["minimumLength"] = "minimumLength";
    Method["zero"] = "zero";
    Method["maximumValue"] = "maximumValue";
    Method["minimumValue"] = "minimumValue";
    Method["datetime"] = "datetime";
    Method["telephoneNumber"] = "telephoneNumber";
    Method["hiragana"] = "hiragana";
    Method["katakana"] = "katakana";
    Method["regex"] = "regex";
    Method["reverseRegex"] = "reverseRegex";
})(Method || (Method = {}));
/**
 * 文字列が妥当ではない場合に発生するエラーのクラス。
 */
export class StringValidationError extends Error {
    /**
     * コンストラクタ。エラーの説明、ErrorOptionsを指定する。
     *
     * @param message
     * @param options
     */
    constructor(message) {
        super(message);
    }
}
