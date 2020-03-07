import React, { FunctionComponent, useState } from "react";
import PycModal from "../../../components/PycModal";
import {
  IUpdateWeekendProps,
  IUpdateWeekendFormValues,
  IPycButtonProps,
  IState
} from "../../../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import UpdateWeekendForm from "./UpdateWeekendForm";
import { languageTranslation, errorFormatter } from "../../../../../helpers";
import { UpdateWeekendFormValidation } from "../../../../validations";
import { GlobalCalendarMutations } from "../../../../../graphql/Mutations";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
const UpdateWeekends: FunctionComponent<IUpdateWeekendProps> = ({
  isOpen,
  handleClose,
  refresh,
  states
}: IUpdateWeekendProps): JSX.Element => {
  // initial form values
  const initialValues: IUpdateWeekendFormValues = {
    year: "",
    overwriteExisting: false
  };
  const [defaultValues, setDefaultValues] = useState<IUpdateWeekendFormValues>(
    initialValues
  );
  const [, , , ADD_WEEKEND] = GlobalCalendarMutations;
  const [markWeekend, { error, loading }] = useMutation<{
    markWeekend: any;
  }>(ADD_WEEKEND);
  // handle submit
  const handleSubmit = async (
    values: IUpdateWeekendFormValues,
    data: FormikHelpers<IUpdateWeekendFormValues>
  ): Promise<void> => {
    try {
      values.applicableStates = states.map((state: IState) => Number(state.id));
      await markWeekend({
        variables: { globalCalendarInput: values }
      });
      if (error) {
        throw error;
      }
      data.resetForm();
      setDefaultValues(initialValues);
      toast.success(
        languageTranslation("SAVED_SUCCESSFULLY", {
          item: languageTranslation("WEEKENDS")
        })
      );
      handleClose();
      refresh();
    } catch (error) {
      const message = errorFormatter(error);
      toast.error(message);
    }
  };
  // return form
  return (
    <Formik
      key={"update-weekends"}
      initialValues={defaultValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={UpdateWeekendFormValidation}
    >
      {(props: FormikProps<IUpdateWeekendFormValues>) => {
        const footerButtons: IPycButtonProps[] = [
          {
            text: languageTranslation("CLOSE"),
            color: "secondary",
            onClick: () => {
              props.resetForm();
              setDefaultValues(initialValues);
              handleClose();
            }
          },
          {
            text: languageTranslation("SUBMIT"),
            color: "primary",
            onClick: props.handleSubmit,
            loading,
            type: "submit"
          }
        ];
        return (
          <PycModal
            isOpen={isOpen}
            headerText={languageTranslation("UPDATE_WEEKENDS")}
            handleClose={handleClose}
            footerButtons={footerButtons}
          >
            <UpdateWeekendForm fieldsInfo={props} />
          </PycModal>
        );
      }}
    </Formik>
  );
};

export default UpdateWeekends;
