import { IReactSelectInterface } from '../interfaces';

export const Status: IReactSelectInterface[] = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Disable' },
];
export const State: IReactSelectInterface[] = [
  { value: 'Thuringia', label: 'Thuringia' },
  { value: 'Bavaria', label: 'Bavaria' },
  { value: 'Hamburg', label: 'Hamburg' },
  { value: 'Saarland', label: 'Saarland' },
  { value: 'Saxony', label: 'Saxony' },
];
export const Department: IReactSelectInterface[] = [
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Designing', label: 'Designing' },
  { value: 'Development', label: 'Development' },
  { value: 'HR', label: 'HR' },
];
export const Region: IReactSelectInterface[] = [
  { value: 'CentralGermany', label: 'Central Germany' },
  { value: 'Cologne', label: 'Cologne' },
  { value: 'Frankfurt', label: 'Frankfurt' },
  { value: 'NorthernGermany', label: 'Northern Germany' },
  { value: 'LowerSaxony', label: 'Lower Saxony' },
  { value: 'Munich', label: 'Munich' },
];
export const City: IReactSelectInterface[] = [
  { value: 'Dortmund', label: 'Dortmund' },
  { value: 'Wiesbaden', label: 'Wiesbaden' },
  { value: 'Bochum', label: 'Bochum' },
  { value: 'Kiel', label: 'Kiel' },
  { value: 'LowerSaxony', label: 'Lower Saxony' },
  { value: 'Berlin', label: 'Berlin' },
];
export const Salutation: IReactSelectInterface[] = [
  { value: 'Sir', label: 'Sir' },
  { value: 'Madam', label: 'Madam' },
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

export const QualificationAttributes: IReactSelectInterface[] = [
  { value: 'careGiver', label: 'Care giver' },
  { value: 'anesthesiaAssistance', label: 'Anesthesia Assistance' },
  { value: 'doctorAttentionCommission', label: 'Doctor Attention commission' },
  { value: 'medicalAssistance', label: 'Medical Assistance' },
  { value: 'Dialysis', label: 'Dialysis' },
  { value: 'Individual', label: 'Individual' },
  { value: 'Endoscopy', label: 'Endoscopy' },
  { value: 'Obstetrics', label: 'Obstetrics' },
  { value: 'HKP', label: 'HKP (Home nursing)' },
  { value: 'Midwife/Delivery', label: 'Midwife/Delivery' },
  { value: 'Heilerizehungspfleger', label: 'Heilerizehungspfleger' },
  { value: 'HomeVentilationAll', label: 'Home ventilation all' },
  { value: 'HomeVentilationKS', label: 'Home ventilation KS' },
  { value: 'HomeManagement', label: 'Home Management' },
  {
    value: 'CardiacCatheterizationLaboratory',
    label: 'Cardiac catheterization laboratory',
  },
  { value: 'Hygiene', label: 'Hygiene' },
  { value: 'Intensive', label: 'Intensive' },
  { value: 'IntermediateCare', label: 'IMC (Intermediate care)' },
  { value: 'ChildrenIntensive', label: 'Children intensive' },
  { value: 'Nurse', label: 'Nurse/carer' },
  { value: 'MTRA', label: 'MTRA (Medical – technical radiology assistant)' },
  { value: 'Neonatology', label: 'Neonatology' },
  { value: 'OP', label: 'OP' },
  { value: 'OTA', label: 'OTA' },
  { value: 'PalliativeCare', label: 'Palliative care' },
  { value: 'PDL', label: 'PDL' },
  {
    value: 'NursingAssistant',
    label: 'Nursing assistant (Former household manager)',
  },
  { value: 'Physiotherapist', label: 'Physiotherapist' },
  { value: 'Psychiatry', label: 'Psychiatry' },
  { value: 'Paramedic', label: 'Paramedic' },
  { value: 'EmergencyDepartment', label: 'Emergency department' },
  { value: 'Wohnbereichsleitung', label: 'Wohnbereichsleitung' },
  { value: 'WoundManagement', label: 'Wound Management' },
];
export const Hours: IReactSelectInterface[] = [
  { value: '12', label: '12' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];
// export const BankAccount =[
//   { value: "DeutscheBank", label: "Deutsche Bank" },
//   { value: "Commerzbank", label: "Commerzbank" },
//   { value: "KFWBankgruppe", label: "KFW Bankgruppe" },
//   { value: "DZBank", label: "DZ Bank" },
//   { value: "NRWBank", label: "NRW Bank" }
// ]

export const CalculationInterval: IReactSelectInterface[] = [
  { value: 'MonthlyTo1', label: 'Monthly to 1' },
  { value: 'Bi-monthlyToThe1&16', label: 'Bi-monthly to the 1 & 16' },
  { value: 'WeeklyOnMondays', label: 'Weekly on Mondays' },
];
export const Supplements: IReactSelectInterface[] = [
  { value: 'Exclusive', label: 'Exclusive' },
  { value: 'Cumulative', label: 'Cumulative' },
];
export const Nationality: IReactSelectInterface[] = [
  { value: 'Germans', label: 'Germans' },
  { value: 'Hungarians', label: 'Hungarians' },
  { value: 'Russians', label: 'Russians' },
  { value: 'Basques', label: 'Basques' },
  { value: 'Albanien', label: 'Albanien' },
  { value: 'Dänemark', label: 'Dänemark' },
];
export const MaritalStatus: IReactSelectInterface[] = [
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'PermanentlySeparated', label: 'Married, Permanently separated' },
  { value: 'Widowed', label: 'Widowed' },
];
export const HealthInsuranceType: IReactSelectInterface[] = [
  { value: 'VoluntarilyInsuredByLaw', label: 'Voluntarily insured by law' },
  { value: 'LegallyInsured', label: 'Legally insured' },
  { value: 'PrivatelyInsured', label: 'Privately insured' },
];

export const HealthInsuranceProvider: IReactSelectInterface[] = [
  { value: 'VigoHealthInsuranceVVaG', label: 'Vigo Health Insurance VVaG' },
  {
    value: 'UninoHealthInsuranceCompany',
    label: 'Unino Health insurance company',
  },
];

export const Religion: IReactSelectInterface[] = [
  { value: ' EvangelicalChurch(EKD)', label: 'Evangelical Church (EKD)' },
  {
    value: 'FreelyReligiousCommunities',
    label: 'Freely religious communities',
  },
  { value: 'JewishCommunities', label: 'Jewish Communities' },
  {
    value: 'CatholicBishopricGermany',
    label: 'Catholic bishopric of the old Catholics in Germany',
  },
  { value: 'othersWithout', label: 'Others without' },
  { value: ' RomanCatholicChurch', label: ' Roman Catholic church' },
  {
    value: ' UnitarianReligiousCommunityFreeProtestants',
    label: ' Unitarian Religious Community Free Protestants',
  },
];

export const Preoccupation: IReactSelectInterface[] = [
  { value: 'OtherSidelineActivities', label: 'Other sideline activities' },
  { value: 'Officials', label: 'Officials' },
  { value: 'BlockwiseSolona', label: 'Blockwise solona' },
  { value: 'PermanentlyEmployedSolona', label: 'Permanently employed solona' },
  { value: 'Pensioner', label: 'Pensioner' },
  { value: 'PupilStudent', label: 'Pupil student' },
  { value: 'Self-employed/Freelance', label: 'Self-employed/Freelance' },
  {
    value: 'FullyEmployedInOtherCompany',
    label: 'Fully employed in other company',
  },
];

export const NightAllowancePerHour: IReactSelectInterface[] = [
  { value: 'From22oclock', label: "From 22 o'clock" },
  { value: 'From8pm', label: 'From 8 p.m.' },
  { value: 'From8:45pm', label: 'From 8:45 p.m.' },
  { value: 'From9pm', label: 'From 9 p.m.' },
];
