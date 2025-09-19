import Items from "../components/Items";
interface MainProps {
  search: string;
}
const Main = ({ search }: MainProps) => {
  return (
    <>
      <Items search={search} />
    </>
  );
};

export default Main;
