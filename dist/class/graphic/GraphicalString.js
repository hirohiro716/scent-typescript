import StringObject from "../StringObject.js";
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
    constructor(string, context) {
        this._horizontalPosition = "left";
        this._verticalPosition = "alphabetic";
        this._isAllowAutomaticLineFeed = false;
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
     * 指定されたフォント文字列からサイズと単位を抽出する。
     *
     * @param font
     * @returns
     */
    extractSizeAndUnit(font) {
        const fontParts = StringObject.from(font).split(" ");
        for (const fontPart of fontParts) {
            if (fontPart.length() >= 2 && fontPart.clone().replace("[0-9]{1,}[0-9\.]{0,}[a-zA-Z]{1,4}", "").length() == 0) {
                const size = fontPart.clone().extract("[0-9\\.]").toNumber();
                const unit = fontPart.clone().extract("[^0-9\\.]").toString();
                if (size !== null && unit.length > 0) {
                    return { size: size, unit: unit };
                }
            }
        }
        return undefined;
    }
    /**
     * 描画する水平方向の基準。
     */
    get horizontalPosition() {
        return this._horizontalPosition;
    }
    set horizontalPosition(horizontalPosition) {
        this._horizontalPosition = horizontalPosition;
    }
    /**
     * 描画する垂直方向の基準。
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
     * 行と行との間隔。
     */
    get leading() {
        return this._leading;
    }
    set leading(leading) {
        this._leading = leading;
    }
    /**
     * 文字列を描画する際の自動改行が許可されている場合はtrue。
     */
    get isAllowAutomaticLineFeed() {
        return this._isAllowAutomaticLineFeed;
    }
    set isAllowAutomaticLineFeed(isAllowAutomaticLineFeed) {
        this._isAllowAutomaticLineFeed = isAllowAutomaticLineFeed;
    }
    /**
     * 指定されたフォントのサイズを変更した文字列を返す。
     *
     * @param font
     * @param size
     */
    changeFontSize(font, size) {
        const newFont = new StringObject(font);
        const sizeAndUnit = this.extractSizeAndUnit(font);
        if (typeof sizeAndUnit === "undefined") {
            return font;
        }
        newFont.replace(StringObject.from(sizeAndUnit.size).toString() + StringObject.from(sizeAndUnit.unit).toString(), size + StringObject.from(sizeAndUnit.unit).toString());
        return newFont.toString();
    }
    /**
     * 文字列を描画するレイアウトを作成する。
     *
     * @returns
     */
    createLayout() {
        if (typeof this._context === "undefined") {
            return undefined;
        }
        const font = this._context.font;
        const sizeAndUnit = this.extractSizeAndUnit(font);
        if (typeof sizeAndUnit === "undefined") {
            return undefined;
        }
        let fontSize = sizeAndUnit.size;
        let lines = [];
        let layout;
        while (typeof layout === "undefined") {
            let line = new StringObject();
            for (let index = 0; index < this._string.length; index++) {
                const one = new StringObject(this._string).extract(index, index + 1);
                const metrics = this._context.measureText(line.clone().append(one).toString());
                if (this._isAllowAutomaticLineFeed && typeof this._maximumWidth !== "undefined" && this._maximumWidth < metrics.width || one.equals("\n")) {
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
                const metrics = this._context.measureText(line);
                if (width < metrics.width) {
                    width = metrics.width;
                }
                if (height > 0 && this._leading) {
                    height += this._leading;
                }
                // 実際に描画される文字列のベースラインから最上部までの高さ＋フォント全体のベースラインから最下部までの高さ
                height += metrics.actualBoundingBoxAscent + metrics.fontBoundingBoxDescent;
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
                layout = { lines: lines, font: this.changeFontSize(font, fontSize), width: width, height: height };
                break;
            }
            lines = [];
            fontSize -= 0.5;
            this._context.font = this.changeFontSize(font, fontSize);
        }
        this._lastAdjustedFont = layout.font;
        return layout;
    }
    /**
     * 最後に自動調整されたフォントを取得する。
     *
     * @returns
     */
    get lastAdjustedFont() {
        return this._lastAdjustedFont;
    }
    /**
     * 文字列のサイズを計測する。
     *
     * @returns
     */
    measureSize() {
        let width = 0;
        let height = 0;
        if (typeof this._context !== "undefined") {
            const defaultFont = this._context.font;
            const layout = this.createLayout();
            this._context.font = defaultFont;
            if (typeof layout !== "undefined") {
                width = layout.width;
                height = layout.height;
            }
        }
        return { width: width, height: height };
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
        if (typeof this._context === "undefined") {
            return { width: 0, height: 0 };
        }
        const metrics = this._context.measureText(oneLine);
        let filledX = x;
        switch (this._horizontalPosition) {
            case "left":
                this._context.fillText(oneLine, filledX, y);
                break;
            case "center":
                if (this._maximumWidth) {
                    filledX += this._maximumWidth / 2;
                }
                filledX -= metrics.width / 2;
                this._context.fillText(oneLine, filledX, y);
                break;
            case "right":
                if (this._maximumWidth) {
                    filledX += this._maximumWidth;
                }
                filledX -= metrics.width;
                this._context.fillText(oneLine, filledX, y);
                break;
        }
        let leading = this._leading;
        if (typeof leading === "undefined") {
            leading = 0;
        }
        // 実際に描画される文字列のベースラインから最上部までの高さ＋フォント全体のベースラインから最下部までの高さ
        const height = metrics.actualBoundingBoxAscent + metrics.fontBoundingBoxDescent;
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
        let width = 0;
        let height = 0;
        if (typeof this._context !== "undefined") {
            const defaultFont = this._context.font;
            const layout = this.createLayout();
            if (typeof layout !== "undefined") {
                const metrics = this._context.measureText("あ");
                let filledY = y;
                let filledX = x;
                switch (this._verticalPosition) {
                    case "top":
                        filledY += metrics.actualBoundingBoxAscent;
                        for (const line of layout.lines) {
                            const dimension = this.fillOneLine(line, filledX, filledY);
                            filledY += dimension.height;
                        }
                        break;
                    case "middle":
                        filledY += metrics.actualBoundingBoxAscent;
                        if (this._maximumHeight) {
                            filledY += this._maximumHeight / 2;
                        }
                        filledY -= layout.height / 2;
                        for (const line of layout.lines) {
                            const dimension = this.fillOneLine(line, filledX, filledY);
                            filledY += dimension.height;
                        }
                        break;
                    case "alphabetic":
                        // 実際に描画される文字列のベースラインから最上部までの高さ＋フォント全体のベースラインから最下部までの高さ
                        filledY += metrics.actualBoundingBoxAscent + metrics.fontBoundingBoxDescent;
                        if (this._maximumHeight) {
                            filledY += this._maximumHeight;
                        }
                        filledY -= layout.height;
                        for (const line of layout.lines) {
                            const dimension = this.fillOneLine(line, filledX, filledY);
                            filledY += dimension.height;
                        }
                        break;
                    case "bottom":
                        filledY += metrics.actualBoundingBoxAscent;
                        if (this._maximumHeight) {
                            filledY += this._maximumHeight;
                        }
                        filledY -= layout.height;
                        for (const line of layout.lines) {
                            const dimension = this.fillOneLine(line, filledX, filledY);
                            filledY += dimension.height;
                        }
                        break;
                }
                width = layout.width;
                height = layout.height;
            }
            this._context.font = defaultFont;
        }
        return { width: width, height: height };
    }
    /**
     * 指定されたBoundsの中にテキストを描画して塗りつぶす。
     *
     * @param bounds
     */
    fillInBox(bounds) {
        const defaultMaximumWidth = this._maximumWidth;
        const defaultMaximumHeight = this._maximumHeight;
        this._maximumWidth = bounds.width;
        this._maximumHeight = bounds.height;
        const dimension = this.fill(bounds.x, bounds.y);
        this._maximumWidth = defaultMaximumWidth;
        this._maximumHeight = defaultMaximumHeight;
        return dimension;
    }
}
