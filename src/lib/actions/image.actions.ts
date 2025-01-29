"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import prisma from "../database/prisma/prismaClient";
import { redirect } from "next/navigation";

import {v2 as cloudinary} from "cloudinary";

// ADD IMAGE
export async function addImage({ image, userId, path}:AddImageParams){
    try {
        
        const author = await prisma.user.findUnique({ 
            where: { id: userId }, 
        });
        if(!author){
            throw new Error("User not found");
        }
        
        const newImage = await prisma.image.create({
            data: {
                ...image, 
                author: {connect: {id: author.id}}, // connect the user to image
            }
        })
        return JSON.parse(JSON.stringify(newImage));
    } catch (error) {
        handleError(error);
    }
}

// export async function updateImage({ image, userId, path}:UpdateImageParams){
//     try {
//         const imageToUpdate = await prisma.image.findUnique({
//             where: {id: image._id}
//         });

//         if(!imageToUpdate || imageToUpdate.authorId != userId){
//             throw new Error("unauthorized or image not found");
//         }
//         
//         const updatedImage = await prisma.image.update({
//             where: {id: imageToUpdate.id},
//             data: image
//         })
//         // revalidatePath(path);
//         return JSON.parse(JSON.stringify(updatedImage));
//     } catch (error) {
//         handleError(error);
//     }
// }

// UPDATE IMAGE
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    if (!image.id) {
      throw new Error("Image ID is missing.");
    }
    const objectId = typeof image.id === "string" ? image.id : (image.id as unknown as string);

    // Find the image by ID
    const imageToUpdate = await prisma.image.findUnique({
      where: { id: objectId },
    });

    // Validate the found image and authorization
    if (!imageToUpdate || imageToUpdate.authorId !== userId) {
      throw new Error("Unauthorized or image not found.");
    }

    // Update the image
    const updatedImage = await prisma.image.update({
      where: { id: imageToUpdate.id },
      data: {
        title: image.title,
        publicId: image.publicId,
        transformationType: image.transformationType,
        width: image.width,
        height: image.height,
        config: image.config, 
        secureURL: image.secureURL,
        transformationUrl: image.transformationUrl,
        aspectRatio: image.aspectRatio,
        prompt: image.prompt,
        color: image.color,
      },
    });

    // Revalidate path
    // revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    console.error("Error updating image:", error);
    throw error;
  }
}


// DELETE IMAGE
export async function deleteImage(imageId: string){
    try {
        await prisma.image.delete({
            where: {id: imageId}
        });
    } catch (error) {
        handleError(error);
    } finally {
        redirect("/");
    }
}

// GET IMG BY ID
export async function getImageById(imageId: string){
    try {

        const image = await prisma.image.findUnique({
            where: {id: imageId},
            include: {author: true}, // we also want the author who made that img
        });
        if(!image){
            throw new Error("Image new error")
        }
        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error);
    }
}

// GET ALL IMGS - cloudinary search
export async function getAllImages({limit=9, page=1, searchQuery=''}: {limit?:number, page:number, searchQuery:string;}){
    try {

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        })
        let expression = 'folder=xenophageAI';
        if(searchQuery){
            expression += ` AND tags=${searchQuery}`;
        }
        const { resources } = await cloudinary.search.expression(expression).execute();
        const resourcesIds = resources.map((resource: any) => resource.public_id);
        let query = {};
        if(searchQuery){
            query = {
                publicId: {
                    in: resourcesIds
                }
            }
        }
        const skipAmount = (Number(page) -1)*limit;
        const images = await (await prisma.image.findMany({
            take: limit,
            skip: skipAmount,
            where: query,
            include: { author: true },
            orderBy: { createdAt: 'desc' }
        }));
        const totalImages = await prisma.image.count({where: query});
        const savedImages = await prisma.image.count();

        return {
            data: JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages/limit),
            savedImages};
    } catch (error) {
        handleError(error);
    }
}

export async function getUserImages({
    limit = 9,
    page = 1,
    userId,
  }: {
    limit?: number;
    page: number;
    userId: string;
  }) {
    try {
      const skipAmount = (Number(page) - 1) * limit;
      const images = await prisma.image.findMany({
        where: { authorId: userId },
        orderBy: { updatedAt: 'desc' },
        skip: skipAmount,
        take: limit,
        include: {
          author: true, // to populate the user details
        },
      });
      if(images.length === 0){
        return { data: [], totalPages: 0 };
      }
      const totalImages = await prisma.image.count({
        where: { authorId: userId },
      });
  
      return {
        data: JSON.parse(JSON.stringify(images)),
        totalPages: Math.ceil(totalImages / limit),
      };
    } catch (error) {
      handleError(error);
    }
  }