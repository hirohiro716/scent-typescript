/**
 * ミリメートル値のクラス。
 */
export default class MillimeterValue {

    /**
     * コンストラクタ。
     * 
     * @param millimeter 
     */
    public constructor(millimeter: number) {
        this.millimeter = millimeter;
    }

    private static readonly MILLIMETER_TO_POINT_RATIO: number = 72.0 / 25.4;

    private millimeter: number = 0;

    /**
     * ミリメートル単位の値。
     */
    public get value(): number {
        return this.millimeter;
    }

    /**
     * ポイント単位の値に変換する。
     * 
     * @returns 
     */
    public toPoint(): number {
        return this.millimeter * MillimeterValue.MILLIMETER_TO_POINT_RATIO;
    }

    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     * 
     * @param millimeter 
     * @returns 
     */
    public static from(millimeter: number): MillimeterValue {
        return new MillimeterValue(millimeter);
    }

    /**
     * ポイント単位の値からミリメートル単位の値を作成する。
     * 
     * @param point 
     * @returns 
     */
    public static fromPoint(point: number): MillimeterValue {
        return new MillimeterValue(point / MillimeterValue.MILLIMETER_TO_POINT_RATIO);
    }
}
