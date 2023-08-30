export function toggleModal(modalId: string, show: boolean, focusElementId: string = '') {
  let modalEl = document.getElementById(modalId);

  if (modalEl) {
    if (show) {
      modalEl.classList.add('flex');
      modalEl.classList.remove('hidden');
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.setAttribute('role', 'dialog');
      modalEl.removeAttribute('aria-hidden');

      // create backdrop element
      let backdropEl = document.createElement('div');
      backdropEl.setAttribute('modal-backdrop', '');
      backdropEl.classList.add('bg-black', 'bg-opacity-60', 'fixed', 'inset-0', 'z-40');
      document.querySelector('body').append(backdropEl);

      if (focusElementId != '') {
        let el = <HTMLElement>document.getElementById(focusElementId);
        if (!el) {
          el = <HTMLElement>document.querySelector('[ng-reflect-name="' + focusElementId + '"]');
        }
        if (el) {
          el.focus();
        }
      }
      else {
        let m = modalEl.getElementsByTagName('button');
        if (m.length > 0) {
          let el = <HTMLElement>m[0];
          el.focus();
        }
      }
    }
    else {
      modalEl.classList.add('hidden');
      modalEl.classList.remove('flex');
      modalEl.setAttribute('aria-hidden', 'true');
      modalEl.removeAttribute('aria-modal');
      modalEl.removeAttribute('role');
      let modalBackdrop = document.querySelector('[modal-backdrop]');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }
}

export function hasPermission(permission: number, grant: number) {
  return (permission & grant) > 0;
}
