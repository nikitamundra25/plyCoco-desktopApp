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
    label: "Offers → Blass Rosé",
    value: "Offers → Blass Rosé"
  },
  {
    label: "Single-book button → pale turquoise",
    value: "Single-book button → pale turquoise"
  },
  {
    label: "Leasing is not possible",
    value: "Leasing is not possible"
  },
  {
    label: "Unlocked → pale turquoise",
    value: "Unlocked → pale turquoise"
  },
  {
    label: "Permanent employment → Purple",
    value: "Permanent employment → Purple"
  },
  {
    label: "entry certificate of good conduct → fire red",
    value: "entry certificate of good conduct → fire red"
  },
  {
    label: "TIMyoCY → Pink / Fuchsia",
    value: "TIMyoCY → Pink / Fuchsia"
  },
  {
    label: "Login possible → pale turquoise",
    value: "Login possible → pale turquoise"
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
  { value: "actimonda BKK", label: "actimonda BKK" },
  { value: "actimonda BKK (NBL)", label: "actimonda BKK (NBL)" },
  {
    value: "AKA Augenoptiker Ausgl.kasse",
    label: "AKA Augenoptiker Ausgl.kasse"
  },
  {
    value: "Allianz Private Krankenversicherungs-Aktiengesellschaft",
    label: "Allianz Private Krankenversicherungs-Aktiengesellschaft"
  },
  {
    value: "ALTE OLDENBURGER Krankenversicherung AG",
    label: "ALTE OLDENBURGER Krankenversicherung AG"
  },
  {
    value:
      "ALTE OLDENBURGER Krankenversicherung von 1927 Versicherungsverein auf Gegenseitigkeit",
    label:
      "ALTE OLDENBURGER Krankenversicherung von 1927 Versicherungsverein auf Gegenseitigkeit"
  },
  {
    value: "AOK Baden-Wtbg./Neckar-Fils",
    label: "AOK Baden-Wtbg./Neckar-Fils"
  },
  { value: "AOK Baden-Württemberg", label: "AOK Baden-Württemberg" },
  { value: "AOK Bayern", label: "AOK Bayern" },
  { value: "AOK Bremen/Bremerhaven", label: "AOK Bremen/Bremerhaven" },
  { value: "AOK Hessen", label: "AOK Hessen" },
  { value: "AOK Niedersachsen", label: "AOK Niedersachsen" },
  { value: "AOK Nienburg/Weser", label: "AOK Nienburg/Weser" },
  { value: "AOK Nordost (Berlin)", label: "AOK Nordost (Berlin)" },
  { value: "AOK Nordost (Brandenburg)", label: "AOK Nordost (Brandenburg)" },
  { value: "AOK Nordost (Meckl.-Vorp.)", label: "AOK Nordost (Meckl.-Vorp.)" },
  {
    value: "AOK NordWest (Schlesw.-Holst.)",
    label: "AOK NordWest (Schlesw.-Holst.)"
  },
  {
    value: "AOK NordWest (Westf.-Lippe)",
    label: "AOK NordWest (Westf.-Lippe)"
  },
  { value: "AOK Plus (Sachsen)", label: "AOK Plus (Sachsen)" },
  { value: "AOK Plus (Thüringen)", label: "AOK Plus (Thüringen)" },
  {
    value: "AOK Rheinl.-Pf./Saarl.(Rh-Pf.)",
    label: "AOK Rheinl.-Pf./Saarl.(Rh-Pf.)"
  },
  {
    value: "AOK Rheinl.-Pf./Saarl.(Saarl.)",
    label: "AOK Rheinl.-Pf./Saarl.(Saarl.)"
  },
  { value: "AOK Rheinland/Hamburg", label: "AOK Rheinland/Hamburg" },
  { value: "AOK Sachsen-Anhalt", label: "AOK Sachsen-Anhalt" },
  {
    value: "Apotheker-Versorgung Berlin",
    label: "Apotheker-Versorgung Berlin"
  },
  {
    value: "Apothekerversorgung Meck-Pomm",
    label: "Apothekerversorgung Meck-Pomm"
  },
  {
    value: "Apothekerversorgung Nieders.",
    label: "Apothekerversorgung Nieders."
  },
  {
    value: "ARAG Krankenversicherungs-Aktiengesellschaft",
    label: "ARAG Krankenversicherungs-Aktiengesellschaft"
  },
  { value: "Ärzteversorgung Berlin", label: "Ärzteversorgung Berlin" },
  {
    value: "Ärzteversorgung Land Brdbg.",
    label: "Ärzteversorgung Land Brdbg."
  },
  {
    value: "Ärzteversorgung Niedersachsen",
    label: "Ärzteversorgung Niedersachsen"
  },
  { value: "Ärzteversorgung Nordrhein", label: "Ärzteversorgung Nordrhein" },
  {
    value: "Ärzteversorgung Sachsen-Anhalt",
    label: "Ärzteversorgung Sachsen-Anhalt"
  },
  { value: "atlas BKK ahlmann", label: "atlas BKK ahlmann" },
  {
    value: "Augenoptiker Ausgleichskasse VVaG (AKA)",
    label: "Augenoptiker Ausgleichskasse VVaG (AKA)"
  },
  {
    value: "AXA Krankenversicherung Aktiengesellschaft",
    label: "AXA Krankenversicherung Aktiengesellschaft"
  },
  { value: "BAHN BKK", label: "BAHN BKK" },
  { value: "BAHN BKK (NBL)", label: "BAHN BKK (NBL)" },
  {
    value: "Barmenia Krankenversicherung a.G.",
    label: "Barmenia Krankenversicherung a.G."
  },
  { value: "BARMER", label: "BARMER" },
  {
    value: "BaWü Versorg.anst.Ärzte/ZÄ/TÄ",
    label: "BaWü Versorg.anst.Ärzte/ZÄ/TÄ"
  },
  { value: "Bay. Apothekerversorgung", label: "Bay. Apothekerversorgung" },
  {
    value: "Bayerische Apothekerversorgung",
    label: "Bayerische Apothekerversorgung"
  },
  { value: "Bayerische Ärzteversorgung", label: "Bayerische Ärzteversorgung" },
  {
    value: "Bayerische Beamtenkrankenkasse Aktiengesellschaft",
    label: "Bayerische Beamtenkrankenkasse Aktiengesellschaft"
  },
  { value: "Bertelsmann BKK", label: "Bertelsmann BKK" },
  { value: "Bertelsmann BKK (NBL)", label: "Bertelsmann BKK (NBL)" },
  { value: "BIG direkt gesund", label: "BIG direkt gesund" },
  { value: "BIG direkt gesund (NBL)", label: "BIG direkt gesund (NBL)" },
  { value: "BKK A.T.U. (NBL)", label: "BKK A.T.U. (NBL)" },
  { value: "BKK Achenbach Buschhütten", label: "BKK Achenbach Buschhütten" },
  { value: "BKK advita", label: "BKK advita" },
  { value: "BKK advita (NBL)", label: "BKK advita (NBL)" },
  { value: "BKK AESCULAP", label: "BKK AESCULAP" },
  { value: "BKK Akzo Nobel", label: "BKK Akzo Nobel" },
  { value: "BKK Audi", label: "BKK Audi" },
  { value: "BKK Audi (NBL)", label: "BKK Audi (NBL)" },
  { value: "BKK B. Braun Melsungen", label: "BKK B. Braun Melsungen" },
  { value: "BKK BENTELER AG", label: "BKK BENTELER AG" },
  { value: "BKK BMW AG", label: "BKK BMW AG" },
  { value: "BKK BMW-AG (NBL)", label: "BKK BMW-AG (NBL)" },
  { value: "BKK Bosch", label: "BKK Bosch" },
  { value: "BKK Bosch (NBL)", label: "BKK Bosch (NBL)" },
  { value: "BKK BPW Wiehl", label: "BKK BPW Wiehl" },
  { value: "BKK Brandenburgische", label: "BKK Brandenburgische" },
  { value: "BKK Braun-Gilette", label: "BKK Braun-Gilette" },
  { value: "BKK Continentale", label: "BKK Continentale" },
  { value: "BKK d. G.M. Pfaff AG", label: "BKK d. G.M. Pfaff AG" },
  { value: "BKK Debeka", label: "BKK Debeka" },
  { value: "BKK Debeka (NBL)", label: "BKK Debeka (NBL)" },
  {
    value: "BKK der MTU Friedrichshafen",
    label: "BKK der MTU Friedrichshafen"
  },
  { value: "BKK der SIEMAG", label: "BKK der SIEMAG" },
  { value: "BKK Deutsche Bank AG", label: "BKK Deutsche Bank AG" },
  { value: "BKK Deutsche Bank AG (NBL)", label: "BKK Deutsche Bank AG (NBL)" },
  { value: "BKK Diakonie", label: "BKK Diakonie" },
  { value: "BKK Diakonie NBL", label: "BKK Diakonie NBL" },
  { value: "BKK Die Bergische", label: "BKK Die Bergische" },
  { value: "BKK Dürkopp Adler", label: "BKK Dürkopp Adler" },
  { value: "BKK Ernst &amp; Young", label: "BKK Ernst &amp; Young" },
  { value: "BKK EUREGIO", label: "BKK EUREGIO" },
  { value: "BKK EWE", label: "BKK EWE" },
  { value: "BKK EWE (NBL)", label: "BKK EWE (NBL)" },
  { value: "BKK exklusiv", label: "BKK exklusiv" },
  { value: "BKK exklusiv (NBL)", label: "BKK exklusiv (NBL)" },
  { value: "BKK Faber-Castell", label: "BKK Faber-Castell" },
  { value: "BKK firmus", label: "BKK firmus" },
  { value: "BKK firmus (NBL)", label: "BKK firmus (NBL)" },
  { value: "BKK Freudenberg", label: "BKK Freudenberg" },
  { value: "BKK für Umwelt und Bauen", label: "BKK für Umwelt und Bauen" },
  { value: "BKK G&amp;V", label: "BKK G&amp;V" },
  {
    value: "BKK Gildemeister/Seidenst.(NBL)",
    label: "BKK Gildemeister/Seidenst.(NBL)"
  },
  {
    value: "BKK Gildemeister/Seidensticker",
    label: "BKK Gildemeister/Seidensticker"
  },
  { value: "BKK Grillo Werke", label: "BKK Grillo" },
  { value: "BKK Groz-Beckert", label: "BKK Groz-B" },
  { value: "BKK Hapag-Lloyd Bremen", label: "BKK Hapag-Lloyd " },
  { value: "BKK HEAG", label: "BK" },
  { value: "BKK Henschel Plus", label: "BKK Hensche" },
  { value: "BKK Herkules", label: "BKK He" },
  { value: "BKK HMR", label: "B" },
  { value: "BKK INOVITA", label: "BKK I" },
  { value: "BKK INOVITA (NBL)", label: "BKK INOVITA" },
  { value: "BKK Karl Mayer GmbH", label: "BKK Karl Mayer" },
  { value: "BKK KBA", label: "BK" },
  { value: "BKK KBA (NBL)", label: "BKK KBA " },
  { value: "BKK Knoll AG", label: "BKK Kno" },
  { value: "BKK Linde", label: "BKK " },
  { value: "BKK Linde (NBL)", label: "BKK Linde " },
  { value: "BKK Logistik", label: "BKK Log" },
  { value: "BKK Logistik (NBL)", label: "BKK Logistik " },
  { value: "BKK Mahle", label: "BKK " },
  { value: "BKK MEDICUS OST", label: "BKK MEDICU" },
  { value: "BKK Melitta Plus", label: "BKK Melitta" },
  { value: "BKK MEM", label: "BK" },
  { value: "BKK Merck", label: "BKK " },
  { value: "BKK Metzinger", label: "BKK Metz" },
  { value: "BKK mhplus", label: "BKK m" },
  { value: "BKK mhplus (NBL)", label: "BKK mhplus " },
  { value: "BKK Mobil Oil", label: "BKK Mobi" },
  { value: "BKK NOVITAS", label: "BKK NO" },
  { value: "BKK NOVITAS (NBL)", label: "BKK NOVITAS " },
  { value: "BKK PFAFF", label: "BKK " },
  { value: "BKK PFAFF (NBL)", label: "BKK PFAFF " },
  { value: "BKK Pfalz", label: "BKK " },
  { value: "BKK Pfalz (NBL)", label: "BKK Pfalz " },
  { value: "BKK PREUSSAG Publik", label: "BKK PREUSSAG P" },
  { value: "BKK ProVita", label: "BKK Pr" },
  { value: "BKK PWC Deutsche Revision", label: "BKK PWC Deutsche Rev" },
  { value: "BKK R+V", label: "BK" },
  { value: "BKK R+V (NBL)", label: "BKK R+V " },
  { value: "BKK Rheinland", label: "BKK Rhei" },
  { value: "BKK Rheinland (NBL)", label: "BKK Rheinland " },
  { value: "BKK ruhrgas", label: "BKK ru" },
  { value: "BKK RWE", label: "BK" },
  { value: "BKK Salzgitter", label: "BKK Salzg" },
  { value: "BKK Salzgitter (NBL)", label: "BKK Salzgitter " },
  { value: "BKK SBH", label: "BK" },
  { value: "BKK Scheufelen", label: "BKK Scheu" },
  { value: "BKK SKD", label: "BK" },
  { value: "BKK SKD (NBL)", label: "BKK SKD " },
  { value: "BKK Stadt Augsburg", label: "BKK Stadt Aug" },
  { value: "BKK Stinnes", label: "BKK St" },
  { value: "BKK Südzucker", label: "BKK Südz" },
  { value: "BKK Südzucker (NBL)", label: "BKK Südzucker " },
  { value: "BKK Technoform", label: "BKK Techn" },
  { value: "BKK TUI", label: "BK" },
  { value: "BKK TUI (NBL)", label: "BKK TUI " },
  { value: "BKK VDN", label: "BK" },
  { value: "BKK VDN (NBL)", label: "BKK VDN " },
  { value: "BKK VerbundPlus", label: "BKK Verbun" },
  { value: "BKK VerbundPlus (NBL)", label: "BKK VerbundPlus " },
  { value: "BKK Verkehrsbau Union", label: "BKK Verkehrsbau " },
  { value: "BKK Verkehrsbau Union (NBL)", label: "BKK Verkehrsbau Union " },
  { value: "BKK Vital", label: "BKK " },
  { value: "BKK Voralb Heller*Leuze*Traub", label: "BKK Voralb Heller*Leuze*" },
  { value: "BKK Werra-Meissner", label: "BKK Werra-Mei" },
  { value: "BKK Wieland-Werke", label: "BKK Wieland-" },
  { value: "BKK Wirtschaft&amp;Finanzen", label: "BKK Wirtschaft&amp;Fin" },
  {
    value: "BKK Wirtschaft&amp;Finanzen (NBL)",
    label: "BKK Wirtschaft&amp;Finanzen "
  },
  { value: "BKK WMF", label: "BK" },
  { value: "BKK WMF (NBL)", label: "BKK WMF " },
  { value: "BKK Würth", label: "BKK " },
  { value: "BKK Würth (NBL)", label: "BKK Würth " },
  { value: "BKK ZF &amp; Partner", label: "BKK ZF &amp; Pa" },
  { value: "BKK ZF &amp; Partner (NBL)", label: "BKK ZF &amp; Partner " },
  { value: "BKK24", label: "" },
  { value: "BKK24 (NBL)", label: "BKK24 " },
  { value: "Bundesknappsch.f.Ang. (WEST)", label: "Bundesknappsch.f.Ang. (" },
  { value: "Bundesknappschaft", label: "Bundesknapps" },
  { value: "Bundesknappschaft f. Minijobs", label: "Bundesknappschaft f. Min" },
  {
    value: "Central Krankenversicherung Aktiengesellschaft",
    label: "Central Krankenversicherung Aktiengesells"
  },
  {
    value: "Concordia Krankenversicherungs-Aktiengesellschaft",
    label: "Concordia Krankenversicherungs-Aktiengesells"
  },
  {
    value: "Continentale Krankenversicherung a.G.",
    label: "Continentale Krankenversicherung"
  },
  { value: "Daimler BKK", label: "Daimle" },
  { value: "Daimler BKK (NBL)", label: "Daimler BKK " },
  { value: "DAK-Gesundheit", label: "DAK-Gesun" },
  {
    value:
      "Debeka Krankenversicherungsverein auf Gegenseitigkeit Sitz Koblenz am Rhein",
    label:
      "Debeka Krankenversicherungsverein auf Gegenseitigkeit Sitz Koblenz am "
  },
  {
    value: "DEUTSCHER RING Krankenversicherungsverein auf Gegenseitigkeit",
    label: "DEUTSCHER RING Krankenversicherungsverein auf Gegenseiti"
  },
  {
    value: "DEVK Krankenversicherungs-Aktiengesellschaft",
    label: "DEVK Krankenversicherungs-Aktiengesells"
  },
  {
    value: "DKV Deutsche Krankenversicherung Aktiengesellschaft",
    label: "DKV Deutsche Krankenversicherung Aktiengesells"
  },
  { value: "energie-BKK", label: "energi" },
  { value: "energie-BKK (NBL)", label: "energie-BKK " },
  {
    value: "ENVIVAS Krankenversicherung Aktiengesellschaft",
    label: "ENVIVAS Krankenversicherung Aktiengesells"
  },
  {
    value: "ERGO Direkt Krankenversicherung Aktiengesellschaft",
    label: "ERGO Direkt Krankenversicherung Aktiengesells"
  },
  {
    value:
      "Freie Arzt- und Medizinkasse der Angehörigen der Berufsfeuerwehr und der Polizei VVaG",
    label:
      "Freie Arzt- und Medizinkasse der Angehörigen der Berufsfeuerwehr und der Polizei"
  },
  {
    value: "Gothaer Krankenversicherung Aktiengesellschaft",
    label: "Gothaer Krankenversicherung Aktiengesells"
  },
  {
    value: "HALLESCHE Krankenversicherung auf Gegenseitigkeit",
    label: "HALLESCHE Krankenversicherung auf Gegenseiti"
  },
  {
    value: "HanseMerkur Krankenversicherung AG",
    label: "HanseMerkur Krankenversicheru"
  },
  {
    value: "HanseMerkur Krankenversicherung auf Gegenseitigkeit",
    label: "HanseMerkur Krankenversicherung auf Gegenseiti"
  },
  {
    value: "HanseMerkur Speziale Krankenversicherung AG",
    label: "HanseMerkur Speziale Krankenversicheru"
  },
  { value: "Heimat Krankenkasse", label: "Heimat Kranken" },
  { value: "Heimat Krankenkasse (NBL)", label: "Heimat Krankenkasse " },
  {
    value: "HEK Hanseatische Krankenkasse",
    label: "HEK Hanseatische Krankenkasse"
  },
  { value: "HKK Handelskrankenkasse", label: "HKK Handelskrankenk" },
  {
    value: "HUK-COBURG-Krankenversicherung AG",
    label: "HUK-COBURG-Krankenversicherun"
  },
  { value: "IKK Brandenburg und Berlin", label: "IKK Brandenburg und Be" },
  { value: "IKK Braunschweig", label: "IKK Braunsch" },
  { value: "IKK classic", label: "IKK cla" },
  { value: "IKK classic (NBL)", label: "IKK classic (" },
  { value: "IKK gesund plus", label: "IKK gesund " },
  { value: "IKK gesund plus (NBL)", label: "IKK gesund plus (" },
  { value: "IKK Nord", label: "IKK " },
  { value: "IKK Nord (NBL)", label: "IKK Nord (" },
  { value: "IKK Südwest", label: "IKK Süd" },
  { value: "INTER Krankenversicherung AG", label: "INTER Krankenversicherun" },
  { value: "ITSG Test-AOK BY - eVpT", label: "ITSG Test-AOK BY - " },
  { value: "ITSG Test-AOK NDS - eVpT", label: "ITSG Test-AOK NDS - " },
  { value: "ITSG Test-AOK NW - eVpT", label: "ITSG Test-AOK NW - " },
  { value: "ITSG Test-BEK - eVpT", label: "ITSG Test-BEK - " },
  { value: "ITSG Test-DAK - eVpT", label: "ITSG Test-DAK - " },
  { value: "ITSG Test-HKK - eVpT", label: "ITSG Test-HKK - " },
  { value: "ITSG Test-KBS MiniJob - eVpT", label: "ITSG Test-KBS MiniJob - " },
  { value: "ITSG Test-TK - eVpT", label: "ITSG Test-TK - " },
  {
    value: "KKH Kaufmännische Krankenkasse",
    label: "KKH Kaufmännische Krankenk"
  },
  {
    value: "Krankenunterstützungskasse der Berufsfeuerwehr Hannover",
    label: "Krankenunterstützungskasse der Berufsfeuerwehr Hann"
  },
  { value: "Landeskrankenhilfe V.V.a.G.", label: "Landeskrankenhilfe V.V." },
  {
    value:
      "LIGA Krankenversicherung katholischer Priester Versicherungsverein auf Gegenseitigkeit Regensburg",
    label:
      "LIGA Krankenversicherung katholischer Priester Versicherungsverein auf Gegenseitigkeit Regens"
  },
  { value: "LKK Niedersachsen-Bremen", label: "LKK Niedersachsen-Br" },
  {
    value: "Lohnfortzahlungskasse Aurich VVaG",
    label: "Lohnfortzahlungskasse Aurich "
  },
  {
    value: "Lohnfortzahlungskasse Leer VVaG",
    label: "Lohnfortzahlungskasse Leer "
  },
  { value: "LVM Krankenversicherungs-AG", label: "LVM Krankenversicherung" },
  {
    value: "Mannheimer Krankenversicherung Aktiengesellschaft",
    label: "Mannheimer Krankenversicherung Aktiengesellsc"
  },
  {
    value: "Mecklenburgische Krankenversicherungs-Aktiengesellschaft",
    label: "Mecklenburgische Krankenversicherungs-Aktiengesellsc"
  },
  { value: "Miele BKK", label: "Miele" },
  { value: "Miele BKK (NBL)", label: "Miele BKK (" },
  {
    value: "MÜNCHENER VEREIN Krankenversicherung a.G.",
    label: "MÜNCHENER VEREIN Krankenversicherung "
  },
  {
    value: "Niedersächs.Versorgungsw.d. RA",
    label: "Niedersächs.Versorgungsw.d"
  },
  {
    value: "NÜRNBERGER Krankenversicherung Aktiengesellschaft",
    label: "NÜRNBERGER Krankenversicherung Aktiengesellsc"
  },
  {
    value: "PAX-FAMILIENFÜRSORGE Krankenversicherung AG",
    label: "PAX-FAMILIENFÜRSORGE Krankenversicherun"
  },
  {
    value: "praenatura Versicherungsverein auf Gegenseitigkeit (VVaG)",
    label: "praenatura Versicherungsverein auf Gegenseitigkeit (V"
  },
  { value: "pronova BKK", label: "pronova" },
  { value: "pronova BKK (NBL)", label: "pronova BKK (" },
  {
    value: "Provinzial Krankenversicherung Hannover AG",
    label: "Provinzial Krankenversicherung Hannove"
  },
  {
    value: "R+V Krankenversicherung Aktiengesellschaft",
    label: "R+V Krankenversicherung Aktiengesellsc"
  },
  { value: "Sächsische Ärzteversorgung", label: "Sächsische Ärzteversor" },
  {
    value: "Sächsische Landesapotkerkammer",
    label: "Sächsische Landesapotkerka"
  },
  { value: "Salus BKK", label: "Salus" },
  { value: "Salus BKK (NBL)", label: "Salus BKK (" },
  { value: "Schwenninger BKK", label: "Schwenninger" },
  { value: "Schwenninger BKK (NBL)", label: "Schwenninger BKK (" },
  { value: "SECURVITA BKK", label: "SECURVITA" },
  { value: "SECURVITA BKK (NBL)", label: "SECURVITA BKK (" },
  { value: "See-Krankenkasse", label: "See-Krankenk" },
  { value: "Seekrankenkasse", label: "Seekrankenk" },
  { value: "Siemens BKK (NBL)", label: "Siemens BKK (" },
  { value: "Siemens BKK (SBK)", label: "Siemens BKK (" },
  {
    value: "SIGNAL Krankenversicherung a.G.",
    label: "SIGNAL Krankenversicherung "
  },
  {
    value: "SONO Krankenversicherung a.G.",
    label: "SONO Krankenversicherung "
  },
  {
    value:
      "St. Martinus Priesterverein d. Diözese Rottenburg-Stuttgart Kranken- und Sterbekasse-(KSK) Vers.Verein auf Gegenseitigk.",
    label:
      "St. Martinus Priesterverein d. Diözese Rottenburg-Stuttgart Kranken- und Sterbekasse-(KSK) Vers.Verein auf Gegenseit"
  },
  {
    value: "Steuerberatervers. Brandenburg",
    label: "Steuerberatervers. Branden"
  },
  { value: "Steuerberatervers.Nieders.", label: "Steuerberatervers.Nied" },
  {
    value: "Süddeutsche Krankenversicherung a.G.",
    label: "Süddeutsche Krankenversicherung "
  },
  { value: "TBK Thüringer BKK", label: "TBK Thüringer" },
  { value: "TBK Thüringer BKK (NBL)", label: "TBK Thüringer BKK (" },
  { value: "Techniker Krankenkasse (TK)", label: "Techniker Krankenkasse " },
  { value: "Tierärztekammer Nordrhein", label: "Tierärztekammer Nordr" },
  { value: "Tierärztevers.Niedersachsen", label: "Tierärztevers.Niedersac" },
  {
    value: "Tierärzteversorgung Meckl./V.",
    label: "Tierärzteversorgung Meckl"
  },
  {
    value: "UNION KRANKENVERSICHERUNG AKTIENGESELLSCHAFT",
    label: "UNION KRANKENVERSICHERUNG AKTIENGESELLSC"
  },
  {
    value: "uniVersa Krankenversicherung a.G.",
    label: "uniVersa Krankenversicherung "
  },
  {
    value: "Versorgungsw. Zahnärztek. Hamb",
    label: "Versorgungsw. Zahnärztek. "
  },
  {
    value: "Versorgungswerk der Apoth.Hessen",
    label: "Versorgungswerk der Apoth.He"
  },
  {
    value: "Versorgungswerk der Apoth.NRW",
    label: "Versorgungswerk der Apoth"
  },
  {
    value: "Versorgungswerk der Apoth.Schlesw.H",
    label: "Versorgungswerk der Apoth.Schle"
  },
  {
    value: "Versorgungswerk der Apoth.Westf/Lip",
    label: "Versorgungswerk der Apoth.Westf"
  },
  {
    value: "Versorgungswerk der Arch.Bayern",
    label: "Versorgungswerk der Arch.Ba"
  },
  {
    value: "Versorgungswerk der Arch.Berlin",
    label: "Versorgungswerk der Arch.Be"
  },
  { value: "Versorgungswerk der Arch.NRW", label: "Versorgungswerk der Arch" },
  {
    value: "Versorgungswerk der Arch.Sachsen",
    label: "Versorgungswerk der Arch.Sac"
  },
  {
    value: "Versorgungswerk der Arch.Stuttgart",
    label: "Versorgungswerk der Arch.Stutt"
  },
  {
    value: "Versorgungswerk der Ärztekammer HH",
    label: "Versorgungswerk der Ärztekamme"
  },
  {
    value: "Versorgungswerk der LÄK Hessen",
    label: "Versorgungswerk der LÄK He"
  },
  {
    value: "Versorgungswerk der RA Baden-Wuert.",
    label: "Versorgungswerk der RA Baden-Wu"
  },
  {
    value: "Versorgungswerk der RA Bayern",
    label: "Versorgungswerk der RA Ba"
  },
  {
    value: "Versorgungswerk der RA Berlin",
    label: "Versorgungswerk der RA Be"
  },
  {
    value: "Versorgungswerk der RA Brandenbg.",
    label: "Versorgungswerk der RA Brande"
  },
  {
    value: "Versorgungswerk der RA Hamburg",
    label: "Versorgungswerk der RA Ham"
  },
  {
    value: "Versorgungswerk der RA Hessen",
    label: "Versorgungswerk der RA He"
  },
  {
    value: "Versorgungswerk der RA Mecklenbg-V.",
    label: "Versorgungswerk der RA Mecklenb"
  },
  { value: "Versorgungswerk der RA NRW", label: "Versorgungswerk der RA" },
  {
    value: "Versorgungswerk der RA Saarland",
    label: "Versorgungswerk der RA Saar"
  },
  {
    value: "Versorgungswerk der StB Sachsen",
    label: "Versorgungswerk der StB Sac"
  },
  {
    value: "Versorgungswerk der StB Sachsen-Anh",
    label: "Versorgungswerk der StB Sachsen"
  },
  {
    value: "Versorgungswerk der Tierärztek.Münster",
    label: "Versorgungswerk der Tierärztek.Mün"
  },
  {
    value: "Versorgungswerk der ZÄK Berlin",
    label: "Versorgungswerk der ZÄK Be"
  },
  { value: "Versorgungswerk WP u. BP NRW", label: "Versorgungswerk WP u. BP" },
  { value: "Viactiv", label: "Via" },
  {
    value: "vigo Krankenversicherung VVaG",
    label: "vigo Krankenversicherung "
  },
  {
    value: "Württembergische Krankenversicherung Aktiengesellschaft",
    label: "Württembergische Krankenversicherung Aktiengesellschaft"
  },
  { value: "BKK Grillo Werke", label: "BKK Grillo" },
  { value: "BKK Groz-Beckert", label: "BKK Groz-B" },
  { value: "BKK Hapag-Lloyd Bremen", label: "BKK Hapag-Lloyd " },
  { value: "BKK HEAG", label: "BK" },
  { value: "BKK Henschel Plus", label: "BKK Hensche" },
  { value: "BKK Herkules", label: "BKK He" },
  { value: "BKK HMR", label: "B" },
  { value: "BKK INOVITA", label: "BKK I" },
  { value: "BKK INOVITA (NBL)", label: "BKK INOVITA" },
  { value: "BKK Karl Mayer GmbH", label: "BKK Karl Mayer" },
  { value: "BKK KBA", label: "BK" },
  { value: "BKK KBA (NBL)", label: "BKK KBA " },
  { value: "BKK Knoll AG", label: "BKK Kno" },
  { value: "BKK Linde", label: "BKK " },
  { value: "BKK Linde (NBL)", label: "BKK Linde " },
  { value: "BKK Logistik", label: "BKK Log" },
  { value: "BKK Logistik (NBL)", label: "BKK Logistik " },
  { value: "BKK Mahle", label: "BKK " },
  { value: "BKK MEDICUS OST", label: "BKK MEDICU" },
  { value: "BKK Melitta Plus", label: "BKK Melitta" },
  { value: "BKK MEM", label: "BK" },
  { value: "BKK Merck", label: "BKK " },
  { value: "BKK Metzinger", label: "BKK Metz" },
  { value: "BKK mhplus", label: "BKK m" },
  { value: "BKK mhplus (NBL)", label: "BKK mhplus " },
  { value: "BKK Mobil Oil", label: "BKK Mobi" },
  { value: "BKK NOVITAS", label: "BKK NO" },
  { value: "BKK NOVITAS (NBL)", label: "BKK NOVITAS " },
  { value: "BKK PFAFF", label: "BKK " },
  { value: "BKK PFAFF (NBL)", label: "BKK PFAFF " },
  { value: "BKK Pfalz", label: "BKK " },
  { value: "BKK Pfalz (NBL)", label: "BKK Pfalz " },
  { value: "BKK PREUSSAG Publik", label: "BKK PREUSSAG P" },
  { value: "BKK ProVita", label: "BKK Pr" },
  { value: "BKK PWC Deutsche Revision", label: "BKK PWC Deutsche Rev" },
  { value: "BKK R+V", label: "BK" },
  { value: "BKK R+V (NBL)", label: "BKK R+V " },
  { value: "BKK Rheinland", label: "BKK Rhei" },
  { value: "BKK Rheinland (NBL)", label: "BKK Rheinland " },
  { value: "BKK ruhrgas", label: "BKK ru" },
  { value: "BKK RWE", label: "BK" },
  { value: "BKK Salzgitter", label: "BKK Salzg" },
  { value: "BKK Salzgitter (NBL)", label: "BKK Salzgitter " },
  { value: "BKK SBH", label: "BK" },
  { value: "BKK Scheufelen", label: "BKK Scheu" },
  { value: "BKK SKD", label: "BK" },
  { value: "BKK SKD (NBL)", label: "BKK SKD " },
  { value: "BKK Stadt Augsburg", label: "BKK Stadt Aug" },
  { value: "BKK Stinnes", label: "BKK St" },
  { value: "BKK Südzucker", label: "BKK Südz" },
  { value: "BKK Südzucker (NBL)", label: "BKK Südzucker " },
  { value: "BKK Technoform", label: "BKK Techn" },
  { value: "BKK TUI", label: "BK" },
  { value: "BKK TUI (NBL)", label: "BKK TUI " },
  { value: "BKK VDN", label: "BK" },
  { value: "BKK VDN (NBL)", label: "BKK VDN " },
  { value: "BKK VerbundPlus", label: "BKK Verbun" },
  { value: "BKK VerbundPlus (NBL)", label: "BKK VerbundPlus " },
  { value: "BKK Verkehrsbau Union", label: "BKK Verkehrsbau " },
  { value: "BKK Verkehrsbau Union (NBL)", label: "BKK Verkehrsbau Union " },
  { value: "BKK Vital", label: "BKK " },
  { value: "BKK Voralb Heller*Leuze*Traub", label: "BKK Voralb Heller*Leuze*" },
  { value: "BKK Werra-Meissner", label: "BKK Werra-Mei" },
  { value: "BKK Wieland-Werke", label: "BKK Wieland-" },
  { value: "BKK Wirtschaft&amp;Finanzen", label: "BKK Wirtschaft&amp;Fin" },
  {
    value: "BKK Wirtschaft&amp;Finanzen (NBL)",
    label: "BKK Wirtschaft&amp;Finanzen "
  },
  { value: "BKK WMF", label: "BK" },
  { value: "BKK WMF (NBL)", label: "BKK WMF " },
  { value: "BKK Würth", label: "BKK " },
  { value: "BKK Würth (NBL)", label: "BKK Würth " },
  { value: "BKK ZF &amp; Partner", label: "BKK ZF &amp; Pa" },
  { value: "BKK ZF &amp; Partner (NBL)", label: "BKK ZF &amp; Partner " },
  { value: "BKK24", label: "" },
  { value: "BKK24 (NBL)", label: "BKK24 " },
  { value: "Bundesknappsch.f.Ang. (WEST)", label: "Bundesknappsch.f.Ang. (" },
  { value: "Bundesknappschaft", label: "Bundesknapps" },
  { value: "Bundesknappschaft f. Minijobs", label: "Bundesknappschaft f. Min" },
  {
    value: "Central Krankenversicherung Aktiengesellschaft",
    label: "Central Krankenversicherung Aktiengesells"
  },
  {
    value: "Concordia Krankenversicherungs-Aktiengesellschaft",
    label: "Concordia Krankenversicherungs-Aktiengesells"
  },
  {
    value: "Continentale Krankenversicherung a.G.",
    label: "Continentale Krankenversicherung"
  },
  { value: "Daimler BKK", label: "Daimle" },
  { value: "Daimler BKK (NBL)", label: "Daimler BKK " },
  { value: "DAK-Gesundheit", label: "DAK-Gesun" },
  {
    value:
      "Debeka Krankenversicherungsverein auf Gegenseitigkeit Sitz Koblenz am Rhein",
    label:
      "Debeka Krankenversicherungsverein auf Gegenseitigkeit Sitz Koblenz am "
  },
  {
    value: "DEUTSCHER RING Krankenversicherungsverein auf Gegenseitigkeit",
    label: "DEUTSCHER RING Krankenversicherungsverein auf Gegenseiti"
  },
  {
    value: "DEVK Krankenversicherungs-Aktiengesellschaft",
    label: "DEVK Krankenversicherungs-Aktiengesells"
  },
  {
    value: "DKV Deutsche Krankenversicherung Aktiengesellschaft",
    label: "DKV Deutsche Krankenversicherung Aktiengesells"
  },
  { value: "energie-BKK", label: "energi" },
  { value: "energie-BKK (NBL)", label: "energie-BKK " },
  {
    value: "ENVIVAS Krankenversicherung Aktiengesellschaft",
    label: "ENVIVAS Krankenversicherung Aktiengesells"
  },
  {
    value: "ERGO Direkt Krankenversicherung Aktiengesellschaft",
    label: "ERGO Direkt Krankenversicherung Aktiengesells"
  },
  {
    value:
      "Freie Arzt- und Medizinkasse der Angehörigen der Berufsfeuerwehr und der Polizei VVaG",
    label:
      "Freie Arzt- und Medizinkasse der Angehörigen der Berufsfeuerwehr und der Polizei"
  },
  {
    value: "Gothaer Krankenversicherung Aktiengesellschaft",
    label: "Gothaer Krankenversicherung Aktiengesells"
  },
  {
    value: "HALLESCHE Krankenversicherung auf Gegenseitigkeit",
    label: "HALLESCHE Krankenversicherung auf Gegenseiti"
  },
  {
    value: "HanseMerkur Krankenversicherung AG",
    label: "HanseMerkur Krankenversicheru"
  },
  {
    value: "HanseMerkur Krankenversicherung auf Gegenseitigkeit",
    label: "HanseMerkur Krankenversicherung auf Gegenseiti"
  },
  {
    value: "HanseMerkur Speziale Krankenversicherung AG",
    label: "HanseMerkur Speziale Krankenversicheru"
  },
  { value: "Heimat Krankenkasse", label: "Heimat Kranken" },
  { value: "Heimat Krankenkasse (NBL)", label: "Heimat Krankenkasse " },
  {
    value: "HEK Hanseatische Krankenkasse",
    label: "HEK Hanseatische Krankenkasse"
  },
  { value: "HKK Handelskrankenkasse", label: "HKK Handelskrankenk" },
  {
    value: "HUK-COBURG-Krankenversicherung AG",
    label: "HUK-COBURG-Krankenversicherun"
  },
  { value: "IKK Brandenburg und Berlin", label: "IKK Brandenburg und Be" },
  { value: "IKK Braunschweig", label: "IKK Braunsch" },
  { value: "IKK classic", label: "IKK cla" },
  { value: "IKK classic (NBL)", label: "IKK classic (" },
  { value: "IKK gesund plus", label: "IKK gesund " },
  { value: "IKK gesund plus (NBL)", label: "IKK gesund plus (" },
  { value: "IKK Nord", label: "IKK " },
  { value: "IKK Nord (NBL)", label: "IKK Nord (" },
  { value: "IKK Südwest", label: "IKK Süd" },
  { value: "INTER Krankenversicherung AG", label: "INTER Krankenversicherun" },
  { value: "ITSG Test-AOK BY - eVpT", label: "ITSG Test-AOK BY - " },
  { value: "ITSG Test-AOK NDS - eVpT", label: "ITSG Test-AOK NDS - " },
  { value: "ITSG Test-AOK NW - eVpT", label: "ITSG Test-AOK NW - " },
  { value: "ITSG Test-BEK - eVpT", label: "ITSG Test-BEK - " },
  { value: "ITSG Test-DAK - eVpT", label: "ITSG Test-DAK - " },
  { value: "ITSG Test-HKK - eVpT", label: "ITSG Test-HKK - " },
  { value: "ITSG Test-KBS MiniJob - eVpT", label: "ITSG Test-KBS MiniJob - " },
  { value: "ITSG Test-TK - eVpT", label: "ITSG Test-TK - " },
  {
    value: "KKH Kaufmännische Krankenkasse",
    label: "KKH Kaufmännische Krankenk"
  },
  {
    value: "Krankenunterstützungskasse der Berufsfeuerwehr Hannover",
    label: "Krankenunterstützungskasse der Berufsfeuerwehr Hann"
  },
  { value: "Landeskrankenhilfe V.V.a.G.", label: "Landeskrankenhilfe V.V." },
  {
    value:
      "LIGA Krankenversicherung katholischer Priester Versicherungsverein auf Gegenseitigkeit Regensburg",
    label:
      "LIGA Krankenversicherung katholischer Priester Versicherungsverein auf Gegenseitigkeit Regens"
  },
  { value: "LKK Niedersachsen-Bremen", label: "LKK Niedersachsen-Br" },
  {
    value: "Lohnfortzahlungskasse Aurich VVaG",
    label: "Lohnfortzahlungskasse Aurich "
  },
  {
    value: "Lohnfortzahlungskasse Leer VVaG",
    label: "Lohnfortzahlungskasse Leer "
  },
  { value: "LVM Krankenversicherungs-AG", label: "LVM Krankenversicherung" },
  {
    value: "Mannheimer Krankenversicherung Aktiengesellschaft",
    label: "Mannheimer Krankenversicherung Aktiengesellsc"
  },
  {
    value: "Mecklenburgische Krankenversicherungs-Aktiengesellschaft",
    label: "Mecklenburgische Krankenversicherungs-Aktiengesellsc"
  },
  { value: "Miele BKK", label: "Miele" },
  { value: "Miele BKK (NBL)", label: "Miele BKK (" },
  {
    value: "MÜNCHENER VEREIN Krankenversicherung a.G.",
    label: "MÜNCHENER VEREIN Krankenversicherung "
  },
  {
    value: "Niedersächs.Versorgungsw.d. RA",
    label: "Niedersächs.Versorgungsw.d"
  },
  {
    value: "NÜRNBERGER Krankenversicherung Aktiengesellschaft",
    label: "NÜRNBERGER Krankenversicherung Aktiengesellsc"
  },
  {
    value: "PAX-FAMILIENFÜRSORGE Krankenversicherung AG",
    label: "PAX-FAMILIENFÜRSORGE Krankenversicherun"
  },
  {
    value: "praenatura Versicherungsverein auf Gegenseitigkeit (VVaG)",
    label: "praenatura Versicherungsverein auf Gegenseitigkeit (V"
  },
  { value: "pronova BKK", label: "pronova" },
  { value: "pronova BKK (NBL)", label: "pronova BKK (" },
  {
    value: "Provinzial Krankenversicherung Hannover AG",
    label: "Provinzial Krankenversicherung Hannove"
  },
  {
    value: "R+V Krankenversicherung Aktiengesellschaft",
    label: "R+V Krankenversicherung Aktiengesellsc"
  },
  { value: "Sächsische Ärzteversorgung", label: "Sächsische Ärzteversor" },
  {
    value: "Sächsische Landesapotkerkammer",
    label: "Sächsische Landesapotkerka"
  },
  { value: "Salus BKK", label: "Salus" },
  { value: "Salus BKK (NBL)", label: "Salus BKK (" },
  { value: "Schwenninger BKK", label: "Schwenninger" },
  { value: "Schwenninger BKK (NBL)", label: "Schwenninger BKK (" },
  { value: "SECURVITA BKK", label: "SECURVITA" },
  { value: "SECURVITA BKK (NBL)", label: "SECURVITA BKK (" },
  { value: "See-Krankenkasse", label: "See-Krankenk" },
  { value: "Seekrankenkasse", label: "Seekrankenk" },
  { value: "Siemens BKK (NBL)", label: "Siemens BKK (" },
  { value: "Siemens BKK (SBK)", label: "Siemens BKK (" },
  {
    value: "SIGNAL Krankenversicherung a.G.",
    label: "SIGNAL Krankenversicherung "
  },
  {
    value: "SONO Krankenversicherung a.G.",
    label: "SONO Krankenversicherung "
  },
  {
    value:
      "St. Martinus Priesterverein d. Diözese Rottenburg-Stuttgart Kranken- und Sterbekasse-(KSK) Vers.Verein auf Gegenseitigk.",
    label:
      "St. Martinus Priesterverein d. Diözese Rottenburg-Stuttgart Kranken- und Sterbekasse-(KSK) Vers.Verein auf Gegenseit"
  },
  {
    value: "Steuerberatervers. Brandenburg",
    label: "Steuerberatervers. Branden"
  },
  { value: "Steuerberatervers.Nieders.", label: "Steuerberatervers.Nied" },
  {
    value: "Süddeutsche Krankenversicherung a.G.",
    label: "Süddeutsche Krankenversicherung "
  },
  { value: "TBK Thüringer BKK", label: "TBK Thüringer" },
  { value: "TBK Thüringer BKK (NBL)", label: "TBK Thüringer BKK (" },
  { value: "Techniker Krankenkasse (TK)", label: "Techniker Krankenkasse " },
  { value: "Tierärztekammer Nordrhein", label: "Tierärztekammer Nordr" },
  { value: "Tierärztevers.Niedersachsen", label: "Tierärztevers.Niedersac" },
  {
    value: "Tierärzteversorgung Meckl./V.",
    label: "Tierärzteversorgung Meckl"
  },
  {
    value: "UNION KRANKENVERSICHERUNG AKTIENGESELLSCHAFT",
    label: "UNION KRANKENVERSICHERUNG AKTIENGESELLSC"
  },
  {
    value: "uniVersa Krankenversicherung a.G.",
    label: "uniVersa Krankenversicherung "
  },
  {
    value: "Versorgungsw. Zahnärztek. Hamb",
    label: "Versorgungsw. Zahnärztek. "
  },
  {
    value: "Versorgungswerk der Apoth.Hessen",
    label: "Versorgungswerk der Apoth.He"
  },
  {
    value: "Versorgungswerk der Apoth.NRW",
    label: "Versorgungswerk der Apoth"
  },
  {
    value: "Versorgungswerk der Apoth.Schlesw.H",
    label: "Versorgungswerk der Apoth.Schle"
  },
  {
    value: "Versorgungswerk der Apoth.Westf/Lip",
    label: "Versorgungswerk der Apoth.Westf"
  },
  {
    value: "Versorgungswerk der Arch.Bayern",
    label: "Versorgungswerk der Arch.Ba"
  },
  {
    value: "Versorgungswerk der Arch.Berlin",
    label: "Versorgungswerk der Arch.Be"
  },
  { value: "Versorgungswerk der Arch.NRW", label: "Versorgungswerk der Arch" },
  {
    value: "Versorgungswerk der Arch.Sachsen",
    label: "Versorgungswerk der Arch.Sac"
  },
  {
    value: "Versorgungswerk der Arch.Stuttgart",
    label: "Versorgungswerk der Arch.Stutt"
  },
  {
    value: "Versorgungswerk der Ärztekammer HH",
    label: "Versorgungswerk der Ärztekamme"
  },
  {
    value: "Versorgungswerk der LÄK Hessen",
    label: "Versorgungswerk der LÄK He"
  },
  {
    value: "Versorgungswerk der RA Baden-Wuert.",
    label: "Versorgungswerk der RA Baden-Wu"
  },
  {
    value: "Versorgungswerk der RA Bayern",
    label: "Versorgungswerk der RA Ba"
  },
  {
    value: "Versorgungswerk der RA Berlin",
    label: "Versorgungswerk der RA Be"
  },
  {
    value: "Versorgungswerk der RA Brandenbg.",
    label: "Versorgungswerk der RA Brande"
  },
  {
    value: "Versorgungswerk der RA Hamburg",
    label: "Versorgungswerk der RA Ham"
  },
  {
    value: "Versorgungswerk der RA Hessen",
    label: "Versorgungswerk der RA He"
  },
  {
    value: "Versorgungswerk der RA Mecklenbg-V.",
    label: "Versorgungswerk der RA Mecklenb"
  },
  { value: "Versorgungswerk der RA NRW", label: "Versorgungswerk der RA" },
  {
    value: "Versorgungswerk der RA Saarland",
    label: "Versorgungswerk der RA Saar"
  },
  {
    value: "Versorgungswerk der StB Sachsen",
    label: "Versorgungswerk der StB Sac"
  },
  {
    value: "Versorgungswerk der StB Sachsen-Anh",
    label: "Versorgungswerk der StB Sachsen"
  },
  {
    value: "Versorgungswerk der Tierärztek.Münster",
    label: "Versorgungswerk der Tierärztek.Mün"
  },
  {
    value: "Versorgungswerk der ZÄK Berlin",
    label: "Versorgungswerk der ZÄK Be"
  },
  { value: "Versorgungswerk WP u. BP NRW", label: "Versorgungswerk WP u. BP" },
  { value: "Viactiv", label: "Via" },
  {
    value: "vigo Krankenversicherung VVaG",
    label: "vigo Krankenversicherung "
  },
  {
    value: "Württembergische Krankenversicherung Aktiengesellschaft",
    label: "Württembergische Krankenversicherung Aktiengesellschaft"
  }
];

export const HealthInsuranceProvider: IReactSelectInterface[] = [
  { value: "VigoHealthInsuranceVVaG", label: "Vigo Health Insurance VVaG" },
  {
    value: "UnionHealthInsuranceCompany",
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

export const Nationality: IReactSelectInterface[] = [
  { value: "Albanien", label: "Albanien" },
  { value: "Belgien", label: "Belgien" },
  { value: "Bosnien und Herzegowina", label: "Bosnien und Herzegowina" },
  { value: "Bulgarien", label: "Bulgarien" },
  { value: "Dänemark", label: "Dänemark" },
  { value: "Deutschland", label: "Deutschland" },
  { value: "Estland", label: "Estland" },
  { value: "Finnland", label: "Finnland" },
  { value: "Frankreich", label: "Frankreich" },
  { value: "Ghana", label: "Ghana" },
  { value: "Griechenland", label: "Griechenland" },
  { value: "Großbritannien", label: "Großbritannien" },
  { value: "Guinea", label: "Guinea" },
  { value: "Irland", label: "Irland" },
  { value: "Island", label: "Island" },
  { value: "Israel", label: "Israel" },
  { value: "Italien", label: "Italien" },
  { value: "Kamerun", label: "Kamerun" },
  { value: "Kasachstan", label: "Kasachstan" },
  { value: "Kenia", label: "Kenia" },
  { value: "Kroatien", label: "Kroatien" },
  { value: "Kuba", label: "Kuba" },
  { value: "Lettland", label: "Lettland" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Litauen", label: "Litauen" },
  { value: "Luxemburg", label: "Luxemburg" },
  { value: "Malta", label: "Malta" },
  { value: "Mazedonien", label: "Mazedonien" },
  { value: "Moldawien", label: "Moldawien" },
  { value: "Monaco", label: "Monaco" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Mosambik", label: "Mosambik" },
  { value: "Niederlande", label: "Niederlande" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Norwegen", label: "Norwegen" },
  { value: "Österreich", label: "Österreich" },
  { value: "Papua-Neuguinea", label: "Papua-Neuguinea" },
  { value: "Peru", label: "Peru" },
  { value: "Philippinen", label: "Philippinen" },
  { value: "Polen", label: "Polen" },
  { value: "Portugal", label: "Portugal" },
  { value: "Rumänien", label: "Rumänien" },
  { value: "Rußland", label: "Rußland" },
  { value: "Russland", label: "Russland" },
  { value: "San Marino", label: "San Marino" },
  { value: "Schweden", label: "Schweden" },
  { value: "Schweiz", label: "Schweiz" },
  { value: "Serbien", label: "Serbien" },
  { value: "Slowakei", label: "Slowakei" },
  { value: "Slowenien", label: "Slowenien" },
  { value: "Spanien", label: "Spanien" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Syrien", label: "Syrien" },
  { value: "Tschechien", label: "Tschechien" },
  { value: "Türkei", label: "Türkei" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "Ungarn", label: "Ungarn" },
  { value: "ungeklärt/staatenlos", label: "ungeklärt/staatenlos" },
  { value: "USA", label: "USA" }
];
