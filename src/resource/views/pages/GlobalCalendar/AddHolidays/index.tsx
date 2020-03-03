import React, { FunctionComponent, useState } from "react";
import PycModal from "../../../components/PycModal";
import {
  IAddHolidayProps,
  IPycButtonProps,
  IAddHolidaysFormValues,
  IAddHolidayFormikProps,
  IState
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
import { defaultDateFormat } from "../../../../../config";
let isEditValueSet = false;
const AddHolidays: FunctionComponent<IAddHolidayProps> = ({
  isOpen,
  handleClose,
  states,
  refresh,
  editInfo
}): JSX.Element => {
  const [
    ADD_GLOBAL_HOLIDAYS,
    _,
    UPDATE_GLOBAL_HOLIDAY
  ] = GlobalCalendarMutations;
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
  const [AddGlobalHolidays, { loading, error, data: resp }] = useMutation<{
    AddGlobalHolidays: any;
  }>(ADD_GLOBAL_HOLIDAYS);
  const [
    UpdateGlobalHoliday,
    { loading: isUpdating, error: updateError, data: updateResp }
  ] = useMutation<
    {
      UpdateGlobalHoliday: any;
    },
    {
      id: number;
      globalCalendarInput: IAddHolidaysFormValues;
    }
  >(UPDATE_GLOBAL_HOLIDAY);
  const isEditMode: boolean = editInfo && editInfo.id ? true : false;

  // save holidays
  const handleSubmit = async (
    values: IAddHolidayFormikProps,
    data: FormikHelpers<IAddHolidayFormikProps>
  ) => {
    try {
      const globalCalendarInput = values.inputs.map(
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
          return {
            date,
            applicableStates: v.states,
            note: v.note
          };
        }
      );

      let respError = undefined;
      if (isEditMode) {
        await UpdateGlobalHoliday({
          variables: {
            id: editInfo && editInfo.id ? editInfo!.id : 0,
            globalCalendarInput: globalCalendarInput[0]
          }
        });
        respError = updateError;
      } else {
        await AddGlobalHolidays({
          variables: {
            globalCalendarInput
          }
        });
        respError = error;
      }
      if (respError) {
        throw respError;
      }
      toast.success(
        isEditMode
          ? languageTranslation("HOLIDAY_ADD_SUCCESS", {
              n: values.inputs.length > 1 ? "s" : ""
            })
          : languageTranslation("UPDATE_SUCCESSFULLY", {
              item: languageTranslation("HOLIDAY")
            })
      );
      // reset form
      data.resetForm();
      // reset to initial data
      setHolidayData(initialHolidayData);
      isEditValueSet = false;
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
  if (editInfo && editInfo.id && !isEditValueSet) {
    setHolidayData({
      inputs: [
        {
          id: editInfo.id,
          date: moment(editInfo.date).format(defaultDateFormat),
          note: editInfo.note,
          states: editInfo.states
        }
      ]
    });
    isEditValueSet = true;
  }
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
              isEditValueSet = false;
              setHolidayData(initialHolidayData);
              handleClose ? handleClose() : undefined;
            }
          },
          {
            text: languageTranslation("SUBMIT"),
            color: "primary",
            onClick: props.handleSubmit,
            loading: loading || isUpdating
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
              isEditMode={isEditMode}
            />
          </PycModal>
        );
      }}
    />
  );
};

export default AddHolidays;
