import { Member } from "@prisma/client";

type Props = {
  member: Member;
};

export default function MemberSidebar({ member }: Props) {
  return <div>MemberSidebar</div>;
}
