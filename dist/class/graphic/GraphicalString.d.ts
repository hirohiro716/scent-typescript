import { Bounds } from "../Bounds.js";
import { Dimension } from "../Dimension.js";
type VerticalPosition = "top" | "middle" | "alphabetic" | "bottom";
type HorizontalPosition = "left" | "center" | "right";
/**
 * 文字列を描画するクラス。
 */
export default class GraphicalString {
    /**
     * コンストラクタ。描画する文字列と二次元描画コンテキストを指定する。
     *
     * @param string
     * @param context
     */
    constructor(string: string, context: CanvasRenderingContext2D | undefined);
    private _string;
    /**
     * 描画する文字列。
     */
    get string(): string;
    private _context;
    /**
     * 文字列を描画する二次元描画コンテキスト。
     */
    get context(): CanvasRenderingContext2D | undefined;
    /**
     * 指定されたフォント文字列からサイズと単位を抽出する。
     *
     * @param font
     * @returns
     */
    private extractSizeAndUnit;
    private _horizontalPosition;
    /**
     * 描画する水平方向の基準。
     */
    get horizontalPosition(): HorizontalPosition;
    set horizontalPosition(horizontalPosition: HorizontalPosition);
    private _verticalPosition;
    /**
     * 描画する垂直方向の基準。
     */
    get verticalPosition(): VerticalPosition;
    set verticalPosition(verticalPosition: VerticalPosition);
    private _maximumWidth;
    /**
     * 文字列を描画する最大の幅。描画する文字列は最大の幅に応じて自動縮小される。
     */
    get maximumWidth(): number | undefined;
    set maximumWidth(maximumWidth: number | undefined);
    private _maximumHeight;
    /**
     * 文字列を描画する最大の高さ。描画する文字列は最大の高さに応じて自動縮小される。
     */
    get maximumHeight(): number | undefined;
    set maximumHeight(maximumHeight: number | undefined);
    private _leading;
    /**
     * 行と行との間隔。
     */
    get leading(): number | undefined;
    set leading(leading: number | undefined);
    private _isAllowAutomaticLineFeed;
    /**
     * 文字列を描画する際の自動改行が許可されている場合はtrue。
     */
    get isAllowAutomaticLineFeed(): boolean;
    set isAllowAutomaticLineFeed(isAllowAutomaticLineFeed: boolean);
    /**
     * 指定されたフォントのサイズを変更した文字列を返す。
     *
     * @param font
     * @param size
     */
    private changeFontSize;
    /**
     * 文字列を描画するレイアウトを作成する。
     *
     * @returns
     */
    private createLayout;
    private _lastAdjustedFont;
    /**
     * 最後に自動調整されたフォントを取得する。
     *
     * @returns
     */
    get lastAdjustedFont(): string | undefined;
    /**
     * 文字列のサイズを計測する。
     *
     * @returns
     */
    measureSize(): Dimension;
    /**
     * 指定された一行のテキストを描画して塗りつぶす。
     *
     * @param oneLine
     * @param x
     * @param y
     * @returns 描画したテキストのサイズ。
     */
    private fillOneLine;
    /**
     * 指定された位置にテキストを描画して塗りつぶす。
     *
     * @param x
     * @param y
     * @returns 描画したテキストのサイズ。
     */
    fill(x: number, y: number): Dimension;
    /**
     * 指定されたBoundsの中にテキストを描画して塗りつぶす。
     *
     * @param bounds
     */
    fillInBox(bounds: Bounds): Dimension;
}
export {};
