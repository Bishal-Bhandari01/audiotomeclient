export const storageSetter = (data) => {
  const udata = {
    id: data.id,
    firstname: data.firstName,
    lastname: data.lastName,
    email: data.email,
    role: data.role,
    registrationDate: data.registrationDate,
    middlename: data.middleName,
    dob: data.dob,
    address: data.address,
    profileImage: data.uProfile,
    contactnum: data.contactNum,
  };
  return udata;
};
