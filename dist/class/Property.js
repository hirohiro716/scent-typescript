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
    constructor(physicalName, logicalName, defaultValue, maximumLength) {
        super(physicalName, logicalName);
        this.defaultValue = defaultValue;
        this.maximumLength = maximumLength;
    }
}
