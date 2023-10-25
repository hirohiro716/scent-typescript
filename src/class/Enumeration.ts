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
    public constructor(physicalName: string, logicalName: string) {
        this.physicalName = physicalName;
        this.logicalName = logicalName;
    }

    /**
     * この定数の物理名。
     */
    public readonly physicalName;

    /**
     * この定数の論理名。
     */
    public readonly logicalName;

    /**
     * 指定された定数オブジェクト内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     * 
     * @param enumerations 
     * @param physicalName 
     * @returns 
     */
    public static findEnumeration(enumerations: Record<any, Enumeration>, physicalName: string): Enumeration | null {
        for (const enumeration of Object.values(enumerations)) {
            if (enumeration.physicalName === physicalName) {
                return enumeration;
            }
        }
        return null;
    }
}
