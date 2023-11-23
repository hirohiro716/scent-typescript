import Property from "../Property.js";

/**
 * 特定のオブジェクトの妥当性を確認し有効化するクラス。
 */
export abstract class ObjectValidator<T extends Record<string, any>> {

    /**
     * コンストラクタ。妥当性を確認して有効化するターゲットとその一般名を指定する。
     * 
     * @param target 
     */
    public constructor(target: T) {
        this.target = target;
    }

    protected readonly target: Record<string, any>;

    /**
     * ターゲットを取得する。
     * 
     * @returns 
     */
    public getTarget(): any {
        return this.target;
    }

    /**
     * ターゲットの一般名を取得する。
     * 
     * @returns
     */
    public abstract getTargetGeneralName(): string;

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
    public async validate(): Promise<void> {
        const errors: Map<Property, string> = new Map();
        for (const property of this.propertiesForValidation()) {
            try {
                await this.valueValidate(property);
            } catch (error: any) {
                errors.set(property, error.message);
            }
        }
        if (errors.size > 0) {
            throw new ObjectValidationError(this.getTargetGeneralName(), errors);
        }
    }

    /**
     * ターゲットの指定されたキーに対応する値を標準化して返す。undefinedを返す場合は値に対して何もしない。
     * 
     * @returns
     */
    protected abstract valueNormalize(property: Property): Promise<any>;

    /**
     * ターゲットを標準化する。
     */
    public async normalize(): Promise<void> {
        for (const property of this.propertiesForValidation()) {
            const value = await this.valueNormalize(property);
            if (typeof value !== "undefined") {
                this.target[property.physicalName] = value;
            }
        }
    }
}

/**
 * オブジェクトが妥当ではない場合に発生するエラーのクラス。
 */
export class ObjectValidationError extends Error {

    /**
     * コンストラクタ。オブジェクトの一般名、原因となったプロパティとメッセージの連想配列を指定する。
     * 
     * @param targetGeneralName 
     * @param causeMessages 
     */
    public constructor(targetGeneralName: string, causeMessages: Map<Property, string>) {
        super(targetGeneralName + "情報の妥当性確認に失敗しました。");
        this.causeProperties = [...causeMessages.keys()];
        this.causeMessages = causeMessages;
    }

    /**
     * 原因となったプロパティ。
     */
    public readonly causeProperties: Property[];

    /**
     * 原因となったプロパティとメッセージの連想配列。
     */
    private readonly causeMessages: Map<Property, string>;

    /**
     * 指定されたプロパティのエラーメッセージを取得する。
     * 
     * @param causeProperty 
     * @returns 
     */
    public getMessage(causeProperty: Property): string {
        const message = this.causeMessages.get(causeProperty);
        if (typeof message === "undefined") {
            return "";
        }
        return message;
    }
}
