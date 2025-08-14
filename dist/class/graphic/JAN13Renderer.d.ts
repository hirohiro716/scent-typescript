import { Bounds } from "../Bounds.js";
/**
 * JAN-13のバーコードを描画するクラス。
 *
 * @template C 二次元描画コンテキストの型。
 */
export default abstract class JAN13Renderer<C> {
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
    private _barScale;
    /**
     * バーの拡大率。1が初期値。
     */
    get barScale(): number;
    set barScale(barScale: number);
    /**
     * JAN-13の値13桁のうち、チェックディジットを削除した12桁を返す。
     *
     * @param barcode
     * @returns 12桁の値、失敗した場合は空文字を返す。
     */
    static removeCheckDigit(barcode: string): string;
    /**
     * JAN-13のチェックディジットを算出する。
     *
     * @param barcode
     * @returns 計算結果。失敗した場合は空文字。
     */
    static computeCheckDigit(barcode: string): string;
    /**
     * JAN-13の値として有効な場合はtrueを返す。
     *
     * @param barcode
     * @returns
     */
    static isValid(barcode: string): boolean;
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
     * 先頭の数字(リーディングディジット)から左6桁のパリティ種類を特定するための配列。0の場合は奇数パリティ(A)を表し、1の場合は偶数パリティ(B)を表す。
     */
    protected static readonly LEFT_PARITY_TYPES: number[][];
    /**
     * 左側6桁のパリティ。「0」が奇数パリティ(A)、「1」が偶数パリティ(B)を表す。
     */
    protected static readonly LEFT_PARITIES: number[][][];
    /**
     * 右側6桁のパリティ。
     */
    protected static readonly RIGHT_PARITIES: number[][];
}
