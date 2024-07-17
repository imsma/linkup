import Link from "next/link";
import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurretUserLikeIds } from "../actions/likeActions";

export default async function MembersPage() {
  const members = await getMembers();
  const likeIds = await fetchCurretUserLikeIds();

  return (
    <div className="mt-10 grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map((member) => (
          <MemberCard member={member} key={member.id} likeIds={likeIds} />
        ))}
    </div>
  );
}
