import Swal from "sweetalert2";

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
    confirmButtonText
  } = obj;
  
  return await Swal.fire({
    title: title || "Are you sure?",
    html: text || "You want to be able to revert this!",
    type: type || "warning",
    showCancelButton: showCancelButton === false? false : true ,
    confirmButtonColor: confirmButtonColor || "#3085d6",
    cancelButtonColor: cancelButtonColor || "#d33",
    confirmButtonText: confirmButtonText || "Yes!"
  });
};
