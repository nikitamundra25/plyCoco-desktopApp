import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useParams, useLocation, useHistory } from "react-router-dom";
import ToDoListForm from "./ToDoListForm";
import * as qs from 'query-string';
import { ToDoQueries } from '../../../../graphql/queries';
import { useLazyQuery } from "@apollo/react-hooks";
import { IReactSelectInterface, ISearchToDoValues } from "../../../../interfaces";
import { FormikHelpers, FormikProps, Formik } from "formik";
import { PAGE_LIMIT } from "../../../../config";

const [GET_TO_DOS] = ToDoQueries;

const ToDoList: FunctionComponent<RouteComponentProps> = (props: any) => {

  let { id } = useParams();
  const userId: any | undefined = id;

  console.log('userId ', userId);


  let history = useHistory();
  const { search, pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValues, setSearchValues] = useState<ISearchToDoValues | null>();
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  // To get todo list from db
  const [fetchToDoList, { data, called, loading, refetch }] = useLazyQuery<
    any,
    any
  >(GET_TO_DOS, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    const query = qs.parse(search);
    let searchValue: string = '';
    let sortBy: IReactSelectInterface | undefined = { label: '', value: '' };
    let priority: IReactSelectInterface | undefined = { label: '', value: '' };
    let futureOnly: boolean | undefined = false;

    // To handle display and query param text
    if (query) {
      const current: string = history.location.search;
      let search: any = {};
      search = { ...qs.parse(current) };
      if (search.searchValue) {
        searchValue = search.searchValue;
      }
      if (search.sortBy) {
        sortBy = search.sortBy;
      }
      if (search.priority) {
        priority = search.priority;
      }
      if (search.futureOnly) {
        futureOnly = JSON.parse(search.futureOnly);
      }

      // setSearchValues({
      //   searchValue,
      //   sortBy,
      //   priority,
      //   futureOnly
      // });
      let status = '';
      let pri = '';
      if (sortBy) {
        if (sortBy.value) {
          status = sortBy.value
        }
      }
      if (priority) {
        if (priority.value) {
          pri = priority.value
        }
      }

      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
      // call query
      fetchToDoList({
        variables: {
          userId: parseInt(userId),
          searchValue,
          sortBy: status,
          priority: pri,
          futureOnly,
          limit: PAGE_LIMIT,
          page: query.page ? parseInt(query.page as string) : 1,
        }
      });
    }

  }, [search]); // It will run when the search value gets changed

  const handleSubmit = async (
    values: ISearchToDoValues,
    { }: FormikHelpers<ISearchToDoValues>
  ) => {
    const { searchValue, sortBy, priority, futureOnly } = values;
    let params: any = qs.parse(search);

    params.futureOnly = false;
    params.page = 1;

    if (searchValue) {
      params.searchValue = searchValue;
    }
    if (sortBy && sortBy.value !== '') {
      params.sortBy = sortBy.value;
    }
    if (priority && priority.value !== '') {
      params.priority = priority.value;
    }

    if (futureOnly) {
      params.futureOnly = futureOnly;
    }

    const path = [pathname, qs.stringify(params)].join('?');
    history.push(path);
  };

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?'
    );
    history.push(path);
  };

  const {
    searchValue = '',
    sortBy = undefined,
    priority = undefined,
    futureOnly = false
  } = searchValues ? searchValues : {};

  const values: ISearchToDoValues = {
    searchValue,
    sortBy,
    priority,
    futureOnly
  };

  return (
    <>
      <Formik
        initialValues={values}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ISearchToDoValues>) => (
          <ToDoListForm
            {...props}
            onPageChanged={onPageChanged}
            called={called}
            loading={loading}
            data={data}
            isFilterApplied={isFilterApplied}
            currentPage={currentPage}
          />
        )}
      />
    </>
  );
};
export default ToDoList;
