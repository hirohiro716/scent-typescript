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
    constructor(roundNumber, amount = 0) {
        this.roundNumber = roundNumber;
        this._originalAmount = amount;
    }
    /**
     * 元の金額を取得する。
     */
    get originalAmount() {
        return this._originalAmount;
    }
    /**
     * 元になる金額をセットする。
     */
    set originalAmount(originalAmount) {
        this._originalAmount = originalAmount;
    }
    /**
     * 端数を処理した金額を取得する。
     *
     * @returns
     */
    toNumber() {
        return this.roundNumber.calculate(this._originalAmount);
    }
    /**
     * この価格に含まれている内税額を計算する。
     *
     * @param taxRatePercent
     * @returns
     */
    calculateInnerTax(taxRatePercent) {
        return this.roundNumber.calculate(this._originalAmount / (100 + taxRatePercent) * taxRatePercent);
    }
    /**
     * この価格に対する外税額を計算する。
     *
     * @param taxRatePercent
     * @returns
     */
    calculateOuterTax(taxRatePercent) {
        return this.roundNumber.calculate(this._originalAmount * taxRatePercent / 100);
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param roundNumber
     * @param amount
     * @returns
     */
    static from(roundNumber, amount) {
        return new Price(roundNumber, amount);
    }
}
