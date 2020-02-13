import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import { useParams } from 'react-router';
import { Col, FormGroup, Label } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { DocumentQueries } from '../../../../../graphql/queries';
import { DocumentMutations } from '../../../../../graphql/Mutations';
import { languageTranslation, logger } from '../../../../../helpers';
import { IEmailAttachmentData } from '../../../../../interfaces';
import { AttachmentList } from '../../../components/Attachments';

const [, GET_DOCUMENTS] = DocumentQueries;
const [ADD_DOCUMENT, , UPDATE_DOCUMENT, DELETE_DOCUMENT] = DocumentMutations;

let toastId: any = null;

export const DocumentFormComponent: FunctionComponent = () => {
  let { id } = useParams();

  const [attachment, setAttachment] = useState<IEmailAttachmentData[]>([]);
  // Query to fetch documents
  const { data, loading, refetch, called } = useQuery<any>(GET_DOCUMENTS, {
    variables: {
      userId: id ? parseInt(id) : '',
    },
  });
  //mutation to add documents of employee
  const [addDocument, { loading: addDocumentLoading }] = useMutation<any>(
    ADD_DOCUMENT,
    {
      onCompleted({ addUserDocuments }) {
        console.log(addUserDocuments, 'addDocument');
        const {
          fileSize: size = 0,
          fileName = '',
          document: path = '',
        } = addUserDocuments ? addUserDocuments : {};
        setAttachment((prevArray: any) => [
          ...prevArray,
          { size, path, fileName, url: null, file: null },
        ]);
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('DOCUMENT_ADDED_SUCCESS'),
          );
        }
      },
    },
  );

  useEffect(() => {
    if (data) {
      let temp: IEmailAttachmentData[] = [];
      const { getDocuments } = data;
      getDocuments.forEach(
        ({
          document: path,
          fileName,
          fileSize: size,
          id,
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
            url: '',
            id,
          });
        },
      );
      setAttachment(temp);
    }
  }, [data]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      target: { files },
    } = e;
    console.log(files, 'files');
    if (files) {
      console.log(files.length, 'files.length');
      for (let index = 0; index < files.length; index++) {
        let reader = new FileReader();
        let file = files[index];
        console.log('in for loop', reader);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          let temp = {
            url: reader.result,
            fileName: file.name,
            size: file.size,
            file,
            path: '',
          };
          console.log('on load end', temp);

          addDocument({
            variables: {
              documentInput: {
                userId: id ? id : '',
                document: file,
              },
            },
          });
        };
      }
    }
  };
  console.log(attachment, 'attachment', data);

  return (
    <Col sm={'6'}>
      <FormGroup className={`col-sm-6`}>
        <Label className='simple-label mb-2'>Documents</Label>
        <input type='file' multiple onChange={handleImageChange} />
      </FormGroup>
      {attachment && attachment.length ? (
        <AttachmentList
          attachment={attachment}
          // onDelteDocument={onDelteDocument}
        />
      ) : null}
    </Col>
  );
};
