import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm');
    const categoryId = searchParams.get('categoryId');
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 5;

    let whereClauses = [];
    let values = [];
    
    if (categoryId) {
        whereClauses.push(`fi."categoryId" = $${values.length + 1}`);
        values.push(categoryId);
    }

    if (searchTerm) {
        whereClauses.push(`to_tsvector('spanish', fi."description") @@ plainto_tsquery('spanish', $${values.length + 1})`);
        values.push(searchTerm);
    }

    const limitAndOffsetClause = `limit $${values.length + 1} offset $${values.length + 2}`;

    const totalRowsQuery = `
        select
            count(*) as "totalRows"
        from "FurnitureItems" fi
        ${whereClauses.length > 0 ? 'where ' + whereClauses.join(' and ') : ''}
    ;`;

    const query = `
        select
        	fi.id,
        	fi.name,
        	fi.description,
        	jsonb_build_object('id', c2.id, 'name', c2.name, 'code', c2.code) as color,
        	jsonb_build_object('id', c.id, 'name', c."name") as category,
        	array_agg(jsonb_build_object('id', i.id, 'url', i.url) order by i.url) as images 
        from "FurnitureItems" fi
        	inner join "Images" i on fi.id = i."furnitureItemId"
        	inner join "Categories" c on fi."categoryId" = c.id
        	inner join "Colors" c2 on fi."colorId" = c2.id
        ${whereClauses.length > 0 ? 'where ' + whereClauses.join(' and ') : ''}
        group by fi.id, c2.id, c.id
        order by fi.name
        ${limitAndOffsetClause}
    ;`;

    try {

        let totalRows = await sql.query(totalRowsQuery, values);
        totalRows = parseInt(totalRows.rows[0].totalRows);

        values.push(pageSize);
        values.push((page - 1) * pageSize);

        const { rows } = await sql.query(query, values);

        return NextResponse.json({ page, pageSize, totalRows, rows }, { status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};