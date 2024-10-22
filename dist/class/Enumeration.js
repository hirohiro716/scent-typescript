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
    constructor(physicalName, logicalName) {
        this.physicalName = physicalName;
        this.logicalName = logicalName;
    }
    /**
     * 指定された定数オブジェクト内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param enumerations
     * @param physicalName
     * @returns
     */
    static findEnumeration(enumerations, physicalName) {
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
    static createEnumerations(enumerations) {
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
    static createEnumerationNameMap(enumerations) {
        const map = new Map();
        for (const enumeration of Object.values(enumerations)) {
            if (enumeration instanceof Enumeration) {
                map.set(enumeration.physicalName, enumeration.logicalName);
            }
        }
        return map;
    }
}
