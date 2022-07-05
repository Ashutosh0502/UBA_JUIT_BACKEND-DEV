import axios from 'axios';

/*
*It is rest client to get records
*/
export const get = async (url) => {
    try {
        return axios.get(url).then((result) => {
            return result.data;
        });
    } catch (err) {
        return err;
    }
}

/*
*It is rest client to create records
*/
export const post = async (url, options) => {
    try {
        const { data } = await axios.post(url, options);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

/*
*It is rest client to update records
*/
export const put = async (url, options) => {
    try {
        await axios.put(url, options);
    } catch (err) {
        return err;
    }
}

/*
*It is rest client to update records
*/
export const patch = async (url, options) => {
    try {
        await axios.patch(url, options);
    } catch (err) {
        return err;
    }
}

/*
*It is rest client to delete records
*/
export const deleteAPI = async (url) => {
    try {
        await axios.delete(url);
    } catch (err) {
        return err;
    }
}
