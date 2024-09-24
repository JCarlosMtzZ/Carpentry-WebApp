import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

import FurnitureItemForm from "@/app/ui/components/FurnitureItemForm";

export default async function Page() {

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const session = await getServerSession(authOptions);

  if (!session || session.user.email !== adminEmail) {
    redirect('/');
  }

  return (
    <div className="flex justify-center items-center sm:p-8 w-full h-full">
      <FurnitureItemForm />
    </div>
  );
};