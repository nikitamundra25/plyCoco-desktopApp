import React, { Component } from "react";
import {
  Col,
  Row,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  UncontrolledTooltip
} from "reactstrap";
// import "./index.scss";   
import { RouteComponentProps } from "react-router-dom";
import EmailMenus from "../CareGiver/Emails/EmailMenus";
import { languageTranslation } from "../../helpers";
class CareGiverTodo extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: true,
      Opened: true
    };
  }
  options = [
    { value: "Denis", label: "Aaron, Hank" },
    { value: "Denis", label: "Bergman, Ingmar" },
    { value: "Beck, Glenn", label: "Berle, Milton" }
  ];
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  onEntered = () => {
    this.setState({
      Opened: !this.state.Opened
    });
  };
  render() {
   return (
     <>
       <div className="email-section">
         {/* <EmailMenus
           location={this.props.location}
           history={this.props.history}
         /> */}
         <div className="email-content">
           <h5 className="content-title">
             {languageTranslation("CARE_GIVER_TODO")}
           </h5>

           <Row>
             <Col lg={"12"}>
               <div className="email-inbox-section">
                 <div className="filter-form form-section">
                   <Row>
                     <Col lg={"3"}>
                       <FormGroup className="mb-2">
                         <Input
                           type="text"
                           name="search"
                           id="search"
                           placeholder={languageTranslation(
                             "SEARCH_PLACEHOLDER"
                           )}
                         />
                       </FormGroup>
                     </Col>
                     <Col lg={"4"}>
                       <div className="filter-btn-wrap mb-2">
                         <span className="" id="search1">
                           <div className="edit-remark">
                             {languageTranslation("FIND")}
                           </div>
                         </span>
                         <span className="ml-2" id="reset">
                           <div className="edit-remark">
                             {languageTranslation("CLEAR")}
                           </div>
                         </span>
                       </div>
                     </Col>
                   </Row>
                 </div>

                 <div className="email-row-wrap align-items-center email-attributes-wrap">
                   <div className="email-attributes-content d-flex align-items-center">
                     <i className="fa fa-refresh mr-1"></i>
                     <span>{languageTranslation("REFRESH")}</span>
                   </div>
                   {/* <span className="email-attributes-seprator">|</span>
                   <div className="email-attributes-content">
                     <i className="fa fa-hourglass-end mr-1"></i>
                     <span>{languageTranslation("REPLY")}</span>
                   </div> */}
                 </div>

                 <Table responsive className="care-giver-todo">
                   <thead className="thead-bg">
                     <tr>
                       <th className="date-col">
                         {languageTranslation("DATE")}{" "}
                       </th>
                       <th className="name-col">
                         {languageTranslation("NAME")}{" "}
                       </th>
                       <th className="comment-col">
                         {" "}
                         {languageTranslation("COMMENT")}
                       </th>
                       <th className="external-col">
                         {" "}
                         {languageTranslation("EXTERNAL")}
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td colSpan={12}>
                         <div className="date-title">
                           <span className="align-middle mr-2">
                             <i className="icon-arrow-down" />
                           </span>
                           <span className="align-middle ">Date: 2019</span>
                         </div>
                         <div>
                           <Table
                             bordered
                             hover
                             responsive
                             className="inner-care-giver-todo"
                           >
                             <tbody>
                               <tr>
                                 <td className="date-col">26.08.2015 00:00</td>
                                 <td className="name-col">
                                   Generator, Origins and Meaning
                                 </td>
                                 <td className="comment-col">
                                   Lorem Ipsum is simply dummy text of the
                                   printing and typesetting industry.{" "}
                                 </td>
                                 <td className="external-col">
                                   <span className="checkboxli checkbox-custom checkbox-default">
                                     <input
                                       type="checkbox"
                                       id="checkAll"
                                       className=""
                                     />
                                     <label className=""> </label>
                                   </span>
                                 </td>
                               </tr>
                               <tr>
                                 <td className="date-col">26.08.2015 00:00</td>
                                 <td className="name-col">
                                   Generator, Origins and Meaning
                                 </td>
                                 <td className="comment-col">
                                   Lorem Ipsum is simply dummy text of the
                                   printing and typesetting industry.{" "}
                                 </td>
                                 <td className="external-col">
                                   <span className="checkboxli checkbox-custom checkbox-default">
                                     <input
                                       type="checkbox"
                                       id="checkAll"
                                       className=""
                                     />
                                     <label className=""> </label>
                                   </span>
                                 </td>
                               </tr>
                             </tbody>
                           </Table>
                         </div>
                       </td>
                     </tr>
                     <tr>
                       <td colSpan={12}>
                         <div className="date-title">
                           <span className="align-middle mr-2">
                             <i className="icon-arrow-down" />
                           </span>
                           <span className="align-middle ">Date: 2018</span>
                         </div>
                         <div>
                           <Table
                             bordered
                             hover
                             responsive
                             className="inner-care-giver-todo"
                           >
                             <tbody>
                               <tr>
                                 <td className="date-col">26.08.2015 00:00</td>
                                 <td className="name-col">
                                   Generator, Origins and Meaning
                                 </td>
                                 <td className="comment-col">
                                   Lorem Ipsum is simply dummy text of the
                                   printing and typesetting industry.{" "}
                                 </td>
                                 <td className="external-col">
                                   <span className="checkboxli checkbox-custom checkbox-default">
                                     <input
                                       type="checkbox"
                                       id="checkAll"
                                       className=""
                                     />
                                     <label className=""> </label>
                                   </span>
                                 </td>
                               </tr>
                               <tr>
                                 <td className="date-col">26.08.2015 00:00</td>
                                 <td className="name-col">
                                   Generator, Origins and Meaning
                                 </td>
                                 <td className="comment-col">
                                   Lorem Ipsum is simply dummy text of the
                                   printing and typesetting industry.{" "}
                                 </td>
                                 <td className="external-col">
                                   <span className="checkboxli checkbox-custom checkbox-default">
                                     <input
                                       type="checkbox"
                                       id="checkAll"
                                       className=""
                                     />
                                     <label className=""> </label>
                                   </span>
                                 </td>
                               </tr>
                             </tbody>
                           </Table>
                         </div>
                       </td>
                     </tr>
                   </tbody>
                 </Table>
               </div>
             </Col>
           </Row>
         </div>
       </div>
     </>
   );
  }
}
export default CareGiverTodo;
