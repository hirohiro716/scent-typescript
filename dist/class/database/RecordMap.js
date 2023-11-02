/**
 * データベースレコードのクラス。
 */
export default class RecordMap extends Map {
    /**
     * このレコードをオブジェクトに変換する。
     *
     * @returns
     */
    toObject() {
        const object = {};
        for (const column of this.keys()) {
            object[column.physicalName] = this.get(column);
        }
        return object;
    }
    /**
     * このレコードが属するテーブル名を返す。見つからなかった場合はnullを返す。
     *
     * @returns
     */
    findTableName() {
        if (this.size > 0) {
            for (const column of this.keys()) {
                if (column.tableName) {
                    return column.tableName;
                }
            }
        }
        return null;
    }
}
