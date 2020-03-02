import React, { FunctionComponent, useState } from "react";
import PycModal from "../../../components/PycModal";
import {
  IAddHolidayProps,
  IPycButtonProps,
  IAddHolidaysFormValues,
  IAddHolidayFormikProps
} from "../../../../../interfaces";
import { Formik, FormikHelpers, FormikProps } from "formik";
import AddHolidaysForm from "./AddHolidaysForm";
import { AddHolidayValidations } from "../../../../validations";
import {
  languageTranslation,
  logger,
  errorFormatter
} from "../../../../../helpers";
import { useMutation } from "@apollo/react-hooks";
import { GlobalCalendarMutations } from "../../../../../graphql/Mutations";
import moment from "moment";
import { toast } from "react-toastify";

const AddHolidays: FunctionComponent<IAddHolidayProps> = ({
  isOpen,
  handleClose,
  states,
  refresh
}): JSX.Element => {
  const [ADD_GLOBAL_HOLIDAYS] = GlobalCalendarMutations;
  const initialHolidayData: IAddHolidayFormikProps = {
    inputs: [
      {
        date: "",
        note: "",
        states: []
      }
    ]
  };
  const [holidaysData, setHolidayData] = useState<IAddHolidayFormikProps>(
    initialHolidayData
  );
  const [AddGlobalHolidays, { loading, error, data: resp }] = useMutation(
    ADD_GLOBAL_HOLIDAYS
  );
  // save holidays
  const handleSubmit = async (
    values: IAddHolidayFormikProps,
    data: FormikHelpers<IAddHolidayFormikProps>
  ) => {
    try {
      console.log(values.inputs);

      await AddGlobalHolidays({
        variables: {
          globalCalendarInput: values.inputs.map(
            (v: IAddHolidaysFormValues) => {
              // Parse the date parts to integers
              const parts: string[] =
                v.date && typeof v.date === "string" ? v.date.split(".") : [];
              const day: number = Number(parts[0]);
              const month: number = Number(parts[1]);
              const year: number = Number(parts[2]);
              const date = moment()
                .set({
                  dates: day,
                  months: month - 1,
                  years: year,
                  hours: 0,
                  minutes: 0,
                  seconds: 0
                })
                .format();
              console.log(date);
              return {
                date,
                applicableStates: v.states,
                note: v.note
              };
            }
          )
        }
      });
      toast.success(
        languageTranslation("HOLIDAY_ADD_SUCCESS", {
          n: values.inputs.length > 1 ? "s" : ""
        })
      );
      // reset form
      data.resetForm();
      // reset to initial data
      setHolidayData(initialHolidayData);
      // close the popup
      handleClose ? handleClose() : undefined;
      refresh();
      // refetch the list
    } catch (error) {
      console.log(error);
      const message = errorFormatter(error.message);
      toast.error(message);
      logger(error);
    }
  };
  // add form for holiday
  const addNewHoliday = (values: IAddHolidayFormikProps): void => {
    values.inputs.push({
      date: "",
      note: "",
      states: []
    });
    setHolidayData(values || []);
  };
  // remove particular holiday
  const removeHoliday = (
    values: IAddHolidayFormikProps,
    index: number
  ): void => {
    values.inputs.splice(index, 1);
    setHolidayData(values || []);
  };

  return (
    <Formik
      key={"add-holiday"}
      initialValues={holidaysData}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={AddHolidayValidations}
      children={(props: FormikProps<IAddHolidayFormikProps>) => {
        const footerButtons: IPycButtonProps[] = [
          {
            text: languageTranslation("CLOSE"),
            color: "secondary",
            onClick: () => {
              props.resetForm();
              setHolidayData(initialHolidayData);
              handleClose ? handleClose() : undefined;
            }
          },
          {
            text: languageTranslation("SUBMIT"),
            color: "primary",
            onClick: props.handleSubmit,
            loading
          }
        ];
        return (
          <PycModal
            isOpen={isOpen}
            handleClose={handleClose}
            headerText={languageTranslation("UPDATE_CALEDAR")}
            footerButtons={footerButtons}
          >
            <AddHolidaysForm
              addNewHoliday={(values: IAddHolidayFormikProps) => {
                addNewHoliday(values);
                props.resetForm();
              }}
              removeHoliday={(
                values: IAddHolidayFormikProps,
                index: number
              ) => {
                removeHoliday(values, index);
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
