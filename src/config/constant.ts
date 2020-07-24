import {
  IReactSelectInterface,
  IObjectType,
  IMatchingColorInterface,
} from '../interfaces';
import { languageTranslation } from '../helpers';
import { maskArray } from 'react-text-mask';
export const taxNumberLimit: number = 11;
export const taxBracket: number = 100;
export const ssn: number = 12;
export const userNameReplaceRegex: RegExp = /[`~!@#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi;
export const PAGE_LIMIT: number = 10;
export const TODO_PAGE_LIMIT: number = 14;
export const ARCHIVE_PAGE_LIMIT: number = 20;
export const ASYNC_LIST_LIMIT: number = 50;
export const defaultDateTimeFormatForDashboard: any = "DD.MM.YYYY HH:mm";
export const appointmentDayFormat: string = "dd";
export const appointmentDateFormat: string = "DD";
export const appointmentMonthFormat: string = "MMMM";
export const appointmentYearFormat: string = "YYYY";
export const defaultDateTimeFormat: any = "DD.MM.YYYY HH:mm:ss";
export const defaultDateFormat: any = "DD.MM.YYYY";
export const dbAcceptableFormat: any = "YYYY-MM-DD";
export const dateFormat: any = "MMM, Do YYYY";
export const regSinceDate: any = "DD.MM.YYYY";

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
export const holidayCommission: number = 1.0;
export const weekendCommission: number = 0.5;
export const nightCommission: number = 0.2;
export const nightCommissionTim: number = 0.25;

export const TimeMask: maskArray = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

export const DateTimeMask: any = [
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
  '/',
  /[0-2]/,
  /[0-9]/,
  ':',
  /[0-5]/,
  /[0-9]/,
];
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


export const CaregiverInvoiceTax: IReactSelectInterface[] = [
  { value: '0', label: `0% ${languageTranslation('TAX')}` },
  { value: '16', label: `16% ${languageTranslation('TAX')}` },
  { value: '19',label: `19% ${languageTranslation('TAX')}`},
];

export const PlycocoInvoiceTax: IReactSelectInterface[] = [
  { value: '0', label: `0% ${languageTranslation('TAX')}` },
  { value: '16', label: `16% ${languageTranslation('TAX')}` },
  { value: '19',label: `19% ${languageTranslation('TAX')}`},
];

export const LeasingInvoiceTax: IReactSelectInterface[] = [
  { value: '0', label: `0% ${languageTranslation('TAX')}` },
  { value: '16', label: `16% ${languageTranslation('TAX')}` },
  { value: '19',label: `19% ${languageTranslation('TAX')}`},
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
  { value: 'workingProof', label: 'Working Proof' },
  { value: 'sickNote', label: 'Sick Note' },
];
export const Gender: IReactSelectInterface[] = [
  {
    value: languageTranslation('MALE'),
    label: languageTranslation('MALE'),
  },
  {
    value: languageTranslation('FEMALE'),
    label: languageTranslation('FEMALE'),
  },
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
  { value: 1, label: '1 Day' },
  { value: 2, label: '2 Days' },
  { value: 3, label: '3 Days' },
  { value: 5, label: '5 Days' },
  { value: 7, label: '7 Days' },
  { value: 14, label: '14 Days' },
  { value: 31, label: '31 Days' },
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
    value: 'MarriedPermanentlySeparated',
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
  { label: languageTranslation('ACTIMONDA_BKK'), value: 'actimonda BKK' },
  { label: languageTranslation('ACTIMONDA_BKK_(NBL)'), value: 'actimonda BKK (NBL)' },
  {
    label: languageTranslation('AKA_AUGENOPTIKER_AUSGL.kASSE'),
    value: 'AKA Augenoptiker Ausgl.kasse',
  },
  {
    label: languageTranslation('ALLIANZ_PRIVATE_KRANKENVERSICHERUNGS'),
    value: 'Allianz Private Krankenversicherungs-Aktiengesellschaft',
  },
  {
    label: languageTranslation('ALTE_OLDENBURGER_KRANKENVERSICHERUNGS_AG'),
    value: 'ALTE OLDENBURGER Krankenversicherung AG',
  },
  {
    label:
    languageTranslation('ALTE_OLDENBURGER_Krankenversicherung_von_1927_Versicherungsverein'),
    value:
      'ALTE OLDENBURGER Krankenversicherung von 1927 Versicherungsverein auf Gegenseitigkeit',
  },
  {
    label: languageTranslation('AOK_BADEN-WTBG./NECKAR-FILS'),
    value: 'AOK Baden-Wtbg./Neckar-Fils',
  },
  { label: languageTranslation('AOK_BADEN-Württemberg'), value: 'AOK Baden-Württemberg' },
  { label: languageTranslation('AOK_BADEN'), value: 'AOK Bayern' },
  { label: languageTranslation('AOK_BREMEN/BREMEHAVEN'), value: 'AOK Bremen/Bremerhaven' },
  { label: languageTranslation('AOK_HESSEN'), value: 'AOK Hessen' },
  { label: languageTranslation('AOK_NIEDERSACHSEN'), value: 'AOK Niedersachsen' },
  { label: languageTranslation('AOK_NIENBURG/WESER'), value: 'AOK Nienburg/Weser' },
  { label: languageTranslation('AOK_NORDOST(Berlin)'), value: 'AOK Nordost (Berlin)' },
  { label: languageTranslation('AOK_NORDOST(Brandenburg)'), value: 'AOK Nordost (Brandenburg)' },
  { label: languageTranslation('AOK_NORDOST(Meckl.-Vorp.)'), value: 'AOK Nordost (Meckl.-Vorp.)' },
  {
    label: languageTranslation('AOK_NORDWEST(Schlesw.-Holst.)'),
    value: 'AOK NordWest (Schlesw.-Holst.)',
  },
  {
    label: languageTranslation('AOK_NORDWEST(Westf.-Lippe)'),
    value: 'AOK NordWest (Westf.-Lippe)',
  },
  { label: languageTranslation('AOK_PLUS(Sachsen)'), value: 'AOK Plus (Sachsen)' },
  { label: languageTranslation('AOK_PLUS(Thüringen)'), value: 'AOK Plus (Thüringen)' },
  {
    label: languageTranslation('AOK_RHEINL.-Pf./Saarl.(Rh-Pf.)'),
    value: 'AOK Rheinl.-Pf./Saarl.(Rh-Pf.)',
  },
  {
    label: languageTranslation('AOK_RHEINL.-Pf./Saarl.(Saarl.)'),
    value: 'AOK Rheinl.-Pf./Saarl.(Saarl.)',
  },
  { label: languageTranslation('AOK_RHEINLAND/HAMBURG'), value: 'AOK Rheinland/Hamburg' },
  { label: languageTranslation('AOK_SACHSEN-ANHALT'), value: 'AOK Sachsen-Anhalt' },
  {
    label: languageTranslation('APOTHEKER-VERSORGUNG_BERLIN'),
    value: 'Apotheker-Versorgung Berlin',
  },
  {
    label: languageTranslation('APOTHEKERVERSORGUNG_MECK-POMM'),
    value: 'Apothekerversorgung Meck-Pomm',
  },
  {
    label: languageTranslation('APOTHEKERVERSORGUNG_NIEDERS'),
    value: 'Apothekerversorgung Nieders.',
  },
  {
    label: languageTranslation('ARAG_KRANKENVERSICHERUNGS-AKTIENGESELLSCHAFT'),
    value: 'ARAG Krankenversicherungs-Aktiengesellschaft',
  },
  { label: languageTranslation('ÄRZTEVERSORGUNG_BERLIN'), value: 'Ärzteversorgung Berlin' },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_LAND_BRDBG'),
    value: 'Ärzteversorgung Land Brdbg.',
  },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_NIEDERSACHSEN'),
    value: 'Ärzteversorgung Niedersachsen',
  },
  { label: languageTranslation('ÄRZTEVERSORGUNG_NORDRHEIN'), value: 'Ärzteversorgung Nordrhein' },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_SACHSEN-ANHALT'),
    value: 'Ärzteversorgung Sachsen-Anhalt',
  },
  { label: languageTranslation('ATLAS_BKK_AHLMANN'), value: 'atlas BKK ahlmann' },
  {
    label: languageTranslation('AUGENOPTIKER_AUSGLEICHSKASSE_VVAG(AKA)'),
    value: 'Augenoptiker Ausgleichskasse VVaG (AKA)',
  },
  {
    label: languageTranslation('AXA_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'AXA Krankenversicherung Aktiengesellschaft',
  },
  { label: languageTranslation('BAHN_BKK'), value: 'BAHN BKK' },
  { label: 'BAHN BKK (NBL)', value: 'BAHN BKK (NBL)' },
  {
    label: languageTranslation('Barmenia_KRANKENVERSICHERUNG_A.G.'),
    value: 'Barmenia Krankenversicherung a.G.',
  },
  { label: languageTranslation('BARMER'), value: 'BARMER' },
  {
    label: languageTranslation('BaWü_Versorg.anst.Ärzte/ZÄ/TÄ'),
    value: 'BaWü Versorg.anst.Ärzte/ZÄ/TÄ',
  },
  { label: languageTranslation('BAY_APOTHEKERVERSORGUNG'), value: 'Bay. Apothekerversorgung' },
  {
    label: languageTranslation('BAYERISCHE_APOTHEKERVERSORGUNG'),
    value: 'Bayerische Apothekerversorgung',
  },
  { label: languageTranslation('BAYERISCHE_ÄRZTEVERSORGUNG'), value: 'Bayerische Ärzteversorgung' },
  {
    label: languageTranslation('BAYERISCHE_BEATENKRANKENKASSE_AKTIENGESELLCHAFT'),
    value: 'Bayerische Beamtenkrankenkasse Aktiengesellschaft',
  },
  { label: languageTranslation('BERTELSMANN_BKK'), value: 'Bertelsmann BKK' },
  { label: languageTranslation('BERTELSMANN_BKK(NBL)'), value: 'Bertelsmann BKK (NBL)' },
  { label: languageTranslation('BIG_DIREKT_GESUND'), value: 'BIG direkt gesund' },
  { label: languageTranslation('BIG_DIREKT_GESUND(NBL)'), value: 'BIG direkt gesund (NBL)' },
  { label: languageTranslation('BKK_A.T.U._(NBL)'), value: 'BKK A.T.U. (NBL)' },
  { label: languageTranslation('BKK_ACHENBACH_Buschhütten'), value: 'BKK Achenbach Buschhütten' },
  { label: languageTranslation('BKK_ADVITA'), value: 'BKK advita' },
  { label: languageTranslation('BKK_ADVITA(NBL)'), value: 'BKK advita (NBL)' },
  { label: languageTranslation('BKK_AESCULAP'), value: 'BKK AESCULAP' },
  { label: languageTranslation('BKK_AKZO_NOBEL'), value: 'BKK Akzo Nobel' },
  { label: languageTranslation('BKK_AUDI'), value: 'BKK Audi' },
  { label: languageTranslation('BKK_AUDI(NBL)'), value: 'BKK Audi (NBL)' },
  { label: languageTranslation('BKK_B.BRAUN_MELSUNGEN'), value: 'BKK B. Braun Melsungen' },
  { label: languageTranslation('BKK_BENTELER_AG'), value: 'BKK BENTELER AG' },
  { label: languageTranslation('BKK_BMW_AG'), value: 'BKK BMW AG' },
  { label: languageTranslation('BKK_BMW-AG(NBL)'), value: 'BKK BMW-AG (NBL)' },
  { label: languageTranslation('BKK_BOSCH'), value: 'BKK Bosch' },
  { label: languageTranslation('BKK_BOSCH(NBL)'), value: 'BKK Bosch (NBL)' },
  { label: languageTranslation('BKK_BPW_WIEHL'), value: 'BKK BPW Wiehl' },
  { label: languageTranslation('BKK_BRANDENBURGISCHE'), value: 'BKK Brandenburgische' },
  { label: languageTranslation('BKK_BRAUN-GILETTE'), value: 'BKK Braun-Gilette' },
  { label: languageTranslation('BKK_CONTINENTALE'), value: 'BKK Continentale' },
  { label: languageTranslation('BKK_D.G.M._PFAFF_AG'), value: 'BKK d. G.M. Pfaff AG' },
  { label: languageTranslation('BKK_DEBEKA'), value: 'BKK Debeka' },
  { label: languageTranslation('BKK_DEBEKA(NBL)'), value: 'BKK Debeka (NBL)' },
  {
    label: languageTranslation('BKK_DER_MTU_Friedrichshafen'),
    value: 'BKK der MTU Friedrichshafen',
  },
  { label: languageTranslation('BKK_DER_SIEMAG'), value: 'BKK der SIEMAG' },
  { label: languageTranslation('BKK_DEUSTSCHE_BANK_AG'), value: 'BKK Deutsche Bank AG' },
  { label: languageTranslation('BKK_DEUSTSCHE_BANK_AG(NBL)'), value: 'BKK Deutsche Bank AG (NBL)' },
  { label: languageTranslation('BKK_DIAKONIE'), value: 'BKK Diakonie' },
  { label: languageTranslation('BKK_DIAKONIE_NBL'), value: 'BKK Diakonie NBL' },
  { label: languageTranslation('BKK_DIE_BERGISCHE'), value: 'BKK Die Bergische' },
  { label: languageTranslation('BKK_Dürkopp_ADLER'), value: 'BKK Dürkopp Adler' },
  { label: languageTranslation('BKK_ERNST_YOUNG'), value: 'BKK Ernst &amp; Young' },
  { label: languageTranslation('BKK_EUREGIO'), value: 'BKK EUREGIO' },
  { label: languageTranslation('BKK_EWE'), value: 'BKK EWE' },
  { label: languageTranslation('BKK_EWE(NBL)'), value: 'BKK EWE (NBL)' },
  { label: languageTranslation('BKK_EXKLUSIVE'), value: 'BKK exklusiv' },
  { label: languageTranslation('BKK_EXKLUSIVE(NBL)'), value: 'BKK exklusiv (NBL)' },
  { label: languageTranslation('BKK_FABER-CASTELL'), value: 'BKK Faber-Castell' },
  { label: languageTranslation('BKK_FIRMUS'), value: 'BKK firmus' },
  { label: languageTranslation('BKK_FIRMUS(NBL)'), value: 'BKK firmus (NBL)' },
  { label: languageTranslation('BKK_FREUDENBERG'), value: 'BKK Freudenberg' },
  { label: languageTranslation('BKK_für_UMWELT_UND_BAUEN'), value: 'BKK für Umwelt und Bauen' },
  { label: languageTranslation('BKK_G&amp;V'), value: 'BKK G&amp;V' },
  {
    label: languageTranslation('BKK_GILDEMEISTER/SEIDENST.(NBL)'),
    value: 'BKK Gildemeister/Seidenst.(NBL)',
  },
  {
    label: languageTranslation('BKK_GILDEMEISTER/SEIDENSTICKER'),
    value: 'BKK Gildemeister/Seidensticker',
  },
  { label: languageTranslation('BKK_GRILLO_WERKE'), value: 'BKK Grillo Werke' },
  { label: languageTranslation('BKK_GROZ-BECKERT'), value: 'BKK Groz-Beckert' },
  { label: languageTranslation('BKK_HAPAG-LLOYD_BREMEN'), value: 'BKK Hapag-Lloyd Bremen' },
  { label: languageTranslation('BKK_HEAG'), value: 'BKK HEAG' },
  { label: languageTranslation('BKK_HENSCHEL_PLUS'), value: 'BKK Henschel Plus' },
  { label: languageTranslation('BKK_HERKULES'), value: 'BKK Herkules' },
  { label: languageTranslation('BKK_HMR'), value: 'BKK HMR' },
  { label: languageTranslation('BKK_INOVITA'), value: 'BKK INOVITA' },
  { label: languageTranslation('BKK_INOVITA(NBL)'), value: 'BKK INOVITA (NBL)' },
  { label: languageTranslation('BKK_KARL_MAYER_GmbH'), value: 'BKK Karl Mayer GmbH' },
  { label: languageTranslation('BKK_KBA'), value: 'BKK KBA' },
  { label: languageTranslation('BKK_KBA(NBL)'), value: 'BKK KBA (NBL)' },
  { label: languageTranslation('BKK_KNOLL_AG'), value: 'BKK Knoll AG' },
  { label: languageTranslation('BKK_LINDE'), value: 'BKK Linde' },
  { label: languageTranslation('BKK_LINDE(NBL)'), value: 'BKK Linde (NBL)' },
  { label: languageTranslation('BKK_LOGISTIK'), value: 'BKK Logistik' },
  { label: languageTranslation('BKK_LOGISTIK(NBL)'), value: 'BKK Logistik (NBL)' },
  { label: languageTranslation('BKK_MAHLE'), value: 'BKK Mahle' },
  { label: languageTranslation('BKK_MEDICUS_OST'), value: 'BKK MEDICUS OST' },
  { label: languageTranslation('BKK_MELITTA_PLUS'), value: 'BKK Melitta Plus' },
  { label: languageTranslation('BKK_MEM'), value: 'BKK MEM' },
  { label: languageTranslation('BKK_MERCK'), value: 'BKK Merck' },
  { label: languageTranslation('BKK_METZINGER'), value: 'BKK Metzinger' },
  { label: languageTranslation('BKK_MHPLUS'), value: 'BKK mhplus' },
  { label: languageTranslation('BKK_MHPLUS(NBL)'), value: 'BKK mhplus (NBL)' },
  { label: languageTranslation('BKK_MOBIL_OIL'), value: 'BKK Mobil Oil' },
  { label: languageTranslation('BKK_NOVITAS'), value: 'BKK NOVITAS' },
  { label: languageTranslation('BKK_NOVITAS(NBL)'), value: 'BKK NOVITAS (NBL)' },
  { label: languageTranslation('BKK_PFAFF'), value: 'BKK PFAFF' },
  { label: languageTranslation('BKK_PFAFF(NBL)'), value: 'BKK PFAFF (NBL)' },
  { label: languageTranslation('BKK_PFALZ'), value: 'BKK Pfalz' },
  { label: languageTranslation('BKK_PFALZ(NBL)'), value: 'BKK Pfalz (NBL)' },
  { label: languageTranslation('BKK_PREUSSAG_Publik'), value: 'BKK PREUSSAG Publik' },
  { label: languageTranslation('BKK_PROVITA'), value: 'BKK ProVita' },
  { label: languageTranslation('BKK_PWC_DEUTSCHE_REVISION'), value: 'BKK PWC Deutsche Revision' },
  { label: languageTranslation('BKK_R+V'), value: 'BKK R+V' },
  { label: languageTranslation('BKK_R+V(NBL)'), value: 'BKK R+V (NBL)' },
  { label: languageTranslation('BKK_RHEINLAND'), value: 'BKK Rheinland' },
  { label: languageTranslation('BKK_RHEINLAND(NBL)'), value: 'BKK Rheinland (NBL)' },
  { label: languageTranslation('BKK_RUHRGAS'), value: 'BKK ruhrgas' },
  { label: languageTranslation('BKK_RWE'), value: 'BKK RWE' },
  { label: languageTranslation('BKK_SALZGITTER'), value: 'BKK Salzgitter' },
  { label: languageTranslation('BKK_SALZGITTER(NBL)'), value: 'BKK Salzgitter (NBL)' },
  { label: languageTranslation('BKK_SBH'), value: 'BKK SBH' },
  { label: languageTranslation('BKK_SCHEUFELEN'), value: 'BKK Scheufelen' },
  { label: languageTranslation('BKK_SKD'), value: 'BKK SKD' },
  { label: languageTranslation('BKK_SKD(NBL)'), value: 'BKK SKD (NBL)' },
  { label: languageTranslation('BKK_STADT_AUGSBURG'), value: 'BKK Stadt Augsburg' },
  { label: languageTranslation('BKK_STINNES'), value: 'BKK Stinnes' },
  { label: languageTranslation('BKK_Südzucker'), value: 'BKK Südzucker' },
  { label: languageTranslation('BKK_Südzucker(NBL)'), value: 'BKK Südzucker (NBL)' },
  { label: languageTranslation('BKK_TECHNOFORM'), value: 'BKK Technoform' },
  { label: languageTranslation('BKK_TUI'), value: 'BKK TUI' },
  { label: languageTranslation('BKK_TUI(NBL)'), value: 'BKK TUI (NBL)' },
  { label: languageTranslation('BKK_VDN'), value: 'BKK VDN' },
  { label: languageTranslation('BKK_VDN(NBL)'), value: 'BKK VDN (NBL)' },
  { label: languageTranslation('BKK_VERBUNDPLUS'), value: 'BKK VerbundPlus' },
  { label: languageTranslation('BKK_VERBUNDPLUS(NBL)'), value: 'BKK VerbundPlus (NBL)' },
  { label: languageTranslation('BKK_VERBUNDPLUS_UNION'), value: 'BKK Verkehrsbau Union' },
  {
    label: languageTranslation('BKK_VERBUNDPLUS_UNION(NBL)'),
    value: 'BKK Verkehrsbau Union (NBL)',
  },
  { label: languageTranslation('BKK_VITAL'), value: 'BKK Vital' },
  {
    label: languageTranslation('BKK_Voralb_Heller*Leuze*Traub'),
    value: 'BKK Voralb Heller*Leuze*Traub',
  },
  { label: languageTranslation('BKK_WERRA-MEISSNER'), value: 'BKK Werra-Meissner' },
  { label: 'BKK Wieland-Werke', value: 'BKK Wieland-Werke' },
  {
    label: languageTranslation('BKK_Wirtschaft&amp;Finanzen'),
    value: 'BKK Wirtschaft&amp;Finanzen',
  },
  {
    label: languageTranslation('BKK_Wirtschaft&amp;Finanzen(NBL)'),
    value: 'BKK Wirtschaft&amp;Finanzen (NBL)',
  },
  { label: languageTranslation('BKK_WMF'), value: 'BKK WMF' },
  { label: languageTranslation('BKK_WMF(NBL)'), value: 'BKK WMF (NBL)' },
  { label: languageTranslation('BKK_Würth'), value: 'BKK Würth' },
  { label: languageTranslation('BKK_Würth(NBL)'), value: 'BKK Würth (NBL)' },
  { label: languageTranslation('BKK_ZF_&amp;_Partner'), value: 'BKK ZF &amp; Partner' },
  { label: languageTranslation('BKK_ZF_&amp;_Partner_(NBL)'), value: 'BKK ZF &amp; Partner (NBL)' },
  { label: languageTranslation('BKK24'), value: 'BKK24' },
  { label: languageTranslation('BKK24(NBL)'), value: 'BKK24 (NBL)' },
  {
    label: languageTranslation('BUNDESKNAPPSCH.f.ANG._(WEST)'),
    value: 'Bundesknappsch.f.Ang. (WEST)',
  },
  { label: languageTranslation('BUNDESKNAPPSCHAFT'), value: 'Bundesknappschaft' },
  {
    label: languageTranslation('BUNDESKNAPPSCHAFT_f._MINIJOBS'),
    value: 'Bundesknappschaft f. Minijobs',
  },
  {
    label: languageTranslation('CENTRAL_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'Central Krankenversicherung Aktiengesellschaft',
  },
  {
    label: languageTranslation('CONCORDIA_KRANKENVERSICHERUNGS-AKTIENGESELLSCHAFT'),
    value: 'Concordia Krankenversicherungs-Aktiengesellschaft',
  },
  {
    label: languageTranslation('CONTINENTALE_KRANKENVERSICHERUNG_A.G.'),
    value: 'Continentale Krankenversicherung a.G.',
  },
  { label: languageTranslation('DAIMLER_BKK'), value: 'Daimler BKK' },
  { label: languageTranslation('DAIMLER_BKK(NBL)'), value: 'Daimler BKK (NBL)' },
  { label: languageTranslation('DAK-GESUNDHEIT'), value: 'DAK-Gesundheit' },
  {
    label:
    languageTranslation('DEBEKA_KRANKENVERSICHERUNGSVEREIN_AUF_GEGENSEITIGKEIT_SITZ_KOBLENZ_AM_RHEIN'),
    value:
      'Debeka Krankenversicherungsverein auf Gegenseitigkeit Sitz Koblenz am Rhein',
  },
  {
    label: languageTranslation('DEUTSCHER_RING_KRANKENVERSICHERUNGSVEREIN_AUF_GEGENSEITIGKEIT'),
    value: 'DEUTSCHER RING Krankenversicherungsverein auf Gegenseitigkeit',
  },
  {
    label: languageTranslation('DEVK_KRANKENVERSICHERUNGS-AKTIENGESELLSCHAFT'),
    value: 'DEVK Krankenversicherungs-Aktiengesellschaft',
  },
  {
    label: languageTranslation('DKV_DEUTSCHE_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'DKV Deutsche Krankenversicherung Aktiengesellschaft',
  },
  { label: languageTranslation('ENERGIE-BKK'), value: 'energie-BKK' },
  { label: 'energie-BKK (NBL)', value: 'energie-BKK (NBL)' },
  {
    label: languageTranslation('ENVIVAS_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'ENVIVAS Krankenversicherung Aktiengesellschaft',
  },
  {
    label: languageTranslation('ERGO_DIREKT_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'ERGO Direkt Krankenversicherung Aktiengesellschaft',
  },
  {
    label:
    languageTranslation('FREIE_ARZT-UND_MEDIZINKASSE_DER_ANGEHÖRIGEN_DER_BERUFSFEUERWEHR_UND_DER_POLIZEI_VVAG'),
    value:
      'Freie Arzt- und Medizinkasse der Angehörigen der Berufsfeuerwehr und der Polizei VVaG',
  },
  {
    label: languageTranslation('GOTHAER_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'Gothaer Krankenversicherung Aktiengesellschaft',
  },
  {
    label: languageTranslation('HALLESCHE_KRANKENVERSICHERUNG_AUF_GEGENSEITIGKEIT'),
    value: 'HALLESCHE Krankenversicherung auf Gegenseitigkeit',
  },
  {
    label: languageTranslation('HANSEMERKUR_KRANKENVERSICHERUNG_AG'),
    value: 'HanseMerkur Krankenversicherung AG',
  },
  {
    label: languageTranslation('HANSEMERKUR_KRANKENVERSICHERUNG_AUF_GEGENSEITIGKEIT'),
    value: 'HanseMerkur Krankenversicherung auf Gegenseitigkeit',
  },
  {
    label: languageTranslation('HANSEMERKUR_SPEZIALE_KRANKENVERSICHERUNG_AG'),
    value: 'HanseMerkur Speziale Krankenversicherung AG',
  },
  { label: languageTranslation('HEIMAT_KRANKENKASSE'), value: 'Heimat Krankenkasse' },
  { label: 'Heimat Krankenkasse (NBL)', value: 'Heimat Krankenkasse (NBL)' },
  {
    label: languageTranslation('HEK_HANSEATISCHE_KRANKENKASSE'),
    value: 'HEK Hanseatische Krankenkasse',
  },
  { label: languageTranslation('HKK_HANDELSKRANKENKASSE'), value: 'HKK Handelskrankenkasse' },
  {
    label: languageTranslation('HUK-COBURG-KRANKENVERSICHERUNG_AG'),
    value: 'HUK-COBURG-Krankenversicherung AG',
  },
  { label: languageTranslation('IKK_BRANDENBURG_UND_BERLIN'), value: 'IKK Brandenburg und Berlin' },
  { label: languageTranslation('IKK_BRAUNSCHWEIG'), value: 'IKK Braunschweig' },
  { label: languageTranslation('IKK_CLASSIC'), value: 'IKK classic' },
  { label: languageTranslation('IKK_CLASSIC(NBL)'), value: 'IKK classic (NBL)' },
  { label: languageTranslation('IKK_GESUND_PLUS'), value: 'IKK gesund plus' },
  { label: languageTranslation('IKK_GESUND_PLUS(NBL)'), value: 'IKK gesund plus (NBL)' },
  { label: languageTranslation('IKK_NORD'), value: 'IKK Nord' },
  { label: languageTranslation('IKK_NORD(NBL)'), value: 'IKK Nord (NBL)' },
  { label: languageTranslation('IKK_Südwest'), value: 'IKK Südwest' },
  {
    label: languageTranslation('INTER_KRANKENVERSICHERUNG_AG'),
    value: 'INTER Krankenversicherung AG',
  },
  { label: languageTranslation('ITSG_Test-AOK_BY-eVpT'), value: 'ITSG Test-AOK BY - eVpT' },
  { label: languageTranslation('ITSG_Test-AOK_NDS-eVpT'), value: 'ITSG Test-AOK NDS - eVpT' },
  { label: languageTranslation('ITSG_Test-AOK NW-eVpT'), value: 'ITSG Test-AOK NW - eVpT' },
  { label: languageTranslation('ITSG_Test-BEK-eVpT'), value: 'ITSG Test-BEK - eVpT' },
  { label: languageTranslation('ITSG_Test-DAK-eVpT'), value: 'ITSG Test-DAK - eVpT' },
  { label: languageTranslation('ITSG_Test-HKK-eVpT'), value: 'ITSG Test-HKK - eVpT' },
  {
    label: languageTranslation('ITSG_Test-KBS_MiniJob-eVpT'),
    value: 'ITSG Test-KBS MiniJob - eVpT',
  },
  { label: languageTranslation('ITSG_Test-TK-eVpT'), value: 'ITSG Test-TK - eVpT' },
  {
    label: languageTranslation('KKH_KAUFMÄNNISCHE_KRANKENKASSE'),
    value: 'KKH Kaufmännische Krankenkasse',
  },
  {
    label: languageTranslation('KRANKENUNTERSTÜTZUNGSKASSE_DER_BERUFSFEUERWEHR_HANNOVER'),
    value: 'Krankenunterstützungskasse der Berufsfeuerwehr Hannover',
  },
  {
    label: languageTranslation('Landeskrankenhilfe_V.V.a.G.'),
    value: 'Landeskrankenhilfe V.V.a.G.',
  },
  {
    label:
    languageTranslation('LIGA_KRANKENVERSICHERUNG_KATHOLISCHER_PRIESTER_VERSICHERUNGSVEREIN_AUF_GEGENSEITIGKEIT_REGENSBURG'),
    value:
      'LIGA Krankenversicherung katholischer Priester Versicherungsverein auf Gegenseitigkeit Regensburg',
  },
  { label: languageTranslation('LKK_NIEDERSACHSEN-BREMEN'), value: 'LKK Niedersachsen-Bremen' },
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
  { value: 'Evangelical Church (EKD)', label: languageTranslation('EVANGELICAL_CHURCH_LABEL')  },
  {
    value: 'Freely Religious Communities',
    label: languageTranslation('FREELY_RELIGIOUS_COMMUNITIES_LABEL'),
  },
  { value: 'Jewish Communities', label: languageTranslation('JEWSIH_COMMUNITIES_LABEL') },
  {
    value: 'Catholic Bishopric Germany of the old Catholics in Germany',
    label: languageTranslation('CATHOLIC_BISHOPRIC_LABEL'),
  },
  { value: 'Others Without', label: languageTranslation("OTHERS_WITHOUT_LABEL") },
  { value: 'Roman Catholic Church', label: languageTranslation('ROMAN_CATHOLIC_CHURCH_LABEL') },
  {
    value: 'Unitarian Religious Community Free Protestants',
    label: languageTranslation('UNITARIAN_RELIGIOUS_LABEL'),
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
  { value: 'From 10 p.m.', label: 'From 10 p.m.' },
  { value: 'From 8 p.m.', label: 'From 8 p.m.' },
  { value: 'From 8:45 p.m.', label: 'From 8:45 p.m.' },
  { value: 'From 9 p.m.', label: 'From 9 p.m.' },
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

export const filterUserById: IReactSelectInterface[] = [
  { value: 'caregiver', label: languageTranslation('CAREGIVER_USERROLE') },
  { value: 'canstitution', label: languageTranslation('CAREINST_USERROLE') },
];

export const Without_Appointments: IReactSelectInterface[] = [
  {
    value: 'showWithAppointments',
    label: languageTranslation('SHOW_APPOINTMENT'),
  },
  {
    value: 'showWithoutAppointments',
    label: languageTranslation('SHOW_WITHOUT_APPOINTMENT'),
  },
  { value: 'showAll', label: languageTranslation('SHOW_ALL') },
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
  { name: languageTranslation("INBOX_LABEL"), icon: 'fa fa-inbox '},
  { name: languageTranslation("SENT_LABEL"), icon: 'fa fa-send'  },
  { name: languageTranslation("NEW_EMAIL_LABEL"), icon: 'fa fa-edit' },
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
    value: '06:00-14:00',
    label: '06:00-14:00 Early',
  },
  {
    value: '14:00-22:00',
    label: '14:00-22:00 Late',
  },
  { value: '22:00-06:00', label: '22:00-06:00 Night' },
];
export const InvoiceFilter: IReactSelectInterface[] = [
  {
    value: 'Select all by email',
    label: languageTranslation('SELECT_ALL_BY_EMAIL'),
  },
  {
    value: 'select all by post',
    label: languageTranslation('SELECT_ALL_BY_POST'),
  },
  { value: 'Select all', label: languageTranslation('SELECT_ALL') },
];
export const InvoiceSummaryFilter: IReactSelectInterface[] = [
  { value: 'all', label: languageTranslation('ALL') },
  {
    value: 'weekly',
    label: languageTranslation('WEEKLY'),
  },
  {
    value: 'everySixMonths',
    label: languageTranslation('EVERY_SIX_MONTH'),
  },
  { value: 'perMonth', label: languageTranslation('PER_MONTH') },
];

export const CaregiverTIMyoCYAttrId: number = 67; //9
export const CareInstTIMyoCYAttrId: number = 67; //73
export const CareInstPlycocoAttrId: number = 70; // 72
export const CareInstInActiveAttrId: number = 10032; // 101

export const deactivatedListColor: string = '#cacaca';
export const leasingListColor: string = '#f7d158';
export const selfEmployesListColor: string = '#ebebff';

// color: #ffff00; yellow
// color: #ff00ff; magenta/pink
// color: #d7ffe5; light green
// color: #ffd7b0; peach
// color: #97beff; blue

export const matchingColorCaregiver: IMatchingColorInterface[] = [
  {
    status: 'default',
    color: '#d7ffe5',
  },
  {
    status: 'linked',
    color: '#ffff00',
  },
  {
    status: 'contract',
    color: '#ffd7b0',
  },
];
export const matchingColorCareinstituion: IMatchingColorInterface[] = [
  {
    status: 'default',
    color: '#ff00ff',
  },
  {
    status: 'linked',
    color: '#ffff00',
  },
  {
    status: 'contract',
    color: '#ffd7b0',
  },
];
export const payGroups:Array<string[]> = [
["30", "31", "32", "33", "34", "35"],
["36", "37", "38", "39", "40"],
["41", "42", "43", "44", "45", "46", "47"],
["48", "49", "50", "51", "52", "53", "54"],
["59", "55", "56", "57", "58", "60", "62", "63", "64", "65"]
]