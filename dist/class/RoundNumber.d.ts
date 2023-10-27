import Enumeration from "./Enumeration.js";
/**
 * 数値の端数処理のクラス。
 */
export declare class RoundNumber extends Enumeration {
    /**
     * 指定された数値を丸める。
     *
     * @param value 数値。
     * @param digit 処理する位置。0を指定すると少数第一位が、1を指定すると少数第二位が処理される。デフォルトは0。
     * @returns
     */
    calculate(value: number, digit?: number): number;
}
/**
 * 数値の端数処理の種類。
 */
export declare const RoundNumbers: {
    round: RoundNumber;
    floor: RoundNumber;
    ceil: RoundNumber;
};
