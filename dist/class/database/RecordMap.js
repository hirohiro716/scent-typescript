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
     * このレコードの値を指定されたレコードの値で置き換える。
     *
     * @param record
     */
    merge(record) {
        if (record instanceof RecordMap) {
            for (const key of record.keys()) {
                this.set(key, record.get(key));
            }
        }
        else {
            for (const column of this.keys()) {
                if (Object.keys(record).includes(column.physicalName)) {
                    this.set(column, record[column.physicalName]);
                }
            }
        }
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
    /**
     * 指定された複数のレコードをオブジェクトの配列に変換する。
     *
     * @param records
     * @returns
     */
    static toObject(records) {
        const objects = [];
        for (const record of records) {
            objects.push(record.toObject());
        }
        return objects;
    }
}
