export abstract class AbstractProductCreate {
    protected formatedSucces(message:string, data:any){
        return {message,data}
    }
    protected handleException(error: any) {
        throw error;
      }
}