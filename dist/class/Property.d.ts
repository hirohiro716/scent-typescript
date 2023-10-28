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
    constructor(physicalName: string, logicalName: string, defaultValue?: any, maximumLength?: number);
    /**
     * このプロパティの初期値。
     */
    readonly defaultValue: any;
    /**
     * このプロパティの最大文字数。
     */
    readonly maximumLength: number | undefined;
    /**
     * 指定された複数のプロパティの中から、指定された物理名のプロパティを返す。
     *
     * @param properties
     * @param physicalName
     * @returns
     */
    static findProperty(properties: Record<any, Property>, physicalName: string): Property | undefined;
}
