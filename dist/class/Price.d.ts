import { RoundNumber } from "./RoundNumber.js";
/**
 * 価格のクラス。
 */
export default class Price {
    /**
     * コンストラクタ。
     *
     * @param roundNumber 1円未満の金額端数処理方法。
     * @param amount 金額。デフォルトは0。
     */
    constructor(roundNumber: RoundNumber, amount?: number);
    /**
     * 1円未満の金額端数処理方法。
     */
    readonly roundNumber: RoundNumber;
    private _originalAmount;
    /**
     * 元の金額を取得する。
     */
    get originalAmount(): number;
    /**
     * 元になる金額をセットする。
     */
    set originalAmount(originalAmount: number);
    /**
     * 端数を処理した金額を取得する。
     *
     * @returns
     */
    toNumber(): number;
    /**
     * この価格に含まれている内税額を計算する。
     *
     * @param taxRatePercent
     * @returns
     */
    calculateInnerTax(taxRatePercent: number): number;
    /**
     * この価格に対する外税額を計算する。
     *
     * @param taxRatePercent
     * @returns
     */
    calculateOuterTax(taxRatePercent: number): number;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param roundNumber
     * @param amount
     * @returns
     */
    static from(roundNumber: RoundNumber, amount: number): Price;
}
