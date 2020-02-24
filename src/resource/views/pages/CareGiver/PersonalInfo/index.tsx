import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { IReactSelectInterface } from './../../../../../interfaces';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { PersonalInformation } from './PersonalInformation';
import Loader from '../../../containers/Loader/Loader';
import '../caregiver.scss';

const [, GET_CAREGIVER_BY_ID] = CareGiverQueries;

const PersonalInfo: FunctionComponent<{
  careGiverOpt: IReactSelectInterface[];
}> = ({ careGiverOpt }: { careGiverOpt: IReactSelectInterface[] }) => {
  let { id } = useParams();
  const { data, loading } = useQuery<any>(GET_CAREGIVER_BY_ID, {
    variables: {
      id: id ? parseInt(id) : '',
    },
  });

  return loading ? (
    <div className='overview-loader'>
      <Loader />
    </div>
  ) : (
    <PersonalInformation
      getCaregiver={data ? data.getCaregiver : {}}
      careGiverOpt={careGiverOpt}
    />
  );
};

export default PersonalInfo;
