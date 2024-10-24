/**
 * 検索結果の抽象クラス。
 */
export default class SearchResult {
    /**
     * コンストラクタ。検索結果のレコードを指定する。
     *
     * @param records
     */
    constructor(records) {
        this.records = records;
    }
    /**
     * 指定されたインスタンスから検索結果に含まれるカラムの配列を作成する。
     *
     * @param instance
     * @returns
     */
    static extractColumns(instance) {
        return instance.getInnerColumns();
    }
}
