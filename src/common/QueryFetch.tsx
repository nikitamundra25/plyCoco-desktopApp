import { Query } from "react-apollo";

export const QueryFetch = (props: any) => (
  <Query query={props}>
    {(queryProps: any) => {
      const Loading: any = queryProps.loading
      const ErrorData: any = queryProps.error
      const Data: any = queryProps.data
      const Refetch: any = queryProps.refetch()
      if (Loading) return () => props.handleLoadingData(Loading);
      if (ErrorData) return () => props.handleError(ErrorData.message);
      if (Data) return () => props.handleLoadedData(Data)
      {() => props.handleRefetch(Refetch)}
      return (
        <>
          {
            props.children
          }
        </>
      );
    }}
  </Query>
);