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
    public constructor(startDate: Datetime | Date, endDate: Datetime | Date) {
        if (startDate instanceof Datetime) {
            this.startDate = startDate.clone().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        } else {
            this.startDate = Datetime.from(startDate).setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        }
        if (endDate instanceof Datetime) {
            this.endDate = endDate.clone().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        } else {
            this.endDate = Datetime.from(endDate).setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
        }
    }

    public startDate: Datetime;

    public endDate: Datetime;

    /**
     * 指定された日時が期間内の場合はtrueを返す。
     * 
     * @param datetime 
     * @returns 
     */
    public contains(datetime: Datetime | Date): boolean {
        let milliseconds: number;
        if (datetime instanceof Datetime) {
            milliseconds = datetime.getAllMilliseconds();
        } else {
            milliseconds = Datetime.from(datetime).getAllMilliseconds();
        }
        if (this.startDate.getAllMilliseconds() <= milliseconds && milliseconds <= this.endDate.getAllMilliseconds()) {
            return true;
        }
        return false;
    }

    /**
     * このインスタンスが指定されたインスタンスと同じ期間の場合はtrueを返す。
     * 
     * @param comparison 
     */
    public equals(comparison: Span): boolean;

    /**
     * このインスタンスが指定された日付と同じ期間の場合はtrueを返す。
     * 
     * @param startDate 
     * @param endDate 
     */
    public equals(startDate: Datetime | Date, endDate: Datetime | Date): boolean;

    /**
     * @deprecated
     */
    public equals(parameter1: Span | Datetime | Date, endDate?: Datetime | Date): boolean {
        let comparison: undefined | Span;
        if (parameter1 instanceof Span) {
            comparison = parameter1;
        } else {
            let startDateOfComparison: undefined | Datetime;
            if (parameter1 instanceof Datetime) {
                startDateOfComparison = parameter1;
            } else {
                startDateOfComparison = new Datetime(parameter1);
            }
            let endDateOfComparison: undefined | Datetime;
            if (endDate) {
                if (endDate instanceof Datetime) {
                    endDateOfComparison = endDate;
                } else {
                    endDateOfComparison = new Datetime(endDate);
                }
            }
            if (startDateOfComparison && endDateOfComparison) {
                comparison = new Span(startDateOfComparison, endDateOfComparison);
            }
        }
        if (comparison) {
            return this.startDate.equalsDate(comparison.startDate) && this.endDate.equals(comparison.endDate);
        }
        return false;
    }
}
