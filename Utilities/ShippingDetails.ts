
import {faker} from '@faker-js/faker'
import Credentials from './Credentials'

let addrresse = Credentials
    const receiver = addrresse.validCredentials()

export interface shipping_details{
    name : string
    address_line1 : string
    address_line2 : string
    zipcode: string
    state: string
}

const ZipCodes:string[] =['456784', '123564', '231987', '809642']

export class Shipment {
public static generateShipmentDetails():shipping_details{
    
    return{

        name: `${receiver.username }  ${faker.person.lastName()}`,
        address_line1: faker.location.streetAddress(),
        address_line2: faker.location.secondaryAddress(),
        zipcode: faker.helpers.arrayElement(ZipCodes),
        state:faker.location.state()

    }


}
}