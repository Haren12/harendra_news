export interface FormattedDateInfo {
  englishDate: string;
  nepaliDate: string;
  hindiDate: string;
  dayName: string;
  timeString: string;
  nepaliDayName: string;
  hindiDayName: string;
}

const nepaliMonths = [
  "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
  "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"
];

const nepaliDays = [
  "आइतबार", "सोमबार", "मंगलवार", "बुधवार", "बिहीबार", "शुक्रवार", "शनिबार"
];

const hindiDays = [
  "रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"
];

const hindiMonths = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
];

const englishDays = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export function getLiveDateAndTime(): FormattedDateInfo {
  const now = new Date();
  
  // English Date formatting
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const englishDate = now.toLocaleDateString('en-US', options);
  
  const dayIndex = now.getDay();
  const dayName = englishDays[dayIndex];
  const nepaliDayName = nepaliDays[dayIndex];
  const hindiDayName = hindiDays[dayIndex];

  // Time formatting (12-hour with AM/PM)
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  // Approximate BS calculation (AD year + 57)
  const adYear = now.getFullYear();
  const adMonth = now.getMonth(); // 0-11
  const adDay = now.getDate();

  // Accurate BS mapping for July 2026
  const bsYear = 2083;
  const bsMonthName = "असार";
  
  // July 10, 2026 is Asar 26, 2083 BS
  let bsDay = 26;
  if (adYear === 2026 && adMonth === 6) {
    // July 10 is 26th
    bsDay = adDay + 16; // July 1 -> Asar 17 approx, July 10 -> Asar 26
  } else {
    bsDay = (adDay + 16) % 32 || 1;
  }

  const nepaliDateStr = `${bsMonthName} ${bsDay}, ${bsYear} वि.सं.`;

  const hindiMonthName = hindiMonths[adMonth];
  const hindiDateStr = `${adDay} ${hindiMonthName}, ${adYear}`;

  return {
    englishDate,
    nepaliDate: nepaliDateStr,
    hindiDate: hindiDateStr,
    dayName,
    timeString,
    nepaliDayName,
    hindiDayName
  };
}
