import { IReactSelectInterface, IObjectType } from '../interfaces';
import { languageTranslation } from '../helpers';
import { maskArray } from 'react-text-mask';
export const taxNumberLimit: number = 11;
export const taxBracket: number = 100;
export const ssn: number = 12;
export const userNameReplaceRegex: RegExp = /[`~!@#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi;
export const PAGE_LIMIT: number = 10;
export const TODO_PAGE_LIMIT: number = 14;
export const ARCHIVE_PAGE_LIMIT: number = 20;
export const defaultDateTimeFormat: any = 'DD.MM.YYYY HH:mm:ss';
export const defaultDateTimeFormatForDashboard: any = 'DD.MM.YYYY HH:mm';
export const defaultDateFormat: any = 'DD.MM.YYYY';
export const dbAcceptableFormat: any = 'YYYY/MM/DD';
export const dateFormat: any = 'MMM, Do YYYY';
export const regSinceDate: any = 'DD.MM.YYYY';
export const alphaNumeric: RegExp = /^[A-Za-z0-9 ]+$/;
export const telephoneReqExp: RegExp = /^\(([0-9]{10-13})\)$/;
export const emailRegex: RegExp = /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const IBANReplaceRegex: RegExp = /[^A-Z0-9]/gi;
export const NumberWithCommaRegex: RegExp = /^\d*(?:,\d{1,2})?$/;
export const IBANlength: number = 22;
export const workingHours: number = 4;
export const fee: number = 10000;
export const telMin: number = 9;
export const telMax: number = 15;
export const mobMin: number = 9;
export const mobMax: number = 15;
export const fileSize: number = 1 * 1024 * 1024;
export const SupportedFormats: string[] = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
];
export const IBANRegex: maskArray = [
  /[A-Za-z]/,
  /[A-Za-z]/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
];

export const DateMask: maskArray = [
  /\d/,
  /\d/,
  '.',
  /[0-9]/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

//  /^(([0-1][0-9]|2[0-3]|[0-9])|([0-1][0-9]|2[0-3]|[0-9])(:|h)[0-5]?[0-9]?)$/

export const TimeMask: maskArray = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

export const Status: IReactSelectInterface[] = [
  { value: 'true', label: languageTranslation('ACTIVE') },
  { value: 'false', label: languageTranslation('DISABLE') },
];

export const webRegExp: RegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

export const ContactType: IReactSelectInterface[] = [
  { value: 'Administration department', label: 'Administration department' },
  { value: 'Assistant medical director', label: 'Assistant medical director' },
  {
    value: 'Assitant to the head of the nursing service',
    label: 'Assitant to the head of the nursing service',
  },
  { value: 'Bookkeeper', label: 'Bookkeeper' },
  { value: 'Branch office', label: 'Branch office' },
  { value: 'Director', label: 'Director' },
  { value: 'General manager', label: 'General manager' },
  { value: 'Guesthouse', label: 'Guesthouse' },
  {
    value: 'Head of the nursing service',
    label: 'Head of the nursing service',
  },
  { value: 'Head physician', label: 'Head physician' },
  { value: 'Headquarter', label: 'Headquarter' },
  { value: 'Health care director', label: 'Health care director' },
  { value: 'HR department', label: 'HR department' },
  { value: 'Managing director', label: 'Managing director' },
  { value: 'Medical director', label: 'Medical director' },
  { value: 'Nursing home director', label: 'Nursing home director' },
  { value: 'Other', label: 'Other' },
  { value: 'Practice manager', label: 'Practice manager' },
  { value: 'Secretary', label: 'Secretary' },
  { value: 'Vice director', label: 'Vice director' },
];

export const InvoiceType: IReactSelectInterface[] = [
  {
    value: 'By emails without documents',
    label: 'By emails without documents',
  },
  { value: 'By email with documents', label: 'By email with documents' },
  {
    value: 'By post + email without documents',
    label: 'By post + email without documents',
  },
  {
    value: 'By post + email with documents',
    label: 'By post + email with documents',
  },
  {
    value: 'One Email For Each Invoice',
    label: 'One Email For Each Invoice',
  },
  {
    value: 'One Email For Each Invoice Incl. Working Proof',
    label: 'One Email For Each Invoice Incl. Working Proof',
  },
  {
    value: 'Via Email Without Work Proof',
    label: 'Via Email Without Work Proof',
  },
  {
    value: 'via Email With Work Proof',
    label: 'via Email With Work Proof',
  },
];

export const InvoiceInterval: IReactSelectInterface[] = [
  { value: 'Monthly for the 1st', label: 'Monthly for the 1st' },
  { value: 'Semimonthly for 1 and 16', label: 'Semimonthly for 1 and 16' },
  {
    value: 'Weekly Mondays',
    label: 'Weekly Mondays',
  },
];

export const CareInstitutionContactAttribute: IReactSelectInterface[] = [
  {
    label: 'Acquire block 1 - 5',
    value: 'Acquire block 1 - 5',
  },
  {
    label: 'Acquisition only twice a year',
    value: 'Acquisition only twice a year',
  },
  {
    label: 'Currently no interest → Yellow',
    value: 'Currently no interest → Yellow',
  },
  {
    label: 'Do not want to contact anymore → black with white text',
    value: 'Do not want to contact anymore → black with white text',
  },
  {
    label: 'Incorrect data set → black with white text',
    value: 'Incorrect data set → black with white text',
  },
  {
    label: 'Information mail sent → yellow',
    value: 'Information mail sent → yellow',
  },
  {
    label: 'Need skilled workers → yellow',
    value: 'Need skilled workers → yellow',
  },
  {
    label: 'Not available → black with white text',
    value: 'Not available → black with white text',
  },
  {
    label: 'Would info by callback → Yellow',
    value: 'Would info by callback → Yellow',
  },
  {
    label: 'Would info by email → yellow',
    value: 'Would info by email → yellow',
  },
];

export const DocumentTempSelect: IReactSelectInterface[] = [
  { value: 'Working Proof', label: 'Working Proof' },
  { value: 'Sick Note', label: 'Sick Note' },
];
export const Gender: IReactSelectInterface[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];
export const State: IReactSelectInterface[] = [
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Designing', label: 'Designing' },
  { value: 'Development', label: 'Development' },
  { value: 'HR', label: 'HR' },
];
export const Salutation: IReactSelectInterface[] = [
  { value: 'Sir', label: 'Sir' },
  { value: 'Madam', label: 'Madam' },
];

export const LockedOptions: any[] = [
  { value: null, label: languageTranslation('ALL') },
  { value: true, label: languageTranslation('LOCKED') },
  { value: false, label: languageTranslation('UNLOCKED') },
];

export const DayOptions: any[] = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 5, label: '5' },
  { value: 7, label: '7' },
  { value: 14, label: '14' },
  { value: 31, label: '31' },
];

export const Country: IReactSelectInterface[] = [
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Czechia', label: 'Czechia' },
  { value: 'France', label: 'France' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Austria', label: 'Austria' },
];
export const LegalForm: IReactSelectInterface[] = [
  { value: 'Individual', label: 'Individual' },
  { value: 'UG', label: 'UG' },
  { value: 'GmbH', label: 'GmbH' },
  { value: 'Ltd.', label: 'Ltd.' },
  { value: 'GbR', label: 'GbR' },
];

export const Hours: IReactSelectInterface[] = [
  { value: '12', label: '12' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];
export const CalculationInterval: IReactSelectInterface[] = [
  { value: 'Monthly to 1', label: 'Monthly to 1' },
  { value: 'Bi-monthly to the 1 & 16', label: 'Bi-monthly to the 1 & 16' },
  { value: 'Weekly On Mondays', label: 'Weekly on Mondays' },
];
export const Supplements: IReactSelectInterface[] = [
  { value: 'Exclusive', label: 'Exclusive' },
  { value: 'Cumulative', label: 'Cumulative' },
];

export const MaritalStatus: IReactSelectInterface[] = [
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  {
    value: 'Married, Permanently separated',
    label: 'Married, Permanently separated',
  },
  { value: 'Widowed', label: 'Widowed' },
];

export const HealthInsuranceType: IReactSelectInterface[] = [
  { value: 'VoluntarilyInsuredByLaw', label: 'Voluntarily insured by law' },
  { value: 'LegallyInsured', label: 'Legally insured' },
  { value: 'PrivatelyInsured', label: 'Privately insured' },
];

export const HealthInsuranceProvider: IReactSelectInterface[] = [
  { label: 'actimonda BKK', value: 'actimonda BKK' },
  { label: 'actimonda BKK (NBL)', value: 'actimonda BKK (NBL)' },
  {
    label: 'AKA Augenoptiker Ausgl.kasse',
    value: 'AKA Augenoptiker Ausgl.kasse',
  },
  {
    label: 'Allianz Private Krankenversicherungs-Aktiengesellschaft',
    value: 'Allianz Private Krankenversicherungs-Aktiengesellschaft',
  },
  {
    label: 'ALTE OLDENBURGER Krankenversicherung AG',
    value: 'ALTE OLDENBURGER Krankenversicherung AG',
  },
  {
    label:
      'ALTE OLDENBURGER Krankenversicherung von 1927 Versicherungsverein auf Gegenseitigkeit',
    value:
      'ALTE OLDENBURGER Krankenversicherung von 1927 Versicherungsverein auf Gegenseitigkeit',
  },
  {
    label: 'AOK Baden-Wtbg./Neckar-Fils',
    value: 'AOK Baden-Wtbg./Neckar-Fils',
  },
  { label: 'AOK Baden-Württemberg', value: 'AOK Baden-Württemberg' },
  { label: 'AOK Bayern', value: 'AOK Bayern' },
  { label: 'AOK Bremen/Bremerhaven', value: 'AOK Bremen/Bremerhaven' },
  { label: 'AOK Hessen', value: 'AOK Hessen' },
  { label: 'AOK Niedersachsen', value: 'AOK Niedersachsen' },
  { label: 'AOK Nienburg/Weser', value: 'AOK Nienburg/Weser' },
  { label: 'AOK Nordost (Berlin)', value: 'AOK Nordost (Berlin)' },
  { label: 'AOK Nordost (Brandenburg)', value: 'AOK Nordost (Brandenburg)' },
  { label: 'AOK Nordost (Meckl.-Vorp.)', value: 'AOK Nordost (Meckl.-Vorp.)' },
  {
    label: 'AOK NordWest (Schlesw.-Holst.)',
    value: 'AOK NordWest (Schlesw.-Holst.)',
  },
  {
    label: 'AOK NordWest (Westf.-Lippe)',
    value: 'AOK NordWest (Westf.-Lippe)',
  },
  { label: 'AOK Plus (Sachsen)', value: 'AOK Plus (Sachsen)' },
  { label: 'AOK Plus (Thüringen)', value: 'AOK Plus (Thüringen)' },
  {
    label: 'AOK Rheinl.-Pf./Saarl.(Rh-Pf.)',
    value: 'AOK Rheinl.-Pf./Saarl.(Rh-Pf.)',
  },
  {
    label: 'AOK Rheinl.-Pf./Saarl.(Saarl.)',
    value: 'AOK Rheinl.-Pf./Saarl.(Saarl.)',
  },
  { label: 'AOK Rheinland/Hamburg', value: 'AOK Rheinland/Hamburg' },
  { label: 'AOK Sachsen-Anhalt', value: 'AOK Sachsen-Anhalt' },
  {
    label: 'Apotheker-Versorgung Berlin',
    value: 'Apotheker-Versorgung Berlin',
  },
  {
    label: 'Apothekerversorgung Meck-Pomm',
    value: 'Apothekerversorgung Meck-Pomm',
  },
  {
    label: 'Apothekerversorgung Nieders.',
    value: 'Apothekerversorgung Nieders.',
  },
  {
    label: 'ARAG Krankenversicherungs-Aktiengesellschaft',
    value: 'ARAG Krankenversicherungs-Aktiengesellschaft',
  },
  { label: 'Ärzteversorgung Berlin', value: 'Ärzteversorgung Berlin' },
  {
    label: 'Ärzteversorgung Land Brdbg.',
    value: 'Ärzteversorgung Land Brdbg.',
  },
  {
    label: 'Ärzteversorgung Niedersachsen',
    value: 'Ärzteversorgung Niedersachsen',
  },
  { label: 'Ärzteversorgung Nordrhein', value: 'Ärzteversorgung Nordrhein' },
  {
    label: 'Ärzteversorgung Sachsen-Anhalt',
    value: 'Ärzteversorgung Sachsen-Anhalt',
  },
  { label: 'atlas BKK ahlmann', value: 'atlas BKK ahlmann' },
  {
    label: 'Augenoptiker Ausgleichskasse VVaG (AKA)',
    value: 'Augenoptiker Ausgleichskasse VVaG (AKA)',
  },
  {
    label: 'AXA Krankenversicherung Aktiengesellschaft',
    value: 'AXA Krankenversicherung Aktiengesellschaft',
  },
  { label: 'BAHN BKK', value: 'BAHN BKK' },
  { label: 'BAHN BKK (NBL)', value: 'BAHN BKK (NBL)' },
  {
    label: 'Barmenia Krankenversicherung a.G.',
    value: 'Barmenia Krankenversicherung a.G.',
  },
  { label: 'BARMER', value: 'BARMER' },
  {
    label: 'BaWü Versorg.anst.Ärzte/ZÄ/TÄ',
    value: 'BaWü Versorg.anst.Ärzte/ZÄ/TÄ',
  },
  { label: 'Bay. Apothekerversorgung', value: 'Bay. Apothekerversorgung' },
  {
    label: 'Bayerische Apothekerversorgung',
    value: 'Bayerische Apothekerversorgung',
  },
  { label: 'Bayerische Ärzteversorgung', value: 'Bayerische Ärzteversorgung' },
  {
    label: 'Bayerische Beamtenkrankenkasse Aktiengesellschaft',
    value: 'Bayerische Beamtenkrankenkasse Aktiengesellschaft',
  },
  { label: 'Bertelsmann BKK', value: 'Bertelsmann BKK' },
  { label: 'Bertelsmann BKK (NBL)', value: 'Bertelsmann BKK (NBL)' },
  { label: 'BIG direkt gesund', value: 'BIG direkt gesund' },
  { label: 'BIG direkt gesund (NBL)', value: 'BIG direkt gesund (NBL)' },
  { label: 'BKK A.T.U. (NBL)', value: 'BKK A.T.U. (NBL)' },
  { label: 'BKK Achenbach Buschhütten', value: 'BKK Achenbach Buschhütten' },
  { label: 'BKK advita', value: 'BKK advita' },
  { label: 'BKK advita (NBL)', value: 'BKK advita (NBL)' },
  { label: 'BKK AESCULAP', value: 'BKK AESCULAP' },
  { label: 'BKK Akzo Nobel', value: 'BKK Akzo Nobel' },
  { label: 'BKK Audi', value: 'BKK Audi' },
  { label: 'BKK Audi (NBL)', value: 'BKK Audi (NBL)' },
  { label: 'BKK B. Braun Melsungen', value: 'BKK B. Braun Melsungen' },
  { label: 'BKK BENTELER AG', value: 'BKK BENTELER AG' },
  { label: 'BKK BMW AG', value: 'BKK BMW AG' },
  { label: 'BKK BMW-AG (NBL)', value: 'BKK BMW-AG (NBL)' },
  { label: 'BKK Bosch', value: 'BKK Bosch' },
  { label: 'BKK Bosch (NBL)', value: 'BKK Bosch (NBL)' },
  { label: 'BKK BPW Wiehl', value: 'BKK BPW Wiehl' },
  { label: 'BKK Brandenburgische', value: 'BKK Brandenburgische' },
  { label: 'BKK Braun-Gilette', value: 'BKK Braun-Gilette' },
  { label: 'BKK Continentale', value: 'BKK Continentale' },
  { label: 'BKK d. G.M. Pfaff AG', value: 'BKK d. G.M. Pfaff AG' },
  { label: 'BKK Debeka', value: 'BKK Debeka' },
  { label: 'BKK Debeka (NBL)', value: 'BKK Debeka (NBL)' },
  {
    label: 'BKK der MTU Friedrichshafen',
    value: 'BKK der MTU Friedrichshafen',
  },
  { label: 'BKK der SIEMAG', value: 'BKK der SIEMAG' },
  { label: 'BKK Deutsche Bank AG', value: 'BKK Deutsche Bank AG' },
  { label: 'BKK Deutsche Bank AG (NBL)', value: 'BKK Deutsche Bank AG (NBL)' },
  { label: 'BKK Diakonie', value: 'BKK Diakonie' },
  { label: 'BKK Diakonie NBL', value: 'BKK Diakonie NBL' },
  { label: 'BKK Die Bergische', value: 'BKK Die Bergische' },
  { label: 'BKK Dürkopp Adler', value: 'BKK Dürkopp Adler' },
  { label: 'BKK Ernst &amp; Young', value: 'BKK Ernst &amp; Young' },
  { label: 'BKK EUREGIO', value: 'BKK EUREGIO' },
  { label: 'BKK EWE', value: 'BKK EWE' },
  { label: 'BKK EWE (NBL)', value: 'BKK EWE (NBL)' },
  { label: 'BKK exklusiv', value: 'BKK exklusiv' },
  { label: 'BKK exklusiv (NBL)', value: 'BKK exklusiv (NBL)' },
  { label: 'BKK Faber-Castell', value: 'BKK Faber-Castell' },
  { label: 'BKK firmus', value: 'BKK firmus' },
  { label: 'BKK firmus (NBL)', value: 'BKK firmus (NBL)' },
  { label: 'BKK Freudenberg', value: 'BKK Freudenberg' },
  { label: 'BKK für Umwelt und Bauen', value: 'BKK für Umwelt und Bauen' },
  { label: 'BKK G&amp;V', value: 'BKK G&amp;V' },
  {
    label: 'BKK Gildemeister/Seidenst.(NBL',
    value: 'BKK Gildemeister/Seidenst.(NBL',
  },
  {
    label: 'BKK Gildemeister/Seidensticker',
    value: 'BKK Gildemeister/Seidensticker',
  },
  { label: 'BKK Grillo Werke', value: 'BKK Grillo Werke' },
  { label: 'BKK Groz-Beckert', value: 'BKK Groz-Beckert' },
  { label: 'BKK Hapag-Lloyd Bremen', value: 'BKK Hapag-Lloyd Bremen' },
  { label: 'BKK HEAG', value: 'BKK HEAG' },
  { label: 'BKK Henschel Plus', value: 'BKK Henschel Plus' },
  { label: 'BKK Herkules', value: 'BKK Herkules' },
  { label: 'BKK HMR', value: 'BKK HMR' },
  { label: 'BKK INOVITA', value: 'BKK INOVITA' },
  { label: 'BKK INOVITA (NBL)', value: 'BKK INOVITA (NBL)' },
  { label: 'BKK Karl Mayer GmbH', value: 'BKK Karl Mayer GmbH' },
  { label: 'BKK KBA', value: 'BKK KBA' },
  { label: 'BKK KBA (NBL)', value: 'BKK KBA (NBL)' },
  { label: 'BKK Knoll AG', value: 'BKK Knoll AG' },
  { label: 'BKK Linde', value: 'BKK Linde' },
  { label: 'BKK Linde (NBL)', value: 'BKK Linde (NBL)' },
  { label: 'BKK Logistik', value: 'BKK Logistik' },
  { label: 'BKK Logistik (NBL)', value: 'BKK Logistik (NBL)' },
  { label: 'BKK Mahle', value: 'BKK Mahle' },
  { label: 'BKK MEDICUS OST', value: 'BKK MEDICUS OST' },
  { label: 'BKK Melitta Plus', value: 'BKK Melitta Plus' },
  { label: 'BKK MEM', value: 'BKK MEM' },
  { label: 'BKK Merck', value: 'BKK Merck' },
  { label: 'BKK Metzinger', value: 'BKK Metzinger' },
  { label: 'BKK mhplus', value: 'BKK mhplus' },
  { label: 'BKK mhplus (NBL)', value: 'BKK mhplus (NBL)' },
  { label: 'BKK Mobil Oil', value: 'BKK Mobil Oil' },
  { label: 'BKK NOVITAS', value: 'BKK NOVITAS' },
  { label: 'BKK NOVITAS (NBL)', value: 'BKK NOVITAS (NBL)' },
  { label: 'BKK PFAFF', value: 'BKK PFAFF' },
  { label: 'BKK PFAFF (NBL)', value: 'BKK PFAFF (NBL)' },
  { label: 'BKK Pfalz', value: 'BKK Pfalz' },
  { label: 'BKK Pfalz (NBL)', value: 'BKK Pfalz (NBL)' },
  { label: 'BKK PREUSSAG Publik', value: 'BKK PREUSSAG Publik' },
  { label: 'BKK ProVita', value: 'BKK ProVita' },
  { label: 'BKK PWC Deutsche Revision', value: 'BKK PWC Deutsche Revision' },
  { label: 'BKK R+V', value: 'BKK R+V' },
  { label: 'BKK R+V (NBL)', value: 'BKK R+V (NBL)' },
  { label: 'BKK Rheinland', value: 'BKK Rheinland' },
  { label: 'BKK Rheinland (NBL)', value: 'BKK Rheinland (NBL)' },
  { label: 'BKK ruhrgas', value: 'BKK ruhrgas' },
  { label: 'BKK RWE', value: 'BKK RWE' },
  { label: 'BKK Salzgitter', value: 'BKK Salzgitter' },
  { label: 'BKK Salzgitter (NBL)', value: 'BKK Salzgitter (NBL)' },
  { label: 'BKK SBH', value: 'BKK SBH' },
  { label: 'BKK Scheufelen', value: 'BKK Scheufelen' },
  { label: 'BKK SKD', value: 'BKK SKD' },
  { label: 'BKK SKD (NBL)', value: 'BKK SKD (NBL)' },
  { label: 'BKK Stadt Augsburg', value: 'BKK Stadt Augsburg' },
  { label: 'BKK Stinnes', value: 'BKK Stinnes' },
  { label: 'BKK Südzucker', value: 'BKK Südzucker' },
  { label: 'BKK Südzucker (NBL)', value: 'BKK Südzucker (NBL)' },
  { label: 'BKK Technoform', value: 'BKK Technoform' },
  { label: 'BKK TUI', value: 'BKK TUI' },
  { label: 'BKK TUI (NBL)', value: 'BKK TUI (NBL)' },
  { label: 'BKK VDN', value: 'BKK VDN' },
  { label: 'BKK VDN (NBL)', value: 'BKK VDN (NBL)' },
  { label: 'BKK VerbundPlus', value: 'BKK VerbundPlus' },
  { label: 'BKK VerbundPlus (NBL)', value: 'BKK VerbundPlus (NBL)' },
  { label: 'BKK Verkehrsbau Union', value: 'BKK Verkehrsbau Union' },
  {
    label: 'BKK Verkehrsbau Union (NBL)',
    value: 'BKK Verkehrsbau Union (NBL)',
  },
  { label: 'BKK Vital', value: 'BKK Vital' },
  {
    label: 'BKK Voralb Heller*Leuze*Traub',
    value: 'BKK Voralb Heller*Leuze*Traub',
  },
  { label: 'BKK Werra-Meissner', value: 'BKK Werra-Meissner' },
  { label: 'BKK Wieland-Werke', value: 'BKK Wieland-Werke' },
  {
    label: 'BKK Wirtschaft&amp;Finanzen',
    value: 'BKK Wirtschaft&amp;Finanzen',
  },
  {
    label: 'BKK Wirtschaft&amp;Finanzen (NBL)',
    value: 'BKK Wirtschaft&amp;Finanzen (NBL)',
  },
  { label: 'BKK WMF', value: 'BKK WMF' },
  { label: 'BKK WMF (NBL)', value: 'BKK WMF (NBL)' },
  { label: 'BKK Würth', value: 'BKK Würth' },
  { label: 'BKK Würth (NBL)', value: 'BKK Würth (NBL)' },
  { label: 'BKK ZF &amp; Partner', value: 'BKK ZF &amp; Partner' },
  { label: 'BKK ZF &amp; Partner (NBL)', value: 'BKK ZF &amp; Partner (NBL)' },
  { label: 'BKK24', value: 'BKK24' },
  { label: 'BKK24 (NBL)', value: 'BKK24 (NBL)' },
  {
    label: 'Bundesknappsch.f.Ang. (WEST)',
    value: 'Bundesknappsch.f.Ang. (WEST)',
  },
  { label: 'Bundesknappschaft', value: 'Bundesknappschaft' },
  {
    label: 'Bundesknappschaft f. Minijobs',
    value: 'Bundesknappschaft f. Minijobs',
  },
  {
    label: 'Central Krankenversicherung Aktiengesellschaft',
    value: 'Central Krankenversicherung Aktiengesellschaft',
  },
  {
    label: 'Concordia Krankenversicherungs-Aktiengesellschaft',
    value: 'Concordia Krankenversicherungs-Aktiengesellschaft',
  },
  {
    label: 'Continentale Krankenversicherung a.G.',
    value: 'Continentale Krankenversicherung a.G.',
  },
  { label: 'Daimler BKK', value: 'Daimler BKK' },
  { label: 'Daimler BKK (NBL)', value: 'Daimler BKK (NBL)' },
  { label: 'DAK-Gesundheit', value: 'DAK-Gesundheit' },
  {
    label:
      'Debeka Krankenversicherungsverein auf Gegenseitigkeit Sitz Koblenz am Rhein',
    value:
      'Debeka Krankenversicherungsverein auf Gegenseitigkeit Sitz Koblenz am Rhein',
  },
  {
    label: 'DEUTSCHER RING Krankenversicherungsverein auf Gegenseitigkeit',
    value: 'DEUTSCHER RING Krankenversicherungsverein auf Gegenseitigkeit',
  },
  {
    label: 'DEVK Krankenversicherungs-Aktiengesellschaft',
    value: 'DEVK Krankenversicherungs-Aktiengesellschaft',
  },
  {
    label: 'DKV Deutsche Krankenversicherung Aktiengesellschaft',
    value: 'DKV Deutsche Krankenversicherung Aktiengesellschaft',
  },
  { label: 'energie-BKK', value: 'energie-BKK' },
  { label: 'energie-BKK (NBL)', value: 'energie-BKK (NBL)' },
  {
    label: 'ENVIVAS Krankenversicherung Aktiengesellschaft',
    value: 'ENVIVAS Krankenversicherung Aktiengesellschaft',
  },
  {
    label: 'ERGO Direkt Krankenversicherung Aktiengesellschaft',
    value: 'ERGO Direkt Krankenversicherung Aktiengesellschaft',
  },
  {
    label:
      'Freie Arzt- und Medizinkasse der Angehörigen der Berufsfeuerwehr und der Polizei VVaG',
    value:
      'Freie Arzt- und Medizinkasse der Angehörigen der Berufsfeuerwehr und der Polizei VVaG',
  },
  {
    label: 'Gothaer Krankenversicherung Aktiengesellschaft',
    value: 'Gothaer Krankenversicherung Aktiengesellschaft',
  },
  {
    label: 'HALLESCHE Krankenversicherung auf Gegenseitigkeit',
    value: 'HALLESCHE Krankenversicherung auf Gegenseitigkeit',
  },
  {
    label: 'HanseMerkur Krankenversicherung AG',
    value: 'HanseMerkur Krankenversicherung AG',
  },
  {
    label: 'HanseMerkur Krankenversicherung auf Gegenseitigkeit',
    value: 'HanseMerkur Krankenversicherung auf Gegenseitigkeit',
  },
  {
    label: 'HanseMerkur Speziale Krankenversicherung AG',
    value: 'HanseMerkur Speziale Krankenversicherung AG',
  },
  { label: 'Heimat Krankenkasse', value: 'Heimat Krankenkasse' },
  { label: 'Heimat Krankenkasse (NBL)', value: 'Heimat Krankenkasse (NBL)' },
  {
    label: 'HEK Hanseatische Krankenkasse',
    value: 'HEK Hanseatische Krankenkasse',
  },
  { label: 'HKK Handelskrankenkasse', value: 'HKK Handelskrankenkasse' },
  {
    label: 'HUK-COBURG-Krankenversicherung AG',
    value: 'HUK-COBURG-Krankenversicherung AG',
  },
  { label: 'IKK Brandenburg und Berlin', value: 'IKK Brandenburg und Berlin' },
  { label: 'IKK Braunschweig', value: 'IKK Braunschweig' },
  { label: 'IKK classic', value: 'IKK classic' },
  { label: 'IKK classic (NBL)', value: 'IKK classic (NBL)' },
  { label: 'IKK gesund plus', value: 'IKK gesund plus' },
  { label: 'IKK gesund plus (NBL)', value: 'IKK gesund plus (NBL)' },
  { label: 'IKK Nord', value: 'IKK Nord' },
  { label: 'IKK Nord (NBL)', value: 'IKK Nord (NBL)' },
  { label: 'IKK Südwest', value: 'IKK Südwest' },
  {
    label: 'INTER Krankenversicherung AG',
    value: 'INTER Krankenversicherung AG',
  },
  { label: 'ITSG Test-AOK BY - eVpT', value: 'ITSG Test-AOK BY - eVpT' },
  { label: 'ITSG Test-AOK NDS - eVpT', value: 'ITSG Test-AOK NDS - eVpT' },
  { label: 'ITSG Test-AOK NW - eVpT', value: 'ITSG Test-AOK NW - eVpT' },
  { label: 'ITSG Test-BEK - eVpT', value: 'ITSG Test-BEK - eVpT' },
  { label: 'ITSG Test-DAK - eVpT', value: 'ITSG Test-DAK - eVpT' },
  { label: 'ITSG Test-HKK - eVpT', value: 'ITSG Test-HKK - eVpT' },
  {
    label: 'ITSG Test-KBS MiniJob - eVpT',
    value: 'ITSG Test-KBS MiniJob - eVpT',
  },
  { label: 'ITSG Test-TK - eVpT', value: 'ITSG Test-TK - eVpT' },
  {
    label: 'KKH Kaufmännische Krankenkasse',
    value: 'KKH Kaufmännische Krankenkasse',
  },
  {
    label: 'Krankenunterstützungskasse der Berufsfeuerwehr Hannover',
    value: 'Krankenunterstützungskasse der Berufsfeuerwehr Hannover',
  },
  {
    label: 'Landeskrankenhilfe V.V.a.G.',
    value: 'Landeskrankenhilfe V.V.a.G.',
  },
  {
    label:
      'LIGA Krankenversicherung katholischer Priester Versicherungsverein auf Gegenseitigkeit Regensburg',
    value:
      'LIGA Krankenversicherung katholischer Priester Versicherungsverein auf Gegenseitigkeit Regensburg',
  },
  { label: 'LKK Niedersachsen-Bremen', value: 'LKK Niedersachsen-Bremen' },
  {
    label: 'Lohnfortzahlungskasse Aurich VVaG',
    value: 'Lohnfortzahlungskasse Aurich VVaG',
  },
  {
    label: 'Lohnfortzahlungskasse Leer VVaG',
    value: 'Lohnfortzahlungskasse Leer VVaG',
  },
  {
    label: 'LVM Krankenversicherungs-AG',
    value: 'LVM Krankenversicherungs-AG',
  },
  {
    label: 'Mannheimer Krankenversicherung Aktiengesellschaft',
    value: 'Mannheimer Krankenversicherung Aktiengesellschaft',
  },
  {
    label: 'Mecklenburgische Krankenversicherungs-Aktiengesellschaft',
    value: 'Mecklenburgische Krankenversicherungs-Aktiengesellschaft',
  },
  { label: 'Miele BKK', value: 'Miele BKK' },
  { label: 'Miele BKK (NBL)', value: 'Miele BKK (NBL)' },
  {
    label: 'MÜNCHENER VEREIN Krankenversicherung a.G.',
    value: 'MÜNCHENER VEREIN Krankenversicherung a.G.',
  },
  {
    label: 'Niedersächs.Versorgungsw.d. RA',
    value: 'Niedersächs.Versorgungsw.d. RA',
  },
  {
    label: 'NÜRNBERGER Krankenversicherung Aktiengesellschaft',
    value: 'NÜRNBERGER Krankenversicherung Aktiengesellschaft',
  },
  {
    label: 'PAX-FAMILIENFÜRSORGE Krankenversicherung AG',
    value: 'PAX-FAMILIENFÜRSORGE Krankenversicherung AG',
  },
  {
    label: 'praenatura Versicherungsverein auf Gegenseitigkeit (VVaG)',
    value: 'praenatura Versicherungsverein auf Gegenseitigkeit (VVaG)',
  },
  { label: 'pronova BKK', value: 'pronova BKK' },
  { label: 'pronova BKK (NBL)', value: 'pronova BKK (NBL)' },
  {
    label: 'Provinzial Krankenversicherung Hannover AG',
    value: 'Provinzial Krankenversicherung Hannover AG',
  },
  {
    label: 'R+V Krankenversicherung Aktiengesellschaft',
    value: 'R+V Krankenversicherung Aktiengesellschaft',
  },
  { label: 'Sächsische Ärzteversorgung', value: 'Sächsische Ärzteversorgung' },
  {
    label: 'Sächsische Landesapotkerkammer',
    value: 'Sächsische Landesapotkerkammer',
  },
  { label: 'Salus BKK', value: 'Salus BKK' },
  { label: 'Salus BKK (NBL)', value: 'Salus BKK (NBL)' },
  { label: 'Schwenninger BKK', value: 'Schwenninger BKK' },
  { label: 'Schwenninger BKK (NBL)', value: 'Schwenninger BKK (NBL)' },
  { label: 'SECURVITA BKK', value: 'SECURVITA BKK' },
  { label: 'SECURVITA BKK (NBL)', value: 'SECURVITA BKK (NBL)' },
  { label: 'See-Krankenkasse', value: 'See-Krankenkasse' },
  { label: 'Seekrankenkasse', value: 'Seekrankenkasse' },
  { label: 'Siemens BKK (NBL)', value: 'Siemens BKK (NBL)' },
  { label: 'Siemens BKK (SBK)', value: 'Siemens BKK (SBK)' },
  {
    label: 'SIGNAL Krankenversicherung a.G.',
    value: 'SIGNAL Krankenversicherung a.G.',
  },
  {
    label: 'SONO Krankenversicherung a.G.',
    value: 'SONO Krankenversicherung a.G.',
  },
  {
    label:
      'St. Martinus Priesterverein d. Diözese Rottenburg-…d Sterbekasse-(KSK) Vers.Verein auf Gegenseitigk.',
    value:
      'St. Martinus Priesterverein d. Diözese Rottenburg-…d Sterbekasse-(KSK) Vers.Verein auf Gegenseitigk.',
  },
  {
    label: 'Steuerberatervers. Brandenburg',
    value: 'Steuerberatervers. Brandenburg',
  },
  { label: 'Steuerberatervers.Nieders.', value: 'Steuerberatervers.Nieders.' },
  {
    label: 'Süddeutsche Krankenversicherung a.G.',
    value: 'Süddeutsche Krankenversicherung a.G.',
  },
  { label: 'TBK Thüringer BKK', value: 'TBK Thüringer BKK' },
  { label: 'TBK Thüringer BKK (NBL)', value: 'TBK Thüringer BKK (NBL)' },
  {
    label: 'Techniker Krankenkasse (TK)',
    value: 'Techniker Krankenkasse (TK)',
  },
  { label: 'Tierärztekammer Nordrhein', value: 'Tierärztekammer Nordrhein' },
  {
    label: 'Tierärztevers.Niedersachsen',
    value: 'Tierärztevers.Niedersachsen',
  },
  {
    label: 'Tierärzteversorgung Meckl./V.',
    value: 'Tierärzteversorgung Meckl./V.',
  },
  {
    label: 'UNION KRANKENVERSICHERUNG AKTIENGESELLSCHAFT',
    value: 'UNION KRANKENVERSICHERUNG AKTIENGESELLSCHAFT',
  },
  {
    label: 'uniVersa Krankenversicherung a.G.',
    value: 'uniVersa Krankenversicherung a.G.',
  },
  {
    label: 'Versorgungsw. Zahnärztek. Hamb',
    value: 'Versorgungsw. Zahnärztek. Hamb',
  },
  {
    label: 'Versorgungswerk der Apoth.Hessen',
    value: 'Versorgungswerk der Apoth.Hessen',
  },
  {
    label: 'Versorgungswerk der Apoth.NRW',
    value: 'Versorgungswerk der Apoth.NRW',
  },
  {
    label: 'Versorgungswerk der Apoth.Schlesw.H',
    value: 'Versorgungswerk der Apoth.Schlesw.H',
  },
  {
    label: 'Versorgungswerk der Apoth.Westf/Lip',
    value: 'Versorgungswerk der Apoth.Westf/Lip',
  },
  {
    label: 'Versorgungswerk der Arch.Bayern',
    value: 'Versorgungswerk der Arch.Bayern',
  },
  {
    label: 'Versorgungswerk der Arch.Berlin',
    value: 'Versorgungswerk der Arch.Berlin',
  },
  {
    label: 'Versorgungswerk der Arch.NRW',
    value: 'Versorgungswerk der Arch.NRW',
  },
  {
    label: 'Versorgungswerk der Arch.Sachsen',
    value: 'Versorgungswerk der Arch.Sachsen',
  },
  {
    label: 'Versorgungswerk der Arch.Stuttgart',
    value: 'Versorgungswerk der Arch.Stuttgart',
  },
  {
    label: 'Versorgungswerk der Ärztekammer HH',
    value: 'Versorgungswerk der Ärztekammer HH',
  },
  {
    label: 'Versorgungswerk der LÄK Hessen',
    value: 'Versorgungswerk der LÄK Hessen',
  },
  {
    label: 'Versorgungswerk der RA Baden-Wuert.',
    value: 'Versorgungswerk der RA Baden-Wuert.',
  },
  {
    label: 'Versorgungswerk der RA Bayern',
    value: 'Versorgungswerk der RA Bayern',
  },
  {
    label: 'Versorgungswerk der RA Berlin',
    value: 'Versorgungswerk der RA Berlin',
  },
  {
    label: 'Versorgungswerk der RA Brandenbg.',
    value: 'Versorgungswerk der RA Brandenbg.',
  },
  {
    label: 'Versorgungswerk der RA Hamburg',
    value: 'Versorgungswerk der RA Hamburg',
  },
  {
    label: 'Versorgungswerk der RA Hessen',
    value: 'Versorgungswerk der RA Hessen',
  },
  {
    label: 'Versorgungswerk der RA Mecklenbg-V.',
    value: 'Versorgungswerk der RA Mecklenbg-V.',
  },
  { label: 'Versorgungswerk der RA NRW', value: 'Versorgungswerk der RA NRW' },
  {
    label: 'Versorgungswerk der RA Saarland',
    value: 'Versorgungswerk der RA Saarland',
  },
  {
    label: 'Versorgungswerk der StB Sachsen',
    value: 'Versorgungswerk der StB Sachsen',
  },
  {
    label: 'Versorgungswerk der StB Sachsen-Anh',
    value: 'Versorgungswerk der StB Sachsen-Anh',
  },
  {
    label: 'Versorgungswerk der Tierärztek.Münster',
    value: 'Versorgungswerk der Tierärztek.Münster',
  },
  {
    label: 'Versorgungswerk der ZÄK Berlin',
    value: 'Versorgungswerk der ZÄK Berlin',
  },
  {
    label: 'Versorgungswerk WP u. BP NRW',
    value: 'Versorgungswerk WP u. BP NRW',
  },
  { label: 'Viactiv', value: 'Viactiv' },
  {
    label: 'vigo Krankenversicherung VVaG',
    value: 'vigo Krankenversicherung VVaG',
  },
  {
    label: 'Württembergische Krankenversicherung Aktiengesellschaft',
    value: 'Württembergische Krankenversicherung Aktiengesellschaft',
  },
];

export const Religion: IReactSelectInterface[] = [
  { value: ' Evangelical Church (EKD)', label: 'Evangelical Church (EKD)' },
  {
    value: 'Freely Religious Communities',
    label: 'Freely religious communities',
  },
  { value: 'Jewish Communities', label: 'Jewish Communities' },
  {
    value: 'Catholic Bishopric Germany of the old Catholics in Germany',
    label: 'Catholic bishopric of the old Catholics in Germany',
  },
  { value: 'Others Without', label: 'Others without' },
  { value: ' Roman Catholic Church', label: ' Roman Catholic church' },
  {
    value: ' Unitarian Religious Community Free Protestants',
    label: ' Unitarian Religious Community Free Protestants',
  },
];

export const Preoccupation: IReactSelectInterface[] = [
  { value: 'Other Sideline Activities', label: 'Other sideline activities' },
  { value: 'Officials', label: 'Officials' },
  { value: 'Blockwise TIMyoCE', label: 'Blockwise TIMyoCE' },
  {
    value: 'Permanently Employed TIMyoCE',
    label: 'Permanently employed TIMyoCE',
  },
  { value: 'Pensioner', label: 'Pensioner' },
  { value: 'Pupil Student', label: 'Pupil student' },
  { value: 'Self-employed/Freelance', label: 'Self-employed/Freelance' },
  {
    value: 'Fully Employed In Other Company',
    label: 'Full time in another company',
  },
];

export const NightAllowancePerHour: IReactSelectInterface[] = [
  { value: "From 22 o'clock", label: "From 22 o'clock" },
  { value: 'From 8 p.m.', label: 'From 8 p.m.' },
  { value: 'From 8:45 p.m.', label: 'From 8:45 p.m.' },
  { value: 'From 9 p.m', label: 'From 9 p.m.' },
];

export const Priority: IReactSelectInterface[] = [
  { value: 'low', label: languageTranslation('LOW') },
  { value: 'normal', label: languageTranslation('NORMAL') },
  { value: 'high', label: languageTranslation('HIGH') },
];

export const TodoFilter: IReactSelectInterface[] = [
  { value: 'pending', label: languageTranslation('HIDE_DONE') },
  { value: 'completed', label: languageTranslation('HIDE_FUTURE_ONES') },
];

export const Without_Appointments: IReactSelectInterface[] = [
  {
    value: 'Show with appointment',
    label: languageTranslation('SHOW_APPOINTMENT'),
  },
  {
    value: 'Show without appointment',
    label: languageTranslation('SHOW_WITHOUT_APPOINTMENT'),
  },
  { value: 'Show All', label: languageTranslation('SHOW_ALL') },
];

export const TodoStatus: IReactSelectInterface[] = [
  { value: 'all', label: languageTranslation('ALL') },
  { value: 'pending', label: languageTranslation('PENDING') },
  { value: 'completed', label: languageTranslation('COMPLETED') },
];

export const TodoDateFilter: IReactSelectInterface[] = [
  { value: 'future', label: languageTranslation('FUTURE') },
  { value: 'past', label: languageTranslation('OPEN') },
];

export const SortOptions: IReactSelectInterface[] = [
  {
    label: languageTranslation('SORTBY_OPTION3'),
    value: '3',
  },
  {
    label: languageTranslation('SORTBY_OPTION4'),
    value: '4',
  },
  {
    label: languageTranslation('SORTBY_OPTION1'),
    value: '1',
  },
  {
    label: languageTranslation('SORTBY_OPTION2'),
    value: '2',
  },
];

export const StatusOptions: IReactSelectInterface[] = [
  {
    label: languageTranslation('ACTIVE'),
    value: 'true',
  },
  {
    label: languageTranslation('DISABLE'),
    value: 'false',
  },
];

export const LeasingPriceList: IReactSelectInterface[] = [
  {
    label: 'Default caregiver',
    value: 'Default caregiver',
  },
  {
    label: 'Permanent worker 12,5',
    value: 'Permanent worker 12,5',
  },
  {
    label: 'Permanent worker 14,5',
    value: 'Permanent worker 14,5',
  },
  {
    label: 'Permanent worker 20,0',
    value: 'Permanent worker 20,0',
  },
  {
    label: 'Permanent worker 23,5',
    value: 'Permanent worker 23,5',
  },
  {
    label: 'Permanent worker 25,0',
    value: 'Permanent worker 25,0',
  },
  {
    label: 'Permanent worker 26,0',
    value: 'Permanent worker 26,0',
  },
  {
    label: 'Permanent worker 27,0',
    value: 'Permanent worker 27,0',
  },
];

export const CareInstLeasingPriceList: IReactSelectInterface[] = [
  {
    label: 'Facility 22,5',
    value: 'Facility 22,5',
  },
  {
    label: 'Facility 23,5',
    value: 'Facility 23,5',
  },
  {
    label: 'Facility 25,5',
    value: 'Facility 25,5',
  },
];

export const Nationality: IReactSelectInterface[] = [
  { value: 'Albanien', label: 'Albanien' },
  { value: 'Belgien', label: 'Belgien' },
  { value: 'Bosnien und Herzegowina', label: 'Bosnien und Herzegowina' },
  { value: 'Bulgarien', label: 'Bulgarien' },
  { value: 'Dänemark', label: 'Dänemark' },
  { value: 'Deutschland', label: 'Deutschland' },
  { value: 'Estland', label: 'Estland' },
  { value: 'Finnland', label: 'Finnland' },
  { value: 'Frankreich', label: 'Frankreich' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Griechenland', label: 'Griechenland' },
  { value: 'Großbritannien', label: 'Großbritannien' },
  { value: 'Guinea', label: 'Guinea' },
  { value: 'Irland', label: 'Irland' },
  { value: 'Island', label: 'Island' },
  { value: 'Israel', label: 'Israel' },
  { value: 'Italien', label: 'Italien' },
  { value: 'Kamerun', label: 'Kamerun' },
  { value: 'Kasachstan', label: 'Kasachstan' },
  { value: 'Kenia', label: 'Kenia' },
  { value: 'Kroatien', label: 'Kroatien' },
  { value: 'Kuba', label: 'Kuba' },
  { value: 'Lettland', label: 'Lettland' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Litauen', label: 'Litauen' },
  { value: 'Luxemburg', label: 'Luxemburg' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Mazedonien', label: 'Mazedonien' },
  { value: 'Moldawien', label: 'Moldawien' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Montenegro', label: 'Montenegro' },
  { value: 'Mosambik', label: 'Mosambik' },
  { value: 'Niederlande', label: 'Niederlande' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Norwegen', label: 'Norwegen' },
  { value: 'Österreich', label: 'Österreich' },
  { value: 'Papua-Neuguinea', label: 'Papua-Neuguinea' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Philippinen', label: 'Philippinen' },
  { value: 'Polen', label: 'Polen' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Rumänien', label: 'Rumänien' },
  { value: 'Rußland', label: 'Rußland' },
  { value: 'Russland', label: 'Russland' },
  { value: 'San Marino', label: 'San Marino' },
  { value: 'Schweden', label: 'Schweden' },
  { value: 'Schweiz', label: 'Schweiz' },
  { value: 'Serbien', label: 'Serbien' },
  { value: 'Slowakei', label: 'Slowakei' },
  { value: 'Slowenien', label: 'Slowenien' },
  { value: 'Spanien', label: 'Spanien' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Syrien', label: 'Syrien' },
  { value: 'Tschechien', label: 'Tschechien' },
  { value: 'Türkei', label: 'Türkei' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'Ungarn', label: 'Ungarn' },
  { value: 'ungeklärt/staatenlos', label: 'ungeklärt/staatenlos' },
  { value: 'USA', label: 'USA' },
];

export const EmailMenusTab: Array<{ name: string; icon: string }> = [
  { name: 'Inbox', icon: 'fa fa-inbox' },
  { name: 'Sent', icon: 'fa fa-send' },
  { name: 'New Email', icon: 'fa fa-edit' },
];
export const DocumentTypes: IReactSelectInterface[] = [
  {
    value: 'Registration professional association',
    label: 'Registration professional association',
  },
  { value: 'Registration health office', label: 'Registration health office' },
  {
    value: 'Medical certificate / health certificate',
    label: 'Medical certificate / health certificate',
  },
  {
    value: 'Exemption from pension insurance',
    label: 'Exemption from pension insurance',
  },
  {
    value: 'Professional liability insurance (no application)',
    label: 'Professional liability insurance (no application)',
  },
  // { value: 'Various documents', label: 'Various documents' },
  { value: 'First-aid pass', label: 'First-aid pass' },
  { value: 'Driving license car', label: 'Driving license car' },
  { value: 'Business registration', label: 'Business registration' },
  { value: 'CV / Vita', label: 'CV / Vita' },
  {
    value: 'Proof of employees subject to social security contributions',
    label: 'Proof of employees subject to social security contributions',
  },
  {
    value: 'User agreement (all 5 pages)',
    label: 'User agreement (all 5 pages)',
  },
  {
    value: 'Criminal record certificate',
    label: 'Criminal record certificate',
  },
  {
    value: 'Police certificate of good conduct, expanded',
    label: 'Police certificate of good conduct, expanded',
  },
  {
    value: 'Framework contract for fixed-term contracts',
    label: 'Framework contract for fixed-term contracts',
  },
  { value: 'Governance agreement', label: 'Governance agreement' },
  { value: 'Pension Insurance', label: 'Pension Insurance' },
  {
    value: 'Certificate / diploma / exam',
    label: 'Certificate / diploma / exam',
  },
];

export const AcceptedDocumentFile = [
  'image/jpg',
  'image/png',
  'image/jpeg',
  '.pdf',
  'application/pdf',
];
export const maxFileSize1MB = 1048576;
export const maxFileSize10MB = 10485760;
export const sortFilter: IObjectType = {
  3: 'name',
  4: 'name-desc',
  2: 'oldest',
  1: 'newest',
};

export const AcceptedFileFormat = [
  'application/pdf',
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
export const ShiftTime: IReactSelectInterface[] = [
  {
    value: '06 - 2PM Early',
    label: '06- 2PM Early',
  },
  {
    value: '2PM - 10PM Late',
    label: '2PM - 10PM Late',
  },
  { value: '10PM - 6AM Night', label: '10PM - 6AM Night' },
];

export const deactivatedListColor: string = '#cacaca';
export const leasingListColor: string = '#f7d158';
export const selfEmployesListColor: string = '#ebebff';
