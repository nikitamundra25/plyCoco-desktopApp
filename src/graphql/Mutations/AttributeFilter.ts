import gql from 'graphql-tag';

const ADD_PRESET_ATTRIBUTE = gql`
  mutation addPresetAttribute($presetAttributeInput: PresetAttributeInput!) {
    addPresetAttribute(presetAttributeInput: $presetAttributeInput) {
      name
    }
  }
`;
const DELETE_PRESET_ATTRIBUTE = gql`
  mutation DeletePresetAttribute($id: ID!) {
    deletePresetAttribute(id: $id) {
      id
    }
  }
`;
export const AttributeFilterMutations = [
  ADD_PRESET_ATTRIBUTE,
  DELETE_PRESET_ATTRIBUTE
];

// mutation{
//     deletePresetAttribute(id: 1){
//       id
//     }
//    }
