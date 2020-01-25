import React, {
  useState,
  ChangeEvent,
  FunctionComponent,
  useEffect
} from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import Select from "react-select";
import { RegionQueries } from "../../queries/Region";
import { useLazyQuery } from "@apollo/react-hooks";
import { IReactSelectInterface, IRegion } from "../../interfaces";
import { languageTranslation } from "../../helpers";
const [, GET_REGIONS] = RegionQueries;

const DefaultFooter: FunctionComponent = () => {
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS
  );
  const regionOptions: IReactSelectInterface[] | undefined = [];
  if (RegionData && RegionData.getRegions && RegionData.getRegions.regionData) {
    RegionData.getRegions.regionData.forEach(({ id, regionName }: IRegion) =>
      regionOptions.push({
        label: regionName,
        value: id
      })
    );
  }
  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
        sortBy: 3
      }
    });
  }, []);
  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-end w-100">
        <div className="region-select footer-select">
          <Select
            placeholder={languageTranslation("EMPLOYEE_REGION_PLACEHOLDER")}
            options={regionOptions}
            className={"menu-outer-top"}
            menuPlacement={"top"}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefaultFooter;
