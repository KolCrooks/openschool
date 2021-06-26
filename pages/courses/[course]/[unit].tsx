import { GetStaticPaths, GetStaticProps } from "next";
import { ICourse } from "../../../models/course";
import { FullUnit, IUnit } from "../../../models/unit";
import { useSession } from "next-auth/client";
export default function Unit(props: { unit: FullUnit }) {
  const { unit } = props;
  const [session, loading] = useSession();
  console.log(session, loading);
  return <div>{unit.name}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://${process.env.host}/api/unit/list`);
  const units = await res.json();

  const paths = units.map((u: IUnit) => ({
    params: {
      unit: u.name.toLowerCase(),
      course: (u.course as unknown as ICourse).name.toLowerCase(),
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("help");

  const res = await fetch(`http://${process.env.host}/api/unit/${params.unit}`);

  const unit: FullUnit = await res.json();

  return { props: { unit } };
};
