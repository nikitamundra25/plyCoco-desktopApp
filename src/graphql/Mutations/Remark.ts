import gql from 'graphql-tag';

const UPDATE_REMARKS = gql`
  mutation UpdateRemarks($id: Int, $remarks: JSON) {
    updateRemarks(id: $id, remarks: $remarks) {
      remarks
    }
  }
`;

export const RemarkMutations = [UPDATE_REMARKS];

// updateRemarks(id:Int, remarks: JSON): remarks
