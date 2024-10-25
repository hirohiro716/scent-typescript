import Enumeration from "../Enumeration.js";

/**
 * データベースで使用する比較演算子の定数クラス。
 */
export class Comparison extends Enumeration {

    public constructor(physicalName: string, logicalName: string) {
        super(physicalName, logicalName);
        this.operator = physicalName;
    }
    
    /**
     * 比較演算子。物理名と同様の値。
     */
    public readonly operator: string;
}

/**
 * データベースで使用する比較演算子の定数オブジェクト。
 */
export const Comparisons = {
    equal: new Comparison("=", "equal"),
    notEqual: new Comparison("!=", "notEqual"),
    less: new Comparison("<", "less"),
    lessEqual: new Comparison("<=", "lessEqual"),
    greater: new Comparison(">", "greater"),
    greaterEqual: new Comparison(">=", "greaterEqual"),
    in: new Comparison("IN", "in"),
    isNull: new Comparison("IS NULL", "isNull"),
    like: new Comparison("LIKE", "like"),
    between: new Comparison("BETWEEN", "between"),
    similarTo: new Comparison("SIMILAR TO", "similarTo"),
    regexp: new Comparison("REGEXP", "regexp"),
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     * 
     * @param physicalName 
     * @returns 
     */
    find: (physicalName: string): Comparison | null => {
        const enumeration: any = Enumeration.findEnumeration(Comparisons, physicalName);
        return enumeration;
    },
    /**
     * 定数オブジェクト内の定数のみの配列を返す。
     * 
     * @returns 
     */
    getComparisons: (): Comparison[] => {
        const enumerations: any = Enumeration.extractEnumerations(Comparisons);
        return enumerations;
    },
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     * 
     * @returns 
     */
    createNameMap: (): Map<string, string> => {
        return Enumeration.createEnumerationNameMap(Comparisons);
    },
}
