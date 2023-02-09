import Order from "models/Order";
import { createDoc, findDocs } from "utils/controllers";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
        res.json(await findDocs(Order, {}));
      break;

    case "POST":
      if(req.body) res.json(await createDoc(Order, req.body));
      break;

    // case "PUT":
    //   if(Object.keys(req.query).length && isValidObjectId(req.query.slug))
    //     res.json(await updateDoc(Order, req.query.slug, req.body));
    //   break;

    // case "DELETE":
    //   if(!(Object.keys(req.query).length && isValidObjectId(req.query.slug)))
    //     res.json(await deleteDocs(Order));
    //   else
    //     res.json(await deleteDoc(Order, req.query.slug));
    //   break;

    default:
      break;
  }
}