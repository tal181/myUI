// import {Injectable} from "@angular/core";
// import {Message} from 'primeng/primeng';
//
//
// @Injectable()
// export class GrowlService {
//
//     /*
//      In config-var:
//
//      export enum GROWL_MESSAGE_TYPES {
//      warn,
//      error,
//      success,
//      info
//      }
//
//      */
//     growlMsgs: Message[] = [];
//
//
//     private _showGrowl(params: Message) {
//         this.growlMsgs.push(params);
//     }
//
//     showMessage(typeMessage: GROWL_MESSAGE_TYPES, titleParam: string, textParam: string) {
//
//         let sev = GROWL_MESSAGE_TYPES[typeMessage];
//         let param = {severity: sev, summary: titleParam, detail: textParam};
//         this._showGrowl(param);
//     }
//
//     showGenericSuccessMessage() {
//         let param = {
//             severity: 'success',
//             summary: 'Operazione eseguita',
//             detail: 'Operazione eseguita correttamente.'
//         };
//         this._showGrowl(param);
//     };
//
//     showGenericErrorMessage() {
//         let param = {
//             severity: 'error',
//             summary: 'Operazione non riuscita',
//             detail: 'Impossibile completare l\'operazione.'
//         };
//         this._showGrowl(param);
//     };
//
//     constructor() {
//     }
// }