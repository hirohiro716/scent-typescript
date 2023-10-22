/**
 * プロパティのクラス。
 */
export default class Property {
    /**
     * コンストラクタ。物理名と論理名を指定する。
     *
     * @param physicalName
     * @param logicalName
     */
    constructor(physicalName, logicalName) {
        this.physicalName = physicalName;
        this.logicalName = logicalName;
    }
    /**
     * 指定された複数のプロパティの中から、指定された物理名のプロパティを返す。
     *
     * @param properties
     * @param physicalName
     * @returns
     */
    static findProperty(properties, physicalName) {
        for (const property of properties) {
            if (property.physicalName == physicalName) {
                return property;
            }
        }
    }
}
