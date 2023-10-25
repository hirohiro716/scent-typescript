import { RoundNumber } from "./RoundNumber.js";

/**
 * 価格のクラス。
 */
export default class Price {

    /**
     * コンストラクタ。1円未満の金額端数処理方法、金額を指定する。
     * 
     * @param roundNumber 
     * @param amount
     */
    public constructor(roundNumber: RoundNumber, amount: number = 0) {
        this.roundNumber = roundNumber;
        this._originalAmount = amount;
    }

    /**
     * 1円未満の金額端数処理方法。
     */
    public readonly roundNumber: RoundNumber;

    private _originalAmount: number;

    /**
     * 元の金額を取得する。
     */
    public get originalAmount(): number {
        return this._originalAmount;
    } 

    /**
     * 元になる金額をセットする。
     */
    public set originalAmount(originalAmount: number) {
        this._originalAmount = originalAmount;
    }

    /**
     * 端数を処理した金額を取得する。
     * 
     * @returns 
     */
    public toNumber(): number {
        return this.roundNumber.calculate(this._originalAmount);
    }
    
    /**
     * この価格に含まれている内税額を計算する。
     * 
     * @param taxRatePercent 
     * @returns 
     */
    public calculateInnerTax(taxRatePercent: number): number {
        return this.roundNumber.calculate(this._originalAmount / (100 + taxRatePercent) * taxRatePercent);
    }

    /**
     * この価格に対する外税額を計算する。
     * 
     * @param taxRatePercent 
     * @returns 
     */
    public calculateOuterTax(taxRatePercent: number): number {
        return this.roundNumber.calculate(this._originalAmount * taxRatePercent / 100);
    }

    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     * 
     * @param roundNumber 
     * @param amount 
     * @returns 
     */
    public static from(roundNumber: RoundNumber, amount: number): Price {
        return new Price(roundNumber, amount);
    }
}
