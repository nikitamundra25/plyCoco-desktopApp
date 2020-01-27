import React, { Component } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { careGiverRoutes } from "../SidebarRoutes/CareGiverRoutes";
import { languageTranslation } from "../../../../helpers";
// class CareGiverSidebar extends Component<any, any> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       activeTab: "1",
//       error: false
//     };
//   }
//   onToggle = (tab: any) => {
//     const { activeTab } = this.state;
//     if (activeTab !== tab) {
//       this.setState({
//         activeTab: tab.toString()
//       });
//     }
//   };

//   render() {
//     const {
//       location: { pathname }
//     } = this.props;
//     return (
//       <div className="common-sidnav">
//         <Nav className="common-ul" tabs>
//           {careGiverRoutes.map(route => {
//             return route.path ? (
//               <NavItem>
//                 <NavLink
//                   className={pathname === route.path ? "active" : null}
//                   onClick={() => this.props.history.push(route.path)}
//                 >
//                   <span className="nav-text">{route.name}</span>
//                 </NavLink>
//               </NavItem>
//             ) : null;
//           })}
//         </Nav>
//         <Button color={"primary"} className={"btn-add"}>
//           {languageTranslation("SAVE_BUTTON")}
//         </Button>
//       </div>
//     );
//   }
// }


const CareGiverSidebar = (props: any) => {
  return (
    <div className="common-sidnav">
      <Nav className="common-ul" tabs>
        {props.tabs
          ? props.tabs.map((tab: any, index: number) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    // className={pathname === route.path ? "active" : null}
                    active={index === props.activeTab}
                    onClick={(e: any) => {
                      e.preventDefault();
                      if (props.onTabChange) props.onTabChange(index);
                    }}
                  >
                    <span className="nav-text text-capitalize">{tab.name}</span>
                  </NavLink>
                </NavItem>
              );
            })
          : null}
      </Nav>
    </div>
  );
};

export default CareGiverSidebar;
