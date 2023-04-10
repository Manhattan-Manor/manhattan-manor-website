class Image {
  path: string;
  _id: string;

  constructor(image?: Image) {
    if (image) {
      this.path = image.path;
      this._id = image._id;
    } else {
      this.path = "";
      this._id = "";
    }
  }

  createObjectURL = async (
    options: Partial<ICreateObjectURLParams>
  ): Promise<string> => {
    // Fetch image
    const path = import.meta.env.PUBLIC_CMS_IMAGES_ROUTE + "/" + this._id;
    const params = options
      ? new URLSearchParams({
          w: options.width?.toString() || "",
          h: options.height?.toString() || "",
          mime: options.mime?.toString() || "",
          m: options.resizeMode?.toString() || "",
          q: options.quality?.toString() || "",
        })
      : undefined;
    const finalPath = path + (params ? "?" + params.toString() : "");
    const res = await fetch(finalPath, {
      method: "GET",
      headers: {
        "api-key": import.meta.env.PUBLIC_CMS_API_KEY,
      },
    });
    const url = await res.text();
    return url;
  };
}

export default Image;

interface ICreateObjectURLParams {
  width: number;
  height: number;
  mime: "auto" | "gif" | "jpeg" | "png" | "webp" | "bmp";
  resizeMode: "thumbnail" | "bestFit" | "resize" | "fitToWidth" | "fitToHeight";
  quality: number;
}
