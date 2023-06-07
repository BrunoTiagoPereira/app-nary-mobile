import { postAsync } from "../../core/services";

const NewAccount = async (data) => {
    return await postAsync(`users`, data);
}

const Auth = async (data) => {
    return await postAsync(`users/login`, data);
}


export {NewAccount, Auth};