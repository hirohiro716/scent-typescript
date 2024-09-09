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
     * @param maximumLength カラムに入力できる最大文字数。負数は制限がないことを表す。
     */
    public constructor(fullPhysicalName: string, logicalName: string, defaultValue?: any, maximumLength: number = -1) {
        if (fullPhysicalName.includes(".")) {
            const names = StringObject.from(fullPhysicalName).split("\\.");
            super(names[1].toString(), logicalName, defaultValue, maximumLength);
            if (names[0].length() > 0) {
                this.tableName = names[0].toString();
            }
        } else {
            super(fullPhysicalName, logicalName, defaultValue, maximumLength);
        }
    }

    /**
     * カラムのテーブル名。
     */
    public readonly tableName: string | undefined;

    /**
     * テーブル名を含むカラムの物理名を取得する。
     */
    public get fullPhysicalName(): string {
        const fullPhysicalName = new StringObject(this.tableName);
        if (fullPhysicalName.length() > 0) {
            fullPhysicalName.append(".");
        }
        fullPhysicalName.append(this.physicalName);
        return fullPhysicalName.toString();
    }

    /**
     * 指定された定数インスタンス内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     * 
     * @param columns 
     * @param physicalName 
     * @returns 
     */
    public static findColumn<T extends Column>(columns: Record<any, T | ((...args: any) => any)>, physicalName: string): T | null {
        return Property.findProperty(columns, physicalName);
    }
}
