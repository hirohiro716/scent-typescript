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
     * @param maximumLength プロパティに入力できる最大文字数。負数は制限がないことを表す。
     */
    constructor(physicalName, logicalName, defaultValue, maximumLength = -1) {
        super(physicalName, logicalName);
        this.defaultValue = defaultValue;
        this.maximumLength = maximumLength;
    }
    /**
     * 指定された定数オブジェクト内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param properties
     * @param physicalName
     * @returns
     */
    static findProperty(properties, physicalName) {
        return Enumeration.findEnumeration(properties, physicalName);
    }
    /**
     * 指定された定数オブジェクト内の定数のみの配列を返す。
     *
     * @param properties
     * @returns
     */
    static createProperties(properties) {
        return Enumeration.createEnumerations(properties);
    }
    /**
     * 指定された定数オブジェクト内の定数で、物理名がキー、論理名が値のマップを作成する。
     *
     * @param properties
     * @returns
     */
    static createPropertyNameMap(properties) {
        return Enumeration.createEnumerationNameMap(properties);
    }
}
