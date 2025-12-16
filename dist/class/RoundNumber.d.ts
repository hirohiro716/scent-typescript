import Enumeration from "./Enumeration.js";
/**
 * 数値の端数処理のクラス。
 */
export declare class RoundNumber extends Enumeration {
    /**
     * 指定された数と一番近い整数、または一番近いポイントファイブを比較して、
     * 差が0.000001未満の場合は整数やポイントファイブを、それ以上の場合は元の値を返す。
     *
     * @param value
     * @returns
     */
    private humanize;
    /**
     * 指定された数値を丸める。
     *
     * @param value 数値。
     * @param digit 処理する位置。0を指定すると少数第一位が、1を指定すると少数第二位が処理される。0がデフォルト。
     * @returns
     */
    calculate(value: number, digit?: number): number;
}
/**
 * 数値の端数処理の定数オブジェクト。
 */
export declare const RoundNumbers: {
    /**
     * 四捨五入。
     */
    round: RoundNumber;
    /**
     * 切り下げ。
     */
    floor: RoundNumber;
    /**
     * 切り上げ。
     */
    ceil: RoundNumber;
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param physicalName
     * @returns
     */
    find: (physicalName: string) => RoundNumber | null;
    /**
     * 定数オブジェクト内の定数のみの配列を返す。
     *
     * @returns
     */
    getEnumerations: () => RoundNumber[];
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     *
     * @returns
     */
    createNameMap: () => Map<string, string>;
};
