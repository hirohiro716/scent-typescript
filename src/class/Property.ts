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
    public constructor(physicalName: string, logicalName: string) {
        this.physicalName = physicalName;
        this.logicalName = logicalName;
    }

    /**
     * プロパティの物理名。
     */
    public readonly physicalName: string;
    
    /**
     * プロパティの論理名。
     */
    public readonly logicalName: string;

    /**
     * 指定された複数のプロパティの中から、指定された物理名のプロパティを返す。
     * 
     * @param properties 
     * @param physicalName 
     * @returns 
     */
    public static findProperty(properties: Property[], physicalName: string): Property | undefined {
        for (const property of properties) {
            if (property.physicalName == physicalName) {
                return property;
            }
        }
    }
}
