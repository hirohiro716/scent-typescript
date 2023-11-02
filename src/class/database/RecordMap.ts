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
}
