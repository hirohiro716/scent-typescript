import StringObject from "../StringObject.js";
import { Datetime } from "../datetime/Datetime.js";

/**
 * 文字列の妥当性を確認するクラス。
 */
export class StringValidator {

    /**
     * コンストラクタ。確認する値の名称を指定する。指定された名称はエラーメッセージの作成に使用される。
     * 
     * @param nameOfValue 
     */
    public constructor(nameOfValue: string) {
        this.nameOfValue = nameOfValue;
    }

    private readonly nameOfValue: string;

    private readonly scheduledMethods: Map<Method, any> = new Map();

    /**
     * 予約されている確認をすべてクリアする。
     */
    public clear(): void {
        this.scheduledMethods.clear();
    }

    /**
     * 対象が長さゼロの文字列、またはnullの場合に例外をスローする確認を予約する。
     */
    public addBlankCheck(): void {
        this.scheduledMethods.set(Method.BLANK, null);
    }

    /**
     * 対象に整数以外の文字列が含まれる場合に例外をスローする確認を予約する。
     */
    public addIntegerCheck(): void {
        this.scheduledMethods.set(Method.INTEGER, null);
    }

    /**
     * 対象に整数または小数点以外の文字列が含まれる場合に例外をスローする確認を予約する。
     */
    public addDecimalCheck(): void {
        this.scheduledMethods.set(Method.DECIMAL, null);
    }

    /**
     * 対象の文字数が指定された文字数と異なる場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     * 
     * @param length 
     */
    public addLengthCheck(length: number): void {
        this.scheduledMethods.set(Method.LENGTH, length);
    }

    /**
     * 対象の文字数が指定された文字数を超える場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     * 
     * @param length 
     */
    public addMaximumLengthCheck(length: number): void {
        this.scheduledMethods.set(Method.MAXIMUM_LENGTH, length);
    }

    /**
     * 対象の文字数が指定された文字数に満たない場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     * 
     * @param length 
     */
    public addMinimumLengthCheck(length: number): void {
        this.scheduledMethods.set(Method.MINIMUM_LENGTH, length);
    }

    /**
     * 対象がゼロと等しい場合に例外をスローする確認を予約する。
     */
    public addZeroCheck(): void {
        this.scheduledMethods.set(Method.ZERO, null);
    }

    /**
     * 対象の数値が指定された値を超える場合に例外をスローする確認を予約する。
     * 
     * @param value 
     */
    public addMaximumValueCheck(value: number): void {
        this.scheduledMethods.set(Method.MAXIMUM_VALUE, value);
    }

    /**
     * 対象の数値が指定された値に満たない場合に例外をスローする確認を予約する。
     * 
     * @param value 
     */
    public addMinimumValueCheck(value: number): void {
        this.scheduledMethods.set(Method.MINIMUM_VALUE, value);
    }

    /**
     * 対象の値がDateオブジェクトではない、または日時として有効ではない文字列の場合に例外をスローする確認を予約する。
     */
    public addDatetimeCheck(): void {
        this.scheduledMethods.set(Method.DATETIME, null);
    }

    /**
     * 対象の文字列が電話番号として有効ではない場合に例外をスローする確認を予約する。
     */
    public addTelephoneNumberCheck(): void {
        this.scheduledMethods.set(Method.TELEPHONE_NUMBER, null);
    }

    /**
     * 対象の文字列にひらがな以外の文字が含まれている場合に例外をスローする確認を予約する。
     */
    public addHiraganaCheck(): void {
        this.scheduledMethods.set(Method.HIRAGANA, null);
    }

    /**
     * 対象の文字列にカタカナ以外の文字が含まれている場合に例外をスローする確認を予約する。
     */
    public addKatakanaCheck(): void {
        this.scheduledMethods.set(Method.KATAKANA, null);
    }

    /**
     * 対象の文字列が正規表現とマッチしない場合に例外をスローする確認を予約する。
     * 
     * @param regex 
     */
    public addRegexCheck(regex: string): void {
        this.scheduledMethods.set(Method.REGEX, regex);
    }

    /**
     * 対象の文字列が正規表現とマッチする場合に例外をスローする確認を予約する。
     * 
     * @param regex 
     */
    public addReverseRegexCheck(regex: string): void {
        this.scheduledMethods.set(Method.REVERSE_REGEX, regex);
    }

    /**
     * 指定された妥当性確認タイプに対するエラーを作成する。
     * 
     * @param method 
     * @returns 
     */
    private createError(method: Method): StringValidationError {
        const message: StringObject = new StringObject(this.nameOfValue);
        switch (method) {
            case Method.BLANK:
                message.append("が入力されていません。");
                break;
            case Method.INTEGER:
            case Method.DECIMAL:
                message.append("に数字以外の文字列が含まれています。");
                break;
            case Method.LENGTH:
                message.append("は");
                message.append(this.scheduledMethods.get(method));
                message.append("文字である必要があります。");
                break;
            case Method.MAXIMUM_LENGTH:
                message.append("の文字数が多すぎます。");
                message.append(this.scheduledMethods.get(method));
                message.append("文字以下にする必要があります。");
                break;
            case Method.MINIMUM_LENGTH:
                message.append("の文字数が足りません。");
                message.append(this.scheduledMethods.get(method));
                message.append("文字必要です。");
                break;
            case Method.ZERO:
                message.append("にゼロは入力できません。");
                break;
            case Method.MAXIMUM_VALUE:
                message.append("は最大で「");
                message.append(this.scheduledMethods.get(method));
                message.append("まで入力することができます。");
                break;
            case Method.MINIMUM_VALUE:
                message.append("は「");
                message.append(this.scheduledMethods.get(method));
                message.append("」以上である必要があります。");
                break;
            case Method.DATETIME:
            case Method.TELEPHONE_NUMBER:
            case Method.REGEX:
            case Method.REVERSE_REGEX:
                message.append("が正しくありません。");
                break;
            case Method.HIRAGANA:
            case Method.KATAKANA:
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
    public validate(valueLikeString: any): void {
        const value: StringObject = new StringObject(valueLikeString);
        for (const [method, parameter] of this.scheduledMethods.entries()) {
            switch (method) {
                case Method.BLANK:
                    if (value.length() === 0) {
                        throw this.createError(method);
                    }
                    break;
                case Method.INTEGER:
                    if (value.length() > 0) {
                        if (value.clone().replace("[-0-9]", "").length() > 0 || value.toNumber() === null) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.DECIMAL:
                    if (value.length() > 0 && value.toNumber() === null) {
                        throw this.createError(method);
                    }
                    break;
                case Method.LENGTH:
                    if (value.length() > 0 && value.length() != parameter) {
                        throw this.createError(method);
                    }
                    break;
                case Method.MAXIMUM_LENGTH:
                    if (value.length() > 0 && value.length() > parameter) {
                        throw this.createError(method);
                    }
                    break;
                case Method.MINIMUM_LENGTH:
                    if (value.length() > 0 && value.length() < parameter) {
                        throw this.createError(method);
                    }
                    break;
                case Method.ZERO:
                    if (value.length() > 0) {
                        const valueLikeNumber: Number | null = value.toNumber();
                        if (valueLikeNumber != null && valueLikeNumber === 0) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.MAXIMUM_VALUE:
                    if (value.length() > 0) {
                        const valueLikeNumber: Number | null = value.toNumber();
                        if (valueLikeNumber != null && valueLikeNumber > parameter) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.MINIMUM_VALUE:
                    if (value.length() > 0) {
                        const valueLikeNumber: Number | null = value.toNumber();
                        if (valueLikeNumber != null && valueLikeNumber < parameter) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.DATETIME:
                    if (value.length() > 0) {
                        const valueLikeDatetime: Datetime | null = value.toDatetime();
                        if (valueLikeDatetime === null) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.TELEPHONE_NUMBER:
                    if (value.length() > 0) {
                        const numbers: string[] = value.splitToStrings("-");
                        if (value.clone().replace("[-+0-9]{10,}", "").length() > 0 || numbers.length < 3 || numbers.includes("")) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.HIRAGANA:
                    if (value.length() > 0) {
                        if (value.clone().replace("[ぁ-んー]", "").length() > 0) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.KATAKANA:
                    if (value.length() > 0) {
                        if (value.clone().replace("[ァ-ヴー]", "").length() > 0) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.REGEX:
                    if (value.length() > 0) {
                        if (value.clone().replace(parameter, "").length() === value.length()) {
                            throw this.createError(method);
                        }
                    }
                    break;
                case Method.REVERSE_REGEX:
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
const enum Method {
    BLANK = "blank",
    INTEGER = "integer",
    DECIMAL = "decimal",
    LENGTH = "length",
    MAXIMUM_LENGTH = "maximumLength",
    MINIMUM_LENGTH = "minimumLength",
    ZERO = "zero",
    MAXIMUM_VALUE = "maximumValue",
    MINIMUM_VALUE = "minimumValue",
    DATETIME = "datetime",
    TELEPHONE_NUMBER = "telephoneNumber",
    HIRAGANA = "hiragana",
    KATAKANA = "katakana",
    REGEX = "regex",
    REVERSE_REGEX = "reverseRegex",
}

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
    public constructor(message: string | undefined) {
        super(message);
    }
}
