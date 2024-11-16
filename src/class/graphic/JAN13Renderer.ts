import { Bounds } from "../Bounds.js";
import StringObject from "../StringObject.js";

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
    public constructor(barcode: string, context: C) {
        this._barcode = barcode;
        this._context = context;
    }

    private _barcode: string;

    /**
     * 描画するバーコード。
     */
    public get barcode(): string {
        return this._barcode;
    }

    private _context: C;

    /**
     * 描画する二次元描画コンテキスト。
     */
    public get context(): C {
        return this._context;
    }

    /**
     * JAN-13の値13桁のうち、チェックディジットを削除した12桁を返す。
     * 
     * @param barcode
     * @returns 12桁の値、失敗した場合は空文字を返す。
     */
    public static removeCheckDigit(barcode: string): string {
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
    public static computeCheckDigit(barcode: string): string {
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
            } else {
                even.append(addition);
            }
        }
        // 偶数の数字すべての和を3倍する
        let evenSum3 = 0;
        Array.from(even).forEach((one) => {evenSum3 += one.toNumber()!});
        evenSum3 *= 3;
        // 奇数の数字すべての和
        let oddSum = 0;
        Array.from(odd).forEach((one) => {oddSum += one.toNumber()!});
        // 偶数の和×3と奇数の和
        const evenSum3AndOddSum = new StringObject(evenSum3 + oddSum);
        // 下一桁を取る
        const last = evenSum3AndOddSum.extract(-1);
        // 10から下一桁を引く
        const tenMinusLast = new StringObject(10 - last.toNumber()!);
        // また下一桁を取って返す
        return tenMinusLast.extract(-1).toString();
    }

    /**
     * JAN-13の値として有効な場合はtrueを返す。
     * 
     * @param barcode 
     * @returns
     */
    public static isValid(barcode: string): boolean {
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
    public render(bounds: Bounds): void {
        const oneModule: number = bounds.width / 95;
        if (typeof this._context === "undefined" || oneModule <= 0 || JAN13Renderer.isValid(this._barcode) === false) {
            return;
        }
        const barcode = new StringObject(this._barcode);
        let renderingX = bounds.x;
        // ノーマルガードバー
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
        renderingX += oneModule * 2;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
        // リーディングディジットを取得する
        const readingDigit = barcode.clone().extract(0, 1).toNumber()!;
        // センターガードバーの左側を描画する
        const leftParityType = JAN13Renderer.LEFT_PARITY_TYPES[readingDigit];
        for (let index = 1; index <= 6; index++) {
            const typeIndex = leftParityType[index - 1];
            const rendering = barcode.clone().extract(index, index + 1).toNumber()!;
            const parities = JAN13Renderer.LEFT_PARITIES[typeIndex][rendering];
            for (const parity of parities) {
                if (parity === 1) {
                    this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
                }
                renderingX += oneModule;
            }
        }
        // センターガードバー
        renderingX += oneModule;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
        renderingX += oneModule * 2;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
        renderingX += oneModule * 2;
        // センターガードバーの右側を描画する
        for (let index = 7; index <= 12; index++) {
            const rendering = barcode.clone().extract(index, index + 1).toNumber()!;
            const parities = JAN13Renderer.RIGHT_PARITIES[rendering];
            for (const parity of parities) {
                if (parity === 1) {
                    this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
                }
                renderingX += oneModule;
            }
        }
        // ライトガードバー
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
        renderingX += oneModule * 2;
        this.fillRectangle(this._context, renderingX, bounds.y, oneModule, bounds.height);
    }

    /**
     * 先頭の数字(リーディングディジット)から左6桁のパリティ種類を特定するための配列。0の場合は奇数パリティ(A)を表し、1の場合は偶数パリティ(B)を表す。
     */
    protected static readonly LEFT_PARITY_TYPES: number[][] = [
        [0, 0, 0, 0, 0, 0], // 0
        [0, 0, 1, 0, 1, 1], // 1
        [0, 0, 1, 1, 0, 1], // 2
        [0, 0, 1, 1, 1, 0], // 3
        [0, 1, 0, 0, 1, 1], // 4
        [0, 1, 1, 0, 0, 1], // 5
        [0, 1, 1, 1, 0, 0], // 6
        [0, 1, 0, 1, 0, 1], // 7
        [0, 1, 0, 1, 1, 0], // 8
        [0, 1, 1, 0, 1, 0]  // 9
    ];

    /**
     * 左側6桁のパリティ。「0」が奇数パリティ(A)、「1」が偶数パリティ(B)を表す。
     */
    protected static readonly LEFT_PARITIES: number[][][] = [
        [ // 奇数パリティ(A)
            [0, 0, 0, 1, 1, 0, 1], // 0
            [0, 0, 1, 1, 0, 0, 1], // 1
            [0, 0, 1, 0, 0, 1, 1], // 2
            [0, 1, 1, 1, 1, 0, 1], // 3
            [0, 1, 0, 0, 0, 1, 1], // 4
            [0, 1, 1, 0, 0, 0, 1], // 5
            [0, 1, 0, 1, 1, 1, 1], // 6
            [0, 1, 1, 1, 0, 1, 1], // 7
            [0, 1, 1, 0, 1, 1, 1], // 8
            [0, 0, 0, 1, 0, 1, 1]  // 9
        ],
        [ // 偶数パリティ(B)
            [0, 1, 0, 0, 1, 1, 1], // 0
            [0, 1, 1, 0, 0, 1, 1], // 1
            [0, 0, 1, 1, 0, 1, 1], // 2
            [0, 1, 0, 0, 0, 0, 1], // 3
            [0, 0, 1, 1, 1, 0, 1], // 4
            [0, 1, 1, 1, 0, 0, 1], // 5
            [0, 0, 0, 0, 1, 0, 1], // 6
            [0, 0, 1, 0, 0, 0, 1], // 7
            [0, 0, 0, 1, 0, 0, 1], // 8
            [0, 0, 1, 0, 1, 1, 1]  // 9
        ]
    ];

    /**
     * 右側6桁のパリティ。
     */
    protected static readonly RIGHT_PARITIES: number[][] = [
        [1, 1, 1, 0, 0, 1, 0], // 0
        [1, 1, 0, 0, 1, 1, 0], // 1
        [1, 1, 0, 1, 1, 0, 0], // 2
        [1, 0, 0, 0, 0, 1, 0], // 3
        [1, 0, 1, 1, 1, 0, 0], // 4
        [1, 0, 0, 1, 1, 1, 0], // 5
        [1, 0, 1, 0, 0, 0, 0], // 6
        [1, 0, 0, 0, 1, 0, 0], // 7
        [1, 0, 0, 1, 0, 0, 0], // 8
        [1, 1, 1, 0, 1, 0, 0], // 9
    ];
}
