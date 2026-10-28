import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app
export const ourFileRouter = {
  // Define your upload route
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Middleware runs before upload
    .middleware(async ({ req }) => {
      const user = await auth(req);

      // Prevent unauthorized uploads
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      // Passed to onUploadComplete as metadata
      return { userId: user.id };
    })

    // Runs after upload completes
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      // Returned to client-side callback
      return { uploadedBy: metadata.userId };
    }),
};