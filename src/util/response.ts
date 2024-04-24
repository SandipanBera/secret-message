class response{
    sucess: boolean;
    message: string;
    data: any;
    constructor(sucess: boolean, message: string, data?: any) {
        this.sucess= sucess;
        this.message = message;
        if (data != undefined){
            this.data = data;
        }else{
            this.data = null;
        }
    
}
}
export default response;
