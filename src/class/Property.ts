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
    public static findProperty(properties: Record<any, Property>, physicalName: string): Property | undefined {
        for (const property of Object.values(properties)) {
            if (property.physicalName === physicalName) {
                return property;
            }
        }
    }
}
