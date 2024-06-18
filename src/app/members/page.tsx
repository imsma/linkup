import Link from "next/link";
import React from "react";

export default function MembersPage() {
  return (
    <div>
      <h3 className="text-3xl">This is members page</h3>
      <Link href="/">Go to home page</Link>
    </div>
  );
}
