export const steps = {
    actual_reg:1,
    personal_info:2,
    phisical_info:3,
    diet_info:4,
    complete:5,
}

export const registrationErrors = {
    noEmailInserted : {title:'Email Error: ',body:'No Email Inserted'},
    notValidEmail   : {title:'Email Error: ',body:'Not Valid Email Inserted'},
    noNameInserted      : {title:'Personal Info Error: ',body:'No Name Inserted'},
    noSurnameInserted   : {title:'Personal Info Error: ',body:'No Surname Inserted'},
    noGenderInserted    : {title:'Personal Info Error: ',body:'No Gender Inserted'},
    noBirthdayInserted  : {title:'Personal Info Error: ',body:'No Birthday Inserted'},
    noPassword      : {title:'Password Error',body:'No password inserted'},
    wrongPassword   : {title:'Password Error',body:'Wrong password inserted for this email'},
    weakPassword    : {title:'Password Error',body:'At least 6 character in the password'},
    invalidWeight   : {title:'Weight',body:'This Weight seems Not feasible'},
    invalidHeight   : {title:'Height',body:'This Height seems Not feasible'},
    invalidISF      : {title:'ISF',body:'This value is not valid'},
    invalidChoratio : {title:'Choratio',body:'This value is not'},
}

export const networkErrors = {
    wrongEmail      : {title:'Email Error: ',body:'This email is invalid or not exists'},
    wrongPassword   : {title:'Password Error',body:'Wrong password inserted for this email'},
    noInternet      : {title:'Internet Error',body:'No internet present'},
    APIerror        : {title:'Food Service Error',body:'Our Food Service is temporarly offline'},
}