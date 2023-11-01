import Enumeration from "./Enumeration.js";
import StringObject from "./StringObject.js";
/**
 * 数値の端数処理のクラス。
 */
export class RoundNumber extends Enumeration {
    /**
     * 指定された数値を丸める。
     *
     * @param value 数値。
     * @param digit 処理する位置。0を指定すると少数第一位が、1を指定すると少数第二位が処理される。デフォルトは0。
     * @returns
     */
    calculate(value, digit = 0) {
        let multiplier = 1;
        if (digit > 0) {
            multiplier = StringObject.from("1").paddingRight(digit + 1, "0").toNumber();
        }
        else if (digit < 0) {
            multiplier = 1 / StringObject.from("1").paddingRight(Math.abs(digit) + 1, "0").toNumber();
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
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param physicalName
     * @returns
     */
    static findRoundNumber(physicalName) {
        return RoundNumber.findEnumeration(RoundNumbers, physicalName);
    }
}
/**
 * 数値の端数処理の種類。
 */
export const RoundNumbers = {
    round: new RoundNumber("round", "四捨五入"),
    floor: new RoundNumber("floor", "切り下げ"),
    ceil: new RoundNumber("ceil", "切り上げ"),
};
