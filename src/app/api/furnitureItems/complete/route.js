import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const query = `
        select
        	fi.id,
        	fi.name,
        	fi.description,
        	jsonb_build_object('id', c2.id, 'name', c2.name, 'code', c2.code) as color,
        	jsonb_build_object('id', c.id, 'name', c."name") as category,
        	array_agg(jsonb_build_object('id', i.id, 'url', i.url)) as images 
        from "FurnitureItems" fi
        	inner join "Images" i on fi.id = i."furnitureItemId"
        	inner join "Categories" c on fi."categoryId" = c.id
        	inner join "Colors" c2 on fi."colorId" = c2.id
        ${categoryId ? 'WHERE c.id = $1' : ''}
        group by fi.id, c2.id, c.id
        order by fi.name;
    `;

    try {
        const { rows } = categoryId
            ? await sql.query(query, [categoryId])
            : await sql.query(query); 

        return NextResponse.json(rows, { status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};