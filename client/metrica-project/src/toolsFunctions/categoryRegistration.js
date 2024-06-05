import Axios from "axios";

const submitCategory = (category, father, hirarchy) => {
  const host = process.env.REACT_APP_API_BASE_URL;
  return new Promise((resolve, reject) => {
    let categoryHirarchy;

    if (category.length <= 1) {
      alert("קטגוריה חייבת להכיל לפחות 2 תווים");
      reject("Category must contain at least 2 characters");
      return;
    }
    switch (hirarchy) {
      case "second":
        categoryHirarchy = "קטגוריה משנית";
        break;
      case "third":
        categoryHirarchy = "קטגוריית קצה";
        break;
      default:
        categoryHirarchy = "קטגוריה ראשית";
    }

    Axios.post(
      `${host}/api/categoriesRegistration`,
      {
        category: category,
        father: father,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          // alert(`רישום ${categoryHirarchy} ${category} בוצע בהצלחה`);
          resolve(true);
        } else {
          reject(`Failed to register ${categoryHirarchy} ${category}`);
        }
      })
      .catch((error) => {
        console.error("Error in category registration: ", error);
        reject(error);
      });
  });
};

export { submitCategory };

