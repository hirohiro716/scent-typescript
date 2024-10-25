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
     * @param digit 処理する位置。0を指定すると少数第一位が、1を指定すると少数第二位が処理される。0がデフォルト。
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
 * 数値の端数処理の定数オブジェクト。
 */
export const RoundNumbers = {
    /**
     * 四捨五入。
     */
    round: new RoundNumber("round", "四捨五入"),
    /**
     * 切り下げ。
     */
    floor: new RoundNumber("floor", "切り下げ"),
    /**
     * 切り上げ。
     */
    ceil: new RoundNumber("ceil", "切り上げ"),
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     * 
     * @param physicalName 
     * @returns 
     */
    find: (physicalName: string): RoundNumber | null => {
        const enumeration: any = Enumeration.findEnumeration(RoundNumbers, physicalName);
        return enumeration;
    },
    /**
     * 定数オブジェクト内の定数のみの配列を返す。
     * 
     * @returns 
     */
    getEnumerations: (): RoundNumber[] => {
        const enumerations: any = Enumeration.extractEnumerations(RoundNumbers);
        return enumerations;
    },
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     * 
     * @returns 
     */
    createNameMap: (): Map<string, string> => {
        return Enumeration.createEnumerationNameMap(RoundNumbers);
    },
}
