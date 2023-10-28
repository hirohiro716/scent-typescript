import Enumeration from "./Enumeration.js";
/**
 * プロパティのクラス。
 */
export default class Property extends Enumeration {
    /**
     * コンストラクタ。物理名、論理名、初期値、最大文字数を指定する。
     *
     * @param physicalName
     * @param logicalName
     * @param defaultValue
     * @param maximumLength
     */
    constructor(physicalName, logicalName, defaultValue, maximumLength) {
        super(physicalName, logicalName);
        this.defaultValue = defaultValue;
        this.maximumLength = maximumLength;
    }
    /**
     * 指定された複数のプロパティの中から、指定された物理名のプロパティを返す。
     *
     * @param properties
     * @param physicalName
     * @returns
     */
    static findProperty(properties, physicalName) {
        for (const property of Object.values(properties)) {
            if (property.physicalName === physicalName) {
                return property;
            }
        }
    }
}
