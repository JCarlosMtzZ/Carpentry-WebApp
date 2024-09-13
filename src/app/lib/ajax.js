//const bucketURL = proccess.env.NEXT_PUBLIC_BUCKET_API_URL;

export const getFurnitureItemComplete = async (categoryId) => {
    const response = await fetch(`/api/furnitureItems/complete?categoryId=${categoryId}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const addFurnitureItem = async (item) => {
    const response = await fetch(`/api/furnitureItems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const addFileToBucket = async (bucketUrl, name, file) => {
    const response = await fetch(`${bucketUrl}${name}`, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': 'application/octet-stream',
        }
    });
    if (!response.ok)
        throw new Error(await response.text());
    return 1;
};

export const addImage = async (image) => {
    const response = await fetch(`/api/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAllCategories = async () => {
    const response = await fetch(`/api/categories`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAllColors = async () => {
    const response = await fetch(`/api/colors`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};