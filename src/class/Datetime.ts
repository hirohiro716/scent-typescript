import StringObject from "./StringObject.js";

/**
 * 日時のクラス。
 */
export class Datetime {

    /**
     * コンストラクタ。 "YYYY-MM-DD", "YYYY/MM/DD", "YYYY-MM-DD HH:mm:ss.sss", "YYYY/MM/DD HH:mm:ss.sss" のいずれかの形式の日時文字列を指定する。
     * 
     * @param datetimeString 
     */
    public constructor(datetimeString: string);

    /**
     * コンストラクタ。Dateオブジェクトを指定する。
     * 
     * @param date 
     */
    public constructor(date?: Date);

    /**
     * コンストラクタ。日時を数値で指定する。
     * 
     * @param year 
     * @param month 
     * @param day 
     * @param hour 
     * @param minute 
     * @param second 
     */
    public constructor(year: number, month: number, day: number, hour?: number, minute?: number, second?: number);

    /**
     * @deprecated
     */
    public constructor(parameter1?: string | number | Date, month?: number, day?: number, hour?: number, minute?: number, second?: number) {
        if (typeof parameter1 === "string") {
            this._date = new Date();
            const millisecond: number = Date.parse(parameter1);
            if (isNaN(millisecond) === false) {
                this._date.setTime(millisecond);
            } else {
                this._date.setTime(0);
                const valueLikeDatetime: string = parameter1.replaceAll("/", "-").replaceAll(" ", "T");
                const millisecond: number = Date.parse(valueLikeDatetime);
                if (isNaN(millisecond) === false) {
                    this._date.setTime(millisecond);
                }
            }
            return;
        }
        if (typeof parameter1 === "number") {
            this._date = new Date();
            this._date.setTime(0);
            this._date.setFullYear(parameter1);
            if (month) this._date.setMonth(month - 1);
            if (day) this._date.setDate(day);
            if (hour) this._date.setHours(hour);
            if (minute) this._date.setMinutes(minute);
            if (second) this._date.setSeconds(second);
            return;
        }
        if (parameter1 instanceof Date) {
            this._date = parameter1;
            return;
        }
        this._date = new Date();
    }

    private _date: Date;

    /**
     * 内部で保持しているDateオブジェクトを取得する。
     * 
     * @returns 
     */
    public get date(): Date {
        return this._date;
    }

    /**
     * 年(西暦)を取得する。
     * 
     * @returns
     */
    public getYear(): number {
        return this._date.getFullYear();
    }

    /**
     * 月(1〜12)を取得する。
     * 
     * @returns
     */
    public getMonth(): number {
        return this._date.getMonth() + 1;
    }

    /**
     * 日(1〜31)を取得する。
     * 
     * @returns
     */
    public getDay(): number {
        return this._date.getDate();
    }

    /**
     * 曜日を取得する。
     * 
     * @returns 
     */
    public getDayOfWeek(): DayOfWeek {
        switch (this._date.getDay()) {
            case 0:
                break;
            case 1:
                return DayOfWeek.MONDAY;
            case 2:
                return DayOfWeek.TUESDAY;
            case 3:
                return DayOfWeek.WEDNESDAY;
            case 4:
                return DayOfWeek.THURSDAY;
            case 5:
                return DayOfWeek.FRIDAY;
            case 6:
                return DayOfWeek.SATURDAY;
        }
        return DayOfWeek.SUNDAY;
    }

    /**
     * 時(0〜23)を取得する。
     * 
     * @returns
     */
    public getHour(): number {
        return this._date.getHours();
    }

    /**
     * 分(0〜59)を取得する。
     * 
     * @returns
     */
    public getMinute(): number {
        return this._date.getMinutes();
    }

    /**
     * 秒(0〜59)を取得する。
     * 
     * @returns
     */
    public getSecond(): number {
        return this._date.getSeconds();
    }

    /**
     * ミリ秒(0〜999)を取得する。
     * 
     * @returns
     */
    public getMillisecond(): number {
        return this._date.getMilliseconds();
    }

    /**
     * 0ミリ秒が表す日時(1970-01-01 00:00:00.000)からの経過ミリ秒を取得する。
     * 
     * @returns 
     */
    public getAllMilliseconds(): number {
        return this._date.getTime();
    }

    /**
     * 年(西暦)をセットする。
     * 
     * @param year 
     */
    public setYear(year: number): void {
        this._date.setFullYear(year);
    }

    /**
     * 月(1〜12)をセットする。
     * 
     * @param month 
     */
    public setMonth(month: number): void {
        this._date.setMonth(month - 1);
    }

    /**
     * 日(1〜31)をセットする。
     * 
     * @param day 
     */
    public setDay(day: number): void {
        this._date.setDate(day);
    }

    /**
     * 時(0〜23)をセットする。
     * 
     * @param hour 
     */
    public setHour(hour: number): void {
        this._date.setHours(hour);
    }

    /**
     * 分(0〜59)をセットする。
     * 
     * @param minute 
     */
    public setMinute(minute: number): void {
        this._date.setMinutes(minute);
    }

    /**
     * 秒(0〜59)をセットする。
     * 
     * @param minute 
     */
    public setSecond(second: number): void {
        this._date.setSeconds(second);
    }

    /**
     * ミリ秒(0〜999)をセットする。
     * 
     * @param minute 
     */
    public setMillisecond(millisecond: number): void {
        this._date.setMilliseconds(millisecond);
    }

    /**
     * 0ミリ秒が表す日時(1970-01-01 00:00:00.000)からの経過ミリ秒をセットする。
     * 
     * @param milliseconds 
     */
    public setAllMilliseconds(milliseconds: number): void {
        this._date.setTime(milliseconds);
    }

    /**
     * 年を加算する。
     * 
     * @param year 
     */
    public addYear(year: number) {
        this.setYear(this.getYear() + year);
    }

    /**
     * 月を加算する。
     * 
     * @param month 
     */
    public addMonth(month: number) {
        this.setMonth(this.getMonth() + month);
    }

    /**
     * 日を加算する。
     * 
     * @param day 
     */
    public addDay(day: number) {
        this.setDay(this.getDay() + day);
    }

    /**
     * 時を加算する。
     * 
     * @param hour 
     */
    public addHour(hour: number) {
        this.setHour(this.getHour() + hour);
    }

    /**
     * 分を加算する。
     * 
     * @param minute 
     */
    public addMinute(minute: number) {
        this.setMinute(this.getMinute() + minute);
    }

    /**
     * 秒を加算する。
     * 
     * @param second
     */
    public addSecond(second: number) {
        this.setSecond(this.getSecond() + second);
    }

    /**
     * ミリ秒を加算する。
     * 
     * @param millisecond 
     */
    public addMillisecond(millisecond: number) {
        this.setMillisecond(this.getMillisecond() + millisecond);
    }

    /**
     * 年〜日までの区切り文字。
     */
    public yearToDateSeparator: string = "-";

    /**
     * 文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toString() returns "2023-12-22 12:12:00"
     * 
     * @param datetimeFormat
     * @returns 
     */
    public toString(datetimeFormat: DatetimeFormat = DatetimeFormat.DATE_TO_SECOND): string {
        const value: StringObject = new StringObject();
        switch (datetimeFormat) {
            case DatetimeFormat.DATE_ONLY:
            case DatetimeFormat.DATE_TO_MINUTE:
            case DatetimeFormat.DATE_TO_SECOND:
                value.append(this._date.getFullYear());
                value.append(this.yearToDateSeparator);
                value.append(StringObject.from(this._date.getMonth() + 1).paddingLeft(2, "0"));
                value.append(this.yearToDateSeparator);
                value.append(StringObject.from(this._date.getDate()).paddingLeft(2, "0"));
        }
        switch (datetimeFormat) {
            case DatetimeFormat.DATE_TO_MINUTE:
            case DatetimeFormat.DATE_TO_SECOND:
            case DatetimeFormat.HOUR_TO_MINUTE:
            case DatetimeFormat.HOUR_TO_SECOND:
                if (value.length() > 0) {
                    value.append(" ");
                }
                value.append(StringObject.from(this._date.getHours()).paddingLeft(2, "0"));
                value.append(":");
                value.append(StringObject.from(this._date.getMinutes()).paddingLeft(2, "0"));
        }
        switch (datetimeFormat) {
            case DatetimeFormat.DATE_TO_SECOND:
            case DatetimeFormat.HOUR_TO_SECOND:
                value.append(":");
                value.append(StringObject.from(this._date.getSeconds()).paddingLeft(2, "0"));
        }
        return value.toString();
    }

    /**
     * 日付のみの文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toStringOnlyDate() returns "2023-12-22"
     * 
     * @returns 
     */
    public toStringOnlyDate(): string {
        return this.toString(DatetimeFormat.DATE_ONLY);
    }

    /**
     * 時刻のみの文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toStringOnlyTime() returns "12:12:00"
     * 
     * @returns 
     */
    public toStringOnlyTime(): string {
        return this.toString(DatetimeFormat.HOUR_TO_SECOND);
    }

    /**
     * このオブジェクトのクローンを作成する。
     * 
     * @returns 
     */
    public clone(): Datetime {
        let datetime: Datetime = new Datetime(new Date(this._date));
        return datetime;
    }

    /**
     * 指定された変数が表す時刻がミリ秒まで同じ場合にtrueを返す。
     * 
     * @param comparison 
     * @returns 
     */
    public equals(comparison: Datetime | Date | string): boolean {
        if (typeof comparison === "string") {
            const datetimeForComparison: Datetime = new Datetime(comparison);
            if (this._date.getTime() === datetimeForComparison._date.getTime()) {
                return true;
            }
        }
        if (comparison instanceof Datetime) {
            if (this._date.getTime() === comparison._date.getTime()) {
                return true;
            }
        }
        if (comparison instanceof Date) {
            if (this._date.getTime() === comparison.getTime()) {
                return true;
            }
        }
        return false;
    }

    /**
     * 指定された変数が表す日付の年/月/日が同じ場合にtrueを返す。
     * 
     * @param comparison 
     * @returns 
     */
    public equalsDate(comparison: Datetime | Date | string): boolean {
        let datetimeForComparison: Datetime;
        if (typeof comparison === "string") {
            datetimeForComparison = new Datetime(comparison);
        } else if (comparison instanceof Date) {
            datetimeForComparison = new Datetime(comparison);
        } else if (comparison instanceof Datetime) {
            datetimeForComparison = comparison;
        } else {
            return false;
        }
        return this.getYear() === datetimeForComparison.getYear() && this.getMonth() === datetimeForComparison.getMonth() && this.getDay() === datetimeForComparison.getDay();
    }

    /**
     * 指定された変数が表す時刻の時/分/秒/ミリ秒が同じ場合にtrueを返す。
     * 
     * @param comparison 
     * @returns 
     */
    public equalsTime(comparison: Datetime | Date | string): boolean {
        let datetimeForComparison: Datetime;
        if (typeof comparison === "string") {
            datetimeForComparison = new Datetime(comparison);
        } else if (comparison instanceof Date) {
            datetimeForComparison = new Datetime(comparison);
        } else if (comparison instanceof Datetime) {
            datetimeForComparison = comparison;
        } else {
            return false;
        }
        return this.getHour() === datetimeForComparison.getHour() && this.getMinute() === datetimeForComparison.getMinute()
            && this.getSecond() === datetimeForComparison.getSecond() && this.getMillisecond() === datetimeForComparison.getMillisecond();
    }
}

/**
 * 曜日の定数。
 */
export enum DayOfWeek {
    SUNDAY = "sunday",
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
}

/**
 * 日時文字列フォーマットパターンの定数。
 */
export enum DatetimeFormat {
    DATE_ONLY = "date_only",
    DATE_TO_MINUTE = "date_to_minute",
    DATE_TO_SECOND = "date_to_second",
    HOUR_TO_SECOND = "hour_to_second",
    HOUR_TO_MINUTE = "hour_to_minute",
}
