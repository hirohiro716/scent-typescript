import { Datetime } from "./Datetime.js";
/**
 * 期間のクラス。
 */
export default class Span {
    /**
     * コンストラクタ。開始日と終了日を指定する。
     *
     * @param startDate
     * @param endDate
     */
    constructor(startDate: Datetime | Date, endDate: Datetime | Date);
    startDate: Datetime;
    endDate: Datetime;
    /**
     * 指定された日時が期間内の場合はtrueを返す。
     *
     * @param datetime
     * @returns
     */
    contains(datetime: Datetime | Date): boolean;
    /**
     * このインスタンスが指定されたインスタンスと同じ期間の場合はtrueを返す。
     *
     * @param comparison
     */
    equals(comparison: Span): boolean;
    /**
     * このインスタンスが指定された日付と同じ期間の場合はtrueを返す。
     *
     * @param startDate
     * @param endDate
     */
    equals(startDate: Datetime | Date, endDate: Datetime | Date): boolean;
}
