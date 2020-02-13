import React, { useEffect, useState, FunctionComponent } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Collapse
} from 'reactstrap';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { AppBreadcrumb } from '@coreui/react';
import { NoSearchFound } from '../../components/SearchFilter/NoSearchFound';
import { languageTranslation } from '../../../../helpers';
import { AttributeQueries } from '../../../../graphql/queries';
import Loader from '../../containers/Loader/Loader';
import AttributeMenus from './AttributeMenus';
import routes from '../../../../routes/routes';
import AddAttribute from './AddAttribute';
import { AttributeMutations } from '../../../../graphql/Mutations';
import { IAttributeInput } from '../../../../interfaces';
import { toast } from 'react-toastify';

const [GET_ATTRIBUTES_TYPE, GET_ATTRIBUTES_BY_TYPE] = AttributeQueries;
const [ADD_ATTRIBUTE] = AttributeMutations;

const AttributeManageMent: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [newAttribute, setNewAttribute] = useState<string>('');
  const [activeAttributeMenu, setActiveAttrMenu] = useState<number | null>(
    null
  );
  const [attributeName, setAttributeName] = useState<string | null>(null);
  const toggle = () => {
    setIsOpen(!isOpen);
    setNewAttribute('');
    setIsSubmit(false);
  };
  // To get attributes types
  const [getAtrributeHeading, { data, loading, refetch }] = useLazyQuery<any>(
    GET_ATTRIBUTES_TYPE
  );
  // To get attributes of selected types
  const [
    getAttributesName,
    {
      data: attributeList,
      loading: listLoading,
      called,
      refetch: attributeListRefetch
    }
  ] = useLazyQuery<any>(GET_ATTRIBUTES_BY_TYPE);
  // To add attributes into db
  const [addAttribute] = useMutation<
    {
      addAttribute: any;
    },
    {
      attributeInput: IAttributeInput;
    }
  >(ADD_ATTRIBUTE, {
    onCompleted() {
      attributeListRefetch();
      setIsSubmit(false);
      setNewAttribute('');
      toggle();
      toast.dismiss();
      toast.success(languageTranslation('ADD_ATTRIBUTE_SUCCESS'));
    }
  });
  useEffect(() => {
    getAtrributeHeading();
  }, []);
  // To set default attribute type to 0
  useEffect(() => {
    if (
      data &&
      data.getAtrributeCategories &&
      data.getAtrributeCategories.length
    ) {
      setActiveAttrMenu(data.getAtrributeCategories[0].id);
    }
  }, [data]);
  // It will call on type change
  useEffect(() => {
    if (activeAttributeMenu !== null) {
      getAttributesName({
        variables: {
          id: activeAttributeMenu,
          sortBy: 2
        }
      });
    }
  }, [activeAttributeMenu]);
  // On attribute change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;
    setNewAttribute(value);
  };
  const handleSubmit = () => {
    setIsSubmit(true);
    if (activeAttributeMenu) {
      try {
        if (newAttribute) {
          addAttribute({
            variables: {
              attributeInput: {
                id: activeAttributeMenu ? activeAttributeMenu : 0,
                name: newAttribute
              }
            }
          });
        }
      } catch (error) {
        if (newAttribute) {
          const message = error.message
            .replace('SequelizeValidationError: ', '')
            .replace('Validation error: ', '')
            .replace('GraphQL error: ', '');
          toast.error(message);
        }
      }
    }
  };
  const onAttributeChange = (id: number, name: string) => {
    setActiveAttrMenu(id);
    setAttributeName(name);
  };

  const replace = attributeName ? attributeName.replace('Attributes', ' ') : '';
   return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
        <div>
          {/* <Button
            color={!isOpen ? 'primary' : 'danger'}
            className={'btn-add'}
            id={'add-new-pm-tooltip'}
            onClick={toggle}
          >
            {!isOpen ? (
              <>
                <i className={"fa fa-plus"} />
                &nbsp; {languageTranslation("ADD_NEW_ATTRIBUTE_BUTTON")}
              </>
            ) : (
              languageTranslation("CANCEL")
            )}
          </Button> */}
        </div>
      </CardHeader>
      <CardBody>
        <Collapse isOpen={isOpen} className='region-input-section'>
          {/* <AddAttribute
            handleSubmit={handleSubmit}
            onChange={onChange}
            newAttribute={newAttribute}
            isSubmit={isSubmit}
            data={data}
            attributeName={attributeName}
          /> */}
        </Collapse>

        <div className='d-flex align-items-center justify-content-between  mb-2'>
          {data &&
          data.getAtrributeCategories &&
          data.getAtrributeCategories.length ? (
            <AttributeMenus
              data={data.getAtrributeCategories}
              onAttributeChange={onAttributeChange}
              activeAttributeMenu={activeAttributeMenu}
            />
          ) : null}
        </div>
        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th className={'text-center sno-th-column'}>
                {languageTranslation('S_NO')}
              </th>
              <th>
                {replace
                  ? replace + ' ' + 'Attributes'
                  : 'Acquisition Attributes'}
              </th>
              {}
            </tr>
          </thead>
          <tbody>
            {!called || listLoading ? (
              <tr>
                <td className={'table-loader'} colSpan={6}>
                  <Loader />
                </td>
              </tr>
            ) : attributeList &&
              attributeList.getAttributesName &&
              attributeList.getAttributesName.length ? (
              attributeList.getAttributesName.map(
                (attribute: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td className={'text-center'}>{index + 1}</td>
                      <td className='text-capitalize'>{attribute.name}</td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr className={'text-center no-hover-row'}>
                <td colSpan={6} className={'pt-5 pb-5'}>
                  <div className='no-data-section'>
                    <div className='no-data-icon'>
                      <i className='icon-ban' />
                    </div>
                    <h4 className='mb-1'>
                      Currently there are no attribute added.{' '}
                    </h4>
                    <p>Please click above button to add new.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default AttributeManageMent;
