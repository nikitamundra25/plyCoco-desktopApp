import { IReactSelectInterface } from "../interfaces";
import { languageTranslation } from "../helpers";
import { maskArray } from "react-text-mask";

export const PAGE_LIMIT: number = 10;
export const alphaNumeric: RegExp = /^[A-Za-z0-9 ]+$/;
export const telephoneReqExp: RegExp = /^\(([0-9]{10-13})\)$/;
// /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const IBANReplaceRegex: RegExp = /[^A-Z0-9]/gi;
export const IBANlength: number = 22;
export const telMin: number = 9;
export const telMax: number = 14;
export const mobMin: number = 9;
export const mobMax: number = 14;
export const fileSize: number = 1 * 1024 * 1024;
export const SupportedFormats: string[] = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png"
];
export const IBANRegex: maskArray = [
  /[A-Za-z]/,
  /[A-Za-z]/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/
];

export const DateMask: maskArray = [
  /[0-9]/,
  /\d/,
  "/",
  /\d/,
  /\d/,
  "/",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];

export const Status: IReactSelectInterface[] = [
  { value: "true", label: languageTranslation("ACTIVE") },
  { value: "false", label: languageTranslation("DISABLE") }
];

export const webRegExp: RegExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

export const ContactType: IReactSelectInterface[] = [
  { value: "Medical director", label: "Medical director" },
  { value: "Bookkeeper", label: "Bookkeeper" },
  { value: "Head physician", label: "Head physician" },
  { value: "Director", label: "Director" },
  { value: "Managing director", label: "Managing director" },
  { value: "Nursing home director", label: "Nursing home director" },
  { value: "Assistant medical director", label: "Assistant medical director" },
  {
    value: "Head of the nursing service",
    label: "Head of the nursing service"
  },
  {
    value: "Head of the nursing service",
    label: "Head of the nursing service"
  },
  {
    value: "Assitant to the head of the nursing service",
    label: "Assitant to the head of the nursing service"
  },
  { value: "Guesthouse", label: "Guesthouse" },
  { value: "HR department", label: "HR department" },
  { value: "Health care director", label: "Health care director" },
  { value: "Practice manager", label: "Practice manager" },
  { value: "General manager", label: "General manager" },
  { value: "Secretary", label: "Secretary" },
  { value: "Other", label: "Other" },
  { value: "Vice director", label: "Vice director" },
  { value: "Administration department", label: "Administration department" },
  { value: "Headquarter", label: "Headquarter" },
  { value: "Branch office", label: "Branch office" }
];
export const InvoiceType: IReactSelectInterface[] = [
  {
    value: "By emails without documents",
    label: "By emails without documents"
  },
  { value: "By email with documents", label: "By email with documents" },
  {
    value: "By post + email without documents",
    label: "By post + email without documents"
  },
  {
    value: "By post + email with documents",
    label: "By post + email with documents"
  },
  {
    value: "One Email For Each Invoice",
    label: "One Email For Each Invoice"
  },
  {
    value: "One Email For Each Invoice Incl. Working Proof",
    label: "One Email For Each Invoice Incl. Working Proof"
  },
  {
    value: "Via Email Without Work Proof",
    label: "Via Email Without Work Proof"
  },
  {
    value: "via Email With Work Proof",
    label: "via Email With Work Proof"
  }
];

export const CareInstitutionContactAttribute: IReactSelectInterface[] = [
  {
    label: "Acquisition only twice a year",
    value: "Acquisition only twice a year"
  },
  {
    label: "Acquire block 1 - 5",
    value: "Acquire block 1 - 5"
  },
  {
    label: "Need skilled workers → yellow",
    value: "Need skilled workers → yellow"
  },
  {
    label: "Incorrect data set → black with white text",
    value: "Incorrect data set → black with white text"
  },
  {
    label: "Information mail sent → yellow",
    value: "Information mail sent → yellow"
  },
  {
    label: "Would info by email → yellow",
    value: "Would info by email → yellow"
  },
  {
    label: "Would info by callback → Yellow",
    value: "Would info by callback → Yellow"
  },
  {
    label: "Do not want to contact anymore → black with white text",
    value: "Do not want to contact anymore → black with white text"
  },
  {
    label: "Currently no interest → Yellow",
    value: "Currently no interest → Yellow"
  },
  {
    label: "Not available → black with white text",
    value: "Not available → black with white text"
  }
];

export const CareGiveAttributes: IReactSelectInterface[] = [
  {
    label: "Offers",
    value: "Offers"
  },
  {
    label: "Single-book button",
    value: "Single-book button"
  },
  {
    label: "Leasing is not possible",
    value: "Leasing is not possible"
  },
  {
    label: "Unlocked",
    value: "Unlocked"
  },
  {
    label: "Permanent employment",
    value: "Permanent employment"
  },
  {
    label: "entry certificate of good conduct",
    value: "entry certificate of good conduct"
  },
  {
    label: "TIMyoCY",
    value: "TIMyoCY"
  },
  {
    label: "Login possible",
    value: "Login possible"
  },
  {
    label:
      "Signed TIMyoCY (automatically starts when the framework contract is signed)",
    value:
      "Signed TIMyoCY (automatically starts when the framework contract is signed)"
  },
  {
    label: "Car available",
    value: "Car available"
  },
  {
    label: "Man",
    value: "Man"
  },
  {
    label: "Woman",
    value: "Woman"
  },
  {
    label: "Driver's license available",
    value: "Driver's license available"
  },
  {
    label: "Nationwide",
    value: "Nationwide"
  },
  {
    label:
      "Nursing assistant (former household manager) / Care professional (formerly nurse) / doctor",
    value:
      "Nursing assistant (former household manager) / Care professional (formerly nurse) / doctor"
  },
  {
    label: "Woman (is set automatically after registration)",
    value: "Woman (is set automatically after registration)"
  },
  {
    label: "Man (is set automatically after registration)",
    value: "Man (is set automatically after registration)"
  },
  {
    label: "Car available",
    value: "Car available"
  }
];

export const CareInstitutionAttr: IReactSelectInterface[] = [
  {
    label: "Single-book button → pale turquoise",
    value: "Single-book button → pale turquoise"
  },
  {
    label: "Unlocked → pale turquoise",
    value: "Unlocked → pale turquoise"
  },
  {
    label: "Login possible → pale turquoise",
    value: "Login possible → pale turquoise"
  },
  {
    label: "Currently no appointment requirements",
    value: "Currently no appointment requirements"
  },
  {
    label: "Plycoco → Orange as from the logo",
    value: "Plycoco → Orange as from the logo"
  },
  {
    label: "TIMyoCY → Pink / Fuchsia",
    value: "TIMyoCY → Pink / Fuchsia"
  },
  {
    label: "TIM by post",
    value: "TIM by post"
  }
];

export const InvoiceInterval: IReactSelectInterface[] = [
  { value: "Monthly for the 1st", label: "Monthly for the 1st" },
  { value: "Semimonthly for 1 and 16", label: "Semimonthly for 1 and 16" },
  {
    value: "Weekly Mondays",
    label: "Weekly Mondays"
  }
];
export const State: IReactSelectInterface[] = [
  { value: "Thuringia", label: "Thuringia" },
  { value: "Bavaria", label: "Bavaria" },
  { value: "Hamburg", label: "Hamburg" },
  { value: "Saarland", label: "Saarland" },
  { value: "Saxony", label: "Saxony" }
];
export const Gender: IReactSelectInterface[] = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" }
];
export const Department: IReactSelectInterface[] = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Designing", label: "Designing" },
  { value: "Development", label: "Development" },
  { value: "HR", label: "HR" }
];
export const Region: IReactSelectInterface[] = [
  { value: "Central Germany", label: "Central Germany" },
  { value: "Cologne", label: "Cologne" },
  { value: "Frankfurt", label: "Frankfurt" },
  { value: "Northern Germany", label: "Northern Germany" },
  { value: "Lower Saxony", label: "Lower Saxony" },
  { value: "Munich", label: "Munich" }
];
export const City: IReactSelectInterface[] = [
  { value: "Dortmund", label: "Dortmund" },
  { value: "Wiesbaden", label: "Wiesbaden" },
  { value: "Bochum", label: "Bochum" },
  { value: "Kiel", label: "Kiel" },
  { value: "Lower Saxony", label: "Lower Saxony" },
  { value: "Berlin", label: "Berlin" }
];
export const Salutation: IReactSelectInterface[] = [
  { value: "Sir", label: "Sir" },
  { value: "Madam", label: "Madam" }
];
export const Country: IReactSelectInterface[] = [
  { value: "Denmark", label: "Denmark" },
  { value: "Poland", label: "Poland" },
  { value: "Czechia", label: "Czechia" },
  { value: "France", label: "France" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Austria", label: "Austria" }
];
export const LegalForm: IReactSelectInterface[] = [
  { value: "Individual", label: "Individual" },
  { value: "UG", label: "UG" },
  { value: "GmbH", label: "GmbH" },
  { value: "Ltd.", label: "Ltd." },
  { value: "GbR", label: "GbR" }
];

export const QualificationAttributes: IReactSelectInterface[] = [
  { value: "Care Giver", label: "Care giver" },
  { value: "Anesthesia Assistance", label: "Anesthesia Assistance" },
  {
    value: "Doctor Attention commission",
    label: "Doctor Attention commission"
  },
  { value: "Medical Assistance", label: "Medical Assistance" },
  { value: "Dialysis", label: "Dialysis" },
  { value: "Individual", label: "Individual" },
  { value: "Endoscopy", label: "Endoscopy" },
  { value: "Obstetrics", label: "Obstetrics" },
  { value: "HKP (Home nursing)", label: "HKP (Home nursing)" },
  { value: "Midwife/Delivery", label: "Midwife/Delivery" },
  { value: "Heilerizehungspfleger", label: "Heilerizehungspfleger" },
  { value: "Home ventilation all", label: "Home ventilation all" },
  { value: "Home ventilation KS", label: "Home ventilation KS" },
  { value: "Home Management", label: "Home Management" },
  {
    value: "Cardiac Catheterization Laboratory",
    label: "Cardiac catheterization laboratory"
  },
  { value: "Hygiene", label: "Hygiene" },
  { value: "Intensive", label: "Intensive" },
  { value: "IMC (Intermediate care)", label: "IMC (Intermediate care)" },
  { value: "Children Intensive", label: "Children intensive" },
  { value: "Nurse/carer", label: "Nurse/carer" },
  {
    value: "MTRA (Medical – technical radiology assistant)",
    label: "MTRA (Medical – technical radiology assistant)"
  },
  { value: "Neonatology", label: "Neonatology" },
  { value: "OP", label: "OP" },
  { value: "OTA", label: "OTA" },
  { value: "Palliative Care", label: "Palliative care" },
  { value: "PDL", label: "PDL" },
  {
    value: "Nursing Assistant (Former household manager)",
    label: "Nursing assistant (Former household manager)"
  },
  { value: "Physiotherapist", label: "Physiotherapist" },
  { value: "Psychiatry", label: "Psychiatry" },
  { value: "Paramedic", label: "Paramedic" },
  { value: "Emergency Department", label: "Emergency department" },
  { value: "Wohnbereichsleitung", label: "Wohnbereichsleitung" },
  { value: "Wound Management", label: "Wound Management" }
];
export const Hours: IReactSelectInterface[] = [
  { value: "12", label: "12" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" }
];
export const CalculationInterval: IReactSelectInterface[] = [
  { value: "Monthly to 1", label: "Monthly to 1" },
  { value: "Bi-monthly to the 1 & 16", label: "Bi-monthly to the 1 & 16" },
  { value: "Weekly On Mondays", label: "Weekly on Mondays" }
];
export const Supplements: IReactSelectInterface[] = [
  { value: "Exclusive", label: "Exclusive" },
  { value: "Cumulative", label: "Cumulative" }
];
export const Nationality: IReactSelectInterface[] = [
  { value: "Albania", label: "Albania" },
  { value: "Belgium", label: "Belgium" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Denmark", label: "Denmark" },
  { value: "Germany", label: "Germany" },
  { value: "Estonia", label: "Estonia" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Ghana", label: "Ghana" },
  { value: "Greece", label: "Greece" },
  { value: "Great Britain", label: "Great Britain" },
  { value: "Guinea", label: "Guinea" }
];
export const MaritalStatus: IReactSelectInterface[] = [
  { value: "Divorced", label: "Divorced" },
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  {
    value: "Married, Permanently separated",
    label: "Married, Permanently separated"
  },
  { value: "Widowed", label: "Widowed" }
];
export const HealthInsuranceType: IReactSelectInterface[] = [
  { value: "Voluntarily Insured By Law", label: "Voluntarily insured by law" },
  { value: "Legally Insured", label: "Legally insured" },
  { value: "Privately Insured", label: "Privately insured" }
];

export const HealthInsuranceProvider: IReactSelectInterface[] = [
  { value: "Vigo Health Insurance VVaG", label: "Vigo Health Insurance VVaG" },
  {
    value: "Union Health Insurance Company",
    label: "Union Health insurance company"
  }
];

export const Religion: IReactSelectInterface[] = [
  { value: " Evangelical Church (EKD)", label: "Evangelical Church (EKD)" },
  {
    value: "Freely Religious Communities",
    label: "Freely religious communities"
  },
  { value: "Jewish Communities", label: "Jewish Communities" },
  {
    value: "Catholic Bishopric Germany of the old Catholics in Germany",
    label: "Catholic bishopric of the old Catholics in Germany"
  },
  { value: "Others Without", label: "Others without" },
  { value: " Roman Catholic Church", label: " Roman Catholic church" },
  {
    value: " Unitarian Religious Community Free Protestants",
    label: " Unitarian Religious Community Free Protestants"
  }
];

export const Preoccupation: IReactSelectInterface[] = [
  { value: "Other Sideline Activities", label: "Other sideline activities" },
  { value: "Officials", label: "Officials" },
  { value: "Blockwise TIMyoCE", label: "Blockwise TIMyoCE" },
  {
    value: "Permanently Employed TIMyoCE",
    label: "Permanently employed TIMyoCE"
  },
  { value: "Pensioner", label: "Pensioner" },
  { value: "PupilStudent", label: "Pupil student" },
  { value: "Self-employed/Freelance", label: "Self-employed/Freelance" },
  {
    value: "FullyEmployedInOtherCompany",
    label: "Fully employed in other company"
  }
];

export const NightAllowancePerHour: IReactSelectInterface[] = [
  { value: "From 22 o'clock", label: "From 22 o'clock" },
  { value: "From 8 p.m.", label: "From 8 p.m." },
  { value: "From 8:45 p.m.", label: "From 8:45 p.m." },
  { value: "From 9 p.m", label: "From 9 p.m." }
];

export const CareGiver: IReactSelectInterface[] = [
  { value: "us10", label: "Freida Morby" },
  { value: "us7", label: "Gerhard Reinhard" },
  { value: "us8", label: "Hazlett Kite" },
  { value: "us1", label: "John Doe" },
  { value: "us3", label: "Lisa Hayde" },
  { value: "us4", label: "melita Giraldez" },
  { value: "us9", label: "Obed Helian" },
  { value: "us2", label: "Stark Smith" },
  { value: "us6", label: "Tierney St. Louis" },
  { value: "us5", label: "Ula Luckin" }
];

export const Priority: IReactSelectInterface[] = [
  { value: "Low", label: languageTranslation("LOW") },
  { value: "Normal", label: languageTranslation("NORMAL") },
  { value: "High", label: languageTranslation("HIGH") }
];
export const SortOptions: IReactSelectInterface[] = [
  {
    label: languageTranslation("SORTBY_OPTION3"),
    value: "3"
  },
  {
    label: languageTranslation("SORTBY_OPTION4"),
    value: "4"
  },
  {
    label: languageTranslation("SORTBY_OPTION1"),
    value: "1"
  },
  {
    label: languageTranslation("SORTBY_OPTION2"),
    value: "2"
  }
];

export const StatusOptions: IReactSelectInterface[] = [
  {
    label: languageTranslation("ACTIVE"),
    value: "true"
  },
  {
    label: languageTranslation("DISABLE"),
    value: "false"
  }
];

export const LeasingPriceList: IReactSelectInterface[] = [
  {
    label: "Standard nurse",
    value: "Standard nurse"
  },
  {
    label: "Permanent employees 12,50",
    value: "Permanent employees 12,50"
  },
  {
    label: "MediTech",
    value: "MediTech"
  },
  {
    label: "Salaried 27,00",
    value: "Salaried 27,00"
  },
  {
    label: "Salaried 25,00",
    value: "Salaried 25,00"
  },
  {
    label: "Salaried 20,00",
    value: "Salaried 20,00"
  },
  {
    label: "Salaried 23,50",
    value: "Salaried 23,50"
  },
  {
    label: "Salaried 14,50",
    value: "Salaried 14,50"
  },
  {
    label: "Salaried 26,00",
    value: "Salaried 26,00"
  }
];
