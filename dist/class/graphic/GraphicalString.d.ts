import { Bounds } from "../Bounds.js";
import { Dimension } from "../Dimension.js";
type VerticalPosition = "top" | "middle" | "alphabetic" | "bottom";
type HorizontalPosition = "left" | "center" | "right";
type TextMetrics = {
    width: number;
    ascent: number;
    descent: number;
};
/**
 * 文字列を描画する抽象クラス。
 *
 * @template C 二次元描画コンテキストの型。
 */
export default abstract class GraphicalString<C> {
    /**
     * コンストラクタ。描画する文字列と二次元描画コンテキストを指定する。
     *
     * @param string
     * @param context
     */
    constructor(string: string, context: C);
    private _string;
    /**
     * 描画する文字列。
     */
    get string(): string;
    private _context;
    /**
     * 文字列を描画する二次元描画コンテキスト。
     */
    get context(): C;
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
    private _allowAutomaticLineFeed;
    /**
     * 文字列を描画する際の自動改行が許可されている場合はtrue。
     */
    get allowAutomaticLineFeed(): boolean;
    set allowAutomaticLineFeed(allowAutomaticLineFeed: boolean);
    /**
     * コンストラクタで指定されたコンテキストからフォントサイズを取得する。
     *
     * @param context
     */
    protected abstract getFontSizeFromContext(): number;
    /**
     * コンストラクタで指定されたコンテキストに指定されたフォントサイズをセットする。
     *
     * @param context
     * @param fontSize
     */
    protected abstract setFontSizeToContext(fontSize: number): void;
    /**
     * 指定された文字列のサイズを計測する。
     *
     * @returns TextMetrics widthは全体の幅、ascentはベースラインから上端までの高さ、descentはベースラインから下端までの高さ。
     */
    protected abstract measureTextSize(text: string): TextMetrics;
    /**
     * 文字列を描画するレイアウトを作成する。
     *
     * @returns
     */
    private createLayout;
    private _lastAdjustedFontSize;
    /**
     * 最後に自動調整されたフォントのサイズを取得する。
     *
     * @returns
     */
    get lastAdjustedFontSize(): number | undefined;
    /**
     * 文字列のサイズを計測する。
     *
     * @returns
     */
    measureSize(): Dimension;
    /**
     * 指定されたテキストを描画して塗りつぶす。
     *
     * @param text
     * @param x
     * @param y
     */
    protected abstract fillText(text: string, x: number, y: number): void;
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
