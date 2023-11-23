/**
 * 特定のオブジェクトの妥当性を確認し有効化するクラス。
 */
export class ObjectValidator {
    /**
     * コンストラクタ。妥当性を確認して有効化するターゲットを指定する。
     *
     * @param target
     */
    constructor(target) {
        this._target = null;
        if (target) {
            this._target = target;
        }
    }
    /**
     * 妥当性を確認して有効化するターゲット。
     */
    get target() {
        if (this._target === null) {
            return {};
        }
        return this._target;
    }
    set target(target) {
        this._target = target;
    }
    /**
     * ターゲットの妥当性を確認する。
     *
     * @throws ObjectValidationError
     */
    async validate() {
        const errors = new Map();
        for (const property of this.propertiesForValidation()) {
            try {
                await this.valueValidate(property);
            }
            catch (error) {
                errors.set(property, error.message);
            }
        }
        if (errors.size > 0) {
            throw new ObjectValidationError(this.getTargetGeneralName(), errors);
        }
    }
    /**
     * ターゲットを標準化する。
     */
    async normalize() {
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
    constructor(targetGeneralName, causeMessages) {
        super(targetGeneralName + "情報の妥当性確認に失敗しました。");
        this.causeProperties = [...causeMessages.keys()];
        this.causeMessages = causeMessages;
    }
    /**
     * 指定されたプロパティのエラーメッセージを取得する。
     *
     * @param causeProperty
     * @returns
     */
    getMessage(causeProperty) {
        const message = this.causeMessages.get(causeProperty);
        if (typeof message === "undefined") {
            return "";
        }
        return message;
    }
}
