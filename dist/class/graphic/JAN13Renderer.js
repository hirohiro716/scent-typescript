import StringObject from "../StringObject.js";
/**
 * JAN-13のバーコードを描画するクラス。
 *
 * @template C 二次元描画コンテキストの型。
 */
class JAN13Renderer {
    /**
     * コンストラクタ。描画する内容と二次元描画コンテキストを指定する。
     *
     * @param barcode
     * @param context
     */
    constructor(barcode, context) {
        this._barScale = 1;
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
     * バーの拡大率。1が初期値。
     */
    get barScale() {
        return this._barScale;
    }
    set barScale(barScale) {
        this._barScale = barScale;
    }
    /**
     * JAN-13の値13桁のうち、チェックディジットを削除した12桁を返す。
     *
     * @param barcode
     * @returns 12桁の値、失敗した場合は空文字を返す。
     */
    static removeCheckDigit(barcode) {
        const string = new StringObject(barcode);
        if (string.length() >= 12 && string.toNumber() !== null) {
            return string.extract(1, 12).toString();
        }
        return "";
    }
    /**
     * JAN-13のチェックディジットを算出する。
     *
     * @param barcode
     * @returns 計算結果。失敗した場合は空文字。
     */
    static computeCheckDigit(barcode) {
        const string = new StringObject(barcode);
        if (string.length() < 12 || string.toNumber() === null) {
            return "";
        }
        string.extract(0, 12);
        const odd = new StringObject();
        const even = new StringObject();
        // 文字の位置が奇数か偶数かで分ける
        for (let index = 0; index < string.length(); index++) {
            const addition = string.clone().extract(index, index + 1);
            if ((index + 1) % 2 != 0) {
                odd.append(addition);
            }
            else {
                even.append(addition);
            }
        }
        // 偶数の数字すべての和を3倍する
        let evenSum3 = 0;
        Array.from(even).forEach((one) => { evenSum3 += one.toNumber(); });
        evenSum3 *= 3;
        // 奇数の数字すべての和
        let oddSum = 0;
        Array.from(odd).forEach((one) => { oddSum += one.toNumber(); });
        // 偶数の和×3と奇数の和
        const evenSum3AndOddSum = new StringObject(evenSum3 + oddSum);
        // 下一桁を取る
        const last = evenSum3AndOddSum.extract(-1);
        // 10から下一桁を引く
        const tenMinusLast = new StringObject(10 - last.toNumber());
        // また下一桁を取って返す
        return tenMinusLast.extract(-1).toString();
    }
    /**
     * JAN-13の値として有効な場合はtrueを返す。
     *
     * @param barcode
     * @returns
     */
    static isValid(barcode) {
        const string = new StringObject(barcode);
        if (string.length() == 13) {
            const checkDigit = JAN13Renderer.computeCheckDigit(barcode);
            if (string.extract(-1).equals(checkDigit)) {
                return true;
            }
        }
        return false;
    }
    /**
     * JAN-13のバーコードを描画する。
     *
     * @param bounds
     */
    render(bounds) {
        const oneModule = bounds.width / 95;
        if (typeof this._context === "undefined" || oneModule <= 0 || JAN13Renderer.isValid(this._barcode) === false) {
            return;
        }
        const barcode = new StringObject(this._barcode);
        let renderingX = bounds.x;
        // ノーマルガードバー
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
        renderingX += oneModule * 2;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
        renderingX += oneModule;
        // リーディングディジットを取得する
        const readingDigit = barcode.clone().extract(0, 1).toNumber();
        // センターガードバーの左側を描画する
        const leftParityType = JAN13Renderer.LEFT_PARITY_TYPES[readingDigit];
        for (let index = 1; index <= 6; index++) {
            const typeIndex = leftParityType[index - 1];
            const rendering = barcode.clone().extract(index, index + 1).toNumber();
            const parities = JAN13Renderer.LEFT_PARITIES[typeIndex][rendering];
            for (const parity of parities) {
                if (parity === 1) {
                    this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
                }
                renderingX += oneModule;
            }
        }
        // センターガードバー
        renderingX += oneModule;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
        renderingX += oneModule * 2;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
        renderingX += oneModule * 2;
        // センターガードバーの右側を描画する
        for (let index = 7; index <= 12; index++) {
            const rendering = barcode.clone().extract(index, index + 1).toNumber();
            const parities = JAN13Renderer.RIGHT_PARITIES[rendering];
            for (const parity of parities) {
                if (parity === 1) {
                    this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
                }
                renderingX += oneModule;
            }
        }
        // ライトガードバー
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
        renderingX += oneModule * 2;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule * this._barScale, bounds.height);
    }
}
/**
 * 先頭の数字(リーディングディジット)から左6桁のパリティ種類を特定するための配列。0の場合は奇数パリティ(A)を表し、1の場合は偶数パリティ(B)を表す。
 */
JAN13Renderer.LEFT_PARITY_TYPES = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 0, 1],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 1],
    [0, 1, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 0] // 9
];
/**
 * 左側6桁のパリティ。「0」が奇数パリティ(A)、「1」が偶数パリティ(B)を表す。
 */
JAN13Renderer.LEFT_PARITIES = [
    [
        [0, 0, 0, 1, 1, 0, 1],
        [0, 0, 1, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 1, 1],
        [0, 1, 1, 1, 1, 0, 1],
        [0, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 1, 1],
        [0, 1, 1, 1, 0, 1, 1],
        [0, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 1, 0, 1, 1] // 9
    ],
    [
        [0, 1, 0, 0, 1, 1, 1],
        [0, 1, 1, 0, 0, 1, 1],
        [0, 0, 1, 1, 0, 1, 1],
        [0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 0, 1],
        [0, 1, 1, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 1],
        [0, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 1, 1, 1] // 9
    ]
];
/**
 * 右側6桁のパリティ。
 */
JAN13Renderer.RIGHT_PARITIES = [
    [1, 1, 1, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1, 1, 0],
    [1, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0], // 9
];
export default JAN13Renderer;
