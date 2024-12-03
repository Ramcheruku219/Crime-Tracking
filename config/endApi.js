const baseUrl = 'http://182.18.181.115:8980'
// const baseUrl = 'http://192.168.1.4:3000'
export const endApi = {
    getDepartmentUsers: (username) => `${baseUrl}/getDepartmentUser/${username}`,
    getSurakshaComp: `${baseUrl}/getCrimeReports`,
    getCrimeCmpl: `${baseUrl}/getComplaintsAllDepartment/4`
}