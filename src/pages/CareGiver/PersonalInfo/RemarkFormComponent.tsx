import React, { FunctionComponent, useState } from 'react';
import { Input, Col } from 'reactstrap';
import { FormikProps, FieldArray } from 'formik';
import { languageTranslation } from '../../../helpers';
import { ICareInstitutionRemarks, ICareGiverValues } from '../../../interfaces';
import moment from 'moment';
// import { handleChange } from '../../../common/forms/FormikFields/utils';

const RemarkFormComponent: FunctionComponent<FormikProps<ICareGiverValues> & {
  setRemarksDetail?: any;
  remarksDetail?: any;
}> = (
  props: FormikProps<ICareGiverValues> & {
    setRemarksDetail?: any;
    remarksDetail?: any;
  },
) => {
  const [activeRemark, setActiveRemark] = useState(0);
  let [changeRemark, setchangeRemark] = useState({
    data: '',
    createdAt: '',
    createdBy: '',
  });

  let [isEditRemark, setisEditRemark] = useState(false);
  let [remarkIndex, setisRemarkIndex] = useState(-1);

  const {
    values: { remarks, remarkData },
    setFieldValue,
    setRemarksDetail,
    remarksDetail,
    handleChange,
  } = props;
  console.log('remarkIndex', remarksDetail, props.values);

  return (
    <Col lg={4}>
      <div className='remark-details'>
        <div className='remark-header d-flex align-items-center justify-content-between'>
          <h5 className='my-2 text-left activity-title'>
            {' '}
            {languageTranslation('REMARKS')}
          </h5>
        </div>
        <div className='remark-body remark-body-max-height '>
          <div className='activity-logs '>
            <div>
              <div>
                <div className='activity-block py-2 px-3'>
                  <div className=' text-left'>
                    <div className='remark-section'>
                      <Input
                        type='textarea'
                        name={'remarkData'}
                        onChange={
                          handleChange
                          // (e: any) =>
                          // setchangeRemark(
                          //   (changeRemark = {
                          //     data: e.target.value.trimStart(),
                          //     createdAt: moment().format(
                          //       'MMMM Do YYYY, h:mm a',
                          //     ),
                          //     createdBy: 'john doe',
                          //   }),
                          // )
                        }
                        placeholder='Remarks'
                        value={remarkData}
                        className='height-textarea '
                      />
                      {!isEditRemark ? (
                        <div
                          className={`add-remark-btn ${
                            !remarkData ? 'disabled-div' : ' '
                          }`}
                          onClick={e => {
                            const temp = remarksDetail ? remarksDetail : [];
                            temp.unshift({
                              data: remarkData,
                              createdAt: moment().format(
                                'MMMM Do YYYY, h:mm a',
                              ),
                              createdBy: 'john doe',
                            });
                            if (setRemarksDetail) {
                              setRemarksDetail(temp);
                              setFieldValue('remarkData', '');
                            }
                            // changeRemark && changeRemark.data
                            //   ? arrayHelpers.push(changeRemark)
                            //   : null;
                            // setchangeRemark(
                            //   (changeRemark = {
                            //     data: '',
                            //     createdAt: '',
                            //     createdBy: '',
                            //   }),
                            // );
                            // null;
                          }}
                        >
                          <i className={'fa fa-plus'} />
                          &nbsp; Add More
                        </div>
                      ) : (
                        <div>
                          <span
                            className={'btn'}
                            onClick={e => {
                              const temp = remarksDetail ? remarksDetail : [];
                              temp[activeRemark].data = remarkData;
                              // temp.push({
                              //   data: remarkData,
                              //   createdAt: moment().format(
                              //     'MMMM Do YYYY, h:mm a',
                              //   ),
                              //   createdBy: 'john doe',
                              // });
                              if (setRemarksDetail) {
                                setRemarksDetail(temp);
                                setFieldValue('remarkData', '');
                                setisEditRemark(false);
                              }
                            }}
                          >
                            update
                          </span>
                          <span
                            className={'btn'}
                            onClick={() => {
                              setisEditRemark((isEditRemark = false));
                              setchangeRemark(
                                (changeRemark = {
                                  data: '',
                                  createdAt: '',
                                  createdBy: '',
                                }),
                              );
                              null;
                            }}
                          >
                            cancel
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='text-left activity-date'>
                    <span>
                      <i className='fa fa-clock-o mr-2'></i>
                      {moment().format('MMMM Do YYYY, h:mm a')}
                    </span>
                    <span>
                      <i className='fa fa-user mr-2'></i>Mark Smith
                    </span>
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
                      <div className='activity-block py-2 px-3'>
                        <div className='text-left'>
                          <div className='remark-section'>{remark.data}</div>
                        </div>
                        <div className='text-left activity-date position-relative'>
                          <span>
                            <i className='fa fa-clock-o mr-2'></i>
                            {remark.createdAt}
                          </span>
                          <span>
                            <i className='fa fa-user mr-2'></i>Mark Smith
                          </span>
                          <div className='remark-action-btn'>
                            <span
                              onClick={() => {
                                setisEditRemark(true);
                                setActiveRemark(index);
                                setFieldValue('remarkData', remark.data);
                                // setchangeRemark(
                                //   (changeRemark = {
                                //     data: remark.data,
                                //     createdAt: moment(remark.createdAt).format(
                                //       'MMMM Do YYYY, h:mm a',
                                //     ),
                                //     createdBy: 'john doe',
                                //   }),
                                // );
                                // setisRemarkIndex((remarkIndex = index));
                              }}
                              className='edit-btn'
                            >
                              <i className='icon-note'></i>
                            </span>
                            <span
                              onClick={() => {
                                let temp = remarksDetail ? remarksDetail : [];
                                temp = temp.filter(
                                  (remark: any, i: number) => i !== index,
                                );
                                if (setRemarksDetail) {
                                  setRemarksDetail(temp);
                                  setFieldValue('remarkData', '');
                                  setisEditRemark(false);
                                }
                              }}
                              className='delete-btn'
                            >
                              <i className='icon-trash'></i>
                            </span>
                          </div>
                        </div>
                        <span className='activity-icon activity-set'></span>
                      </div>
                    );
                  },
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RemarkFormComponent;
