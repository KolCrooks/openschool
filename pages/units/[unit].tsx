import { GetStaticPaths, GetStaticProps } from "next";
import { FullUnit, IUnit } from "../../models/unit";

export default function Unit(props: { unit: FullUnit }) {
  return <div></div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("/api/unit/list");
  const units = await res.json();

  const paths = units.map((u: IUnit) => ({ params: { unit: u.name } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("help");

  const res = await fetch(`/api/units/${params.unit}`);
  const unit: FullUnit = await res.json();

  return { props: { unit } };
};
