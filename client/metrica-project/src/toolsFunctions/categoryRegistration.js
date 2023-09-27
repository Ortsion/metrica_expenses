import Axios from "axios";

const submitCategory = (category, father, hirarchy) => {
    let categoryHirarchy;
    if (category.length <= 1) {
        alert("קטגוריה חייבת להכיל לפחות 2 תווים");
        return;
    }
    switch (hirarchy) {
        case 'second':
          categoryHirarchy = "קטגוריה משנית";
          break;
        case 'third':
            categoryHirarchy = "קטגוריית קצה";
          break;
          default: categoryHirarchy = "קטגוריה ראשית"
      }
  Axios.post(
    "http://localhost:3008/api/categoriesRegistration",
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
      if (response.status == 200) {
        alert(`רישום ${categoryHirarchy} ${category} בוצע בהצלחה`);
      }
    })
    .catch((error) => {
      console.error("Error in category registration: ", error);
    });
};

export  { submitCategory };
