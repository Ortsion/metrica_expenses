import Axios from "axios";

const submitBucket = (bucket) => {
  const host = process.env.REACT_APP_API_BASE_URL;
  return new Promise((resolve, reject) => {
    // let categoryHirarchy;

    if (bucket.length <= 1) {
      alert("שם קבוצה חייב להכיל לפחות 2 תווים");
      reject("Bucket`s name must contain at least 2 characters");
      return;
    }
    // switch (hirarchy) {
    //   case "second":
    //     categoryHirarchy = "קטגוריה משנית";
    //     break;
    //   case "third":
    //     categoryHirarchy = "קטגוריית קצה";
    //     break;
    //   default:
    //     categoryHirarchy = "קטגוריה ראשית";
    // }
    console.log("Bucket == ", bucket)

    Axios.post(
      `${host}/api/bucket`,
      {
        bucket: bucket,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          resolve(true);
        } else {
          reject(`Failed to register ${bucket}`);
        }
      })
      .catch((error) => {
        console.error("Error in Bucket registration: ", error);
        reject(error);
      });
  });
};

export { submitBucket };

