import React, { FunctionComponent, useEffect } from 'react';
import Select from 'react-select';
import { RegionQueries } from '../../../../graphql/queries/Region';
import { useLazyQuery } from '@apollo/react-hooks';
import { IReactSelectInterface, IRegion } from '../../../../interfaces';
import { languageTranslation } from '../../../../helpers';

const [, GET_REGIONS] = RegionQueries;

const DefaultFooter: FunctionComponent = () => {
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS,
  );
  const regionOptions: IReactSelectInterface[] | undefined = [];
  if (RegionData && RegionData.getRegions && RegionData.getRegions.regionData) {
    RegionData.getRegions.regionData.forEach(({ id, regionName }: IRegion) =>
      regionOptions.push({
        label: regionName,
        value: id,
      }),
    );
  }
  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
        sortBy: 3,
      },
    });
  }, []);
  return (
    <React.Fragment>
      <div className='d-flex align-items-center justify-content-end w-100'>
        <div className='region-select footer-select text-capitalize'>
          <Select
            placeholder={languageTranslation('EMPLOYEE_REGION_PLACEHOLDER')}
            options={regionOptions}
            className={'menu-outer-top'}
            menuPlacement={'top'}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DefaultFooter;
