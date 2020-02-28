import React, { FunctionComponent, useState } from "react";
import PycModal from "../../../components/PycModal";
import {
  IAddHolidayProps,
  IPycButtonProps,
  IAddHolidaysFormValues
} from "../../../../../interfaces";
import { Formik, FormikHelpers, FormikProps } from "formik";
import AddHolidaysForm from "./AddHolidaysForm";
import { AddHolidayValidations } from "../../../../validations";

const AddHolidays: FunctionComponent<IAddHolidayProps> = ({
  isOpen,
  handleClose,
  states
}): JSX.Element => {
  const initialHolidayData = [
    {
      date: "",
      note: "",
      states: []
    }
  ];
  const [holidaysData, setHolidayData] = useState<IAddHolidaysFormValues[]>(
    initialHolidayData
  );
  const handleSubmit = async (
    values: IAddHolidaysFormValues[],
    data: FormikHelpers<IAddHolidaysFormValues[]>
  ) => {
    console.log("data", values, data);
  };
  // add form for holiday
  const addNewHoliday = (values: IAddHolidaysFormValues[]): void => {
    values.push({
      date: "",
      note: "",
      states: []
    });
    setHolidayData(values || []);
  };
  // remove particular holiday
  const removeHoliday = (index: number): void => {
    holidaysData.splice(index, 1);
    setHolidayData(holidaysData || []);
  };
  return (
    <Formik
      key={"add-holiday"}
      initialValues={holidaysData}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={AddHolidayValidations}
      children={(props: FormikProps<IAddHolidaysFormValues[]>) => {
        const footerButtons: IPycButtonProps[] = [
          {
            text: "Close",
            color: "secondary",
            onClick: () => {
              props.resetForm();
              setHolidayData(initialHolidayData);
              handleClose ? handleClose() : undefined;
            }
          },
          {
            text: "Submit",
            color: "primary",
            onClick: props.handleSubmit,
            loading: false
          }
        ];
        return (
          <PycModal
            isOpen={isOpen}
            handleClose={handleClose}
            headerText={"Add"}
            footerButtons={footerButtons}
          >
            <AddHolidaysForm
              addNewHoliday={(values: IAddHolidaysFormValues[]) => {
                addNewHoliday(values);
                props.resetForm();
              }}
              removeHoliday={(index: number) => {
                removeHoliday(index);
                props.resetForm();
              }}
              states={states}
              fieldsInfo={props}
            />
          </PycModal>
        );
      }}
    />
  );
};

export default AddHolidays;
