/**
 * ミリメートル値のクラス。
 */
export default class MillimeterValue {
    /**
     * コンストラクタ。
     *
     * @param millimeter
     */
    constructor(millimeter: number);
    private static readonly MILLIMETER_TO_POINT_RATIO;
    private millimeter;
    /**
     * ミリメートル単位の値。
     */
    get value(): number;
    /**
     * ポイント単位の値に変換する。
     *
     * @returns
     */
    toPoint(): number;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param millimeter
     * @returns
     */
    static from(millimeter: number): MillimeterValue;
    /**
     * ポイント単位の値からミリメートル単位の値を作成する。
     *
     * @param point
     * @returns
     */
    static fromPoint(point: number): MillimeterValue;
}
