import {faker} from '@faker-js/faker'
interface userDetails  {
    firstName: string
    lastName:string
    userName: any,
    password:any
}

 class FakerGenerator{
    
    public static generateUserDetails():userDetails {
        return{
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            userName: faker.internet.displayName(),
            password: faker.internet.password()
        }
        
    }


}
export default FakerGenerator