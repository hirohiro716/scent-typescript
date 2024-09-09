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
    public constructor(physicalName: string, logicalName: string, defaultValue?: any, maximumLength: number = -1) {
        super(physicalName, logicalName);
        this.defaultValue = defaultValue;
        this.maximumLength = maximumLength;
    }

    /**
     * このプロパティの初期値。
     */
    public readonly defaultValue: any;

    /**
     * このプロパティの最大文字数。
     */
    public readonly maximumLength: number;
}
