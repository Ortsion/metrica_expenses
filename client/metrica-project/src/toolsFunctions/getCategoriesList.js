import Axios from "axios";

const getCategoriesList = async (father) => {
    const host = process.env.REACT_APP_API_BASE_URL;
    try {
        const response = await Axios.get(
            `${host}/api/categoriesRegistration`,
            {
                params: {
                    father: father,
                },
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            }
        );
        return (response);
    } catch (err) {
        return console.log('Error in getCategoriesList: ', err);
    }
    // throw err;
    // console.log('get categories list function is work, father: ', father);
};

export {getCategoriesList};