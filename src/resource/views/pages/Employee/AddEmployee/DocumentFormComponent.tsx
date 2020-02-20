import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useEffect
} from "react";
import { useParams } from "react-router";
import { Col, FormGroup, Label, Row, Input } from "reactstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { DocumentQueries } from "../../../../../graphql/queries";
import { DocumentMutations } from "../../../../../graphql/Mutations";
import { languageTranslation, logger } from "../../../../../helpers";
import { IEmailAttachmentData } from "../../../../../interfaces";
import { AttachmentList } from "../../../components/Attachments";
import { ConfirmBox } from "../../../components/ConfirmBox";
import { errorFormatter } from "../../../../../helpers/ErrorFormatter";
import { ApolloError } from "apollo-client";

const [, GET_DOCUMENTS] = DocumentQueries;
const [ADD_DOCUMENT, , UPDATE_DOCUMENT, DELETE_DOCUMENT] = DocumentMutations;

let toastId: any = null;

export const DocumentFormComponent: FunctionComponent<{
  id: string;
}> = ({ id }: { id: string }) => {
  const [attachment, setAttachment] = useState<IEmailAttachmentData[]>([]);
  // Query to fetch documents
  const { data, loading, refetch, called } = useQuery<any>(GET_DOCUMENTS, {
    variables: {
      userId: id ? parseInt(id) : ""
    },
    fetchPolicy: "cache-and-network"
  });
  //mutation to add documents of employee
  const [addDocument, { loading: addDocumentLoading }] = useMutation<any>(
    ADD_DOCUMENT,
    {
      onCompleted({ addUserDocuments }) {
        const {
          fileSize: size = 0,
          fileName = "",
          document: path = "",
          id = ""
        } = addUserDocuments ? addUserDocuments : {};
        setAttachment((prevArray: any) => [
          { size, path, fileName, url: null, file: null, id },
          ...prevArray
        ]);
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation("DOCUMENT_ADDED_SUCCESS")
          );
        }
      }
    }
  );

  // Mutation to delete Component
  const [deleteDocument] = useMutation<any>(DELETE_DOCUMENT, {
    onCompleted({ deleteDocument }) {
      const { id } = deleteDocument;
      setAttachment((prevArray: any) =>
        prevArray.filter((item: any) => item.id !== id)
      );
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation("DOCUMENT_DELETION_SUCCESS")
        );
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toast.error(message);
      }
    }
  });

  useEffect(() => {
    if (data) {
      let temp: IEmailAttachmentData[] = [];
      const { getDocuments } = data;
      getDocuments.forEach(
        ({
          document: path,
          fileName,
          fileSize: size,
          id
        }: {
          document: string;
          fileName: string;
          fileSize: number;
          id: string;
        }) => {
          temp.push({
            path,
            fileName,
            size,
            file: null,
            url: "",
            id
          });
        }
      );
      setAttachment(temp);
    }
  }, [data]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { files }
    } = e;
    if (files) {
      for (let index = 0; index < files.length; index++) {
        let reader = new FileReader();
        let file = files[index];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          let temp = {
            url: reader.result,
            fileName: file.name,
            size: file.size,
            file,
            path: ""
          };
          addDocument({
            variables: {
              documentInput: {
                userId: id ? id : "",
                document: file
              }
            }
          });
        };
      }
    }
  };
  //on delete document
  const onDeleteDocument = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_DOCUMENT_DELETE_MSG")
    });
    if (!value) {
      return;
    } else {
      try {
        if (id) {
          deleteDocument({
            variables: {
              id: parseInt(id)
            }
          });
        }
      } catch (error) {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toast.error(message);
        }
      }
    }
  };

  return (
    <Row>
      <Col lg={"12"} md={"12"} sm={"12"}>
        <div>
          <h5 className="main-title ">Documents</h5>
          <FormGroup className="mb-2">
            <div>
              <div className="custom-file-div position-relative">
                <Input
                  id="FileBrowser"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="custom-input-file"
                />

                <Label className="custom-label-file" for="FileBrowser">
                  <span className="choosefile-label">
                    <i className="fa fa-folder-open mr-2"></i>
                    <span>{languageTranslation("BROWSE_FILE")}</span>
                  </span>
                  <span className="upload-doc-name">
                    {languageTranslation("CHOOSE_FILE")}
                  </span>
                </Label>
              </div>
            </div>
          </FormGroup>
        </div>
        {/* <FormGroup className={`col-sm-6`}>
        <Label className="simple-label mb-2">Documents</Label>
        <input type="file" multiple onChange={handleImageChange} />
      </FormGroup> */}
        <div className="employee-document-list custom-scrollbar">
          {attachment && attachment.length ? (
            <AttachmentList
              attachment={attachment}
              onDelteDocument={onDeleteDocument}
            />
          ) : null}
        </div>
      </Col>
    </Row>
  );
};
