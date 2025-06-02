import { ElementRef, Injectable } from '@angular/core';
import{Modal} from 'bootstrap';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  
  
  cerrarModal(modal:ElementRef | undefined){
      if(modal){
        let bsModal = Modal.getInstance(modal?.nativeElement)
        bsModal?.hide();
        let backdrop=document.querySelector("modal-backdrop.fade.show");
        if(backdrop){
          backdrop.parentNode?.removeChild(backdrop);
        }
        document.body.removeAttribute('style');
        document.body.removeAttribute('class');
      }
    }
}
