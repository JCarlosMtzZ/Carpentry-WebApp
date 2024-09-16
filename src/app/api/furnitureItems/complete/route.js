import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 5;

    const totalRowsQuery = `
        select
            count(*) as "totalRows"
        from "FurnitureItems" fi
        ${categoryId ? 'where fi."categoryId" = $1' : ''}
    `;

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
        order by fi.name
        limit $2 offset $3;
    `;

    try {
        let totalRows = await sql.query(totalRowsQuery, [categoryId]);
        totalRows = parseInt(totalRows.rows[0].totalRows);
        const { rows } = await sql.query(query, [categoryId, pageSize, (page - 1) * pageSize]);

        return NextResponse.json({ page, pageSize, totalRows, rows }, { status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};