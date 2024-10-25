import Column from "./Column.js";
/**
 * データベースレコードのクラス。
 */
export default class RecordMap extends Map<Column, any> {
    /**
     * このレコードをオブジェクトに変換する。
     *
     * @returns
     */
    toObject(): Record<string, any>;
    /**
     * このレコードの値を指定されたレコードの値で置き換える。
     *
     * @param record
     */
    merge(record: RecordMap | Record<string, any>): void;
    /**
     * このレコードの値と指定されたレコードの値を文字列として比較し、すべてが等しい文字列の場合はtrueを返す。
     *
     * @param record
     * @returns
     */
    equals(record: RecordMap | Record<string, any>): boolean;
    /**
     * このレコードが属するテーブル名を返す。見つからなかった場合はnullを返す。
     *
     * @returns
     */
    findTableName(): string | null;
    /**
     * 指定された複数のレコードをオブジェクトの配列に変換する。
     *
     * @param records
     * @returns
     */
    static toObjects(records: RecordMap[]): object[];
    /**
     * このインスタンスのクローンを作成する。
     *
     * @returns
     */
    clone(): RecordMap;
}
