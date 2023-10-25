import Enumeration from "./Enumeration.js";
/**
 * プロパティのクラス。
 */
export default class Property extends Enumeration {
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
