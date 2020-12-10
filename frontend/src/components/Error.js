import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

let error = {
  Toast: Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }),
  fireToast: function(errorMsg){
    this.Toast.fire({
      icon: 'error',
      title: errorMsg.slice(0, 20) || 'Something went wrong'
    })
  },
  fireError: function(errorMsg){Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMsg || "Something went wrong",
    })
  } 
}
export default error