import Property from "../Property.js";
/**
 * 特定のオブジェクトの妥当性を確認し有効化するクラス。
 */
export declare abstract class ObjectValidator<T extends Record<string, any>> {
    /**
     * コンストラクタ。妥当性を確認して有効化するターゲットを指定する。
     *
     * @param target
     */
    constructor(target?: T);
    private _target;
    /**
     * 妥当性を確認して有効化するターゲット。
     */
    get target(): Record<string, any>;
    set target(target: Record<string, any>);
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
     * @throws Error
     */
    protected abstract valueValidate(property: Property): Promise<void>;
    /**
     * ターゲットの妥当性を確認する。
     *
     * @throws ObjectValidationError
     */
    validate(): Promise<void>;
    /**
     * ターゲットの指定されたキーに対応する値を標準化して返す。undefinedを返す場合は値に対して何もしない。
     *
     * @returns
     */
    protected abstract valueNormalize(property: Property): Promise<any>;
    /**
     * ターゲットを標準化する。
     */
    normalize(): Promise<void>;
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
