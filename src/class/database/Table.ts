import Enumeration from "../Enumeration.js";
import StringObject from "../StringObject.js";
import Column from "./Column.js";
import RecordMap from "./RecordMap.js";

/**
 * テーブルのクラス。
 */
export default class Table<C extends Record<any, Column>> extends Enumeration {

    /**
     * コンストラクタ。
     * 
     * @param physicalName テーブルの物理名。
     * @param logicalName テーブルの論理名。
     * @param columns テーブルに属するカラムのオブジェクト。
     */
    public constructor(physicalName: string, logicalName: string, columns: C) {
        super(physicalName, logicalName);
        this.columns = columns;
    }

    /**
     * テーブルに属するカラム。
     */
    public readonly columns: C;

    /**
     * 指定されたオブジェクトからレコードを作成する。オブジェクトが未指定の場合はカラムの初期値を使用する。
     * 
     * @param source
     * @returns 
     */
    public createRecord(source?: Record<string, any>): RecordMap {
        const record = new RecordMap();
        for (const column of Object.values(this.columns)) {
            if (source && Object.keys(source).includes(column.physicalName)) {
                record.set(column, source[column.physicalName]);
            } else if (source && Object.keys(source).includes(column.fullPhysicalName)) {
                record.set(column, source[column.fullPhysicalName]);
            } else {
                record.set(column, column.defaultValue);
            }
        }
        return record;
    }

    /**
     * テーブルに属するカラムインスタンスの中から、指定された物理名に一致するインスタンスを返す。見つからなかった場合はnullを返す。
     * 
     * @param physicalName 
     */
    public findColumn(physicalName: string): Column | null {
        if (physicalName.includes(".")) {
            const names = StringObject.from(physicalName).split("\\.");
            if (names[0].length() > 0 && names[0].equals(this.physicalName)) {
                return Enumeration.findEnumeration(this.columns, names[1].toString());
            }
        }
        return Enumeration.findEnumeration(this.columns, physicalName);
    }
}
