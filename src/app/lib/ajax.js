//const bucketURL = proccess.env.NEXT_PUBLIC_BUCKET_API_URL;

export const saveLocalFurnitureItems = (ids) => {
    localStorage.setItem('furnitureItems', JSON.stringify(ids));
};

export const loadLocalFurnitureItems = () => {
    const furnitureItems = localStorage.getItem('furnitureItems');
    return furnitureItems ? JSON.parse(furnitureItems) : [];
};

export const isLocalFurnitureItem = (idToFind) => {
    const furnitureItems = loadLocalFurnitureItems();
    return furnitureItems.includes(idToFind);
}

export const addLocalFurnitureItem = (id) => {
    const furnitureItems = loadLocalFurnitureItems();
    if (!furnitureItems.includes(id)) {
        furnitureItems.push(id);
        saveLocalFurnitureItems(furnitureItems);
    }
};

export const removeLocalFurnitureItem = (idToRemove) => {
    let furnitureItems = loadLocalFurnitureItems();
    furnitureItems = furnitureItems.filter(id => id !== idToRemove);
    saveLocalFurnitureItems(furnitureItems);
};

export const getFurnitureItemCompleteById = async (id) => {
    const response = await fetch(`/api/furnitureItems/complete/${id}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getFurnitureItemsComplete = async (categoryId, page = 1, pageSize = 5) => {
    const response = await fetch(`
        /api/furnitureItems/complete?categoryId=${categoryId}&page=${page}&pageSize=${pageSize}
    `);
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

export const getCategoryById = async (id) => {
    const response = await fetch(`/api/categories/${id}`);
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