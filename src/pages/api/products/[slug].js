import Product from "models/Product";
import { findDoc } from "utils/controllers";


export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
        res.json(await findDoc(Product, { slug: req.query.slug }));
      break;

    // case "POST":
    //   if(req.body) res.json(await createDoc(Product, req.body));
    //   break;

    // case "PUT":
    //   if(Object.keys(req.query).length && isValidObjectId(req.query.slug))
    //     res.json(await updateDoc(Product, req.query.slug, req.body));
    //   break;

    // case "DELETE":
    //   if(!(Object.keys(req.query).length && isValidObjectId(req.query.slug)))
    //     res.json(await deleteDocs(Product));
    //   else
    //     res.json(await deleteDoc(Product, req.query.slug));
    //   break;

    default:
      break;
  }
}