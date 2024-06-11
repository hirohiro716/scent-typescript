import { Bounds } from "../Bounds.js";
/**
 * NW7のバーコードを描画するクラス。
 */
export default class NW7Renderer {
    /**
     * コンストラクタ。描画する内容と二次元描画コンテキストを指定する。
     *
     * @param barcode
     * @param context
     */
    constructor(barcode: string, context: CanvasRenderingContext2D);
    private _barcode;
    /**
     * 描画するバーコード。
     */
    get barcode(): string;
    private _context;
    /**
     * 描画する二次元描画コンテキスト。
     */
    get context(): CanvasRenderingContext2D | undefined;
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
