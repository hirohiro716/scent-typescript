import Property from "../Property.js";
/**
 * カラムのクラス。
 */
export default class Column extends Property {
    /**
     * コンストラクタ。物理名と論理名を指定する。
     *
     * @param physicalName
     * @param logicalName
     */
    constructor(physicalName: string, logicalName: string);
    /**
     * 指定された複数のカラムの中から、指定された物理名のカラムを返す。
     *
     * @param columns
     * @param physicalName
     * @returns
     */
    static findColumn(columns: Column[], physicalName: string): Column | undefined;
}
