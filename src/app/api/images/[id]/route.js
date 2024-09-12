import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { imageSchema } from "../../schemas";

export async function GET(request, { params }) {
    try {
        const id = params.id;

        const { rows } = await sql`SELECT * FROM "Images" WHERE id = ${id};`;
        
        if (rows.length === 0)
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        
        return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        
        const { error } = imageSchema.validate(body);
        if (error)
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });

        const id = params.id;
        const { rows } = await sql`SELECT * FROM "Images" WHERE id = ${id};`;
        
        if (rows.length === 0)
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        
        await sql`UPDATE "Images"
            SET url = ${body.url},
                "furnitureItemId" = ${body.furnitureItemId}
            WHERE id = ${id};`;

        return NextResponse.json({message: 'Image successfully updated'}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export async function DELETE(request, { params }) {
    try {
        const id = params.id;

        const { rows } = await sql`SELECT * FROM "Images" WHERE id = ${id};`;
        
        if (rows.length === 0)
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        
        await sql`DELETE FROM "Images" WHERE id = ${id};`;

        return NextResponse.json({message: 'Image successfully deleted'}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};