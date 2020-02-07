import React, { FunctionComponent, useState, useEffect } from "react";
import WorkingProofForm from "./WorkingProofForm";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { DocumentsUploadValidationSchema } from "../../../validations";
import { DocumentQueries } from '../../../../graphql/queries';
import { useLazyQuery } from "@apollo/react-hooks";
import { IWorkingProofFormValues, IDocumentInterface } from "../../../../interfaces";

const [GET_DOCUMENTS] = DocumentQueries;

const WorkingProof: FunctionComponent = () => {

  // Query to get uploaded documents
  const [getDocumentTemplates, { data: documents, refetch }] = useLazyQuery<
    any
  >(GET_DOCUMENTS);

  const [documentList, setDocumentList] = useState<IDocumentInterface | []>([]);

  useEffect(() => {
    // Fetch all document templates
    getDocumentTemplates({
      variables: { isDocumentTemplate: true }
    });
  }, [getDocumentTemplates]);

  useEffect(() => {
    if (documents) {
      const { getDocumentTemplates } = documents;
      if (getDocumentTemplates.length > 0) {
        setDocumentList(getDocumentTemplates);
      } else {
        setDocumentList([]);
      }
    }
  }, [documents]);

  const handleSubmit = async (
    values: IWorkingProofFormValues,
    { setSubmitting }: FormikHelpers<IWorkingProofFormValues>
  ) => { };

  const initialValues: IWorkingProofFormValues = {
    document: null,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={DocumentsUploadValidationSchema}
        render={(props: FormikProps<IWorkingProofFormValues>) => {
          return (
            <WorkingProofForm
              {...props}
              documentList={documentList}
              refetch={refetch}
            />
          );
        }}
      />
    </>
  );
};
export default WorkingProof;
