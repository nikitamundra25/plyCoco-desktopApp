import React, { FunctionComponent } from 'react';
import { Col, Table } from 'reactstrap';
import { ICareGiverListComponentProps } from '../../../../interfaces/BulkEmailCaregiver';
import Loader from '../../containers/Loader/Loader';
import { languageTranslation } from '../../../../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';

export const CareInstitutionListComponent: FunctionComponent<ICareGiverListComponentProps &
  any> = (props: ICareGiverListComponentProps & any) => {
  const {
    careInstitutions,
    handleSelectAll,
    called,
    loading,
    selectedCareGiver,
    handleCheckElement,
    handleInfiniteScroll,
    page,
    bulkcareGivers,
    careInstData
  } = props;

  const handleChecked = (id: string) => {
    if (selectedCareGiver && selectedCareGiver.length) {
      const found = selectedCareGiver.some(
        (el: any) => parseInt(el) === parseInt(id)
      );
      const e = {
        target: {
          checked: !found
        }
      };
      handleCheckElement(e, id);
    } else {
      const e = {
        target: {
          checked: true
        }
      };
      handleCheckElement(e, id);
    }
  };

  const { getCareInstitution = {} } = careInstData ? careInstData : {};
  const {
    firstName = '',
    lastName = '',
    email = '',
    canstitution = {},
    contact = []
  } = getCareInstitution ? getCareInstitution : {};
  const { companyName = '' } = canstitution ? canstitution : {};
  const temp = [
    {
      companyName,
      contactType: languageTranslation('MAIN_CONTACT'),
      name: [lastName, firstName].join(' '),
      email
    }
  ];

  if (contact && contact.length) {
    contact.forEach((item: any) => {
      const {
        firstName = '',
        surName = '',
        email = '',
        contact_type = {}
      } = item ? item : {};
      temp.push({
        companyName: '',
        contactType:
          contact_type && contact_type.contactType
            ? contact_type.contactType
            : '',
        name: [surName, firstName].join(' '),
        email
      });
    });
  }
  // if (careInstData) {
  // }

  return (
    <Col lg={'5'} className='pr-lg-0'>
      <Table bordered hover responsive className='mb-0'>
        <thead className='thead-bg'>
          <tr>
            <th className='checkbox-th-column'>
              <span className=' checkbox-custom '>
                <input
                  type='checkbox'
                  id='checkAll'
                  name='checkbox'
                  className=''
                  checked={
                    bulkcareGivers ? true : false
                    // careInstitutions &&
                    // careInstitutions.careInstitutionData &&
                    // careInstitutions.careInstitutionData.result.length ===
                    //   selectedCareGiver.length
                    //   ? true
                    //   : false
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleSelectAll(e);
                  }}
                />
                <label className=''></label>
              </span>
            </th>
            <th className=''>{languageTranslation('MENU_INSTITUTION')}</th>
            <th className=''>{languageTranslation('CONTACT')}</th>
            <th>{languageTranslation('NAME')}</th>
            <th className=''>{languageTranslation('EMAIL')}</th>
            {/* <th>{languageTranslation('SALUTATION')}</th> */}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className={'table-loader'} colSpan={8}>
                <Loader />
              </td>
            </tr>
          ) : temp && temp.length ? (
            temp.map((item: any, index: number) => {
              const {
                companyName = '',
                contactType = '',
                name = '',
                email = ''
              } = item ? item : {};
              return (
                <tr
                  key={index}
                  onClick={(e: any) => {
                    handleChecked(item.id);
                  }}
                  className='cursor-pointer'
                >
                  <td>
                    <span className=' checkbox-custom  '>
                      <input
                        type='checkbox'
                        id='check'
                        name='checkbox'
                        className=''
                        checked={
                          selectedCareGiver &&
                          selectedCareGiver.length &&
                          selectedCareGiver.indexOf(parseInt(item.id)) > -1
                            ? true
                            : false
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleCheckElement(e, item.id);
                        }}
                      />
                      <label className=''></label>
                    </span>
                  </td>
                  <td>{companyName}</td>
                  <td>{contactType}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  {/* <td>{item.salutation}</td> */}
                </tr>
              );
            })
          ) : null}
        </tbody>
      </Table>
    </Col>
  );
};
