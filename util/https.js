import axios from "axios";

export async function getDiseases(symptoms) {
  let req = "";
  for (let i of symptoms) {
    req += i.item + "=1&";
  }
  req = req.slice(0, -1);
  // console.log(req);
  const res = await axios.post(
    "https://arogyabhagya.herokuapp.com/predict/?" + req
  );
  // console.log(res);
  return res.data.prediction;
}
