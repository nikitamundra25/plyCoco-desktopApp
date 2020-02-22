import React, { FunctionComponent, useState } from 'react';
import { Input, UncontrolledTooltip } from 'reactstrap';
import { FormikProps } from 'formik';
import { languageTranslation } from '../../../../../../helpers';
import {
  ICareInstitutionFormValues,
  ICareInstitutionRemarks
} from '../../../../../../interfaces';
import moment from 'moment';
import { ConfirmBox } from '../../../../components/ConfirmBox';
import { toast } from 'react-toastify';
import { defaultDateFormat, client } from '../../../../../../config';
import { ProfileQueries } from '../../../../../../graphql/queries';

let toastId: any;
const [VIEW_PROFILE] = ProfileQueries;

const RemarkFormData: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> & {
  setRemarksDetail: any;
  remarksDetail: any;
  saveRemark?: (message: string, remarksData: any) => void;
}> = (
  props: FormikProps<ICareInstitutionFormValues> & {
    setRemarksDetail?: any;
    remarksDetail?: any;
    saveRemark?: (message: string, remarksData: any) => void;
  }
) => {
  // To access data of loggedIn user
  let userData: any = '';
  try {
    userData = client.readQuery({
      query: VIEW_PROFILE
    });
  } catch (error) {}
  const { viewAdminProfile }: any = userData ? userData : {};
  const { firstName = '', lastName = '', id = '' } = viewAdminProfile
    ? viewAdminProfile
    : {};
  // To set active remark
  const [activeRemark, setActiveRemark] = useState(0);
  // To set field editable
  let [isEditRemark, setisEditRemark] = useState(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<number>(-1);
  const expandedText = (index: number) => {
    setIsExpand(activeRow === index || activeRow === -1 ? !isExpand : isExpand);
    setActiveRow(activeRow === index ? -1 : index);
  };
  // Function to remove remark
  const onDelete = async (index: number) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('REMARK_DELETE_CONFIRMATION')
    });
    if (!value) {
      return;
    } else {
      toast.dismiss();
      let temp = remarksDetail ? remarksDetail : [];
      temp = temp.filter((remark: any, i: number) => i !== index);
      if (setRemarksDetail) {
        await setRemarksDetail(temp);
        setFieldValue('remarkData', '');
        setisEditRemark(false);
        if (props.saveRemark) {
          props.saveRemark(languageTranslation('REMARK_DELETE_SUCCESS'), temp);
        } else {
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation('REMARK_DELETE_SUCCESS')
            );
          }
        }
      }
    }
  };

  const {
    values: { remarkValue, remarkData },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setRemarksDetail,
    remarksDetail
  } = props;

  return (
    <div className='remark-details '>
      <div className='remark-header d-flex align-items-center justify-content-between'>
        <h5 className='my-2 text-left activity-title'>
          {' '}
          {languageTranslation('REMARKS')}
        </h5>
      </div>
      <div className='remark-body remark-body-max-height custom-scrollbar'>
        <div className='activity-logs '>
          <div>
            <div>
              <div className='activity-block py-2 px-3'>
                <div className=' text-left'>
                  <div className='remark-section'>
                    <Input
                      type='textarea'
                      name={'remarkData'}
                      onChange={handleChange}
                      placeholder='Enter your remark'
                      value={remarkData}
                      className='height-textarea'
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className='activity-date position-relative'>
                  <span>
                    <i className='fa fa-clock-o mr-2'></i>
                    {moment().format(defaultDateFormat)}
                  </span>
                  <span>
                    <i className='fa fa-user mr-2'></i>
                    {[firstName, lastName].join(' ')}
                  </span>
                  <div className='remark-action-btn'>
                    <div
                      className={`add-remark-btn ${
                        !remarkData ? 'disabled-div' : ' '
                      }`}
                      onClick={e => {
                        if (remarkData) {
                          const temp = remarksDetail ? remarksDetail : [];
                          temp.unshift({
                            data: remarkData,
                            createdAt: moment().toISOString(),
                            createdBy: [firstName, lastName].join(' ')
                          });
                          if (setRemarksDetail) {
                            setRemarksDetail(temp);
                            setFieldValue('remarkData', '');
                          }
                          if (props.saveRemark) {
                            toast.dismiss();
                            props.saveRemark(
                              languageTranslation('REMARK_ADDED_SUCCESS'),
                              undefined
                            );
                          } else {
                            if (!toast.isActive(toastId)) {
                              toastId = toast.success(
                                languageTranslation('REMARK_ADDED_SUCCESS')
                              );
                            }
                          }
                        }
                      }}
                    >
                      <i className={'fa fa-plus'} />
                      &nbsp; {languageTranslation('ADD_MORE_BUTTON')}
                    </div>
                  </div>
                </div>
                <span className='activity-icon activity-set'></span>
              </div>
            </div>
          </div>

          {remarksDetail && remarksDetail.length ? (
            <>
              {remarksDetail.map(
                (remark: ICareInstitutionRemarks, index: number) => {
                  return (
                    <div className='activity-block py-2' key={index}>
                      <div>
                        <div className='remark-section'>
                          {activeRemark === index && isEditRemark ? (
                            <Input
                              type='textarea'
                              name={'remarkValue'}
                              onChange={handleChange}
                              placeholder='Enter your remark'
                              value={remarkValue}
                              maxLength={1000}
                              className='height-textarea '
                            />
                          ) : remark.data && remark.data.length <= 100 ? (
                            remark.data
                          ) : (
                            <p className='mb-0'>
                              {isExpand && activeRow === index
                                ? remark.data
                                : remark.data.substr(0, 100)}
                              <span
                                className='view-more-link'
                                onClick={() => expandedText(index)}
                              >
                                {isExpand && activeRow === index
                                  ? '...Read less'
                                  : '...Read more'}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className=' activity-date position-relative'>
                        <span>
                          <i className='fa fa-clock-o mr-2'></i>
                          {moment(remark.createdAt).format(defaultDateFormat)}
                        </span>
                        <span>
                          <i className='fa fa-user mr-2'></i>
                          {remark.createdBy}
                        </span>
                        <div className='remark-action-btn'>
                          <span
                            id={`edit${index}`}
                            onClick={() => {
                              // To update the remark
                              if (isEditRemark) {
                                if (remarkValue) {
                                  const temp = remarksDetail
                                    ? remarksDetail
                                    : [];
                                  temp[activeRemark].data = remarkValue;
                                  if (setRemarksDetail) {
                                    setRemarksDetail(temp);
                                    setFieldValue('remarkValue', '');
                                    setisEditRemark(false);
                                  }
                                  if (props.saveRemark) {
                                    toast.dismiss();
                                    props.saveRemark(
                                      languageTranslation(
                                        'REMARK_UPDATE_SUCCESS'
                                      ),
                                      undefined
                                    );
                                  } else {
                                    toast.dismiss(toastId);
                                    if (!toast.isActive(toastId)) {
                                      toastId = toast.success(
                                        languageTranslation(
                                          'REMARK_UPDATE_SUCCESS'
                                        )
                                      );
                                    }
                                  }
                                }
                              }
                              // To convert into text field on edit
                              else {
                                setisEditRemark(true);
                                setActiveRemark(index);
                                setFieldValue('remarkValue', remark.data);
                              }
                            }}
                            className='edit-btn cursor-pointer'
                          >
                            {activeRemark === index && isEditRemark ? (
                              <i className='fa fa-check'></i>
                            ) : (
                              <i className='icon-note'></i>
                            )}
                            <UncontrolledTooltip
                              placement='top'
                              target={`edit${index}`}
                            >
                              {activeRemark === index && isEditRemark
                                ? languageTranslation('REMARK_UPDATE')
                                : languageTranslation('REMARK_EDIT')}
                            </UncontrolledTooltip>
                          </span>
                          <span
                            onClick={() => onDelete(index)}
                            className='delete-btn cursor-pointer'
                            id={`delete${index}`}
                          >
                            <UncontrolledTooltip
                              placement='top'
                              target={`delete${index}`}
                            >
                              {languageTranslation('REMARK_DELETE')}
                            </UncontrolledTooltip>
                            <i className='icon-trash'></i>
                          </span>
                        </div>
                      </div>
                      <span className='activity-icon activity-set'></span>
                    </div>
                  );
                }
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default RemarkFormData;
