"use server";

import Product from "../models/product.model";
import { connectToDB } from "../mongoose";

export const getProducts = async () => {
  try {
    await connectToDB();
    const products = await Product.find({ isDeleted: false }).exec();
    // console.log(
    //   "🚀 ~ file: product.action.ts:10 ~ getProducts ~ products:",
    //   products
    // );
    const stringifiedProducts = products.map((product) => {
      const item = product._doc;
      return {
        ...item,
        _id: item._id.toString(),
        creator: item.creator.toString(),
      };
    });

    return stringifiedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProduct = async (id: string) => {
  try {
    await connectToDB();
    const product = await Product.findById(id).exec();
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductsByIDs = async (array: Array<any>, dates = false) => {
  try {
    await connectToDB();
    let productArray = [];
    for (let i = 0; i < array.length; i++) {
      const id = array[i][0].productID;
      // const temp = array[i][0];
      // console.log(
      //   "🚀 ~ file: product.action.ts:47 ~ getProductsByIDs ~ id:",
      //   temp
      // );

      try {
        let response = await getProduct(id);
        if (response) {
          // purchase date normalde yok ancak return ederken ekliyoruz
          console.log(array[i][0].purchaseDate.toISOString());
          if (dates) {
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            response._doc = {
              ...response._doc,
              _id: response._doc._id.toString(),
              creator: response._doc.creator.toString(),
              purchaseDate:
                array[i][0].purchaseDate.toLocaleDateString("tr-TR", options) +
                " " +
                array[i][0].purchaseDate
                  .getHours()
                  .toString()
                  .padStart(2, "0") +
                ":" +
                array[i][0].purchaseDate
                  .getMinutes()
                  .toString()
                  .padStart(2, "0"),
            };
            productArray.push(response._doc);
          } else {
            response._doc = {
              ...response._doc,
              _id: response._doc._id.toString(),
              creator: response._doc.creator.toString(),
            };
            productArray.push(response._doc);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    return productArray;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getPurchaseDates = async (array: Array<any>) => {
//   try {
//     await connectToDB();
//     let purchaseDates = [];
//     for (let i = 0; i < array.length; i++) {
//       const id = array[i][0].productID;
//       // const temp = array[i][0];
//       // console.log(
//       //   "🚀 ~ file: product.action.ts:47 ~ getProductsByIDs ~ id:",
//       //   temp
//       // );

//       try {
//         let response = await getProduct(id);
//         if (response) {
//           purchaseDates.push(response.purchaseDate);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     return purchaseDates;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
