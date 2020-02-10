import React, {
    Component,
    FunctionComponent,
    useCallback,
    useState,
} from 'react';
import { FormGroup, Label, Input, Col, Row, Form, Button,InputGroup,InputGroupAddon,InputGroupText,Table } from 'reactstrap';

import Select from 'react-select';
import { languageTranslation } from '../../../../helpers';
import { State } from '../../../../config';

import displaydoc from '../../../assets/img/display-doc.svg';
import upload from '../../../assets/img/upload.svg';
import visit from '../../../assets/img/visit.svg';
import './index.scss';
import { LanguageAction } from '../../../../store/actions';

const Appointment: FunctionComponent = () => {



    return (
        <>
            <div className="common-detail-page">
                <div className="common-detail-section">
                    <div className="sticky-common-header">
                        <div className="common-topheader d-flex align-items-center px-2 mb-1">
                            <div className="header-nav-item">
                                <span className="header-nav-icon">
                                    <img src={upload} alt="" />
                                </span>
                                <span className="header-nav-text">
                                    Retrieve new work proofs
                  </span>
                            </div>
                            <div className="header-nav-item">
                                <span className="header-nav-icon">
                                    <img src={displaydoc} alt="" />
                                </span>
                                <span className="header-nav-text">Display different</span>
                            </div>
                            <div className="header-nav-item">
                                <span className="header-nav-text">Hide mapped</span>
                            </div>
                            <div className="header-nav-item">
                                <span className="header-nav-text">Hide Locked caregiver</span>
                            </div>
                            <div className="header-nav-item">
                                <span className="header-nav-text">Hide old files</span>
                            </div>
                        </div>
                    </div>

                    <div className="common-content flex-grow-1">
                    {/* <h5 className="content-title">Appointment</h5> */}
                        <div>
                            <Row>
                           
                                <Col lg={"4"}>
                                <div><h5 className="content-title">Fachkraft</h5></div>
                                    <div className='form-section'>
                                        <div className='form-card minheight-auto '>
                                            <Row>
                                                <Col lg={'12'}>
                                                
                                                </Col>
                                            </Row></div>
                                    </div>
                                </Col>
                                <Col lg={"4"}>
                                 <div><h5 className="content-title">{languageTranslation("PROFESSIONAL")}</h5></div>
                                    <div className='form-section'>
                                        <div className='form-card minheight-auto '>
                                            <Row>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('APPOINTMENT_ID')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                    <Input
                                                                        type='text'
                                                                        name={'id'}


                                                                        placeholder={languageTranslation('APPOINTMENT_ID')}
                                                                        className='width-common'
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('NAME')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                        <InputGroup>
                                                                        <Input />
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> <i className="fa fa-star" aria-hidden="true"></i></Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div> 
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('DATE')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input
                                                                    type="date"
                                                                    name="date"
                                                                    id="exampleDate"
                                                                    // placeholder="date placeholder"
                                                                    className="mb-2"
                                                                    />
                                                                     <span className="checkbox-custom mb-0 mt-1">
                                                                     <Label check>
                                                                    <Input name="" type="checkbox" />  
                                                                   <span className="ml-1">{languageTranslation('EARLY')}</span>
                                                                    </Label>
                                                                     </span>
                                                                     <span className="checkbox-custom mb-0 mt-1 ml-2">
                                                                     <Label check>
                                                                    <Input  name="" type="checkbox" />  
                                                                    <span className="ml-1">{languageTranslation('LATE')}</span>
                                                                    </Label>
                                                                     </span>
                                                                     <span className="checkbox-custom mb-0 mt-1 ml-1">
                                                                     <Label check>
                                                                    <Input name="" type="checkbox" />  
                                                                        <span className="ml-2">{languageTranslation('NIGHT')}</span>
                                                                    </Label>
                                                                     </span>
                                                                </div>
                                                            </Col>
                                                            
                                                        </Row>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('FEE')} Fee
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                        <Col lg={"6"}>
                                                                <div className="form-group">
                                                                        <div>
                                                                        <InputGroup>
                                                                        <Input />
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> {languageTranslation('€')}</Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div>    
                                                                </div>
                                                            </Col>
                                                            <Col lg={"6"}>
                                                            <div>
                                                            <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> {languageTranslation('LAST')}</Button>
                                                                        </InputGroupAddon>
                                                                
                                                                </div>

                                                            </Col>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('ALLOWANCE_NIGHT')}
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                        <Col lg={"6"}>
                                                                <div className="form-group">
                                                                        <div>
                                                                        <InputGroup>
                                                                        <Input />
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> {languageTranslation('€')}</Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div>    
                                                                </div>
                                                            </Col>
                                                            <Col lg={"6"}>
                                                            <div>
                                                            <Input type="select" name="select" id="exampleSelect">
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                </Input>
                                                        </div>

                                                            </Col>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('ALLOWANCE_WE')} 
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                           <Col lg={"6"}>
                                                                <div className="form-group">
                                                                        <div>
                                                                        <InputGroup>
                                                                        <Input />
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> {languageTranslation('€')}</Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div>    
                                                                </div>
                                                            </Col>
                                                            
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('ALLOWANCE_HOLIDAY')} 
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                        <Col lg={"6"}>
                                                                <div className="form-group">
                                                                        <div>
                                                                        <InputGroup>
                                                                        <Input />
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> {languageTranslation('€')}</Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div>    
                                                                </div>
                                                            </Col>
                                                          
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('MILEAGE_ALLOWANCE')}
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                            <Col lg={"6"}>
                                                                <div className="form-group">
                                                                    
                                                                        <div>
                                                                        <InputGroup>
                                                                        <Input />
                                                                      <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> {languageTranslation('KM')}</Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div>    
                                                                </div>
                                                            </Col>
                                                            <Col lg={"6"}>
                                                                <div className="form-group">
                                                                    
                                                                        <div>
                                                                        <InputGroup>
                                                                        <span className="pr-2">{languageTranslation('A')}</span>
                                                                        <Input />
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> {languageTranslation('€')}</Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div>    
                                                                </div>
                                                            </Col>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                {languageTranslation('EXPENSES')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                <InputGroup>
                                                                        <Input />  
                                                                    </InputGroup>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('WORKING_HORUS')}
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                        <Col lg={"6"}>
                                                        <div>
                                                        <Input
                                                            type="date"
                                                            name="date"
                                                            id="exampleDate"
                                                            // placeholder="date placeholder"
                                                            />
                                                        </div>
                                                            </Col>
                                                            <Col lg={"6"}>
                                                            <div>
                                                            <Input type="select" name="select" id="exampleSelect">
                                                                <option>12-2-2020</option>
                                                                <option>15-2-2020</option>
                                                                <option>18-2-2020</option>
                                                                
                                                                </Input>
                                                        </div>

                                                            </Col>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('BREAK')}
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                        <Col lg={"6"}>
                                                        <div>
                                                        <Input
                                                            type="date"
                                                            name="date"
                                                            id="exampleDate"
                                                            // placeholder="date placeholder"
                                                            />
                                                        </div>
                                                            </Col>
                                                            <Col lg={"6"}>
                                                            <div>
                                                            <Input type="select" name="select" id="exampleSelect">
                                                                <option>12-2-2020</option>
                                                                <option>15-2-2020</option>
                                                                <option>18-2-2020</option>
                                                                
                                                                </Input>
                                                        </div>

                                                            </Col>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('DLN_REQUIRED')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                <span className="checkbox-custom mb-0 mt-1 ml-2">
                                                                     <Label check>
                                                                    <Input id="coding" name="interest" value="coding"  type="checkbox" />  
                                                              
                                                                    </Label>
                                                                     </span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                               
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('REMARKS_VISIBLE_TO_SPECIALIST')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('COMMENT_TO_SPECIALIST')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <Button className="btn" color="primary"><span> <i className="fa fa-times" aria-hidden="true"></i></span> {languageTranslation('CLEAR')}</Button>
                                                <Button className="btn ml-2" color="primary"><span> <i className="fa fa-floppy-o mr-1"></i></span>{languageTranslation('TO_SAVE')}</Button>
                                                </Col>
                                            </Row></div>
                                    </div>
                                </Col>
                                <Col lg={"4"}>
                                 <div><h5 className="content-title">{languageTranslation("FACILITY")}</h5></div>
                                    <div className='form-section'>
                                        <div className='form-card minheight-auto '>
                                            <Row>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('APPOINTMENT_ID')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                    <Input
                                                                        type='text'
                                                                        name={'id'}


                                                                        placeholder= {languageTranslation('APPOINTMENT_ID')}
                                                                        className='width-common'
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('NAME')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                        <InputGroup>
                                                                        <Input type="select" name="select" id="exampleSelect">
                                                                        <option>Sefige</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                        </Input>
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> <i className="fa fa-star" aria-hidden="true"></i></Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div> 
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('DATE')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input
                                                                    type="date"
                                                                    name="date"
                                                                    id="exampleDate"
                                                                    // placeholder="date placeholder"
                                                                    className="mb-2"
                                                                    />
                                                                    
                                                                </div>
                                                            </Col>
                                                            
                                                        </Row>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('WORKING_HOURS_START')} 
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                        
                                                          
                                                            <Col lg={"12"}>
                                                                <div className="form-group">
                                                                    <div className="custom-col inner-no-padding-col row">
                                                                       
                                                                        <Col lg={"6"}>
                                                                        <div>
                                                                        <Input type="select" name="select" id="exampleSelect">
                                                                        <option>Sefige</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                        </Input>
                                                                        </div>
                                                                        </Col>
                                                                        <Col lg={"6"}>
                                                                        <div>
                                                                        <InputGroup>
                                                                        <Input type="select" name="select" id="exampleSelect">
                                                                        <option>Sefige</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                        </Input>
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> <i className="fa fa-clock-o" aria-hidden="true"></i></Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div> 
                                                                        </Col>
                                                                        
                                                                      
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                      
                                                         
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={"4"}> 
                                                        <Label className='form-label col-form-label'>
                                                                    {languageTranslation('WORKING_HOURS_END')} 
                                                                </Label>
                                                        </Col>

                                                        <Col lg={"8"}> 
                                                        <div className="custom-col inner-no-padding-col row">
                                                        
                                                          
                                                        <Col lg={"12"}>
                                                                <div className="form-group">
                                                                    <div className="custom-col inner-no-padding-col row">
                                                                       
                                                                    <Col lg={"6"}>
                                                                        <div>
                                                                        <Input type="select" name="select" id="exampleSelect">
                                                                        <option>Sefige</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                        </Input>
                                                                        </div>
                                                                        </Col>
                                                                        <Col lg={"6"}>
                                                                        <div>
                                                                        <InputGroup>
                                                                        <Input type="select" name="select" id="exampleSelect">
                                                                        <option>Sefige</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                        <option>5</option>
                                                                        </Input>
                                                                        <InputGroupAddon addonType="append">
                                                                        <Button color="secondary width-common form-control"> <i className="fa fa-clock-o" aria-hidden="true"></i></Button>
                                                                        </InputGroupAddon>
                                                                    </InputGroup>
                                                                
                                                                </div> 
                                                                        </Col>
                                                                        
                                                                     
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                      
                                                         
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('QUALIFIKATION')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                <Input type="select" name="select" id="exampleSelect">
                                                                <option>Sefige</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                </Input>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('QUALIFICATION_FOR_SETTLEMENT')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                <Input type="select" name="select" id="exampleSelect">
                                                                <option>Sefige</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                </Input>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>

                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('DEPARTMENTS')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                <Input type="select" name="select" id="exampleSelect">
                                                                <option>Sefige</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                                </Input>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>

                                               

                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('ADDRESS')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                    <Input
                                                                        type='text'
                                                                        name={'id'}


                                                                        placeholder= {languageTranslation('ADDRESS')}
                                                                        className='width-common'
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('CONTACT_PERSON')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                    <Input
                                                                        type='text'
                                                                        name={'id'}


                                                                        placeholder= {languageTranslation('CONTACT_PERSON')}
                                                                        className='width-common'
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('COMMENTS_OFFER_DEPARTMENT')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                {languageTranslation('COMMETS_POSTED_DEPARTEMENT')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('COMMENTAR_DEPARTMENT_ONLY_VISIBLE_INTERNALLY')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('DLN_REQUIRED')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                                <span className="checkbox-custom mb-0 mt-1 ml-2">
                                                                     <Label check>
                                                                    <Input id="coding" name="interest" value="coding"  type="checkbox" />  
                                                              
                                                                    </Label>
                                                                     </span>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('REMARK_OFFER')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('COMMENTS_POSTED')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={'12'}>
                                                    <FormGroup>
                                                        <Row>
                                                            <Col sm='4'>
                                                                <Label className='form-label col-form-label'>
                                                                    {languageTranslation('COMMENT_TO_SPECIALIST')}
                                                                </Label>
                                                            </Col>
                                                            <Col sm='8'>
                                                                <div>
                                                               
                                                                <Input className="textarea-custom form-control" rows="3" type="textarea" name="text" id="exampleText" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={"12"}>
                                                <Button className="btn" color="primary"><span> <i className="fa fa-times" aria-hidden="true"></i></span> {languageTranslation('CLEAR')}</Button>
                                                <Button className="btn ml-2" color="primary"><span> <i className="fa fa-floppy-o mr-1"></i></span>{languageTranslation('TO_SAVE')}</Button>
                                                </Col>
                                            </Row></div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Appointment;
