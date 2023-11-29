import Axios from "axios";

const submitCategory = (category, father, hirarchy) => {
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

// import Axios from "axios";

// const submitCategory = (category, father, hirarchy) => {
//   let categoryHirarchy;

//   if (category.length <= 1) {
//     alert("קטגוריה חייבת להכיל לפחות 2 תווים");
//     return;
//   }
//   switch (hirarchy) {
//     case "second":
//       categoryHirarchy = "קטגוריה משנית";
//       break;
//     case "third":
//       categoryHirarchy = "קטגוריית קצה";
//       break;
//     default:
//       categoryHirarchy = "קטגוריה ראשית";
//   }

//   Axios.post(
//     "http://localhost:3008/api/categoriesRegistration",
//     {
//       category: category,
//       father: father,
//     },
//     {
//       headers: {
//         Authorization: localStorage.getItem("token"),
//       },
//     }
//   )
//     .then((response) => {
//       if (response.status == 200) {
//         alert(`רישום ${categoryHirarchy} ${category} בוצע בהצלחה`);
//         return true;
//       }
//     })
//     .catch((error) => {
//       console.error("Error in category registration: ", error);
//     });
// };

// export { submitCategory };
