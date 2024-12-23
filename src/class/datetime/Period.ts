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
    public constructor(startDatetime: Datetime | Date, endDatetime: Datetime | Date) {
        if (startDatetime instanceof Datetime) {
            this.startDatetime = startDatetime;
        } else {
            this.startDatetime = Datetime.from(startDatetime);
        }
        if (endDatetime instanceof Datetime) {
            this.endDatetime = endDatetime;
        } else {
            this.endDatetime = Datetime.from(endDatetime);
        }
    }

    /**
     * 期間の開始日時。
     */
    public readonly startDatetime: Datetime;

    /**
     * 期間の終了日時。
     */
    public readonly endDatetime: Datetime;

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
        return this.startDatetime.getAllMilliseconds() <= milliseconds && milliseconds <= this.endDatetime.getAllMilliseconds();
    }

    /**
     * このインスタンスが指定されたインスタンスと同じ期間の場合はtrueを返す。
     * 
     * @param comparison 
     */
    public equals(comparison: Period): boolean;

    /**
     * このインスタンスが指定された期間と同じ場合はtrueを返す。
     * 
     * @param startDate 
     * @param endDate 
     */
    public equals(startDate: Datetime | Date, endDate: Datetime | Date): boolean;

    /**
     * @deprecated
     */
    public equals(parameter1: Period | Datetime | Date, endDate?: Datetime | Date): boolean {
        let comparison: undefined | Period;
        if (parameter1 instanceof Period) {
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
                comparison = new Period(startDateOfComparison, endDateOfComparison);
            }
        }
        return typeof comparison !== "undefined" && this.startDatetime.equals(comparison.startDatetime) && this.endDatetime.equals(comparison.endDatetime);
    }

    /**
     * ミリ秒数で取得する。
     * 
     * @returns
     */
    public toMilliseconds(): number {
        return this.endDatetime.getAllMilliseconds() - this.startDatetime.getAllMilliseconds();
    }

    /**
     * 秒数で取得する。
     * 
     * @returns
     */
    public toSeconds(): number {
        return this.toMilliseconds() / 1000;
    }
    
    /**
     * 分数で取得する。
     * 
     * @returns
     */
    public toMinutes(): number {
        return this.toMilliseconds() / 1000 / 60;
    }

    /**
     * 時間数で取得する。
     * 
     * @returns
     */
    public toHours(): number {
        return this.toMilliseconds() / 1000 / 60 / 60;
    }

    /**
     * 日数で取得する。
     * 
     * @returns
     */
    public toDays(): number {
        return this.toMilliseconds() / 1000 / 60 / 60 / 24;
    }

    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     * 
     * @param startDatetime
     * @param endDatetime
     */
    public static from(startDatetime: Datetime | Date, endDatetime: Datetime | Date): Period {
        return new Period(startDatetime, endDatetime);
    }
}
