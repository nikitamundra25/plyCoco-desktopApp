import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { useLazyQuery } from '@apollo/react-hooks';
import {
  languageTranslation,
  stripHtml
} from '../../../../helpers';
import {
  ProfileQueries,
  CareInstitutionQueries
} from '../../../../graphql/queries';
import {
  IEmailAttachmentData
} from '../../../../interfaces';
import { CareInstitutionListComponent } from './CareInstitutionListComponent';
import filter from '../../../assets/img/filter.svg';
import refresh from '../../../assets/img/refresh.svg';
import './index.scss';
import { useHistory } from 'react-router';
import { client } from '../../../../config';


const [GET_CARE_INSTITUTION_LIST] = CareInstitutionQueries;
const [VIEW_PROFILE] = ProfileQueries;

const BulkEmailCaregiver: FunctionComponent<any> = (props: any) => {
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
  const history = useHistory();

  // To access data of loggedIn user
  let userData: any = '';
  try {
    userData = client.readQuery({
      query: VIEW_PROFILE
    });
  } catch (error) { }

  const { viewAdminProfile }: any = userData ? userData : {};
  const { firstName = '', lastName = '', id = '' } = viewAdminProfile
    ? viewAdminProfile
    : {};

  // To get caregiver list from db
  const [
    getCareInstitutions,
    { data: data, called, loading, refetch, fetchMore }
  ] = useLazyQuery<any, any>(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: 'no-cache'
  });


  const [page, setPage] = useState<number>(1);
  const [template, setTemplate] = useState<any>(undefined);
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<any>('');
  const [attachments, setAttachments] = useState<IEmailAttachmentData[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [bulkcareGivers, setBulkCareGivers] = useState<boolean>(false);
  const [careInstitutions, setCareInstitution] = useState<any>([]);

  useEffect(() => {
    // Fetch list of caregivers
    console.log('Helooo');
    if (props.label !== 'appointment') {
      getCareInstitutions({
        variables: {
          searchBy: '',
          sortBy: 3,
          limit: 30,
          page,
          isActive: ''
        }
      });
    }
  }, []);


  useEffect(() => {
    if (data) {
      const { getCareInstitutions } = data;
      setCareInstitution(getCareInstitutions);
    }
  }, [data]);

  // Refresh component
  const onRefresh = () => {
    // refetch();
    getCareInstitutions({
      variables: {
        searchBy: '',
        sortBy: 3,
        limit: 30,
        page: 1,
        isActive: ''
      }
    });
    setSubject('');
    setBody(undefined);
    setAttachments([]);
    setIsSubmit(false);
    setPage(page);
    setTemplate({ label: '', value: '' });
    setselectedCareGiver([]);
    setBulkCareGivers(false);
  };

  const handleSelectAll = async () => {
    if (careInstitutions && careInstitutions.careInstitutionData.length) {
      let list: any = [];
      if (!bulkcareGivers) {
        careInstitutions.careInstitutionData.map((key: any) => {
          return (list = [...list, parseInt(key.id)]);
        });
        setselectedCareGiver(list);
        setBulkCareGivers(true);
      } else {
        setselectedCareGiver([]);
        setBulkCareGivers(false);
      }
    }
  };

  const handleCheckElement = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { target } = e;
    const { checked } = target;

    if (checked) {
      setselectedCareGiver((selectedCareGiver: any) => [
        ...selectedCareGiver,
        parseInt(id)
      ]);
      if (
        careInstitutions &&
        careInstitutions.length === selectedCareGiver.length + 1
      ) {
        setBulkCareGivers(true);
      } else {
        setBulkCareGivers(false);
      }
    } else {
      if (selectedCareGiver.indexOf(parseInt(id)) > -1) {
        selectedCareGiver.splice(selectedCareGiver.indexOf(parseInt(id)), 1);
        setselectedCareGiver([...selectedCareGiver]);
      }
      if (careInstitutions && careInstitutions.length === selectedCareGiver.length) {
        setBulkCareGivers(true);
      } else {
        setBulkCareGivers(false);
      }
    }
  };

  const handleSendEmail = (e: React.FormEvent<any>) => {
    e.preventDefault();
    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : '';
    const result = stripHtml(content);
    setIsSubmit(true);
  };

  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <div className='sticky-common-header'>
            <div className='common-topheader d-flex align-items-center px-2 mb-1'>
              <div className='header-nav-item' onClick={onRefresh}>
                <span className='header-nav-icon'>
                  <img src={refresh} alt='' />
                </span>
                <span className='header-nav-text'>
                  {languageTranslation('REFRESH')}
                </span>
              </div>
              {/* <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={filter} alt='' />
                </span>
                <span className='header-nav-text'>
                  {languageTranslation('ATTRIBUTES')}
                </span>
              </div> */}
              <div className='ml-auto'>
                <Button
                  color='primary'
                  onClick={handleSendEmail}
                  className='btn-email-save ml-auto mr-2 btn btn-primary'
                >
                  <i className='fa fa-spinner fa-spin mr-2' />
                  <span>{languageTranslation('SEND')}</span>
                </Button>
              </div>
            </div>
          </div>

          <div className='common-content flex-grow-1'>
            <div className='bulk-email-section'>
              <Row>
                <CareInstitutionListComponent
                  handleSelectAll={handleSelectAll}
                  called={called}
                  loading={loading}
                  careInstitutions={careInstitutions}
                  setCareInstitution={setCareInstitution}
                  selectedCareGiver={selectedCareGiver}
                  handleCheckElement={handleCheckElement}
                  page={page}
                  label={props.label}
                  bulkcareGivers={bulkcareGivers}
                />

                {/* <EmailEditorComponent
                  body={body}
                  templateOptions={templateOptions}
                  subject={subject}
                  onTemplateSelection={onTemplateSelection}
                  onEditorStateChange={onEditorStateChange}
                  template={template}
                  handleChangeSubject={handleChangeSubject}
                  attachments={attachments}
                  uploadDocument={uploadDocument}
                  onDelteDocument={onDelteDocument}
                  isSubmit={isSubmit}
                /> */}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkEmailCaregiver;
