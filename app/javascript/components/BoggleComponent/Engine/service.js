
import Constants from './constants';


export default class APIRequestService {

    constructor(word) {
        this.path = new Constants();
        this.word = word
    }

    async fetchAPIResponse() {
      return fetch(this.path.URI_PATH, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                word: this.word
            })
        }).then(response =>response.json())
        
    }


}




// fetchAPIResponse(word) {
//     console.log(word);
//     console.log(this.state.valid_word);
//     this.apiRequestService = new APIRequestService(word);
//     this.apiRequestService.fetchAPIResponse().then(async response=>{
//         console.log("YO YO "+ JSON.stringify(response));
//     });