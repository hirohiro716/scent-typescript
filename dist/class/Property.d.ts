import Enumeration from "./Enumeration.js";
/**
 * プロパティのクラス。
 */
export default class Property extends Enumeration {
    /**
     * コンストラクタ。
     *
     * @param physicalName プロパティの物理名。
     * @param logicalName プロパティの論理名。
     * @param defaultValue プロパティの初期値。
     * @param maximumLength プロパティに入力できる最大文字数。
     */
    constructor(physicalName: string, logicalName: string, defaultValue?: any, maximumLength?: number);
    /**
     * このプロパティの初期値。
     */
    readonly defaultValue: any;
    /**
     * このプロパティの最大文字数。
     */
    readonly maximumLength: number | undefined;
}
