import StringObject from "./StringObject.js";

const ROUND = "round";

const FLOOR = "floor";

const CEIL = "ceil";

/**
 * 数値の端数処理のクラス。
 */
export class RoundNumber {

    /**
     * コンストラクタ。メソッド名("round"|"floor"|"ceil")を指定する。
     * 
     * @param methodName 
     */
    public constructor(methodName: string) {
        this.methodName = methodName;
    }

    public readonly methodName;

    /**
     * 指定された数値を丸める。
     * 
     * @param value 
     * @param digit 
     * @returns 
     */
    public calculate(value: number, digit: number = 0): number {
        let multiplier = 1;
        if (digit > 0) {
            multiplier = StringObject.from("1").paddingRight(digit + 1, "0").toNumber()!;
        } else if (digit < 0) {
            multiplier = 1 / StringObject.from("1").paddingRight(Math.abs(digit) + 1, "0").toNumber()!;
        }
        switch (this.methodName) {
        case ROUND:
            return Math.round(value * multiplier) / multiplier;
        case FLOOR:
            return Math.floor(value * multiplier) / multiplier;
        case CEIL:
            return Math.ceil(value * multiplier) / multiplier;
        }
        return value;
    }




}

/**
 * 数値の端数処理の種類。
 */
export const RoundNumbers = {
    round: new RoundNumber(ROUND),
    floor: new RoundNumber(FLOOR),
    ceil: new RoundNumber(CEIL),
}
