/**
 * 郵便番号のクラス。
 */
export default class Zipcode {
    /**
     * JISと都道府県のオブジェクト。
     */
    static readonly jisAndPrefectures: Record<number, string>;
    /**
     * 都道府県を取得する。
     */
    static getPrefectures(): string[];
    /**
     * 指定された郵便番号に対する住所を取得する。
     *
     * @param zipcode
     * @returns
     */
    static fetchAddress(zipcode: string): Promise<{
        prefecture: string;
        address: string;
    }>;
}
