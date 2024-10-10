import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
    try {
        const id = params.id;

        const { rows } = await sql`
            select
            	fi.id,
            	fi.name,
            	fi.description,
                fi."colorId",
                fi."categoryId",
            	jsonb_build_object('id', c2.id, 'name', c2.name, 'code', c2.code) as color,
	            jsonb_build_object('id', c.id, 'name', c."name") as category,
	            array_agg(jsonb_build_object('id', i.id, 'url', i.url) order by i.url) as images 
            from "FurnitureItems" fi
            	inner join "Images" i on fi.id = i."furnitureItemId"
            	inner join "Categories" c on fi."categoryId" = c.id
            	inner join "Colors" c2 on fi."colorId" = c2.id
            where fi.id = ${id}
            group by fi.id, c2.id, c.id;
        `;
        
        if (rows.length === 0)
            return NextResponse.json({ error: 'FurnitureItem not found' }, { status: 404 });

        return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};