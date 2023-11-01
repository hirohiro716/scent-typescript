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
     * 指定された定数インスタンス内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param enumerations
     * @param physicalName
     * @returns
     */
    static findEnumeration(enumerations, physicalName) {
        for (const enumeration of Object.values(enumerations)) {
            if (enumeration.physicalName === physicalName) {
                return enumeration;
            }
        }
        return null;
    }
}
