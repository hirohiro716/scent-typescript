/**
 * 文字列の妥当性を確認するクラス。
 */
export declare class StringValidator {
    /**
     * コンストラクタ。確認する値の名称を指定する。指定された名称はエラーメッセージの作成に使用される。
     *
     * @param nameOfValue
     */
    constructor(nameOfValue: string);
    private readonly nameOfValue;
    private readonly scheduledMethods;
    /**
     * 予約されている確認をすべてクリアする。
     */
    clear(): void;
    /**
     * 対象が長さゼロの文字列、またはnullの場合に例外をスローする確認を予約する。
     */
    addBlankCheck(): void;
    /**
     * 対象に整数以外の文字列が含まれる場合に例外をスローする確認を予約する。
     */
    addIntegerCheck(): void;
    /**
     * 対象に整数または小数点以外の文字列が含まれる場合に例外をスローする確認を予約する。
     */
    addDecimalCheck(): void;
    /**
     * 対象の文字数が指定された文字数と異なる場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     *
     * @param length
     */
    addLengthCheck(length: number): void;
    /**
     * 対象の文字数が指定された文字数を超える場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     *
     * @param length
     */
    addMaximumLengthCheck(length: number): void;
    /**
     * 対象の文字数が指定された文字数に満たない場合に例外をスローする確認を予約する。引数に負数が指定された場合は確認を実行しない。
     *
     * @param length
     */
    addMinimumLengthCheck(length: number): void;
    /**
     * 対象がゼロと等しい場合に例外をスローする確認を予約する。
     */
    addZeroCheck(): void;
    /**
     * 対象の数値が指定された値を超える場合に例外をスローする確認を予約する。
     *
     * @param value
     */
    addMaximumValueCheck(value: number): void;
    /**
     * 対象の数値が指定された値に満たない場合に例外をスローする確認を予約する。
     *
     * @param value
     */
    addMinimumValueCheck(value: number): void;
    /**
     * 対象の値がDateインスタンスではない、または日時として有効ではない文字列の場合に例外をスローする確認を予約する。
     */
    addDatetimeCheck(): void;
    /**
     * 対象の文字列が電話番号として有効ではない場合に例外をスローする確認を予約する。
     */
    addTelephoneNumberCheck(): void;
    /**
     * 対象の文字列にひらがな以外の文字が含まれている場合に例外をスローする確認を予約する。
     */
    addHiraganaCheck(): void;
    /**
     * 対象の文字列にカタカナ以外の文字が含まれている場合に例外をスローする確認を予約する。
     */
    addKatakanaCheck(): void;
    /**
     * 対象の文字列が正規表現とマッチしない場合に例外をスローする確認を予約する。
     *
     * @param regex
     */
    addRegexCheck(regex: string): void;
    /**
     * 対象の文字列が正規表現とマッチする場合に例外をスローする確認を予約する。
     *
     * @param regex
     */
    addReverseRegexCheck(regex: string): void;
    /**
     * 指定された妥当性確認タイプに対するエラーを作成する。
     *
     * @param method
     * @returns
     */
    private createError;
    /**
     * 指定された値の文字列表現に対して予約されている確認事項をすべて実行する。
     *
     * @param valueLikeString
     * @throws StringValidationError
     */
    validate(valueLikeString: any): void;
}
/**
 * 文字列が妥当ではない場合に発生するエラーのクラス。
 */
export declare class StringValidationError extends Error {
    /**
     * コンストラクタ。エラーの説明、ErrorOptionsを指定する。
     *
     * @param message
     * @param options
     */
    constructor(message: string | undefined);
}
