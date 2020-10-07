import React, { useEffect, useState, FunctionComponent } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import {
  useMutation,
  useLazyQuery,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import moment from 'moment';
import { EmployeeValidationSchema } from '../../../../validations/EmployeeValidationSchema';
import {
  IEmployeeFormValues,
  IEmployeeInput,
  IAddEmployeeRes,
  ICountries,
  IReactSelectInterface,
  ICountry,
  IStates,
  IState,
} from '../../../../../interfaces';
import EmployeeFormComponent from './EmployeeFormComponent';
import {
  EmployeeQueries,
  CountryQueries,
} from '../../../../../graphql/queries';
import {  languageTranslation } from '../../../../../helpers';
import {
  AppRoutes,
  defaultDateFormat,
  dbAcceptableFormat,
} from '../../../../../config';
import { EmployeeMutations } from '../../../../../graphql/Mutations';
import { EmployeeSubscription } from '../../../../../graphql/Subscription';
import { errorFormatter } from '../../../../../helpers';
import Loader from '../../../containers/Loader/Loader';
import { Helmet } from 'react-helmet';

const [GET_EMPLOYEE_BY_ID, GET_EMPLOYEES] = EmployeeQueries;
const [ADD_EMPLOYEE, UPDATE_EMPLOYEE] = EmployeeMutations;
const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
const [GET_EMPLOYEE_BY_ID_SUBSCRIPTION] = EmployeeSubscription;

let toastId: any = null;

export const EmployeeForm: FunctionComponent<{
  employeeValues?: any;
}> = ({ employeeValues }: { employeeValues?: any }) => {
  // get id from params
  let { id }: any = useParams();
  let history = useHistory();
  const { state: locationState } = useLocation();
  const fetchEmployeeSubscription = useSubscription<any>(
    GET_EMPLOYEE_BY_ID_SUBSCRIPTION,
    {
      variables: {
        id: 'All',
      },
    },
  );
  // To get the employee details by id
  const [
    getEmployeeDetails,
    {
      data: employeeDetails,
      error: detailsError,
      loading: dataLoading,
      refetch,
    },
  ] = useLazyQuery<any>(GET_EMPLOYEE_BY_ID);

  // To fetch the list of countries
  const { data: countriesData } = useQuery<ICountries>(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY,
  );
  const [
    employeeData,
    setEmployeeData,
  ] = useState<IEmployeeFormValues | null>();

  const countriesOpt: IReactSelectInterface[] | undefined = [];
  // const statesOpt: IReactSelectInterface[] | undefined = [];
  if (countriesData && countriesData.countries) {
    countriesData.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({
        label: name,
        value: id,
      }),
    );
  }
  const [imageUrl, setImageUrl] = useState('');
  const [statesOpt, setStatesOpt] = useState<IReactSelectInterface[] | []>([]);
  const [states, setStatesValue] = useState<IReactSelectInterface | undefined>(
    undefined,
  );
  if (
    fetchEmployeeSubscription &&
    fetchEmployeeSubscription.data &&
    fetchEmployeeSubscription.data.employeeUpdateSubscribe &&
    employeeDetails.viewEmployee &&
    employeeDetails.viewEmployee
  ) {
    if (
      employeeDetails.viewEmployee.id ==
      fetchEmployeeSubscription.data.employeeUpdateSubscribe.id
    ) {
      employeeDetails.viewEmployee.employee.state =
        fetchEmployeeSubscription.data.employeeUpdateSubscribe.employee.state;
      if (
        fetchEmployeeSubscription.data.employeeUpdateSubscribe.employee &&
        states &&
        states.label !==
          fetchEmployeeSubscription.data.employeeUpdateSubscribe.employee.state
      ) {
        setStatesValue(
          statesOpt.filter(
            ({ label }: IReactSelectInterface) =>
              label ===
              fetchEmployeeSubscription.data.employeeUpdateSubscribe.employee
                .state,
          )[0],
        );
      }
    }
  }
  const update = (cache: any, payload: any) => {
    const data = cache.readQuery({
      query: GET_EMPLOYEES,
    });
  };
  // To add emplyee details into db
  const [addEmployee, { error, data }] = useMutation<
    {
      addEmployee: IAddEmployeeRes;
    },
    {
      employeeInput: IEmployeeInput;
    }
  >(ADD_EMPLOYEE, { update });

  // To update employee details into db
  const [updateEmployee] = useMutation<
    {
      updateEmployee: IAddEmployeeRes;
    },
    {
      id: number;
      employeeInput: IEmployeeInput;
    }
  >(UPDATE_EMPLOYEE, { update });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getEmployeeDetails({
        variables: {
          id,
        },
      });
    }
  }, [id]);

  const updateEmployeeValues = (temp: IEmployeeFormValues) => {
    const { profileImage = '', region } = temp;
    let country: any = temp.country;
    setImageUrl(profileImage);
    let index: number = -1;
    const regionData: IReactSelectInterface[] | undefined = [];

    if (country) {
      index = countriesOpt.findIndex(
        ({ label }: IReactSelectInterface) => label === country,
      );
      getStatesByCountry({
        variables: {
          countryid:
            countriesOpt && index > -1 ? countriesOpt[index].value : '',
        }, // default code is for germany
      });
    }

    if (region && region.length) {
      region.map(({ id, regionName }: any) => {
        regionData.push({
          label: regionName,
          value: id,
        });
      });
    }
    setEmployeeData({
      ...temp,
      region: regionData,
      country: index > -1 ? countriesOpt[index] : undefined,
    });
  };
  useEffect(() => {
    if (employeeDetails && employeeDetails.viewEmployee) {
      const { viewEmployee } = employeeDetails;
      setImageUrl(viewEmployee.profileImage ? viewEmployee.profileImage : '');
      let index: number = -1;
      const regionData: IReactSelectInterface[] | undefined = [];
      if (viewEmployee.employee.country) {
        index = countriesOpt.findIndex(
          ({ label }: IReactSelectInterface) =>
            label === viewEmployee.employee.country,
        );
        getStatesByCountry({
          variables: {
            countryid:
              countriesOpt && index > -1 ? countriesOpt[index].value : '',
          }, // default code is for germany
        });
      }
      if (viewEmployee.regions && viewEmployee.regions.length) {
        viewEmployee.regions.map(({ id, regionName }: any) => {
          regionData.push({
            label: regionName,
            value: id,
          });
        });
      }
      setEmployeeData({
        ...viewEmployee,
        ...viewEmployee.employee,
        ...viewEmployee.bankDetails,
        country: index > -1 ? countriesOpt[index] : undefined,
        joiningDate: viewEmployee.employee.joiningDate
          ? moment(viewEmployee.employee.joiningDate).format(defaultDateFormat)
          : null,
        accountHolderName: viewEmployee.bankDetails
          ? viewEmployee.bankDetails.accountHolder
          : '',
        additionalText:
          viewEmployee.bankDetails && viewEmployee.bankDetails.additionalText
            ? viewEmployee.bankDetails.additionalText
            : '',
        telephoneNumber: viewEmployee.phoneNumber || '',
        region: regionData,
        profileThumbnailImage: viewEmployee.profileThumbnailImage,
        profileImage: viewEmployee.profileImage,
        zip:
          viewEmployee.employee && viewEmployee.employee.zipCode
            ? viewEmployee.employee.zipCode
            : '',
      });
    }
  }, [employeeDetails]); // Pass empty array to only run once on mount. Here it will run when the value of employeeDetails get changed.

  useEffect(() => {
    if (employeeValues) {
      const {
        phoneNumber = '',
        profileThumbnailImage = '',
        profileImage = '',
        employee,
        regions,
        bankDetails,
      } = employeeValues;
      const { joiningDate = '', zipCode = '' } = employee ? employee : {};
      const { accountHolder = '', additionalText = '' } = bankDetails
        ? bankDetails
        : {};
      const temp: IEmployeeFormValues = {
        ...employeeValues,
        ...employee,
        ...bankDetails,
        // country: index > -1 ? countriesOpt[index] : undefined,
        joiningDate: joiningDate
          ? moment(joiningDate).format(defaultDateFormat)
          : null,
        accountHolderName: accountHolder,
        additionalText,
        telephoneNumber: phoneNumber || '',
        // region: regionData,
        profileThumbnailImage,
        profileImage,
        zip: zipCode,
        region: regions,
      };
      updateEmployeeValues(temp);
    }
  }, [employeeValues]);

  useEffect(() => {
    if (employeeDetails || employeeValues) {
      let country: string = '';
      if (employeeDetails) {
        const { viewEmployee } = employeeDetails;
        country = viewEmployee.employee.country || '';
      } else {
        // For edit profile after employee login
        const { employee } = employeeValues;
        country = employee.country || '';
      }
      let index: number = -1;
      if (country) {
        index = countriesOpt.findIndex(
          ({ label }: IReactSelectInterface) => label === country,
        );
        getStatesByCountry({
          variables: {
            countryid:
              countriesOpt && index > -1 ? countriesOpt[index].value : '',
          }, // default code is for germany
        });
      }
      if (employeeData) {
        setEmployeeData({
          ...employeeData,
          country: index > -1 ? countriesOpt[index] : undefined,
        });
      }
    }
  }, [countriesData]);

  useEffect(() => {
    if (statesData && statesData.states) {
      let state: string = '';
      if (employeeDetails) {
        const { viewEmployee } = employeeDetails;
        state = viewEmployee.employee.state || '';
      }
      if (employeeValues) {
        // For edit profile after employee login
        const { employee } = employeeValues;
        state = employee.state || '';
      }
      let stateList: IReactSelectInterface[] = [];
      statesData.states.forEach(({ id, name }: IState) =>
        stateList.push({
          label: name,
          value: id,
        }),
      );
      setStatesOpt(stateList);
      // To call it only once
      if (employeeData && !states) {
        setStatesValue(
          stateList.filter(
            ({ label }: IReactSelectInterface) => label === state,
          )[0],
        );
      }
    }
  }, [statesData]);
  // function to add/edit employee information
  const handleSubmit = async (
    values: IEmployeeFormValues,
    { setSubmitting }: FormikHelpers<IEmployeeFormValues>,
  ) => {
    //to set submit state to false after successful signup
    const {
      email,
      firstName,
      lastName,
      userName,
      telephoneNumber,
      accountHolderName,
      bankName,
      IBAN,
      BIC,
      additionalText,
      address1,
      address2,
      country,
      state,
      city,
      zip,
      joiningDate,
      image,
      region,
      accessLevel,
    } = values;
    try {
      let employeeInput: IEmployeeInput = {
        firstName: firstName ? firstName.trim() : '',
        lastName: lastName ? lastName.trim() : '',
        userName: userName ? userName.trim() : '',
        email: email ? email.trim() : '',
        phoneNumber: telephoneNumber ? telephoneNumber.toString() : '',
        joiningDate: joiningDate
          ? moment(joiningDate, defaultDateFormat).format(dbAcceptableFormat)
          : null,
        country: country && country.label ? country.label : null,
        state: state && state.label ? state.label : null,
        regionId:
          region && region.length
            ? region.map((region: IReactSelectInterface) =>
                parseInt(region.value),
              )
            : null,
        city,
        zipCode: zip,
        address1,
        address2,
        bankName,
        accountHolder: accountHolderName,
        additionalText,
        IBAN,
        BIC,
        image,
        accessLevel,
      };
      // Edit employee details
      if (id || (employeeData && employeeData.id)) {
        let updatedId: number = 0;
        if (id) {
          updatedId = parseInt(id);
        }
        // To manage at the time of profile update
        if (employeeData && employeeData.id) {
          updatedId = parseInt(employeeData.id);
        }
        employeeInput.profileThumbnailImage = employeeData
          ? employeeData.profileThumbnailImage
          : '';
        employeeInput.profileImage = employeeData
          ? employeeData.profileImage
          : '';
        await updateEmployee({
          variables: {
            id: updatedId,
            employeeInput,
          },
        });
        // It's the update employee case
        if (id) {
          toast.success(languageTranslation('EMPLOYEE_UPDATE_SUCCESS_MSG'));
          history.push(
            `${AppRoutes.EMPLOYEE}?page=${
              locationState && locationState.currentPage
                ? locationState.currentPage
                : 1
            }`,
          );
        } else {
          //Profile updation case
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation('UPDATE_PROFILE_SUCCESS'),
            );
          }
        }
      } else {
        await addEmployee({
          variables: {
            employeeInput,
          },
        });
        toast.success(languageTranslation('EMPLOYEE_ADD_SUCCESS_MSG'));
        history.push(AppRoutes.EMPLOYEE);
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
      if (
        message === languageTranslation("EMPLOYEE_EMAIL")
      ) {
        history.push(AppRoutes.EMPLOYEE);
      }
    }
    setSubmitting(false);
  };

  // Fetch values in case of edit by default it will be null or undefined
  const {
    email = '',
    firstName = '',
    lastName = '',
    userName = '',
    address1 = '',
    address2 = '',
    city = '',
    zip = '',
    country = undefined,
    region = undefined,
    accountHolderName = '',
    bankName = '',
    IBAN = '',
    BIC = '',
    additionalText = '',
    telephoneNumber = undefined,
    joiningDate = '',
    accessLevel = 'all',
    id: employeeId = '',
  } = employeeData ? employeeData : {};

  const values: IEmployeeFormValues = {
    email,
    firstName,
    lastName,
    userName,
    telephoneNumber,
    accountHolderName,
    bankName,
    IBAN,
    BIC,
    additionalText,
    address1,
    address2,
    city,
    zip,
    joiningDate: joiningDate || '',
    accessLevel,
    country,
    region,
    state: states,
    id: employeeId,
  };
  return (
    <>
      <Helmet>
        <title>
          {employeeData
            ? `${languageTranslation(`EDIT_EMPLOYEE`)}/ ${
                employeeData.firstName
                  ? employeeData.lastName + ' ' + employeeData.firstName
                  : ''
              }`
            : languageTranslation('ADD_EMPLOYEE')}{' '}
        </title>
      </Helmet>
      {dataLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={values}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          children={(
            props: FormikProps<IEmployeeFormValues> & {
              imageUrl: string;
              countriesOpt: IReactSelectInterface[];
              statesOpt: IReactSelectInterface[];
            },
          ) => (
            <EmployeeFormComponent
              {...props}
              imageUrl={imageUrl}
              countriesOpt={countriesOpt}
              statesOpt={statesOpt}
              getStatesByCountry={getStatesByCountry}
            />
          )}
          validationSchema={EmployeeValidationSchema}
        />
      )}
    </>
  );
};

export default EmployeeForm;
