import Enumeration from "../Enumeration.js";
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
    constructor(physicalName: string, logicalName: string, columns: C);
    /**
     * テーブルに属するカラム。
     */
    readonly columns: C;
    /**
     * 指定されたオブジェクトからレコードを作成する。オブジェクトが未指定の場合はカラムの初期値を使用する。
     *
     * @param source
     * @returns
     */
    createRecord(source?: Record<string, any>): RecordMap;
    /**
     * テーブルに属するカラムインスタンスの中から、指定された物理名に一致するインスタンスを返す。見つからなかった場合はnullを返す。
     *
     * @param physicalName
     */
    findColumn(physicalName: string): Column | null;
}
