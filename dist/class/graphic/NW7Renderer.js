import StringObject from "../StringObject.js";
/**
 * NW7のバーコードを描画するクラス。
 *
 * @template C 二次元描画コンテキストの型。
 */
class NW7Renderer {
    /**
     * コンストラクタ。描画する内容と二次元描画コンテキストを指定する。
     *
     * @param barcode
     * @param context
     */
    constructor(barcode, context) {
        this._barcode = barcode;
        this._context = context;
    }
    /**
     * 描画するバーコード。
     */
    get barcode() {
        return this._barcode;
    }
    /**
     * 描画する二次元描画コンテキスト。
     */
    get context() {
        return this._context;
    }
    /**
     * 7DRでチェックディジットを算出する。
     *
     * @param barcode
     * @returns
     */
    static compute7DR(barcode) {
        const barcodeNumber = StringObject.from(barcode).toNumber();
        if (barcodeNumber === null) {
            return "";
        }
        return StringObject.from(barcodeNumber % 7).toString();
    }
    /**
     * 7DSRでチェックディジットを算出する。
     *
     * @param barcode
     * @returns
     */
    static compute7DSR(barcode) {
        const sevenDR = StringObject.from(NW7Renderer.compute7DR(barcode)).toNumber();
        if (sevenDR === null) {
            return "";
        }
        return StringObject.from(7 - sevenDR).toString();
    }
    /**
     * JAN-13のバーコードを描画する。
     *
     * @param bounds
     */
    render(bounds) {
        const barcode = new StringObject(this._barcode);
        // キャラクタ間のギャップの比率
        const gapWidthRatio = 4;
        // すべてのエレメントの和を計算する
        let allWidth = 0;
        for (let index = 0; index < barcode.length(); index++) {
            if (index > 0) {
                allWidth += gapWidthRatio;
            }
            for (const barWidthRatio of NW7Renderer.CHARACTER_PATTERNS[barcode.clone().extract(index, index + 1).toString()]) {
                allWidth += barWidthRatio;
            }
        }
        // 描画する幅を、使用するすべてのエレメントの和で除算して、ひとつの単位に割り当てる幅を計算する
        const oneWidth = bounds.width / allWidth;
        // すべてのキャラクタのエレメントとクワイエットゾーンを描画する
        let renderingX = bounds.x;
        for (let index = 0; index < barcode.length(); index++) {
            const pattern = NW7Renderer.CHARACTER_PATTERNS[barcode.clone().extract(index, index + 1).toString()];
            let paused = false;
            for (const barWidthRatio of pattern) {
                const barWidth = oneWidth * barWidthRatio;
                if (paused) {
                    paused = false;
                }
                else {
                    this.fillRectangle(this._context, renderingX, bounds.y, barWidth, bounds.height);
                    paused = true;
                }
                renderingX += barWidth;
            }
            renderingX += oneWidth * gapWidthRatio;
        }
    }
}
/**
 * それぞれの英数記号をバーコードの印字パターンのオブジェクト。
 */
NW7Renderer.CHARACTER_PATTERNS = {
    "0": [1, 1, 1, 1, 1, 2.5, 2.5],
    "1": [1, 1, 1, 1, 2.5, 2.5, 1],
    "2": [1, 1, 1, 2.5, 1, 1, 2.5],
    "3": [2.5, 2.5, 1, 1, 1, 1, 1],
    "4": [1, 1, 2.5, 1, 1, 2.5, 1],
    "5": [2.5, 1, 1, 1, 1, 2.5, 1],
    "6": [1, 2.5, 1, 1, 1, 1, 2.5],
    "7": [1, 2.5, 1, 1, 2.5, 1, 1],
    "8": [1, 2.5, 2.5, 1, 1, 1, 1],
    "9": [2.5, 1, 1, 2.5, 1, 1, 1],
    "-": [1, 1, 1, 2.5, 2.5, 1, 1],
    "$": [1, 1, 2.5, 2.5, 1, 1, 1],
    ":": [2.5, 1, 1, 1, 2.5, 1, 2.5],
    "/": [2.5, 1, 2.5, 1, 1, 1, 2.5],
    ".": [2.5, 1, 2.5, 1, 2.5, 1, 1],
    "+": [1, 1, 2.5, 1, 2.5, 1, 2.5],
    "a": [1, 1, 2.5, 2.5, 1, 2.5, 1],
    "b": [1, 2.5, 1, 2.5, 1, 1, 2.5],
    "c": [1, 1, 1, 2.5, 1, 2.5, 2.5],
    "d": [1, 1, 1, 2.5, 2.5, 2.5, 1],
};
export default NW7Renderer;
