import { headers } from 'next/headers';

export async function fetchCategories() {
    const headersInstance = headers();
    const protocol = headersInstance.get('x-forwarded-proto') || 'http';
    const host = headersInstance.get('x-forwarded-host') || 'localhost:3000';
    const url = `${protocol}://${host}`;

    const response = await fetch(`${url}/api/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const categories = response.json();
    return categories;
};

export async function fetchColors() {
  const headersInstance = headers();
  const protocol = headersInstance.get('x-forwarded-proto') || 'http';
  const host = headersInstance.get('x-forwarded-host') || 'localhost:3000';
  const url = `${protocol}://${host}`;

  const response = await fetch(`${url}/api/colors`);
  if (!response.ok) {
    throw new Error('Failed to fetch colors');
  }
  const colors = response.json();
  return colors;
};