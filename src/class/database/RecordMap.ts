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
    public toObject(): Record<string, any> {
        const object: Record<string, any> = {};
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
    public merge(record: RecordMap | Record<string, any>): void {
        if (record instanceof RecordMap) {
            for (const key of record.keys()) {
                this.set(key, record.get(key));
            }
        } else {
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
    public findTableName(): string | null {
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
    public static toObject(records: RecordMap[]): object[] {
        const objects = [];
        for (const record of records) {
            objects.push(record.toObject());
        }
        return objects;
    }
}
