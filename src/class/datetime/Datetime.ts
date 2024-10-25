import Enumeration from "../Enumeration.js";
import StringObject from "../StringObject.js";

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
     * コンストラクタ。Dateインスタンスを指定する。
     * 
     * @param date 
     */
    public constructor(date?: Date);

    /**
     * コンストラクタ。Datetimeインスタンスを指定する。
     * 
     * @param datetime 
     */
    public constructor(datetime?: Datetime);

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
    public constructor(parameter1?: string | number | Date | Datetime, month?: number, day?: number, hour?: number, minute?: number, second?: number) {
        this._date = new Date();
        if (typeof parameter1 === "string") {
            this.setYear(1970).setMonth(1).setDay(1).setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
            const datetimeString = new StringObject(parameter1);
            const yyyymmdd = datetimeString.clone().extract("^[0-9\\-]{5,}").split("-|/");
            if (yyyymmdd.length == 3) {
                const yyyy = yyyymmdd[0].toNumber();
                if (yyyy) this.setYear(yyyy);
                const mm = yyyymmdd[1].toNumber();
                if (mm) this.setMonth(mm);
                const dd = yyyymmdd[2].toNumber();
                if (dd) this.setDay(dd);
            }
            const hhmmss = datetimeString.clone().extract("[0-9:\\.]{3,}$").split(":|\\.");
            if (hhmmss.length >= 2) {
                const hh = hhmmss[0].toNumber();
                if (hh) this.setHour(hh);
                const mm = hhmmss[1].toNumber();
                if (mm) this.setMinute(mm);
                if (hhmmss.length >= 3) {
                    const ss = hhmmss[2].toNumber();
                    if (ss) this.setSecond(ss);
                    if (hhmmss.length === 4) {
                        const ms = hhmmss[3].toNumber();
                        if (ms) this.setMillisecond(ms);
                    }
                }
            }
            return;
        }
        if (typeof parameter1 === "number") {
            this.setYear(parameter1);
            if (month) this.setMonth(month);
            if (day) this.setDay(day);
            if (hour) this.setHour(hour);
            if (minute) this.setMinute(minute);
            if (second) this.setSecond(second);
            return;
        }
        if (parameter1 instanceof Date) {
            this._date = new Date(parameter1);
            return;
        }
        if (parameter1 instanceof Datetime) {
            this._date = new Date(parameter1.date);
            return;
        }
    }

    private _date: Date;

    /**
     * 内部で保持しているDateインスタンスを取得する。
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
     * 曜日定数を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").getDayOfWeek() returns DayOfWeek.friday
     * 
     * @returns 
     */
    public getDayOfWeek(): Enumeration {
        switch (this._date.getDay()) {
            case 0:
                break;
            case 1:
                return DayOfWeek.monday;
            case 2:
                return DayOfWeek.thursday;
            case 3:
                return DayOfWeek.wednesday;
            case 4:
                return DayOfWeek.thursday;
            case 5:
                return DayOfWeek.friday;
            case 6:
                return DayOfWeek.saturday;
        }
        return DayOfWeek.sunday;
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
     * 0ミリ秒が表す日時(UTC 1970-01-01 00:00:00.000)からの経過ミリ秒を取得する。
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
     * @returns このインスタンス。
     */
    public setYear(year: number): Datetime {
        this._date.setFullYear(year);
        return this;
    }

    /**
     * 月(1〜12)をセットする。
     * 
     * @param month 
     * @returns このインスタンス。
     */
    public setMonth(month: number): Datetime {
        this._date.setMonth(month - 1);
        return this;
    }

    /**
     * 日(1〜31)をセットする。
     * 
     * @param day 
     * @returns このインスタンス。
     */
    public setDay(day: number): Datetime {
        this._date.setDate(day);
        return this;
    }

    /**
     * 時(0〜23)をセットする。
     * 
     * @param hour 
     * @returns このインスタンス。
     */
    public setHour(hour: number): Datetime {
        this._date.setHours(hour);
        return this;
    }

    /**
     * 分(0〜59)をセットする。
     * 
     * @param minute 
     * @returns このインスタンス。
     */
    public setMinute(minute: number): Datetime {
        this._date.setMinutes(minute);
        return this;
    }

    /**
     * 秒(0〜59)をセットする。
     * 
     * @param minute 
     * @returns このインスタンス。
     */
    public setSecond(second: number): Datetime {
        this._date.setSeconds(second);
        return this;
    }

    /**
     * ミリ秒(0〜999)をセットする。
     * 
     * @param minute 
     * @returns このインスタンス。
     */
    public setMillisecond(millisecond: number): Datetime {
        this._date.setMilliseconds(millisecond);
        return this;
    }

    /**
     * 0ミリ秒が表す日時(UTC 1970-01-01 00:00:00.000)からの経過ミリ秒をセットする。
     * 
     * @param milliseconds 
     * @returns このインスタンス。
     */
    public setAllMilliseconds(milliseconds: number): Datetime {
        this._date.setTime(milliseconds);
        return this;
    }

    /**
     * 年を加算する。
     * 
     * @param year 
     * @returns このインスタンス。
     */
    public addYear(year: number): Datetime {
        return this.setYear(this.getYear() + year);
    }

    /**
     * 月を加算する。
     * 
     * @param month 
     * @returns このインスタンス。
     */
    public addMonth(month: number): Datetime {
        return this.setMonth(this.getMonth() + month);
    }

    /**
     * 日を加算する。
     * 
     * @param day 
     * @returns このインスタンス。
     */
    public addDay(day: number): Datetime {
        return this.setDay(this.getDay() + day);
    }

    /**
     * 時を加算する。
     * 
     * @param hour 
     * @returns このインスタンス。
     */
    public addHour(hour: number): Datetime {
        return this.setHour(this.getHour() + hour);
    }

    /**
     * 分を加算する。
     * 
     * @param minute 
     * @returns このインスタンス。
     */
    public addMinute(minute: number): Datetime {
        return this.setMinute(this.getMinute() + minute);
    }

    /**
     * 秒を加算する。
     * 
     * @param second
     * @returns このインスタンス。
     */
    public addSecond(second: number): Datetime {
        return this.setSecond(this.getSecond() + second);
    }

    /**
     * ミリ秒を加算する。
     * 
     * @param millisecond 
     * @returns このインスタンス。
     */
    public addMillisecond(millisecond: number): Datetime {
        return this.setMillisecond(this.getMillisecond() + millisecond);
    }

    /**
     * 月末に変更する。
     */
    public changeToLastDayOfMonth(): void {
        this.addMonth(1);
        this.setDay(1);
        this.addDay(-1);
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
     * @param datetimeFormat 日時文字列フォーマットパターン。DatetimeFormat.dateToSecondがデフォルト。
     * @returns 
     */
    public toString(datetimeFormat: Enumeration = DatetimeFormat.dateToSecond): string {
        const value: StringObject = new StringObject();
        switch (datetimeFormat) {
            case DatetimeFormat.dateOnly:
            case DatetimeFormat.dateToMinute:
            case DatetimeFormat.dateToSecond:
                value.append(this._date.getFullYear());
                value.append(this.yearToDateSeparator);
                value.append(StringObject.from(this._date.getMonth() + 1).paddingLeft(2, "0"));
                value.append(this.yearToDateSeparator);
                value.append(StringObject.from(this._date.getDate()).paddingLeft(2, "0"));
        }
        switch (datetimeFormat) {
            case DatetimeFormat.dateToMinute:
            case DatetimeFormat.dateToSecond:
            case DatetimeFormat.hourToMinute:
            case DatetimeFormat.hourToSecond:
                if (value.length() > 0) {
                    value.append(" ");
                }
                value.append(StringObject.from(this._date.getHours()).paddingLeft(2, "0"));
                value.append(":");
                value.append(StringObject.from(this._date.getMinutes()).paddingLeft(2, "0"));
        }
        switch (datetimeFormat) {
            case DatetimeFormat.dateToSecond:
            case DatetimeFormat.hourToSecond:
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
        return this.toString(DatetimeFormat.dateOnly);
    }

    /**
     * 時刻のみの文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toStringOnlyTime() returns "12:12:00"
     * 
     * @returns 
     */
    public toStringOnlyTime(): string {
        return this.toString(DatetimeFormat.hourToSecond);
    }

    /**
     * このインスタンスのクローンを作成する。
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

    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     * 
     * @param dateValue 
     * @returns 
     */
    public static from(dateValue?: string | Date): Datetime {
        if (dateValue instanceof Date) {
            return new Datetime(dateValue);
        } else if (typeof dateValue === "string") {
            return new Datetime(dateValue);
        } else {
            return new Datetime();
        }
    }
}

/**
 * 曜日の定数オブジェクト。
 */
export const DayOfWeek = {
    /**
     * 日曜日。
     */
    sunday: new Enumeration("sunday", "日曜日"),
    /**
     * 月曜日。
     */
    monday: new Enumeration("monday", "月曜日"),
    /**
     * 火曜日。
     */
    tuesday: new Enumeration("tuesday", "火曜日"),
    /**
     * 水曜日。
     */
    wednesday: new Enumeration("wednesday", "水曜日"),
    /**
     * 木曜日。
     */
    thursday: new Enumeration("thursday", "木曜日"),
    /**
     * 金曜日。
     */
    friday: new Enumeration("friday", "金曜日"),
    /**
     * 土曜日。
     */
    saturday: new Enumeration("saturday", "土曜日"),
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     * 
     * @param physicalName 
     * @returns 
     */
    find: (physicalName: string): Enumeration | null => {
        return Enumeration.findEnumeration(DayOfWeek, physicalName);
    },
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     * 
     * @returns 
     */
    createNameMap: (): Map<string, string> => {
        return Enumeration.createEnumerationNameMap(DayOfWeek);
    },
}

/**
 * 日時文字列フォーマットパターンの定数オブジェクト。
 */
export const DatetimeFormat = {
    /**
     * 年月日のみ。
     */
    dateOnly: new Enumeration("date_only", "年月日のみ"),
    /**
     * 年月日から分まで。
     */
    dateToMinute: new Enumeration("date_to_minute", "年月日から分まで"),
    /**
     * 年月日から秒まで。
     */
    dateToSecond: new Enumeration("date_to_second", "年月日から秒まで"),
    /**
     * 時から秒まで。
     */
    hourToSecond: new Enumeration("hour_to_second", "時から秒まで"),
    /**
     * 時から分まで。
     */
    hourToMinute: new Enumeration("hour_to_minute", "時から分まで"),
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     * 
     * @param physicalName 
     * @returns 
     */
    find: (physicalName: string): Enumeration | null => {
        return Enumeration.findEnumeration(DatetimeFormat, physicalName);
    },
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     * 
     * @returns 
     */
    createNameMap: (): Map<string, string> => {
        return Enumeration.createEnumerationNameMap(DatetimeFormat);
    },
}
