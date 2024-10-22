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
    public static findEnumeration<T extends Enumeration>(enumerations: Record<any, T | ((...args: any) => any)>, physicalName: string): T | null {
        for (const enumeration of Object.values(enumerations)) {
            if (enumeration instanceof Enumeration) {
                if (enumeration.physicalName === physicalName) {
                    return enumeration;
                }
            }
        }
        return null;
    }

    /**
     * 指定された定数オブジェクト内の定数のみの配列を返す。
     * 
     * @param enumerations 
     * @returns 
     */
    public static createEnumerations<T extends Enumeration>(enumerations: Record<any, T | ((...args: any) => any)>): T[] {
        const constants = [];
        for (const enumeration of Object.values(enumerations)) {
            if (enumeration instanceof Enumeration) {
                constants.push(enumeration);
            }
        }
        return constants;
    }

    /**
     * 指定された定数オブジェクト内の定数で、物理名がキー、論理名が値のマップを作成する。
     * 
     * @param enumerations 
     * @returns 
     */
    public static createEnumerationNameMap<T extends Enumeration>(enumerations: Record<any, T | ((...args: any) => any)>): Map<string, string> {
        const map = new Map();
        for (const enumeration of Object.values(enumerations)) {
            if (enumeration instanceof Enumeration) {
                map.set(enumeration.physicalName, enumeration.logicalName);
            }
        }
        return map;
    }
}
