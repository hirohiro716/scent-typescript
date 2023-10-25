import Enumeration from "./Enumeration.js";
/**
 * 数値の端数処理のクラス。
 */
export declare class RoundNumber extends Enumeration {
    /**
     * 指定された数値を丸める。
     *
     * @param value
     * @param digit
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
