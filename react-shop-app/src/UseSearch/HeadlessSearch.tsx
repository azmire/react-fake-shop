import Input from "../Components/Input";
import { useSearch } from "./useSearch";

const HeadlessSearch = () => {
  const { inputValue, handleInputChange } = useSearch();

  return <Input handleChange={handleInputChange} value={inputValue} />;
};
export default HeadlessSearch;
