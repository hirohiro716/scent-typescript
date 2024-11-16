/**
 * ミリメートル値のクラス。
 */
class MillimeterValue {
    /**
     * コンストラクタ。
     *
     * @param millimeter
     */
    constructor(millimeter) {
        this.millimeter = 0;
        this.millimeter = millimeter;
    }
    /**
     * ミリメートル単位の値。
     */
    get value() {
        return this.millimeter;
    }
    /**
     * ポイント単位の値に変換する。
     *
     * @returns
     */
    toPoint() {
        return this.millimeter * MillimeterValue.MILLIMETER_TO_POINT_RATIO;
    }
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param millimeter
     * @returns
     */
    static from(millimeter) {
        return new MillimeterValue(millimeter);
    }
    /**
     * ポイント単位の値からミリメートル単位の値を作成する。
     *
     * @param point
     * @returns
     */
    static fromPoint(point) {
        return new MillimeterValue(point / MillimeterValue.MILLIMETER_TO_POINT_RATIO);
    }
}
MillimeterValue.MILLIMETER_TO_POINT_RATIO = 72.0 / 25.4;
export default MillimeterValue;
