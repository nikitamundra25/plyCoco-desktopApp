import { IReactSelectInterface } from "../interfaces";
import { languageTranslation } from "../helpers";
import { maskArray } from "react-text-mask";

export const PAGE_LIMIT: number = 10;
export const alphaNumeric: RegExp = /^[A-Za-z0-9]+$/;
export const telephoneReqExp: RegExp = /^\(([0-9]{10-13})\)$/;
// /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const IBANReplaceRegex: RegExp = /[^A-Z0-9]/gi;
export const IBANlength: number = 22;
export const telMin: number = 9;
export const telMax: number = 14;
export const mobMin: number = 10;
export const mobMax: number = 12;
export const fileSize: number = 1 * 1024 * 1024;
export const nameRegExp: RegExp = /^[A-Za-z][A-Za-z ]+$/;
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
  { value: "Director", label: "Director" },
  { value: "Pesident", label: "Pesident" },
  { value: "vicePesident", label: "Vice Pesident" },
  { value: "Nursing", label: "Nursing" }
];
export const InvoiceType: IReactSelectInterface[] = [
  { value: "byEmailsWithoutDocuments", label: "By emails without documents" },
  { value: "byEmailWithDocuments", label: "By email with documents" },
  {
    value: "byPost+EmailWithoutDocuments",
    label: "By post + email without documents"
  },
  {
    value: "byPost+EmailsWithDocuments",
    label: "By post + email with documents"
  },
  {
    value: "oneEmailForEachInvoice",
    label: "One Email For Each Invoice"
  },
  {
    value: "oneEmailForEachInvoiceInclWorkingProof",
    label: "one Email For Each Invoice Incl. Working Proof"
  },
  {
    value: "viaEmailWithoutWorkProof",
    label: "Via Email Without Work Proof"
  },
  {
    value: "viaEmailWithWorkProof",
    label: "via Email With Work Proof"
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
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];
export const Department: IReactSelectInterface[] = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Designing", label: "Designing" },
  { value: "Development", label: "Development" },
  { value: "HR", label: "HR" }
];
export const Region: IReactSelectInterface[] = [
  { value: "CentralGermany", label: "Central Germany" },
  { value: "Cologne", label: "Cologne" },
  { value: "Frankfurt", label: "Frankfurt" },
  { value: "NorthernGermany", label: "Northern Germany" },
  { value: "LowerSaxony", label: "Lower Saxony" },
  { value: "Munich", label: "Munich" }
];
export const City: IReactSelectInterface[] = [
  { value: "Dortmund", label: "Dortmund" },
  { value: "Wiesbaden", label: "Wiesbaden" },
  { value: "Bochum", label: "Bochum" },
  { value: "Kiel", label: "Kiel" },
  { value: "LowerSaxony", label: "Lower Saxony" },
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
  { value: "careGiver", label: "Care giver" },
  { value: "anesthesiaAssistance", label: "Anesthesia Assistance" },
  { value: "doctorAttentionCommission", label: "Doctor Attention commission" },
  { value: "medicalAssistance", label: "Medical Assistance" },
  { value: "Dialysis", label: "Dialysis" },
  { value: "Individual", label: "Individual" },
  { value: "Endoscopy", label: "Endoscopy" },
  { value: "Obstetrics", label: "Obstetrics" },
  { value: "HKP", label: "HKP (Home nursing)" },
  { value: "Midwife/Delivery", label: "Midwife/Delivery" },
  { value: "Heilerizehungspfleger", label: "Heilerizehungspfleger" },
  { value: "HomeVentilationAll", label: "Home ventilation all" },
  { value: "HomeVentilationKS", label: "Home ventilation KS" },
  { value: "HomeManagement", label: "Home Management" },
  {
    value: "CardiacCatheterizationLaboratory",
    label: "Cardiac catheterization laboratory"
  },
  { value: "Hygiene", label: "Hygiene" },
  { value: "Intensive", label: "Intensive" },
  { value: "IntermediateCare", label: "IMC (Intermediate care)" },
  { value: "ChildrenIntensive", label: "Children intensive" },
  { value: "Nurse", label: "Nurse/carer" },
  { value: "MTRA", label: "MTRA (Medical – technical radiology assistant)" },
  { value: "Neonatology", label: "Neonatology" },
  { value: "OP", label: "OP" },
  { value: "OTA", label: "OTA" },
  { value: "PalliativeCare", label: "Palliative care" },
  { value: "PDL", label: "PDL" },
  {
    value: "NursingAssistant",
    label: "Nursing assistant (Former household manager)"
  },
  { value: "Physiotherapist", label: "Physiotherapist" },
  { value: "Psychiatry", label: "Psychiatry" },
  { value: "Paramedic", label: "Paramedic" },
  { value: "EmergencyDepartment", label: "Emergency department" },
  { value: "Wohnbereichsleitung", label: "Wohnbereichsleitung" },
  { value: "WoundManagement", label: "Wound Management" }
];
export const Hours: IReactSelectInterface[] = [
  { value: "12", label: "12" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" }
];
// export const BankAccount =[
//   { value: "DeutscheBank", label: "Deutsche Bank" },
//   { value: "Commerzbank", label: "Commerzbank" },
//   { value: "KFWBankgruppe", label: "KFW Bankgruppe" },
//   { value: "DZBank", label: "DZ Bank" },
//   { value: "NRWBank", label: "NRW Bank" }
// ]

export const CalculationInterval: IReactSelectInterface[] = [
  { value: "MonthlyTo1", label: "Monthly to 1" },
  { value: "Bi-monthlyToThe1&16", label: "Bi-monthly to the 1 & 16" },
  { value: "WeeklyOnMondays", label: "Weekly on Mondays" }
];
export const Supplements: IReactSelectInterface[] = [
  { value: "Exclusive", label: "Exclusive" },
  { value: "Cumulative", label: "Cumulative" }
];
export const Nationality: IReactSelectInterface[] = [
  { value: "Germans", label: "Germans" },
  { value: "Hungarians", label: "Hungarians" },
  { value: "Russians", label: "Russians" },
  { value: "Basques", label: "Basques" },
  { value: "Albanien", label: "Albanien" },
  { value: "Dänemark", label: "Dänemark" }
];
export const MaritalStatus: IReactSelectInterface[] = [
  { value: "Divorced", label: "Divorced" },
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "PermanentlySeparated", label: "Married, Permanently separated" },
  { value: "Widowed", label: "Widowed" }
];
export const HealthInsuranceType: IReactSelectInterface[] = [
  { value: "VoluntarilyInsuredByLaw", label: "Voluntarily insured by law" },
  { value: "LegallyInsured", label: "Legally insured" },
  { value: "PrivatelyInsured", label: "Privately insured" }
];

export const HealthInsuranceProvider: IReactSelectInterface[] = [
  { value: "VigoHealthInsuranceVVaG", label: "Vigo Health Insurance VVaG" },
  {
    value: "UnionHealthInsuranceCompany",
    label: "Union Health insurance company"
  }
];

export const Religion: IReactSelectInterface[] = [
  { value: " EvangelicalChurch(EKD)", label: "Evangelical Church (EKD)" },
  {
    value: "FreelyReligiousCommunities",
    label: "Freely religious communities"
  },
  { value: "JewishCommunities", label: "Jewish Communities" },
  {
    value: "CatholicBishopricGermany",
    label: "Catholic bishopric of the old Catholics in Germany"
  },
  { value: "othersWithout", label: "Others without" },
  { value: " RomanCatholicChurch", label: " Roman Catholic church" },
  {
    value: " UnitarianReligiousCommunityFreeProtestants",
    label: " Unitarian Religious Community Free Protestants"
  }
];

export const Preoccupation: IReactSelectInterface[] = [
  { value: "OtherSidelineActivities", label: "Other sideline activities" },
  { value: "Officials", label: "Officials" },
  { value: "BlockwiseSolona", label: "Blockwise solona" },
  { value: "PermanentlyEmployedSolona", label: "Permanently employed solona" },
  { value: "Pensioner", label: "Pensioner" },
  { value: "PupilStudent", label: "Pupil student" },
  { value: "Self-employed/Freelance", label: "Self-employed/Freelance" },
  {
    value: "FullyEmployedInOtherCompany",
    label: "Fully employed in other company"
  }
];

export const NightAllowancePerHour: IReactSelectInterface[] = [
  { value: "From22oclock", label: "From 22 o'clock" },
  { value: "From8pm", label: "From 8 p.m." },
  { value: "From8:45pm", label: "From 8:45 p.m." },
  { value: "From9pm", label: "From 9 p.m." }
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
