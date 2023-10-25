import Property from "../Property.js";
/**
 * カラムのクラス。
 */
export default class Column extends Property {
    /**
     * 指定された複数のカラムの中から、指定された物理名のカラムを返す。
     *
     * @param columns
     * @param physicalName
     * @returns
     */
    static findColumn(columns: Record<any, Column>, physicalName: string): Column | undefined;
}
