import { Bounds } from "../Bounds.js";
import { Dimension } from "../Dimension.js";
import StringObject from "../StringObject.js";

type VerticalPosition = "top" | "middle" | "bottom";

type HorizontalPosition = "left" | "center" | "right";

type Layout = {
    lines: string[],
    width: number,
    height: number,
    fontSize: number
}

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
    public constructor(string: string, context: C) {
        this._string = StringObject.from(string).replaceCRLF("\n").replaceCR("\n").toString();
        this._context = context;
    }

    private _string: string;

    /**
     * 描画する文字列。
     */
    public get string(): string {
        return this._string;
    }

    private _context: C;

    /**
     * 文字列を描画する二次元描画コンテキスト。
     */
    public get context(): C {
        return this._context;
    }

    private _horizontalPosition: HorizontalPosition = "left";

    /**
     * 描画する水平方向の基準。
     */
    public get horizontalPosition(): HorizontalPosition {
        return this._horizontalPosition;
    }

    public set horizontalPosition(horizontalPosition: HorizontalPosition) {
        this._horizontalPosition = horizontalPosition;
    }

    private _verticalPosition: VerticalPosition = "top";

    /**
     * 描画する垂直方向の基準。
     */
    public get verticalPosition(): VerticalPosition {
        return this._verticalPosition;
    }

    public set verticalPosition(verticalPosition: VerticalPosition) {
        this._verticalPosition = verticalPosition;
    }

    private _maximumWidth: number | undefined;

    /**
     * 文字列を描画する最大の幅。描画する文字列は最大の幅に応じて自動縮小される。
     */
    public get maximumWidth(): number | undefined {
        return this._maximumWidth;
    }

    public set maximumWidth(maximumWidth: number | undefined) {
        this._maximumWidth = maximumWidth;
    }

    private _maximumHeight: number | undefined;

    /**
     * 文字列を描画する最大の高さ。描画する文字列は最大の高さに応じて自動縮小される。
     */
    public get maximumHeight(): number | undefined {
        return this._maximumHeight;
    }

    public set maximumHeight(maximumHeight: number | undefined) {
        this._maximumHeight = maximumHeight;
    }

    private _leading: number | undefined;

    /**
     * 行と行との間隔。
     */
    public get leading(): number | undefined {
        return this._leading;
    }

    public set leading(leading: number | undefined) {
        this._leading = leading;
    }

    private _allowAutomaticLineFeed: boolean = false;

    /**
     * 文字列を描画する際の自動改行が許可されている場合はtrue。
     */
    public get allowAutomaticLineFeed(): boolean {
        return this._allowAutomaticLineFeed;
    }

    public set allowAutomaticLineFeed(allowAutomaticLineFeed: boolean) {
        this._allowAutomaticLineFeed = allowAutomaticLineFeed;
    }

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
     * @returns
     */
    protected abstract measureTextSize(text: string): Dimension;

    /**
     * 文字列を描画するレイアウトを作成する。
     * 
     * @returns 
     */
    private createLayout(): Layout {
        let fontSize = this.getFontSizeFromContext();
        let lines: string[] = [];
        let layout: Layout | undefined;
        while (typeof layout === "undefined") {
            let line = new StringObject();
            for (let index = 0; index < this._string.length; index++) {
                const one = new StringObject(this._string).extract(index, index + 1);
                const metrics = this.measureTextSize(line.clone().append(one).toString());
                if (this._allowAutomaticLineFeed && typeof this._maximumWidth !== "undefined" && this._maximumWidth < metrics.width || one.equals("\n")) {
                    if (line.length() > 0) {
                        lines.push(line.toString());
                    }
                    line = one.replaceLF("");
                } else {
                    line.append(one);
                }
            }
            lines.push(line.toString());
            let width = 0;
            let height = 0;
            for (const line of lines) {
                const metrics = this.measureTextSize(line);
                if (width < metrics.width) {
                    width = metrics.width;
                }
                if (height > 0 && this._leading) {
                    height += this._leading;
                }
                height += metrics.height;
            }
            let laidout = true;
            if (fontSize > 1) {
                if (this._maximumWidth && this._maximumWidth < width) {
                    laidout = false;
                }
                if (this._maximumHeight && this._maximumHeight < height) {
                    laidout = false;
                }
            }
            if (laidout) {
                layout = {lines: lines, fontSize: fontSize, width: width, height: height};
                break;
            }
            lines = [];
            fontSize -= 0.5;
            this.setFontSizeToContext(fontSize);
        }
        this._lastAdjustedFontSize = layout.fontSize;
        return layout;
    }

    private _lastAdjustedFontSize: number | undefined;

    /**
     * 最後に自動調整されたフォントのサイズを取得する。
     * 
     * @returns
     */
    public get lastAdjustedFontSize(): number | undefined {
        return this._lastAdjustedFontSize;
    }

    /**
     * 文字列のサイズを計測する。
     * 
     * @returns
     */
    public measureSize(): Dimension {
        const defaultFontSize = this.getFontSizeFromContext();
        const layout = this.createLayout();
        this.setFontSizeToContext(defaultFontSize);
        return {width: layout.width, height: layout.height};
    }

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
    private fillOneLine(oneLine: string, x: number, y: number): Dimension {
        const metrics = this.measureTextSize(oneLine);
        let fillingX: number = x;
        switch (this._horizontalPosition) {
        case "left":
            this.fillText(oneLine, fillingX, y);
            break;
        case "center":
            fillingX -= metrics.width / 2;
            this.fillText(oneLine, fillingX, y);
            break;
        case "right":
            fillingX -= metrics.width;
            this.fillText(oneLine, fillingX, y);
            break;
        }
        let leading = this._leading;
        if (typeof leading === "undefined") {
            leading = 0;
        }
        const height = metrics.height;
        return {width: metrics.width, height: height + leading};
    }

    /**
     * 指定された位置にテキストを描画して塗りつぶす。
     * 
     * @param x 
     * @param y 
     * @returns 描画したテキストのサイズ。
     */
    public fill(x: number, y: number): Dimension {
        const defaultFontSize = this.getFontSizeFromContext();
        const layout = this.createLayout();
        this.setFontSizeToContext(this.lastAdjustedFontSize!);
        let filledY: number = y;
        switch (this._verticalPosition) {
            case "top":
                for (const line of layout.lines) {
                    const dimension = this.fillOneLine(line, x, filledY);
                    filledY += dimension.height;
                }
                break;
            case "middle":
                filledY -= layout.height / 2;
                for (const line of layout.lines) {
                    const dimension = this.fillOneLine(line, x, filledY);
                    filledY += dimension.height;
                }
                break;
            case "bottom":
                filledY -= layout.height;
                for (const line of layout.lines) {
                    const dimension = this.fillOneLine(line, x, filledY);
                    filledY += dimension.height;
                }
                break;                        
        }
        this.setFontSizeToContext(defaultFontSize);
        return {width: layout.width, height: layout.height};
    }

    /**
     * 指定されたBoundsの中にテキストを描画して塗りつぶす。
     * 
     * @param bounds
     */
    public fillInBox(bounds: Bounds): Dimension {
        const defaultFontSize = this.getFontSizeFromContext();
        let layout = this.createLayout();
        this.setFontSizeToContext(this.lastAdjustedFontSize!);
        const defaultMaximumWidth = this._maximumWidth;
        const defaultMaximumHeight = this._maximumHeight;
        this._maximumWidth = bounds.width;
        this._maximumHeight = bounds.height;
        layout = this.createLayout();
        let fillingX: number = bounds.x;
        switch (this._horizontalPosition) {
            case "left":
                break;
            case "center":
                fillingX += bounds.width / 2;
                break;
            case "right":
                fillingX += bounds.width;
                break;
        }
        let filledY: number = bounds.y;
        switch (this._verticalPosition) {
            case "top":
                for (const line of layout.lines) {
                    const dimension = this.fillOneLine(line, fillingX, filledY);
                    filledY += dimension.height;
                }
                break;
            case "middle":
                filledY += this._maximumHeight / 2;
                filledY -= layout.height / 2;
                for (const line of layout.lines) {
                    const dimension = this.fillOneLine(line, fillingX, filledY);
                    filledY += dimension.height;
                }
                break;
            case "bottom":
                filledY += this._maximumHeight;
                filledY -= layout.height;
                for (const line of layout.lines) {
                    const dimension = this.fillOneLine(line, fillingX, filledY);
                    filledY += dimension.height;
                }
                break;
        }
        this._maximumWidth = defaultMaximumWidth;
        this._maximumHeight = defaultMaximumHeight;
        this.setFontSizeToContext(defaultFontSize);
        return {width: layout.width, height: layout.height};
    }
}
