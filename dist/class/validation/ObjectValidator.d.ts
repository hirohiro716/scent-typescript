import Property from "../Property.js";
/**
 * 特定のオブジェクトの妥当性を確認し有効化するクラス。
 */
export declare abstract class ObjectValidator<T extends Record<string, any>> {
    /**
     * コンストラクタ。妥当性を確認して有効化するターゲットとその一般名を指定する。
     *
     * @param target
     */
    constructor(target: T);
    protected readonly target: Record<string, any>;
    /**
     * ターゲットを取得する。
     *
     * @returns
     */
    getTarget(): any;
    /**
     * ターゲットの一般名を取得する。
     *
     * @returns
     */
    abstract getTargetGeneralName(): string;
    /**
     * ターゲットの妥当性を確認するためのプロパティ。
     *
     * @returns
     */
    protected abstract propertiesForValidation(): Property[];
    /**
     * ターゲットの指定されたキーに対応する値の妥当性を確認する。
     *
     * @throws StringValidationError
     */
    protected abstract valueValidate(property: Property): void;
    /**
     * ターゲットの妥当性を確認する。
     *
     * @throws ObjectValidationError
     */
    validate(): void;
    /**
     * ターゲットの指定されたキーに対応する値を標準化して返す。
     */
    protected abstract valueNormalize(property: Property): any;
    /**
     * ターゲットを標準化する。
     */
    normalize(): void;
}
/**
 * オブジェクトが妥当ではない場合に発生するエラーのクラス。
 */
export declare class ObjectValidationError extends Error {
    /**
     * コンストラクタ。オブジェクトの一般名、原因となったプロパティとメッセージの連想配列を指定する。
     *
     * @param targetGeneralName
     * @param causeMessages
     */
    constructor(targetGeneralName: string, causeMessages: Map<Property, string>);
    /**
     * 原因となったプロパティ。
     */
    readonly causeProperties: Property[];
    /**
     * 原因となったプロパティとメッセージの連想配列。
     */
    private readonly causeMessages;
    /**
     * 指定されたプロパティのエラーメッセージを取得する。
     *
     * @param causeProperty
     * @returns
     */
    getMessage(causeProperty: Property): string;
}
