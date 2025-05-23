import StringObject from "../StringObject.js";
/**
 * 文字列を描画する抽象クラス。
 *
 * @template C 二次元描画コンテキストの型。
 */
export default class GraphicalString {
    /**
     * コンストラクタ。描画する文字列と二次元描画コンテキストを指定する。
     *
     * @param string
     * @param context
     */
    constructor(string, context) {
        this._horizontalPosition = "left";
        this._verticalPosition = "top";
        this._leading = 0;
        this._allowAutomaticLineFeed = true;
        this._string = StringObject.from(string).replaceCRLF("\n").replaceCR("\n").toString();
        this._context = context;
    }
    /**
     * 描画する文字列。
     */
    get string() {
        return this._string;
    }
    /**
     * 文字列を描画する二次元描画コンテキスト。
     */
    get context() {
        return this._context;
    }
    /**
     * 描画する水平方向の基準。"left"が初期値。
     */
    get horizontalPosition() {
        return this._horizontalPosition;
    }
    set horizontalPosition(horizontalPosition) {
        this._horizontalPosition = horizontalPosition;
    }
    /**
     * 描画する垂直方向の基準。"top"が初期値。
     */
    get verticalPosition() {
        return this._verticalPosition;
    }
    set verticalPosition(verticalPosition) {
        this._verticalPosition = verticalPosition;
    }
    /**
     * 文字列を描画する最大の幅。描画する文字列は最大の幅に応じて自動縮小される。
     */
    get maximumWidth() {
        return this._maximumWidth;
    }
    set maximumWidth(maximumWidth) {
        this._maximumWidth = maximumWidth;
    }
    /**
     * 文字列を描画する最大の高さ。描画する文字列は最大の高さに応じて自動縮小される。
     */
    get maximumHeight() {
        return this._maximumHeight;
    }
    set maximumHeight(maximumHeight) {
        this._maximumHeight = maximumHeight;
    }
    /**
     * 行と行との間隔。0が初期値。
     */
    get leading() {
        return this._leading;
    }
    set leading(leading) {
        this._leading = leading;
    }
    /**
     * 文字列の自動改行が許可されている場合はtrue。trueが初期値。
     */
    get allowAutomaticLineFeed() {
        return this._allowAutomaticLineFeed;
    }
    set allowAutomaticLineFeed(allowAutomaticLineFeed) {
        this._allowAutomaticLineFeed = allowAutomaticLineFeed;
    }
    /**
     * 文字列を描画するレイアウトを作成する。
     *
     * @returns
     */
    createLayout() {
        let fontSize = this.getFontSizeFromContext();
        let lines = [];
        let layout;
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
                }
                else {
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
                layout = { lines: lines, fontSize: fontSize, width: width, height: height };
                break;
            }
            lines = [];
            fontSize -= 0.5;
            this.setFontSizeToContext(fontSize);
        }
        this._lastAdjustedFontSize = layout.fontSize;
        return layout;
    }
    /**
     * 最後に自動調整されたフォントのサイズを取得する。
     *
     * @returns
     */
    get lastAdjustedFontSize() {
        return this._lastAdjustedFontSize;
    }
    /**
     * 文字列のサイズを計測する。
     *
     * @returns
     */
    measureSize() {
        const defaultFontSize = this.getFontSizeFromContext();
        const layout = this.createLayout();
        this.setFontSizeToContext(defaultFontSize);
        return { width: layout.width, height: layout.height };
    }
    /**
     * 指定された一行のテキストを描画して塗りつぶす。
     *
     * @param oneLine
     * @param x
     * @param y
     * @returns 描画したテキストのサイズ。
     */
    fillOneLine(oneLine, x, y) {
        const metrics = this.measureTextSize(oneLine);
        let fillingX = x;
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
        return { width: metrics.width, height: height + leading };
    }
    /**
     * 指定された位置にテキストを描画して塗りつぶす。
     *
     * @param x
     * @param y
     * @returns 描画したテキストのサイズ。
     */
    fill(x, y) {
        const defaultFontSize = this.getFontSizeFromContext();
        const layout = this.createLayout();
        this.setFontSizeToContext(this.lastAdjustedFontSize);
        let filledY = y;
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
        return { width: layout.width, height: layout.height };
    }
    /**
     * 指定されたBoundsの中にテキストを描画して塗りつぶす。
     *
     * @param bounds
     */
    fillInBox(bounds) {
        const defaultFontSize = this.getFontSizeFromContext();
        let layout = this.createLayout();
        this.setFontSizeToContext(this.lastAdjustedFontSize);
        const defaultMaximumWidth = this._maximumWidth;
        const defaultMaximumHeight = this._maximumHeight;
        this._maximumWidth = bounds.width;
        this._maximumHeight = bounds.height;
        layout = this.createLayout();
        let fillingX = bounds.x;
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
        let filledY = bounds.y;
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
        return { width: layout.width, height: layout.height };
    }
}
