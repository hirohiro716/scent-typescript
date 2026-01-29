import Column from "./Column.js";
import Table from "./Table.js";

/**
 * 検索結果の抽象クラス。
 */
export default abstract class SearchResult {

    /**
     * コンストラクタ。検索結果のレコードを指定する。
     * 
     * @param records 
     */
    public constructor(records: Record<string, any>[]) {
        this.records = records;
    }

    /**
     * 検索結果のレコードオブジェクト配列。
     */
    public readonly records: Record<string, any>[];

    /**
     * 検索結果がどのテーブルに属しているかを取得する。
     * 
     * @returns
     */
    public abstract getTable(): Table<any>;

    /**
     * 検索結果に含まれるカラムを取得する。
     * 
     * @returns
     */
    public abstract getInnerColumns(): Column[];

    /**
     * 指定されたインスタンスから検索結果に含まれるカラムの配列を作成する。
     * 
     * @param instance 
     * @returns 
     */
    public static extractColumns(instance: SearchResult): Column[] {
        return instance.getInnerColumns();
    }
}
