import  APIRequestService from './../../app/javascript/components/BoggleComponent/Engine/service.js';


describe("Test API Response", () => {
    test("1. Constructor call", () => {
        
        const apiRequestService = new APIRequestService("hello");
        expect(apiRequestService.word).toBe("hello");


    });

    test("2. API call", async () => {
        const apiRequestService = new APIRequestService("hello");
        
        apiRequestService.fetchAPIResponse().then(async response => {
            const data = await response;
            expect(data).resolves.toEqual(200);
        });
        


    });


    


    

    
});