import Swal from "sweetalert2";
import { languageTranslation } from "../../../../helpers";

export const ConfirmBox = async (obj: object | any) => {
  if (!obj) {
    obj = {};
  }
  let {
    title,
    text,
    type,
    confirmButtonColor,
    showCancelButton,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText
  } = obj;
  
  return await Swal.fire({
    title: title || languageTranslation("CONFIRM_LABEL"),
    html: text || languageTranslation("YOU_WANT_TO_REVERT"),
    type: type || "warning",
    showCancelButton: showCancelButton === false? false : true ,
    confirmButtonColor: confirmButtonColor || "#3085d6",
    cancelButtonColor: cancelButtonColor || "#d33",
    confirmButtonText: confirmButtonText || `${languageTranslation("YES")!}`,
    cancelButtonText: cancelButtonText || languageTranslation("CANCEL")
  });
};
