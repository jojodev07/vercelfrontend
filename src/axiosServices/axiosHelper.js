import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:"http://localhost:8080",
    timeout:10000,
    headers : {
        "Content-Type":"application/json"
    },
    withCredentials:true
})

export async function VerifyAuthToken() {

    try {
        const res = await axiosInstance.get("/auth/me");
        // This is a simple get request that uses the jwt cookie stored in the browser.
        // This goes through spring's filter chain.
        // if it passes, we get a simple dto that contains the email, and we are now certain the cookie is true.
        if (res.data.email) {
            console.log(res.data.email);
            return true;
        }
        console.log("failed");
        return false;
    } catch (err) {
        console.log(err);// TODO: placeholder
        return false;
    }

}
// pass a navigate hook from navbar.
export async function LogOut() {

        return axiosInstance.post("/logout")
            .then(result => {
                console.log(result.data.message);
            })
            .catch(err => {
                console.log(err);
            })

}
