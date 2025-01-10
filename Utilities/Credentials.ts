import * as dotenv from 'dotenv';
dotenv.config();


export type userCredentials = {
    username : string
    password : any
}


 class Credentials {

public static validCredentials(){
    return{
        username : process.env.USERNAME || 'defaultUsername',
        password : process.env.PASSWORD || 'defaultPassword'
    }
}

public static invalidCredentials(){
    return{
        username : 'Fredrick',
        password : 'passwordEnter.200'
    }
}


}
export default Credentials