import Enumeration from "./Enumeration.js";
/**
 * 数値の端数処理のクラス。
 */
export declare class RoundNumber extends Enumeration {
    /**
     * 指定された数値を丸める。
     *
     * @param value 数値。
     * @param digit 処理する位置。0を指定すると少数第一位が、1を指定すると少数第二位が処理される。0がデフォルト。
     * @returns
     */
    calculate(value: number, digit?: number): number;
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param physicalName
     * @returns
     */
    static findRoundNumber(physicalName: string): RoundNumber | null;
}
/**
 * 数値の端数処理の種類。
 */
export declare const RoundNumbers: {
    round: RoundNumber;
    floor: RoundNumber;
    ceil: RoundNumber;
};
