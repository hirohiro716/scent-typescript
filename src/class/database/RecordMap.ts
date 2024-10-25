import StringObject from "../StringObject.js";
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
     * このレコードの値と指定されたレコードの値を文字列として比較し、すべてが等しい文字列の場合はtrueを返す。
     * 
     * @param record 
     * @returns
     */
    public equals(record: RecordMap | Record<string, any>): boolean {
        for (const column of this.keys()) {
            const value = new StringObject();
            if (record instanceof RecordMap) {
                value.append(record.get(column));
            } else {
                value.append(record[column.physicalName]);
            }
            if (value.equals(this.get(column)) === false) {
                return false;
            }
        }
        return true;
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
    public static toObjects(records: RecordMap[]): object[] {
        const objects = [];
        for (const record of records) {
            objects.push(record.toObject());
        }
        return objects;
    }

    /**
     * このインスタンスのクローンを作成する。
     * 
     * @returns 
     */
    public clone(): RecordMap {
        return new RecordMap(this);
    }
}
