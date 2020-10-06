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
export const APPOINTMENT_PAGE_LIMIT: number = 30;
export const ASYNC_LIST_LIMIT: number = 50;
export const BULK_INSTIUTION_LIST: number = 60;
export const defaultDateTimeFormatForDashboard: any = 'DD.MM.YYYY HH:mm';
export const appointmentDayFormat: string = 'dd';
export const appointmentDateFormat: string = 'DD';
export const appointmentMonthFormat: string = 'MMMM';
export const appointmentYearFormat: string = 'YYYY';
export const defaultDateTimeFormat: any = 'DD.MM.YYYY HH:mm:ss';
export const defaultDateFormat: any = 'DD.MM.YYYY';
export const dbAcceptableFormat: any = 'YYYY-MM-DD';
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
    value: 'ByEmailsWithoutDocuments',
    label: languageTranslation('BY_EMAILS_WITHOUT_DOCUMENTS'),
  },
  {
    value: 'ByEmailsWithDocuments',
    label: languageTranslation('BY_EMAIL_WITH_DOCUMENTS'),
  },
  {
    value: 'ByPostAndEmailWithoutDocuments',
    label: languageTranslation('BY_POST_AND_EMAIL_WITHOUT_DOCUMENTS'),
  },
  {
    value: 'ByPostAndEmailWithDocuments',
    label: languageTranslation('BY_POST_AND_EMAIL_WITH_DOCUMENTS'),
  },
  {
    value: 'OneEmailForEachInvoice',
    label: languageTranslation('ONE_EMAIL_FOR_EACH_INVOICE'),
  },
  {
    value: 'OneEmailForEachInvoiceInclWorkingProof',
    label: languageTranslation('ONE_EMAIL_FOR_EACH_INVOICE_INCL_WORKING_PROOF'),
  },
  {
    value: 'ViaEmailWithoutWorkProof',
    label: languageTranslation('VIA_EMAIL_WITHOUT_WORK_PROOF'),
  },
  {
    value: 'viaEmailWithWorkProof',
    label: languageTranslation('VIA_EMAIL_WITH_WORK_PROOF'),
  },
];

export const InvoiceInterval: IReactSelectInterface[] = [
  { value: 'MonthlyForThe1st', label: languageTranslation('MONTHLY_FOR_1ST') },
  {
    value: 'SemimonthlyFor1and16',
    label: languageTranslation('SEMIMONTHLY_FOR_1_AND_16'),
  },
  { value: 'WeeklyMondays', label: languageTranslation('WEEKLY_MONDAYS') },
];

export const CaregiverInvoiceTax: IReactSelectInterface[] = [
  { value: '0', label: `0% ${languageTranslation('TAX')}` },
  { value: '16', label: `16% ${languageTranslation('TAX')}` },
  { value: '19', label: `19% ${languageTranslation('TAX')}` },
];

export const PlycocoInvoiceTax: IReactSelectInterface[] = [
  { value: '0', label: `0% ${languageTranslation('TAX')}` },
  { value: '16', label: `16% ${languageTranslation('TAX')}` },
  { value: '19', label: `19% ${languageTranslation('TAX')}` },
];

export const LeasingInvoiceTax: IReactSelectInterface[] = [
  { value: '0', label: `0% ${languageTranslation('TAX')}` },
  { value: '16', label: `16% ${languageTranslation('TAX')}` },
  { value: '19', label: `19% ${languageTranslation('TAX')}` },
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
  { value: 'workingProof', label: languageTranslation('WORKING_PROOF_LABEL') },
  { value: 'sickNote', label: languageTranslation('SICK_NOTE_LABEL') },
];

export const Gender: IReactSelectInterface[] = [
  {
    value: 'Male',
    label: languageTranslation('MALE'),
  },
  {
    value: 'Female',
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
  {
    value: languageTranslation('SIR'),
    label: languageTranslation('SIR'),
  },
  {
    value: languageTranslation('MADAM'),
    label: languageTranslation('MADAM'),
  },
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
  { value: 'Individual', label: languageTranslation('INDIVIDUAL') },
  {
    value: 'UG (limited liability company)',
    label: languageTranslation('UG_LIMITED_LIABILITY'),
  },
  {
    value: 'GmbH (limited liability company)',
    label: languageTranslation('GHB_LIMITED_LIABILITY'),
  },
  { value: 'Ltd. (Limited)', label: languageTranslation('LTD_LIMITED') },
  { value: 'GbR', label: languageTranslation('GBR') },
];

export const Hours: IReactSelectInterface[] = [
  { value: '12', label: '12' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];
export const CalculationInterval: IReactSelectInterface[] = [
  { value: 'MonthlyForThe1st', label: languageTranslation('MONTHLY_FOR_1ST') },
  {
    value: 'SemimonthlyFor1And16',
    label: languageTranslation('SEMIMONTHLY_FOR_1_AND_16'),
  },
  { value: 'WeeklyMondays', label: languageTranslation('WEEKLY_MONDAYS') },
];

export const Supplements: IReactSelectInterface[] = [
  { value: 'Exclusive', label: languageTranslation('EXCLUSIVE_LABEL') },
  { value: 'Cumulative', label: languageTranslation('CUMULATIVE_LABEL') },
];

export const MaritalStatus: IReactSelectInterface[] = [
  { value: 'Divorced', label: languageTranslation('DIVORSED_LABEL') },
  { value: 'Single', label: languageTranslation('SINGLE_LABEL') },
  { value: 'Married', label: languageTranslation('MARRIED_LABEL') },
  {
    value: 'MarriedPermanentlySeparated',
    label: languageTranslation('SEPEARTED_LABEL'),
  },
  { value: 'Widowed', label: languageTranslation('WIDOWED_LABEL') },
];

export const HealthInsuranceType: IReactSelectInterface[] = [
  {
    value: 'VoluntarilyInsuredByLaw',
    label: languageTranslation('VOLUNTARILY_INSURED_BY_LAW'),
  },
  { value: 'LegallyInsured', label: languageTranslation('LEGALLY_INSURED') },
  {
    value: 'PrivatelyInsured',
    label: languageTranslation('PRIVATELY_INSURED'),
  },
];

export const HealthInsuranceProvider: IReactSelectInterface[] = [
  { label: languageTranslation('ACTIMONDA_BKK'), value: 'ActimondaBkk' },
  {
    label: languageTranslation('ACTIMONDA_BKK_(NBL)'),
    value: 'ActimondaBkk(NBL)',
  },
  {
    label: languageTranslation('AKA_AUGENOPTIKER_AUSGL.kASSE'),
    value: 'AKAAugenoptikerAusgl.kasse',
  },
  {
    label: languageTranslation('ALLIANZ_PRIVATE_KRANKENVERSICHERUNGS'),
    value: 'AllianzPrivateKrankenversicherungs-Aktiengesellschaft',
  },
  {
    label: languageTranslation('ALTE_OLDENBURGER_KRANKENVERSICHERUNGS_AG'),
    value: 'ALTEOLDENBURGERKrankenversicherungAG',
  },
  {
    label: languageTranslation(
      'ALTE_OLDENBURGER_Krankenversicherung_von_1927_Versicherungsverein',
    ),
    value:
      'ALTEOLDENBURGERKrankenversicherungvon1927VersicherungsvereinAufGegenseitigkeit',
  },
  {
    label: languageTranslation('AOK_BADEN-WTBG./NECKAR-FILS'),
    value: 'AOKBaden-Wtbg./Neckar-Fils',
  },
  {
    label: languageTranslation('AOK_BADEN-Württemberg'),
    value: 'AOKBaden-Württemberg',
  },
  { label: languageTranslation('AOK_BAYERN'), value: 'AOKBayern' },
  {
    label: languageTranslation('AOK_BREMEN/BREMEHAVEN'),
    value: 'AOKBremen/Bremerhaven',
  },
  { label: languageTranslation('AOK_HESSEN'), value: 'AOKHessen' },
  {
    label: languageTranslation('AOK_NIEDERSACHSEN'),
    value: 'AOKNiedersachsen',
  },
  {
    label: languageTranslation('AOK_NIENBURG/WESER'),
    value: 'AOKNienburg/Weser',
  },
  {
    label: languageTranslation('AOK_NORDOST(Berlin)'),
    value: 'AOKNordost(Berlin)',
  },
  {
    label: languageTranslation('AOK_NORDOST(Brandenburg)'),
    value: 'AOKNordost(Brandenburg)',
  },
  {
    label: languageTranslation('AOK_NORDOST(Meckl.-Vorp.)'),
    value: 'AOKNordost(Meckl.-Vorp.)',
  },
  {
    label: languageTranslation('AOK_NORDWEST(Schlesw.-Holst.)'),
    value: 'AOKNordWest(Schlesw.-Holst.)',
  },
  {
    label: languageTranslation('AOK_NORDWEST(Westf.-Lippe)'),
    value: 'AOKNordWest(Westf.-Lippe)',
  },
  {
    label: languageTranslation('AOK_PLUS(Sachsen)'),
    value: 'AOKPlus(Sachsen)',
  },
  {
    label: languageTranslation('AOK_PLUS(Thüringen)'),
    value: 'AOKPlus(Thüringen)',
  },
  {
    label: languageTranslation('AOK_RHEINL.-Pf./Saarl.(Rh-Pf.)'),
    value: 'AOKRheinl.-Pf./Saarl.(Rh-Pf.)',
  },
  {
    label: languageTranslation('AOK_RHEINL.-Pf./Saarl.(Saarl.)'),
    value: 'AOK Rheinl.-Pf./Saarl.(Saarl.)',
  },
  {
    label: languageTranslation('AOK_RHEINLAND/HAMBURG'),
    value: 'AOKRheinland/Hamburg',
  },
  {
    label: languageTranslation('AOK_SACHSEN-ANHALT'),
    value: 'AOKSachsen-Anhalt',
  },
  {
    label: languageTranslation('APOTHEKER-VERSORGUNG_BERLIN'),
    value: 'Apotheker-VersorgungBerlin',
  },
  {
    label: languageTranslation('APOTHEKERVERSORGUNG_MECK-POMM'),
    value: 'ApothekerversorgungMeck-Pomm',
  },
  {
    label: languageTranslation('APOTHEKERVERSORGUNG_NIEDERS'),
    value: 'ApothekerversorgungNieders.',
  },
  {
    label: languageTranslation('ARAG_KRANKENVERSICHERUNGS-AKTIENGESELLSCHAFT'),
    value: 'ARAGKrankenversicherungs-Aktiengesellschaft',
  },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_BERLIN'),
    value: 'ÄrzteversorgungBerlin',
  },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_LAND_BRDBG'),
    value: 'ÄrzteversorgungLandBrdbg.',
  },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_NIEDERSACHSEN'),
    value: 'ÄrzteversorgungNiedersachsen',
  },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_NORDRHEIN'),
    value: 'ÄrzteversorgungNordrhein',
  },
  {
    label: languageTranslation('ÄRZTEVERSORGUNG_SACHSEN-ANHALT'),
    value: 'ÄrzteversorgungSachsen-Anhalt',
  },
  { label: languageTranslation('ATLAS_BKK_AHLMANN'), value: 'AtlasBKKahlmann' },
  {
    label: languageTranslation('AUGENOPTIKER_AUSGLEICHSKASSE_VVAG(AKA)'),
    value: 'AugenoptikerAusgleichskasseVVaG(AKA)',
  },
  {
    label: languageTranslation('AXA_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'AXAKrankenversicherungAktiengesellschaft',
  },
  { label: languageTranslation('BAHN_BKK'), value: 'BAHNBKK' },
  { label: languageTranslation('BAHN_BKK(NBL)'), value: 'BAHNBKK(NBL)' },
  {
    label: languageTranslation('Barmenia_KRANKENVERSICHERUNG_A.G.'),
    value: 'BarmeniaKrankenversicherungA.G.',
  },
  { label: languageTranslation('BARMER'), value: 'BARMER' },
  {
    label: languageTranslation('BaWü_Versorg.anst.Ärzte/ZÄ/TÄ'),
    value: 'BaWüVersorg.anst.Ärzte/ZÄ/TÄ',
  },
  {
    label: languageTranslation('BAY_APOTHEKERVERSORGUNG'),
    value: 'Bay.Apothekerversorgung',
  },
  {
    label: languageTranslation('BAYERISCHE_APOTHEKERVERSORGUNG'),
    value: 'BayerischeApothekerversorgung',
  },
  {
    label: languageTranslation('BAYERISCHE_ÄRZTEVERSORGUNG'),
    value: 'BayerischeÄrzteversorgung',
  },
  {
    label: languageTranslation(
      'BAYERISCHE_BEATENKRANKENKASSE_AKTIENGESELLCHAFT',
    ),
    value: 'BayerischeBeamtenkrankenkasseAktiengesellschaft',
  },
  { label: languageTranslation('BERTELSMANN_BKK'), value: 'BertelsmannBKK' },
  {
    label: languageTranslation('BERTELSMANN_BKK(NBL)'),
    value: 'BertelsmannBKK(NBL)',
  },
  { label: languageTranslation('BIG_DIREKT_GESUND'), value: 'BIGDirektGesund' },
  {
    label: languageTranslation('BIG_DIREKT_GESUND(NBL)'),
    value: 'BIGDirektGesund(NBL)',
  },
  { label: languageTranslation('BKK_A.T.U._(NBL)'), value: 'BKKA.T.U.(NBL)' },
  {
    label: languageTranslation('BKK_ACHENBACH_Buschhütten'),
    value: 'BKKAchenbachBuschhütten',
  },
  { label: languageTranslation('BKK_ADVITA'), value: 'BKKAdvita' },
  { label: languageTranslation('BKK_ADVITA(NBL)'), value: 'BKKAdvita(NBL)' },
  { label: languageTranslation('BKK_AESCULAP'), value: 'BkkAesculap' },
  { label: languageTranslation('BKK_AKZO_NOBEL'), value: 'BKKAkzoNobel' },
  { label: languageTranslation('BKK_AUDI'), value: 'BKKAudi' },
  { label: languageTranslation('BKK_AUDI(NBL)'), value: 'BKKAudi(NBL)' },
  {
    label: languageTranslation('BKK_B.BRAUN_MELSUNGEN'),
    value: 'BKKB.BraunMelsungen',
  },
  { label: languageTranslation('BKK_BENTELER_AG'), value: 'BkkBenteleRag' },
  { label: languageTranslation('BKK_BMW_AG'), value: 'BKKBMWAG' },
  { label: languageTranslation('BKK_BMW-AG(NBL)'), value: 'BKKBMW-AG(NBL)' },
  { label: languageTranslation('BKK_BOSCH'), value: 'BKKBosch' },
  { label: languageTranslation('BKK_BOSCH(NBL)'), value: 'BKKBosch(NBL)' },
  { label: languageTranslation('BKK_BPW_WIEHL'), value: 'BKKBPWWiehl' },
  {
    label: languageTranslation('BKK_BRANDENBURGISCHE'),
    value: 'BKKBrandenburgische',
  },
  {
    label: languageTranslation('BKK_BRAUN-GILETTE'),
    value: 'BKKBraun-Gilette',
  },
  { label: languageTranslation('BKK_CONTINENTALE'), value: 'BKKContinentale' },
  {
    label: languageTranslation('BKK_D.G.M._PFAFF_AG'),
    value: 'BKKd.G.M.PfaffAG',
  },
  { label: languageTranslation('BKK_DEBEKA'), value: 'BKKDebeka' },
  { label: languageTranslation('BKK_DEBEKA(NBL)'), value: 'BKKDebeka(NBL)' },
  {
    label: languageTranslation('BKK_DER_MTU_Friedrichshafen'),
    value: 'BKKDerMTUFriedrichshafen',
  },
  { label: languageTranslation('BKK_DER_SIEMAG'), value: 'BKKDerSIEMAG' },
  {
    label: languageTranslation('BKK_DEUSTSCHE_BANK_AG'),
    value: 'BKKDeutscheBankAG',
  },
  {
    label: languageTranslation('BKK_DEUSTSCHE_BANK_AG(NBL)'),
    value: 'BKKDeutscheBankAG(NBL)',
  },
  { label: languageTranslation('BKK_DIAKONIE'), value: 'BKKDiakonie' },
  { label: languageTranslation('BKK_DIAKONIE_NBL'), value: 'BKKDiakonieNBL' },
  { label: languageTranslation('BKK_DIE_BERGISCHE'), value: 'BKKDieBergische' },
  { label: languageTranslation('BKK_Dürkopp_ADLER'), value: 'BKKDürkoppAdler' },
  { label: languageTranslation('BKK_ERNST_YOUNG'), value: 'BKKErnstANDYoung' },
  { label: languageTranslation('BKK_EUREGIO'), value: 'BKKEUREGIO' },
  { label: languageTranslation('BKK_EWE'), value: 'BKKEWE' },
  { label: languageTranslation('BKK_EWE(NBL)'), value: 'BKKEWE(NBL)' },
  { label: languageTranslation('BKK_EXKLUSIVE'), value: 'BKKExklusiv' },
  {
    label: languageTranslation('BKK_EXKLUSIVE(NBL)'),
    value: 'BKKExklusiv(NBL)',
  },
  {
    label: languageTranslation('BKK_FABER-CASTELL'),
    value: 'BKKFaber-Castell',
  },
  { label: languageTranslation('BKK_FIRMUS'), value: 'BKKFirmus' },
  { label: languageTranslation('BKK_FIRMUS(NBL)'), value: 'BKKFirmus(NBL)' },
  { label: languageTranslation('BKK_FREUDENBERG'), value: 'BKKFreudenberg' },
  {
    label: languageTranslation('BKK_für_UMWELT_UND_BAUEN'),
    value: 'BKKfürUmweltAndBauen',
  },
  { label: languageTranslation('BKK_GANDV'), value: 'BKKGANDV' },
  {
    label: languageTranslation('BKK_GILDEMEISTER/SEIDENST.(NBL)'),
    value: 'BKKGildemeister/Seidenst.(NBL)',
  },
  {
    label: languageTranslation('BKK_GILDEMEISTER/SEIDENSTICKER'),
    value: 'BKKGildemeister/Seidensticker',
  },
  { label: languageTranslation('BKK_GRILLO_WERKE'), value: 'BKKGrilloWerke' },
  { label: languageTranslation('BKK_GROZ-BECKERT'), value: 'BKKGroz-Beckert' },
  {
    label: languageTranslation('BKK_HAPAG-LLOYD_BREMEN'),
    value: 'BKKHapag-LloydBremen',
  },
  { label: languageTranslation('BKK_HEAG'), value: 'BKKHEAG' },
  { label: languageTranslation('BKK_HENSCHEL_PLUS'), value: 'BKKHenschelPlus' },
  { label: languageTranslation('BKK_HERKULES'), value: 'BKKHerkules' },
  { label: languageTranslation('BKK_HMR'), value: 'BKKHMR' },
  { label: languageTranslation('BKK_INOVITA'), value: 'BKKINOVITA' },
  { label: languageTranslation('BKK_INOVITA(NBL)'), value: 'BKKINOVITA(NBL)' },
  {
    label: languageTranslation('BKK_KARL_MAYER_GmbH'),
    value: 'BKKKarlMayerGmbH',
  },
  { label: languageTranslation('BKK_KBA'), value: 'BKKKBA' },
  { label: languageTranslation('BKK_KBA(NBL)'), value: 'BKKKBA(NBL)' },
  { label: languageTranslation('BKK_KNOLL_AG'), value: 'BKKKnollAG' },
  { label: languageTranslation('BKK_LINDE'), value: 'BKKLinde' },
  { label: languageTranslation('BKK_LINDE(NBL)'), value: 'BKKLinde(NBL)' },
  { label: languageTranslation('BKK_LOGISTIK'), value: 'BKKLogistik' },
  {
    label: languageTranslation('BKK_LOGISTIK(NBL)'),
    value: 'BKKLogistik(NBL)',
  },
  { label: languageTranslation('BKK_MAHLE'), value: 'BKKMahle' },
  { label: languageTranslation('BKK_MEDICUS_OST'), value: 'BKKMEDICUSOST' },
  { label: languageTranslation('BKK_MELITTA_PLUS'), value: 'BKKMelittaPlus' },
  { label: languageTranslation('BKK_MEM'), value: 'BKKMEM' },
  { label: languageTranslation('BKK_MERCK'), value: 'BKKMerck' },
  { label: languageTranslation('BKK_METZINGER'), value: 'BKKMetzinger' },
  { label: languageTranslation('BKK_MHPLUS'), value: 'BKKMhplus' },
  { label: languageTranslation('BKK_MHPLUS(NBL)'), value: 'BKKMhplus(NBL)' },
  { label: languageTranslation('BKK_MOBIL_OIL'), value: 'BKKMobilOil' },
  { label: languageTranslation('BKK_NOVITAS'), value: 'BKKNOVITAS' },
  { label: languageTranslation('BKK_NOVITAS(NBL)'), value: 'BKKNOVITAS(NBL)' },
  { label: languageTranslation('BKK_PFAFF'), value: 'BKKPFAFF' },
  { label: languageTranslation('BKK_PFAFF(NBL)'), value: 'BKKPFAFF(NBL)' },
  { label: languageTranslation('BKK_PFALZ'), value: 'BKKPfalz' },
  { label: languageTranslation('BKK_PFALZ(NBL)'), value: 'BKKPfalz(NBL)' },
  {
    label: languageTranslation('BKK_PREUSSAG_Publik'),
    value: 'BKKPREUSSAGPublik',
  },
  { label: languageTranslation('BKK_PROVITA'), value: 'BKKProVita' },
  {
    label: languageTranslation('BKK_PWC_DEUTSCHE_REVISION'),
    value: 'BKKPWCDeutscheRevision',
  },
  { label: languageTranslation('BKK_R+V'), value: 'BKKR+V' },
  { label: languageTranslation('BKK_R+V(NBL)'), value: 'BKKR+V(NBL)' },
  { label: languageTranslation('BKK_RHEINLAND'), value: 'BKKRheinland' },
  {
    label: languageTranslation('BKK_RHEINLAND(NBL)'),
    value: 'BKKRheinland(NBL)',
  },
  { label: languageTranslation('BKK_RUHRGAS'), value: 'BKKRuhrgas' },
  { label: languageTranslation('BKK_RWE'), value: 'BKKRWE' },
  { label: languageTranslation('BKK_SALZGITTER'), value: 'BKKSalzgitter' },
  {
    label: languageTranslation('BKK_SALZGITTER(NBL)'),
    value: 'BKKSalzgitter(NBL)',
  },
  { label: languageTranslation('BKK_SBH'), value: 'BKKSBH' },
  { label: languageTranslation('BKK_SCHEUFELEN'), value: 'BKKScheufelen' },
  { label: languageTranslation('BKK_SKD'), value: 'BKKSKD' },
  { label: languageTranslation('BKK_SKD(NBL)'), value: 'BKKSKD(NBL)' },
  {
    label: languageTranslation('BKK_STADT_AUGSBURG'),
    value: 'BKKStadtAugsburg',
  },
  { label: languageTranslation('BKK_STINNES'), value: 'BKKStinnes' },
  { label: languageTranslation('BKK_Südzucker'), value: 'BKKSüdzucker' },
  {
    label: languageTranslation('BKK_Südzucker(NBL)'),
    value: 'BKKSüdzucker(NBL)',
  },
  { label: languageTranslation('BKK_TECHNOFORM'), value: 'BKKTechnoform' },
  { label: languageTranslation('BKK_TUI'), value: 'BKKTUI' },
  { label: languageTranslation('BKK_TUI(NBL)'), value: 'BKKTUI(NBL)' },
  { label: languageTranslation('BKK_VDN'), value: 'BKKVDN' },
  { label: languageTranslation('BKK_VDN(NBL)'), value: 'BKKVDN(NBL)' },
  { label: languageTranslation('BKK_VERBUNDPLUS'), value: 'BKKVerbundPlus' },
  {
    label: languageTranslation('BKK_VERBUNDPLUS(NBL)'),
    value: 'BKKVerbundPlus(NBL)',
  },
  {
    label: languageTranslation('BKK_VERBUNDPLUS_UNION'),
    value: 'BKKVerkehrsbauUnion',
  },
  {
    label: languageTranslation('BKK_VERBUNDPLUS_UNION(NBL)'),
    value: 'BKKVerkehrsbauUnion(NBL)',
  },
  { label: languageTranslation('BKK_VITAL'), value: 'BKKVital' },
  {
    label: languageTranslation('BKK_Voralb_Heller*Leuze*Traub'),
    value: 'BKKVoralbHeller*Leuze*Traub',
  },
  {
    label: languageTranslation('BKK_WERRA-MEISSNER'),
    value: 'BKKWerra-Meissner',
  },
  {
    label: languageTranslation('BKK_Wieland-Werke'),
    value: 'BKKWieland-Werke',
  },
  {
    label: languageTranslation('BKK_WirtschaftANDFinanzen'),
    value: 'BKKWirtschaftANDFinanzen',
  },
  {
    label: languageTranslation('BKK_WirtschaftANDFinanzen(NBL)'),
    value: 'BKKWirtschaftANDFinanzen(NBL)',
  },
  { label: languageTranslation('BKK_WMF'), value: 'BKKWMF' },
  { label: languageTranslation('BKK_WMF(NBL)'), value: 'BKKWMF(NBL)' },
  { label: languageTranslation('BKK_Würth'), value: 'BKKWürth' },
  { label: languageTranslation('BKK_Würth(NBL)'), value: 'BKKWürth(NBL)' },
  {
    label: languageTranslation('BKK_ZF_AND_Partner'),
    value: 'BKKZFANDPartner',
  },
  {
    label: languageTranslation('BKK_ZF_AND_Partner_(NBL)'),
    value: 'BKKZFANDPartner(NBL)',
  },
  { label: languageTranslation('BKK24'), value: 'BKK24' },
  { label: languageTranslation('BKK24(NBL)'), value: 'BKK24(NBL)' },
  {
    label: languageTranslation('BUNDESKNAPPSCH.f.ANG._(WEST)'),
    value: 'Bundesknappsch.f.Ang.(WEST)',
  },
  {
    label: languageTranslation('BUNDESKNAPPSCHAFT'),
    value: 'Bundesknappschaft',
  },
  {
    label: languageTranslation('BUNDESKNAPPSCHAFT_f._MINIJOBS'),
    value: 'Bundesknappschaft.Minijobs',
  },
  {
    label: languageTranslation(
      'CENTRAL_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'CentralKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation(
      'CONCORDIA_KRANKENVERSICHERUNGS-AKTIENGESELLSCHAFT',
    ),
    value: 'ConcordiaKrankenversicherungs-Aktiengesellschaft',
  },
  {
    label: languageTranslation('CONTINENTALE_KRANKENVERSICHERUNG_A.G.'),
    value: 'ContinentaleKrankenversicherungA.G.',
  },
  { label: languageTranslation('DAIMLER_BKK'), value: 'DaimlerBKK' },
  { label: languageTranslation('DAIMLER_BKK(NBL)'), value: 'DaimlerBKK(NBL)' },
  { label: languageTranslation('DAK-GESUNDHEIT'), value: 'DAK-Gesundheit' },
  {
    label: languageTranslation(
      'DEBEKA_KRANKENVERSICHERUNGSVEREIN_AUF_GEGENSEITIGKEIT_SITZ_KOBLENZ_AM_RHEIN',
    ),
    value:
      'DebekaKrankenversicherungsvereinAufGegenseitigkeitSitzKoblenzAmRhein',
  },
  {
    label: languageTranslation(
      'DEUTSCHER_RING_KRANKENVERSICHERUNGSVEREIN_AUF_GEGENSEITIGKEIT',
    ),
    value: 'DEUTSCHERRINGKrankenversicherungsvereinAufGegenseitigkeit',
  },
  {
    label: languageTranslation('DEVK_KRANKENVERSICHERUNGS-AKTIENGESELLSCHAFT'),
    value: 'DEVKKrankenversicherungs-Aktiengesellschaft',
  },
  {
    label: languageTranslation(
      'DKV_DEUTSCHE_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'DKVDeutscheKrankenversicherungAktiengesellschaft',
  },
  { label: languageTranslation('ENERGIE-BKK'), value: 'Energie-BKK' },
  { label: languageTranslation('ENERGIE-BKK(NBL)'), value: 'Energie-BKK(NBL)' },
  {
    label: languageTranslation(
      'ENVIVAS_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'ENVIVASKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation(
      'ERGO_DIREKT_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'ERGODirektKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation(
      'FREIE_ARZT-UND_MEDIZINKASSE_DER_ANGEHÖRIGEN_DER_BERUFSFEUERWEHR_UND_DER_POLIZEI_VVAG',
    ),
    value:
      'FreieArzt-undMedizinkasseDerAngehörigenDerBerufsfeuerwehrUndDerPolizeiVVaG',
  },
  {
    label: languageTranslation(
      'GOTHAER_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'GothaerKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation(
      'HALLESCHE_KRANKENVERSICHERUNG_AUF_GEGENSEITIGKEIT',
    ),
    value: 'HALLESCHEKrankenversicherungaufGegenseitigkeit',
  },
  {
    label: languageTranslation('HANSEMERKUR_KRANKENVERSICHERUNG_AG'),
    value: 'HanseMerkurKrankenversicherungAG',
  },
  {
    label: languageTranslation(
      'HANSEMERKUR_KRANKENVERSICHERUNG_AUF_GEGENSEITIGKEIT',
    ),
    value: 'HanseMerkurKrankenversicherungaufGegenseitigkeit',
  },
  {
    label: languageTranslation('HANSEMERKUR_SPEZIALE_KRANKENVERSICHERUNG_AG'),
    value: 'HanseMerkurSpezialeKrankenversicherungAG',
  },
  {
    label: languageTranslation('HEIMAT_KRANKENKASSE'),
    value: 'HeimatKrankenkasse',
  },
  {
    label: languageTranslation('HEIMAT_KRANKENKASSE(NBL)'),
    value: 'HeimatKrankenkasse(NBL)',
  },
  {
    label: languageTranslation('HEK_HANSEATISCHE_KRANKENKASSE'),
    value: 'HEKHanseatischeKrankenkasse',
  },
  {
    label: languageTranslation('HKK_HANDELSKRANKENKASSE'),
    value: 'HKKHandelskrankenkasse',
  },
  {
    label: languageTranslation('HUK-COBURG-KRANKENVERSICHERUNG_AG'),
    value: 'HUK-COBURG-KrankenversicherungAG',
  },
  {
    label: languageTranslation('IKK_BRANDENBURG_UND_BERLIN'),
    value: 'IKKBrandenburgundBerlin',
  },
  { label: languageTranslation('IKK_BRAUNSCHWEIG'), value: 'IKKBraunschweig' },
  { label: languageTranslation('IKK_CLASSIC'), value: 'IKKClassic' },
  { label: languageTranslation('IKK_CLASSIC(NBL)'), value: 'IKKClassic(NBL)' },
  { label: languageTranslation('IKK_GESUND_PLUS'), value: 'IKKGesundPlus' },
  {
    label: languageTranslation('IKK_GESUND_PLUS(NBL)'),
    value: 'IKKGesundPlus(NBL)',
  },
  { label: languageTranslation('IKK_NORD'), value: 'IKKNord' },
  { label: languageTranslation('IKK_NORD(NBL)'), value: 'IKKNord(NBL)' },
  { label: languageTranslation('IKK_Südwest'), value: 'IKKSüdwest' },
  {
    label: languageTranslation('INTER_KRANKENVERSICHERUNG_AG'),
    value: 'INTERKrankenversicherungAG',
  },
  {
    label: languageTranslation('ITSG_Test-AOK_BY-eVpT'),
    value: 'ITSGTest-AOKBY-eVpT',
  },
  {
    label: languageTranslation('ITSG_Test-AOK_NDS-eVpT'),
    value: 'ITSGTest-AOKNDS-eVpT',
  },
  {
    label: languageTranslation('ITSG_Test-AOK_NW-eVpT'),
    value: 'ITSGTest-AOKNW-eVpT',
  },
  {
    label: languageTranslation('ITSG_Test-BEK-eVpT'),
    value: 'ITSGTest-BEK-eVpT',
  },
  {
    label: languageTranslation('ITSG_Test-DAK-eVpT'),
    value: 'ITSGTest-DAK-eVpT',
  },
  {
    label: languageTranslation('ITSG_Test-HKK-eVpT'),
    value: 'ITSGTest-HKK-eVpT',
  },
  {
    label: languageTranslation('ITSG_Test-KBS_MiniJob-eVpT'),
    value: 'ITSGTest-KBSMiniJob-eVpT',
  },
  {
    label: languageTranslation('ITSG_Test-TK-eVpT'),
    value: 'ITSGTest-TK-eVpT',
  },
  {
    label: languageTranslation('KKH_KAUFMÄNNISCHE_KRANKENKASSE'),
    value: 'KKHKaufmännischeKrankenkasse',
  },
  {
    label: languageTranslation(
      'KRANKENUNTERSTÜTZUNGSKASSE_DER_BERUFSFEUERWEHR_HANNOVER',
    ),
    value: 'KrankenunterstützungskasseDerBerufsfeuerwehrHannover',
  },
  {
    label: languageTranslation('Landeskrankenhilfe_V.V.a.G.'),
    value: 'LandeskrankenhilfeV.V.a.G.',
  },
  {
    label: languageTranslation(
      'LIGA_KRANKENVERSICHERUNG_KATHOLISCHER_PRIESTER_VERSICHERUNGSVEREIN_AUF_GEGENSEITIGKEIT_REGENSBURG',
    ),
    value:
      'LIGAKrankenversicherungkatholischerPriesterVersicherungsvereinaufGegenseitigkeitRegensburg',
  },
  {
    label: languageTranslation('LKK_NIEDERSACHSEN-BREMEN'),
    value: 'LKKNiedersachsen-Bremen',
  },
  {
    label: languageTranslation('LOHNFORTZAHLUNGSKASSE_AURICH_VVAG'),
    value: 'LohnfortzahlungskasseAurichVVaG',
  },
  {
    label: languageTranslation('LOHNFORTZAHLUNGSKASSE_LEER_VVAG'),
    value: 'LohnfortzahlungskasseLeerVVaG',
  },
  {
    label: languageTranslation('LVM_KRANKENVERSICHERUNGS-AG'),
    value: 'LVMKrankenversicherungs-AG',
  },
  {
    label: languageTranslation(
      'MANNHEIMER_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'MannheimerKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation(
      'MECKLENBURGISCHE_KRANKENVERSICHERUNGS-AKTIENGESELLSCHAFT',
    ),
    value: 'MecklenburgischeKrankenversicherungs-Aktiengesellschaft',
  },
  { label: languageTranslation('Miele_BKK'), value: 'MieleBKK' },
  { label: languageTranslation('Miele_BKK(NBL)'), value: 'MieleBKK(NBL)' },
  {
    label: languageTranslation('MÜNCHENER_VEREIN_Krankenversicherung_a.G.'),
    value: 'MünchenerVereinKrankenversicherungA.G.',
  },
  {
    label: languageTranslation('Niedersächs.Versorgungsw.d._RA'),
    value: 'Niedersächs.Versorgungsw.d.RA',
  },
  {
    label: languageTranslation(
      'NÜRNBERGER_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'NÜRNBERGERKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation('PAX-FAMILIENFÜRSORGE_KRANKENVERSICHERUNG_AG'),
    value: 'PAX-FAMILIENFÜRSORGEKrankenversicherungAG',
  },
  {
    label: languageTranslation(
      'PRAENATURA_VERSICHERUNGSVEREIN_AUF_GEGENSEITIGKEIT(VVAG)',
    ),
    value: 'praenaturaVersicherungsvereinaufGegenseitigkeit(VVaG)',
  },
  { label: languageTranslation('PRONOVA_BKK'), value: 'pronovaBKK' },
  { label: languageTranslation('PRONOVA_BKK(NBL)'), value: 'pronovaBKK(NBL)' },
  {
    label: languageTranslation('PROVINZIAL_KRANKENVERSICHERUNG_HANNOVER_AG'),
    value: 'ProvinzialKrankenversicherungHannoverAG',
  },
  {
    label: languageTranslation('R+V_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'R+VKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation('Sächsische_Ärzteversorgung'),
    value: 'SächsischeÄrzteversorgung',
  },
  {
    label: languageTranslation('Sächsische_Landesapotkerkammer'),
    value: 'SächsischeLandesapotkerkammer',
  },
  { label: languageTranslation('Salus_BKK'), value: 'SalusBKK' },
  { label: languageTranslation('Salus_BKK(NBL)'), value: 'SalusBKK(NBL)' },
  { label: languageTranslation('SCHWENNINGER_BKK'), value: 'SchwenningerBKK' },
  {
    label: languageTranslation('SCHWENNINGER_BKK(NBL)'),
    value: 'SchwenningerBKK(NBL)',
  },
  { label: languageTranslation('SECURVITA_BKK'), value: 'SECURVITABKK' },
  {
    label: languageTranslation('SECURVITA_BKK(NBL)'),
    value: 'SECURVITABKK(NBL)',
  },
  { label: languageTranslation('SEE-KRANKENKASSE'), value: 'See-Krankenkasse' },
  { label: languageTranslation('SEEKRANKENKASSE'), value: 'Seekrankenkasse' },
  { label: languageTranslation('SIEMENS_BKK(NBL)'), value: 'SiemensBKK(NBL)' },
  { label: languageTranslation('SIEMENS_BKK(SBK)'), value: 'SiemensBKK(SBK)' },
  {
    label: languageTranslation('SIGNAL_KrankenversicherungA.G.'),
    value: 'SIGNALKrankenversicherungA.G.',
  },
  {
    label: languageTranslation('SONO_KrankenversicherungA.G.'),
    value: 'SONOKrankenversicherungA.G.',
  },
  {
    label: languageTranslation(
      'St._Martinus_Priesterverein_d._Diözese Rottenburg-…d_Sterbekasse-(KSK)_Vers.Verein_auf_Gegenseitigk.',
    ),
    value:
      'St.MartinusPriestervereind.DiözeseRottenburg-…dSterbekasse-(KSK)Vers.VereinAufGegenseitigk.',
  },
  {
    label: languageTranslation('Steuerberatervers._Brandenburg'),
    value: 'Steuerberatervers.Brandenburg',
  },
  {
    label: languageTranslation('Steuerberatervers.Nieders.'),
    value: 'Steuerberatervers.Nieders.',
  },
  {
    label: languageTranslation('Süddeutsche_Krankenversicherung_a.G.'),
    value: 'SüddeutscheKrankenversicherunga.G.',
  },
  { label: languageTranslation('TBK_Thüringer_BKK'), value: 'TBKThüringerBKK' },
  {
    label: languageTranslation('TBK_Thüringer_BKK(NBL)'),
    value: 'TBKThüringerBKK(NBL)',
  },
  {
    label: languageTranslation('TECHNIKER_KRANKENKASSE(TK)'),
    value: 'TechnikerKrankenkasse(TK)',
  },
  {
    label: languageTranslation('Tierärztekammer_Nordrhein'),
    value: 'TierärztekammerNordrhein',
  },
  {
    label: languageTranslation('Tierärztevers.Niedersachsen'),
    value: 'Tierärztevers.Niedersachsen',
  },
  {
    label: languageTranslation('Tierärzteversorgung_Meckl./V.'),
    value: 'TierärzteversorgungMeckl./V.',
  },
  {
    label: languageTranslation('UNION_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT'),
    value: 'UnionKrankenversicherungAktiengesellschaft',
  },
  {
    label: languageTranslation('uniVersa_Krankenversicherung_a.G.'),
    value: 'UniVersaKrankenversicherunga.G.',
  },
  {
    label: languageTranslation('Versorgungsw._Zahnärztek._Hamb'),
    value: 'Versorgungsw.Zahnärztek.Hamb',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_APOTH.HESSEN'),
    value: 'VersorgungswerkDerApoth.Hessen',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_APOTH.NRW'),
    value: 'VersorgungswerkDerApoth.NRW',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_APOTH.SCHLESW.H'),
    value: 'VersorgungswerkDerApoth.Schlesw.H',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_APOTH.WESTF/LIP'),
    value: 'VersorgungswerkDerApoth.Westf/Lip',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_ARCH.BAYERN'),
    value: 'VersorgungswerkDerArch.Bayern',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_ARCH.BERLIN'),
    value: 'VersorgungswerkDerArch.Berlin',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_ARCH.NRW'),
    value: 'VersorgungswerkDerArch.NRW',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_ARCH.SACHSEN'),
    value: 'VersorgungswerkDerArch.Sachsen',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_ARCH.STUTTGART'),
    value: 'VersorgungswerkDerArch.Stuttgart',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_ÄRZTEKAMMER_HH'),
    value: 'VersorgungswerkDerÄrztekammerHH',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_LÄK_HESSEN'),
    value: 'VersorgungswerkDerLÄKHessen',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_BADEN-WUERT.'),
    value: 'VersorgungswerkDerRABaden-Wuert.',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_BAYERN'),
    value: 'VersorgungswerkDerRABayern',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_BERLIN'),
    value: 'VersorgungswerkDerRABerlin',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_BRANDENBG'),
    value: 'VersorgungswerkDerRABrandenbg.',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_HAMBURG'),
    value: 'VersorgungswerkDerRAHamburg',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_HESSEN'),
    value: 'VersorgungswerkDerRAHessen',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_MECKLENBG-V.'),
    value: 'VersorgungswerkDerRAMecklenbg-V.',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_NRW'),
    value: 'VersorgungswerkDerRANRW',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_RA_SAARLAND'),
    value: 'VersorgungswerkDerRASaarland',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_STB_SACHSEN'),
    value: 'VersorgungswerkDerStBSachsen',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_STB_SACHSEN-ANH'),
    value: 'VersorgungswerkDerStBSachsen-Anh',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_TIERÄRZTEK.MÜNSTER'),
    value: 'VersorgungswerkDerTierärztek.Münster',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_DER_ZÄK_BERLIN'),
    value: 'VersorgungswerkDerZÄKBerlin',
  },
  {
    label: languageTranslation('VERSORGUNGSWERK_WP_U._BP_NRW'),
    value: 'VersorgungswerkWPu.BPNRW',
  },
  { label: languageTranslation('VIACTIV'), value: 'Viactiv' },
  {
    label: languageTranslation('VIGO_KRANKENVERSICHERUNG_VVAG'),
    value: 'vigoKrankenversicherungVVaG',
  },
  {
    label: languageTranslation(
      'WÜRTTEMBERGISCHE_KRANKENVERSICHERUNG_AKTIENGESELLSCHAFT',
    ),
    value: 'WürttembergischeKrankenversicherungAktiengesellschaft',
  },
];

export const Religion: IReactSelectInterface[] = [
  {
    value: 'EvangelicalChurch(EKD)',
    label: languageTranslation('EVANGELICAL_CHURCH_LABEL'),
  },
  {
    value: 'FreelyReligiousCommunities',
    label: languageTranslation('FREELY_RELIGIOUS_COMMUNITIES_LABEL'),
  },
  {
    value: 'JewishCommunities',
    label: languageTranslation('JEWSIH_COMMUNITIES_LABEL'),
  },
  {
    value: 'CatholicBishopricGermanyOfTheoldCatholicsinGermany',
    label: languageTranslation('CATHOLIC_BISHOPRIC_LABEL'),
  },
  {
    value: 'OthersWithout',
    label: languageTranslation('OTHERS_WITHOUT_LABEL'),
  },
  {
    value: 'RomanCatholicChurch',
    label: languageTranslation('ROMAN_CATHOLIC_CHURCH_LABEL'),
  },
  {
    value: 'UnitarianReligiousCommunityFreeProtestants',
    label: languageTranslation('UNITARIAN_RELIGIOUS_LABEL'),
  },
];

export const Preoccupation: IReactSelectInterface[] = [
  {
    value: 'OtherSidelineActivities',
    label: languageTranslation('OTHER_SIDELINE_ACTIVITIES'),
  },
  { value: 'Officials', label: languageTranslation('OFFICIALS') },
  {
    value: 'BlockwiseTIMyoCE',
    label: languageTranslation('BLOCKWISE_TIMYOCE'),
  },
  {
    value: 'PermanentlyEmployedTIMyoCE',
    label: languageTranslation('PERMANENTLY_EMPLOYED_TIMYOCE'),
  },
  { value: 'Pensioner', label: languageTranslation('PENSIONER') },
  { value: 'PupilStudent', label: languageTranslation('PUPIL_STUDENT') },
  {
    value: 'SelfemployedFreelance',
    label: languageTranslation('SELF_EMPLOYED_FREELANCE'),
  },
  {
    value: 'FullTimeInOtherCompany',
    label: languageTranslation('FULL_TIME_IN_ANOTHER_COMPANY'),
  },
];

export const NightAllowancePerHour: IReactSelectInterface[] = [
  { value: '22:00', label: languageTranslation('FROM_10_PM') },
  { value: '20:00', label: languageTranslation('FROM_8_PM') },
  { value: '20:45', label: languageTranslation('FROM_8:45_PM') },
  { value: '21:00', label: languageTranslation('FROM_9:00_PM') },
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
    label: languageTranslation('DEFAULT_CAREGIVER'),
    value: '12.5',
  },
  {
    label: languageTranslation('PERMANENT_WORKER_12_5_LABEL'),
    value: '12.5',
  },
  {
    label: languageTranslation('PERMANENT_WORKER_14_5_LABEL'),
    value: '14.5',
  },
  {
    label: languageTranslation('PERMANENT_WORKER_20_5_LABEL'),
    value: '20.5',
  },
  {
    label: languageTranslation('PERMANENT_WORKER_23_5_LABEL'),
    value: '23.5',
  },
  {
    label: languageTranslation('PERMANENT_WORKER_25_5_LABEL'),
    value: '25.5',
  },
  {
    label: languageTranslation('PERMANENT_WORKER_26_5_LABEL'),
    value: '26.5',
  },
  {
    label: languageTranslation('PERMANENT_WORKER_27_5_LABEL'),
    value: '27.5',
  },
];

export const CareInstLeasingPriceList: IReactSelectInterface[] = [
  {
    label: languageTranslation('FACILITY_22_5'),
    value: '22.5',
  },
  {
    label: languageTranslation('FACILITY_23_5'),
    value: '23.5',
  },
  {
    label: languageTranslation('FACILITY_25_5'),
    value: '25.5',
  },
];

export const Nationality: IReactSelectInterface[] = [
  { value: 'Albanien', label: languageTranslation('ALBANIEN') },
  { value: 'Belgien', label: languageTranslation('BELGIEN') },
  {
    value: 'BosnienUndHerzegowina',
    label: languageTranslation('BOSNIEN_UND_HERZEGOWINA'),
  },
  { value: 'Bulgarien', label: languageTranslation('BULGARIEN') },
  { value: 'Dänemark', label: languageTranslation('DÄNEMARK') },
  { value: 'Deutschland', label: languageTranslation('DEUTSCHLAND') },
  { value: 'Estland', label: languageTranslation('ESTLAND') },
  { value: 'Finnland', label: languageTranslation('FINNLAND') },
  { value: 'Frankreich', label: languageTranslation('FRANKREICH') },
  { value: 'Ghana', label: languageTranslation('GHANA') },
  { value: 'Griechenland', label: languageTranslation('GRIECHENLAND') },
  { value: 'Großbritannien', label: languageTranslation('GROSSBRITANNIEN') },
  { value: 'Guinea', label: languageTranslation('GUINEA') },
  { value: 'Irland', label: languageTranslation('IRLAND') },
  { value: 'Island', label: languageTranslation('ISLAND') },
  { value: 'Israel', label: languageTranslation('ISRAEL') },
  { value: 'Italien', label: languageTranslation('ITALIEN') },
  { value: 'Kamerun', label: languageTranslation('KAMERUN') },
  { value: 'Kasachstan', label: languageTranslation('KASACHSTAN') },
  { value: 'Kenia', label: languageTranslation('KENIA') },
  { value: 'Kroatien', label: languageTranslation('KROATIEN') },
  { value: 'Kuba', label: languageTranslation('KUBA') },
  { value: 'Lettland', label: languageTranslation('LETTLAND') },
  { value: 'Liechtenstein', label: languageTranslation('LIECHTENSTEIN') },
  { value: 'Litauen', label: languageTranslation('LITAUEN') },
  { value: 'Luxemburg', label: languageTranslation('LUXEMBURG') },
  { value: 'Malta', label: languageTranslation('MALTA') },
  { value: 'Mazedonien', label: languageTranslation('MAZEDONIEN') },
  { value: 'Moldawien', label: languageTranslation('MOLDAWIEN') },
  { value: 'Monaco', label: languageTranslation('MONACO') },
  { value: 'Montenegro', label: languageTranslation('MONTENEGRO') },
  { value: 'Mosambik', label: languageTranslation('MOSAMBIK') },
  { value: 'Niederlande', label: languageTranslation('NIEDERLANDE') },
  { value: 'Nigeria', label: languageTranslation('NIGERIA') },
  { value: 'Norwegen', label: languageTranslation('NORWEGEN') },
  { value: 'Österreich', label: languageTranslation('ÖSTERREICH') },
  { value: 'Papua-Neuguinea', label: languageTranslation('PAPUA-NEUGUINEA') },
  { value: 'Peru', label: languageTranslation('PERU') },
  { value: 'Philippinen', label: languageTranslation('PHILIPPINEN') },
  { value: 'Polen', label: languageTranslation('POLEN') },
  { value: 'Portugal', label: languageTranslation('PORTUGAL') },
  { value: 'Rumänien', label: languageTranslation('RUMÄNIEN') },
  { value: 'Rußland', label: languageTranslation('Rußland') },
  { value: 'Russland', label: languageTranslation('RUSSLAND') },
  { value: 'SanMarino', label: languageTranslation('SAN_MARINO') },
  { value: 'Schweden', label: languageTranslation('SCHWEDEN') },
  { value: 'Schweiz', label: languageTranslation('SCHWEIZ') },
  { value: 'Serbien', label: languageTranslation('SERBIEN') },
  { value: 'Slowakei', label: languageTranslation('SLOWAKEI') },
  { value: 'Slowenien', label: languageTranslation('SLOWENIEN') },
  { value: 'Spanien', label: languageTranslation('SPANIEN') },
  { value: 'SriLanka', label: languageTranslation('SRI_LANKA') },
  { value: 'Syrien', label: languageTranslation('SYRIEN') },
  { value: 'Tschechien', label: languageTranslation('TSCHECHIEN') },
  { value: 'Türkei', label: languageTranslation('TÜRKEI') },
  { value: 'Ukraine', label: languageTranslation('UKRAINE') },
  { value: 'Ungarn', label: languageTranslation('UNGARN') },
  {
    value: 'ungeklärt/staatenlos',
    label: languageTranslation('UNGEKLÄRT/STAATENLOS'),
  },
  { value: 'USA', label: languageTranslation('USA') },
];

export const EmailMenusTab: Array<{ name: string; icon: string }> = [
  { name: languageTranslation('INBOX_LABEL'), icon: 'fa fa-inbox ' },
  { name: languageTranslation('SENT_LABEL'), icon: 'fa fa-send' },
  { name: languageTranslation('NEW_EMAIL_LABEL'), icon: 'fa fa-edit' },
];

export const DocumentTypes: IReactSelectInterface[] = [
  {
    value: 'Registration professional association',
    label: languageTranslation('REGISTRATION_PROFESSIONAL_ASSOCIATION'),
  },
  {
    value: 'Registration health office',
    label: languageTranslation('REGISTRATION_HEALTH_LABEL'),
  },
  {
    value: 'Medical certificate / health certificate',
    label: languageTranslation('MEDICAL_HEALTH_CERTIFICATE'),
  },
  {
    value: 'Exemption from pension insurance',
    label: languageTranslation('EXEMPTION_PENSION_LABEL'),
  },
  {
    value: 'Professional liability insurance (no application)',
    label: languageTranslation('PROFESSIONAL_LIABILITY_LABEL'),
  },
  // { value: 'Various documents', label: 'Various documents' },
  {
    value: 'First-aid pass',
    label: languageTranslation('FIRST_AID_PASS_LABEL'),
  },
  {
    value: 'Driving license car',
    label: languageTranslation('DRIVING_LICENSE_CAR_LABEL'),
  },
  {
    value: 'Business registration',
    label: languageTranslation('BUSINESS_REGISTRATION_LABEL'),
  },
  { value: 'CV / Vita', label: languageTranslation('CV_VITA_LABEL') },
  {
    value: 'Proof of employees subject to social security contributions',
    label: languageTranslation('PROOF_EMPLOYEE_SUBJECT_LABEL'),
  },
  {
    value: 'User agreement (all 5 pages)',
    label: languageTranslation('USER_AGREEMENT_LABEL'),
  },
  {
    value: 'Criminal record certificate',
    label: languageTranslation('CRIMINAL_RECORD_LABEL'),
  },
  {
    value: 'Police certificate of good conduct, expanded',
    label: languageTranslation('POLICE_CERTIFICATE_LABEL'),
  },
  {
    value: 'Framework contract for fixed-term contracts',
    label: languageTranslation('FRAMEWORK_CONTRACT_LABEL'),
  },
  {
    value: 'Governance agreement',
    label: languageTranslation('GOVERNMENT_AGREEMENT_LABEL'),
  },
  {
    value: 'Pension Insurance',
    label: languageTranslation('PENSION_INSURANCE_LABEL'),
  },
  {
    value: 'Certificate / diploma / exam',
    label: languageTranslation('CERTIFICATE_DIPLOMA_LABEL'),
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
export const payGroups: Array<string[]> = [
  ['30', '31', '32', '33', '34', '35'],
  ['36', '37', '38', '39', '40'],
  ['41', '42', '43', '44', '45', '46', '47'],
  ['48', '49', '50', '51', '52', '53', '54'],
  ['59', '55', '56', '57', '58', '60', '62', '63', '64', '65'],
];
