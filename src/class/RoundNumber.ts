import Enumeration from "./Enumeration.js";
import StringObject from "./StringObject.js";

/**
 * 数値の端数処理のクラス。
 */
export class RoundNumber extends Enumeration {

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
        switch (this.physicalName) {
        case RoundNumbers.round.physicalName:
            return Math.round(value * multiplier) / multiplier;
        case RoundNumbers.floor.physicalName:
            return Math.floor(value * multiplier) / multiplier;
        case RoundNumbers.ceil.physicalName:
            return Math.ceil(value * multiplier) / multiplier;
        }
        return value;
    }
}

/**
 * 数値の端数処理の種類。
 */
export const RoundNumbers = {
    round: new RoundNumber("round", "四捨五入"),
    floor: new RoundNumber("floor", "切り下げ"),
    ceil: new RoundNumber("ceil", "切り上げ"),
}
