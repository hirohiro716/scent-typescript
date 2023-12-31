import Property from "../Property.js";
import StringObject from "../StringObject.js";
/**
 * データベーステーブルのカラムのクラス。
 */
export default class Column extends Property {
    /**
     * コンストラクタ。
     *
     * @param fullPhysicalName カラムの物理名。テーブル名を含む場合はカンマ(.)で区切る。
     * @param logicalName カラムの論理名。
     * @param defaultValue カラムの初期値。
     * @param maximumLength カラムに入力できる最大文字数。
     */
    constructor(fullPhysicalName, logicalName, defaultValue, maximumLength) {
        if (fullPhysicalName.includes(".")) {
            const names = StringObject.from(fullPhysicalName).split("\\.");
            super(names[1].toString(), logicalName);
            if (names[0].length() > 0) {
                this.tableName = names[0].toString();
            }
        }
        else {
            super(fullPhysicalName, logicalName);
        }
    }
    /**
     * テーブル名を含むカラムの物理名を取得する。
     */
    get fullPhysicalName() {
        const fullPhysicalName = new StringObject(this.tableName);
        if (fullPhysicalName.length() > 0) {
            fullPhysicalName.append(".");
        }
        fullPhysicalName.append(this.physicalName);
        return fullPhysicalName.toString();
    }
}
