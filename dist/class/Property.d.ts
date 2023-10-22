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
    constructor(physicalName: string, logicalName: string);
    /**
     * プロパティの物理名。
     */
    readonly physicalName: string;
    /**
     * プロパティの論理名。
     */
    readonly logicalName: string;
    /**
     * 指定された複数のプロパティの中から、指定された物理名のプロパティを返す。
     *
     * @param properties
     * @param physicalName
     * @returns
     */
    static findProperty(properties: Property[], physicalName: string): Property | undefined;
}
