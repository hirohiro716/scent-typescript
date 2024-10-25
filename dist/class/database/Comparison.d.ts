import Enumeration from "../Enumeration.js";
/**
 * データベースで使用する比較演算子の定数クラス。
 */
export declare class Comparison extends Enumeration {
    constructor(physicalName: string, logicalName: string);
    /**
     * 比較演算子。物理名と同様の値。
     */
    readonly operator: string;
}
/**
 * データベースで使用する比較演算子の定数オブジェクト。
 */
export declare const Comparisons: {
    equal: Comparison;
    notEqual: Comparison;
    less: Comparison;
    lessEqual: Comparison;
    greater: Comparison;
    greaterEqual: Comparison;
    in: Comparison;
    isNull: Comparison;
    like: Comparison;
    between: Comparison;
    similarTo: Comparison;
    regexp: Comparison;
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param physicalName
     * @returns
     */
    find: (physicalName: string) => Comparison | null;
    /**
     * 定数オブジェクト内の定数のみの配列を返す。
     *
     * @returns
     */
    getComparisons: () => Comparison[];
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     *
     * @returns
     */
    createNameMap: () => Map<string, string>;
};
