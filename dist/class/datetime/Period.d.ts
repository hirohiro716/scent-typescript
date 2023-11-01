import { Datetime } from "./Datetime.js";
/**
 * 期間のクラス。
 */
export default class Period {
    /**
     * コンストラクタ。開始日時と終了日時を指定する。
     *
     * @param startDatetime
     * @param endDatetime
     */
    constructor(startDatetime: Datetime | Date, endDatetime: Datetime | Date);
    readonly startDatetime: Datetime;
    readonly endDatetime: Datetime;
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
    equals(comparison: Period): boolean;
    /**
     * このインスタンスが指定された期間と同じ場合はtrueを返す。
     *
     * @param startDate
     * @param endDate
     */
    equals(startDate: Datetime | Date, endDate: Datetime | Date): boolean;
}
