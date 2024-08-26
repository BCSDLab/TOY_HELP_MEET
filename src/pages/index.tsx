import Link from "next/link";

const HOME_INDEX = [
  {
    id: "/roulette",
    title: "룰렛",
  },
  {
    id: "/dutch-pay",
    title: "더치페이",
  },
  {
    id: "/where-to-meet",
    title: "만날 위치",
  },
  {
    id: "/ice-breaking",
    title: "아이스브레이킹",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-28 py-14 px-10">
      {HOME_INDEX.map(({id, title}) => (
        <Link key={id} href={id}>
          <span className="text-4xl font-semibold">{title}</span>
        </Link>
      ))}
    </div>
  );
}
