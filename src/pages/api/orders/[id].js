import Order from "models/Order";
import { deleteDoc, findDoc } from "utils/controllers";


export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
        res.json(await findDoc(Order, { _id: req.query.id }));
      break;

    // case "POST":
    //   if(req.body) res.json(await createDoc(Product, req.body));
    //   break;

    // case "PUT":
    //   if(Object.keys(req.query).length && isValidObjectId(req.query.slug))
    //     res.json(await updateDoc(Product, req.query.slug, req.body));
    //   break;

    case "DELETE":
        res.json(await deleteDoc(Order, { _id: req.query.id }));
      break;

    default:
      break;
  }
}