import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState } from 'draft-js';

export const HtmlToDraftConverter = (text: any) => {
  const contentBlock = htmlToDraft(text);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
  );
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};
