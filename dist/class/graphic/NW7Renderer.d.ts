import { Bounds } from "../Bounds.js";
/**
 * NW7のバーコードを描画するクラス。
 *
 * @template C 二次元描画コンテキストの型。
 */
export default abstract class NW7Renderer<C> {
    /**
     * コンストラクタ。描画する内容と二次元描画コンテキストを指定する。
     *
     * @param barcode
     * @param context
     */
    constructor(barcode: string, context: C);
    private _barcode;
    /**
     * 描画するバーコード。
     */
    get barcode(): string;
    private _context;
    /**
     * 描画する二次元描画コンテキスト。
     */
    get context(): C;
    /**
     * 7DRでチェックディジットを算出する。
     *
     * @param barcode
     * @returns
     */
    static compute7DR(barcode: string): string;
    /**
     * 7DSRでチェックディジットを算出する。
     *
     * @param barcode
     * @returns
     */
    static compute7DSR(barcode: string): string;
    /**
     * 二次元描画コンテキストを使用して、指定位置に塗りつぶした矩形を描画する。
     *
     * @param context
     * @param x
     * @param y
     * @param width
     * @param height
     */
    protected abstract fillRectangle(context: C, x: number, y: number, width: number, height: number): void;
    /**
     * JAN-13のバーコードを描画する。
     *
     * @param bounds
     */
    render(bounds: Bounds): void;
    /**
     * それぞれの英数記号をバーコードの印字パターンのオブジェクト。
     */
    protected static readonly CHARACTER_PATTERNS: Record<string, number[]>;
}
