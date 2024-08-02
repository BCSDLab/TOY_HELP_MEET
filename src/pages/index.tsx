import Link from "next/link";

const HOME_INDEX = [
  {
    id: 1,
    title: "룰렛",
    href: "/roulette",
  },
  {
    id: 2,
    title: "더치페이",
    href: "/dutch-pay",
  },
  {
    id: 3,
    title: "만날 위치",
    href: "/where-to-meet",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-28 py-14 px-10">
      {HOME_INDEX.map((domain) => {
        return (
          <Link key={domain.id} href={domain.href}>
            <span className="text-4xl font-semibold">{domain.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
