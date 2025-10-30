// utils/dayjs.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko"; // 한국어 요일/월명 지원

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

export default dayjs;
