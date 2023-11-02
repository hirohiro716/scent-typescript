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
     * このレコードが属するテーブル名を返す。見つからなかった場合はnullを返す。
     *
     * @returns
     */
    findTableName(): string | null;
}
