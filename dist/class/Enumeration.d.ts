/**
 * 物理名と論理名を持つ定数のクラス。
 */
export default abstract class Enumeration {
    /**
     * コンストラクタ。物理名と論理名を指定する。
     *
     * @param physicalName
     * @param logicalName
     */
    constructor(physicalName: string, logicalName: string);
    /**
     * この定数の物理名。
     */
    readonly physicalName: string;
    /**
     * この定数の論理名。
     */
    readonly logicalName: string;
    /**
     * 指定された定数インスタンス内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param enumerations
     * @param physicalName
     * @returns
     */
    static findEnumeration<T extends Enumeration>(enumerations: Record<any, T>, physicalName: string): T | null;
}
