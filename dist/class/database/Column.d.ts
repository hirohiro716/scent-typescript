import Property from "../Property.js";
/**
 * データベーステーブルのカラムのクラス。
 */
export default class Column extends Property {
    /**
     * コンストラクタ。
     *
     * @param fullPhysicalName カラムの物理名。テーブル名を含む場合はカンマ(.)で区切る。
     * @param logicalName カラムの論理名。
     * @param defaultValue カラムの初期値。
     * @param maximumLength カラムに入力できる最大文字数。負数は制限がないことを表す。
     */
    constructor(fullPhysicalName: string, logicalName: string, defaultValue?: any, maximumLength?: number);
    /**
     * カラムのテーブル名。
     */
    readonly tableName: string | undefined;
    /**
     * テーブル名を含むカラムの物理名を取得する。
     */
    get fullPhysicalName(): string;
    /**
     * 指定された定数オブジェクト内から、指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param columns
     * @param physicalName
     * @returns
     */
    static findColumn<T extends Column>(columns: Record<any, T | ((...args: any) => any)>, physicalName: string): T | null;
    /**
     * 指定された定数オブジェクト内の定数のみを抽出する。
     *
     * @param columns
     * @returns
     */
    static extractColumns<T extends Column>(columns: Record<any, T | ((...args: any) => any)>): T[];
    /**
     * 指定された定数オブジェクト内の定数で、物理名がキー、論理名が値のマップを作成する。
     *
     * @param properties
     * @returns
     */
    static createColumnNameMap<T extends Column>(columns: Record<any, T | ((...args: any) => any)>): Map<string, string>;
}
