import { Bounds } from "../Bounds.js";
import StringObject from "../StringObject.js";

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
    public constructor(barcode: string, context: CanvasRenderingContext2D) {
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

    private _context: CanvasRenderingContext2D | undefined;

    /**
     * 描画する二次元描画コンテキスト。
     */
    public get context(): CanvasRenderingContext2D | undefined {
        return this._context;
    }

    /**
     * 7DRでチェックディジットを算出する。
     * 
     * @param barcode 
     * @returns 
     */
    public static compute7DR(barcode: string): string {
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
    public static compute7DSR(barcode: string): string {
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
    public render(bounds: Bounds): void {
        if (typeof this._context === "undefined") {
            return;
        }
        const barcode = new StringObject(this._barcode);
        // キャラクタ間のギャップの比率
        const gapWidthRatio: number = 4;
        // すべてのエレメントの和を計算する
        let allWidth: number = 0;
        for (let index = 0; index < barcode.length(); index++) {
            if (index > 0) {
                allWidth += gapWidthRatio;
            }
            for (const barWidthRatio of NW7Renderer.CHARACTER_PATTERNS[barcode.clone().extract(index, index + 1).toString()]) {
                allWidth += barWidthRatio;
            }
        }
        // 描画する幅を、使用するすべてのエレメントの和で除算して、ひとつの単位に割り当てる幅を計算する
        const oneWidth: number = bounds.width / allWidth;
        // すべてのキャラクタのエレメントとクワイエットゾーンを描画する
        let renderingX = bounds.x;
        for (let index = 0; index < barcode.length(); index++) {
            const pattern: number[] = NW7Renderer.CHARACTER_PATTERNS[barcode.clone().extract(index, index + 1).toString()];
            let paused = false;
            for (const barWidthRatio of pattern) {
                const barWidth: number = oneWidth * barWidthRatio;
                if (paused) {
                    paused = false;
                } else {
                    this._context.fillRect(renderingX, bounds.y, barWidth, bounds.height);
                    paused = true;
                }
                renderingX += barWidth;
            }
            renderingX += oneWidth * gapWidthRatio;
        }
    }

    /**
     * それぞれの英数記号をバーコードの印字パターンのオブジェクト。
     */
    protected static readonly CHARACTER_PATTERNS: Record<string, number[]> = {
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
    }
}
