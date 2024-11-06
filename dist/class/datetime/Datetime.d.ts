import Enumeration from "../Enumeration.js";
/**
 * 日時のクラス。
 */
export declare class Datetime {
    /**
     * コンストラクタ。 "YYYY-MM-DD", "YYYY/MM/DD", "YYYY-MM-DD HH:mm:ss.sss", "YYYY/MM/DD HH:mm:ss.sss" のいずれかの形式の日時文字列を指定する。
     *
     * @param datetimeString
     */
    constructor(datetimeString: string);
    /**
     * コンストラクタ。Dateインスタンスを指定する。
     *
     * @param date
     */
    constructor(date?: Date);
    /**
     * コンストラクタ。Datetimeインスタンスを指定する。
     *
     * @param datetime
     */
    constructor(datetime?: Datetime);
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
    constructor(year: number, month: number, day: number, hour?: number, minute?: number, second?: number);
    private _date;
    /**
     * 内部で保持しているDateインスタンスを取得する。
     *
     * @returns
     */
    get date(): Date;
    /**
     * 年(西暦)を取得する。
     *
     * @returns
     */
    getYear(): number;
    /**
     * 月(1〜12)を取得する。
     *
     * @returns
     */
    getMonth(): number;
    /**
     * 日(1〜31)を取得する。
     *
     * @returns
     */
    getDay(): number;
    /**
     * 曜日定数を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").getDayOfWeek() returns DayOfWeek.friday
     *
     * @returns
     */
    getDayOfWeek(): Enumeration;
    /**
     * 時(0〜23)を取得する。
     *
     * @returns
     */
    getHour(): number;
    /**
     * 分(0〜59)を取得する。
     *
     * @returns
     */
    getMinute(): number;
    /**
     * 秒(0〜59)を取得する。
     *
     * @returns
     */
    getSecond(): number;
    /**
     * ミリ秒(0〜999)を取得する。
     *
     * @returns
     */
    getMillisecond(): number;
    /**
     * 0ミリ秒が表す日時(UTC 1970-01-01 00:00:00.000)からの経過ミリ秒を取得する。
     *
     * @returns
     */
    getAllMilliseconds(): number;
    /**
     * 年(西暦)をセットする。
     *
     * @param year
     * @returns このインスタンス。
     */
    setYear(year: number): Datetime;
    /**
     * 月(1〜12)をセットする。
     *
     * @param month
     * @returns このインスタンス。
     */
    setMonth(month: number): Datetime;
    /**
     * 日(1〜31)をセットする。
     *
     * @param day
     * @returns このインスタンス。
     */
    setDay(day: number): Datetime;
    /**
     * 時(0〜23)をセットする。
     *
     * @param hour
     * @returns このインスタンス。
     */
    setHour(hour: number): Datetime;
    /**
     * 分(0〜59)をセットする。
     *
     * @param minute
     * @returns このインスタンス。
     */
    setMinute(minute: number): Datetime;
    /**
     * 秒(0〜59)をセットする。
     *
     * @param minute
     * @returns このインスタンス。
     */
    setSecond(second: number): Datetime;
    /**
     * ミリ秒(0〜999)をセットする。
     *
     * @param minute
     * @returns このインスタンス。
     */
    setMillisecond(millisecond: number): Datetime;
    /**
     * 0ミリ秒が表す日時(UTC 1970-01-01 00:00:00.000)からの経過ミリ秒をセットする。
     *
     * @param milliseconds
     * @returns このインスタンス。
     */
    setAllMilliseconds(milliseconds: number): Datetime;
    /**
     * 年を加算する。
     *
     * @param year
     * @returns このインスタンス。
     */
    addYear(year: number): Datetime;
    /**
     * 月を加算する。
     *
     * @param month
     * @returns このインスタンス。
     */
    addMonth(month: number): Datetime;
    /**
     * 日を加算する。
     *
     * @param day
     * @returns このインスタンス。
     */
    addDay(day: number): Datetime;
    /**
     * 時を加算する。
     *
     * @param hour
     * @returns このインスタンス。
     */
    addHour(hour: number): Datetime;
    /**
     * 分を加算する。
     *
     * @param minute
     * @returns このインスタンス。
     */
    addMinute(minute: number): Datetime;
    /**
     * 秒を加算する。
     *
     * @param second
     * @returns このインスタンス。
     */
    addSecond(second: number): Datetime;
    /**
     * ミリ秒を加算する。
     *
     * @param millisecond
     * @returns このインスタンス。
     */
    addMillisecond(millisecond: number): Datetime;
    /**
     * 月末の場合はtrueを返す。
     *
     * @returns
     */
    isLastDayOfMonth(): boolean;
    /**
     * 月末に変更する。
     *
     * @returns このインスタンス。
     */
    changeToLastDayOfMonth(): Datetime;
    /**
     * 年〜日までの区切り文字。
     */
    yearToDateSeparator: string;
    /**
     * 文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toString() returns "2023-12-22 12:12:00"
     *
     * @param datetimeFormat 日時文字列フォーマットパターン。DatetimeFormat.dateToSecondがデフォルト。
     * @returns
     */
    toString(datetimeFormat?: Enumeration): string;
    /**
     * 日付のみの文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toStringOnlyDate() returns "2023-12-22"
     *
     * @returns
     */
    toStringOnlyDate(): string;
    /**
     * 時刻のみの文字列表現を取得する。
     * @example
     * new Datetime("2023-12-22 12:12").toStringOnlyTime() returns "12:12:00"
     *
     * @returns
     */
    toStringOnlyTime(): string;
    /**
     * このインスタンスのクローンを作成する。
     *
     * @returns
     */
    clone(): Datetime;
    /**
     * 指定された変数が表す時刻がミリ秒まで同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equals(comparison: Datetime | Date | string): boolean;
    /**
     * 指定された変数が表す日付の年/月/日が同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equalsDate(comparison: Datetime | Date | string): boolean;
    /**
     * 指定された変数が表す時刻の時/分/秒/ミリ秒が同じ場合にtrueを返す。
     *
     * @param comparison
     * @returns
     */
    equalsTime(comparison: Datetime | Date | string): boolean;
    /**
     * コンストラクタの呼び出しと同じで新しいインスタンスを作成する。
     *
     * @param dateValue
     * @returns
     */
    static from(dateValue?: string | Date): Datetime;
}
/**
 * 曜日の定数オブジェクト。
 */
export declare const DayOfWeek: {
    /**
     * 日曜日。
     */
    sunday: Enumeration;
    /**
     * 月曜日。
     */
    monday: Enumeration;
    /**
     * 火曜日。
     */
    tuesday: Enumeration;
    /**
     * 水曜日。
     */
    wednesday: Enumeration;
    /**
     * 木曜日。
     */
    thursday: Enumeration;
    /**
     * 金曜日。
     */
    friday: Enumeration;
    /**
     * 土曜日。
     */
    saturday: Enumeration;
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param physicalName
     * @returns
     */
    find: (physicalName: string) => Enumeration | null;
    /**
     * 定数オブジェクト内の定数のみの配列を返す。
     *
     * @returns
     */
    getEnumerations: () => Enumeration[];
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     *
     * @returns
     */
    createNameMap: () => Map<string, string>;
};
/**
 * 日時文字列フォーマットパターンの定数オブジェクト。
 */
export declare const DatetimeFormat: {
    /**
     * 年月日のみ。
     */
    dateOnly: Enumeration;
    /**
     * 年月日から分まで。
     */
    dateToMinute: Enumeration;
    /**
     * 年月日から秒まで。
     */
    dateToSecond: Enumeration;
    /**
     * 年と月。
     */
    yearAndMonth: Enumeration;
    /**
     * 月と日。
     */
    monthAndDay: Enumeration;
    /**
     * 時から秒まで。
     */
    hourToSecond: Enumeration;
    /**
     * 時と分。
     */
    hourAndMinute: Enumeration;
    /**
     * 指定された物理名に一致する定数を返す。見つからなかった場合はnullを返す。
     *
     * @param physicalName
     * @returns
     */
    find: (physicalName: string) => Enumeration | null;
    /**
     * 定数オブジェクト内の定数のみの配列を返す。
     *
     * @returns
     */
    getEnumerations: () => Enumeration[];
    /**
     * すべての定数で、物理名がキー、論理名が値のマップを作成する。
     *
     * @returns
     */
    createNameMap: () => Map<string, string>;
};
