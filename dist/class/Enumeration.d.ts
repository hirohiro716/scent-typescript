/**
 * 物理名と論理名を持つ定数のクラス。
 */
export default class Enumeration {
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
     * 指定された定数オブジェクト内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param enumerations
     * @param physicalName
     * @returns
     */
    static findEnumeration<T extends Enumeration>(enumerations: Record<any, T | ((...args: any) => any)>, physicalName: string): T | null;
    /**
     * 指定された定数オブジェクト内の定数のみの配列を返す。
     *
     * @param enumerations
     * @returns
     */
    static createEnumerations<T extends Enumeration>(enumerations: Record<any, T | ((...args: any) => any)>): T[];
    /**
     * 指定された定数オブジェクト内の定数で、物理名がキー、論理名が値のマップを作成する。
     *
     * @param enumerations
     * @returns
     */
    static createEnumerationNameMap<T extends Enumeration>(enumerations: Record<any, T | ((...args: any) => any)>): Map<string, string>;
}
