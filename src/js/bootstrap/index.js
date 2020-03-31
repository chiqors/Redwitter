import swal from 'sweetalert2';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the 'XSRF' token cookie.
 */

// let token = document.head.querySelector('meta[name="csrf-token"]').content;

axios.defaults.headers.common = {
    // 'X-CSRF-TOKEN': token,
    'X-Requested-With': 'XMLHttpRequest'
};

window.swal = swal;
